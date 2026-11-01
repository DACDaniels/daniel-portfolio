// Filter check, run after `npm run build` (part of npm run preflight).
// Starts the built site, clicks the project filter chips in every order and
// fails if a chip shows the wrong cards, leaves a card faded out, or does
// not mark itself pressed. Runs with and without reduced motion.
import puppeteer from "puppeteer";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.CHECK_PORT ?? 3210);
const BASE = `http://localhost:${PORT}`;

// Expected cards per chip. Kept here on purpose, apart from Projects.tsx,
// so a wrong group in the page data fails the check.
const ALL = [
  "FishTech Precision Feeding System",
  "Health & Longevity",
  "The Endoscopy Suite",
  "FishTech Sales Agent & Ops",
  "FishTech Consultancy",
  "FishTech Feeder",
  "Steadyhands Catering",
  "This Portfolio",
];
const EXPECTED = {
  All: ALL,
  "Client systems": ["Health & Longevity", "The Endoscopy Suite", "Steadyhands Catering"],
  "Products and hardware": ["FishTech Precision Feeding System", "FishTech Feeder"],
  "Automation and AI": ["FishTech Precision Feeding System", "FishTech Sales Agent & Ops"],
  Websites: ["The Endoscopy Suite", "FishTech Consultancy", "This Portfolio"],
};
const CHIPS = Object.keys(EXPECTED);

function chromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  try {
    const own = puppeteer.executablePath();
    if (own && existsSync(own)) return undefined;
  } catch {
    /* fall through to a system Chrome */
  }
  return [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => existsSync(p));
}

async function startServer() {
  const nextBin = resolve(root, "node_modules/next/dist/bin/next");
  const proc = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let log = "";
  proc.stdout.on("data", (d) => (log += d));
  proc.stderr.on("data", (d) => (log += d));
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return proc;
    } catch {
      /* not up yet */
    }
    if (proc.exitCode !== null) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  proc.kill();
  throw new Error(`next start did not come up on ${PORT}\n${log}`);
}

// Every ordered pair, plus All > X > Y > All for every X != Y.
function sequences() {
  const seqs = [];
  for (const a of CHIPS) for (const b of CHIPS) if (a !== b) seqs.push([a, b]);
  const named = CHIPS.filter((c) => c !== "All");
  for (const x of named) for (const y of named) if (x !== y) seqs.push(["All", x, y, "All"]);
  return seqs;
}

async function readState(page) {
  return page.evaluate(() => {
    const section = document.getElementById("projects");
    const cards = [...section.querySelectorAll("[data-project-card]")];
    const effectiveOpacity = (el) => {
      let o = 1;
      for (let n = el; n && n !== section; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
      return o;
    };
    const chips = [...section.querySelectorAll('[role="group"][aria-label="Filter projects"] button')];
    return {
      cards: cards.map((c) => ({ title: c.getAttribute("data-project-card"), opacity: effectiveOpacity(c) })),
      pressed: chips.filter((b) => b.getAttribute("aria-pressed") === "true").map((b) => b.textContent.trim()),
    };
  });
}

async function clickChip(page, label) {
  await page.evaluate((l) => {
    const btn = [...document.querySelectorAll('#projects [role="group"] button')].find(
      (b) => b.textContent.trim() === l,
    );
    if (!btn) throw new Error(`no chip "${l}"`);
    btn.click();
  }, label);
}

async function settle(page, reduced) {
  // Longer than the slowest enter animation, so a card stuck mid-fade or
  // at its hidden state shows up as a failure.
  await new Promise((r) => setTimeout(r, reduced ? 400 : 1300));
}

async function run(browser, reduced, errors) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" }]);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60_000 });
  await page.evaluate(() => document.getElementById("projects").scrollIntoView());
  // Scroll through the section so the first reveal has fired.
  await page.evaluate(async () => {
    const s = document.getElementById("projects");
    const end = s.offsetTop + s.offsetHeight;
    for (let y = s.offsetTop; y < end; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, s.offsetTop);
  });
  await settle(page, reduced);

  const mode = reduced ? "reduced motion" : "full motion";
  let checks = 0;
  for (const seq of sequences()) {
    await clickChip(page, "All");
    await settle(page, reduced);
    for (const chip of seq) {
      await clickChip(page, chip);
      await settle(page, reduced);
      const state = await readState(page);
      const where = `[${mode}] ${seq.join(" > ")} @ ${chip}`;
      const got = state.cards.map((c) => c.title);
      const want = EXPECTED[chip];
      if (got.length !== want.length || want.some((t) => !got.includes(t)))
        errors.push(`${where}: cards are [${got.join(", ")}], expected [${want.join(", ")}]`);
      for (const c of state.cards)
        if (!(c.opacity > 0.9)) errors.push(`${where}: "${c.title}" opacity ${c.opacity.toFixed(2)}`);
      if (state.pressed.length !== 1 || state.pressed[0] !== chip)
        errors.push(`${where}: pressed chips are [${state.pressed.join(", ")}]`);
      checks++;
    }
  }
  await page.close();
  return checks;
}

const server = await startServer();
const browser = await puppeteer.launch({ headless: true, executablePath: chromePath() });
const errors = [];
let checks = 0;
try {
  checks += await run(browser, false, errors);
  checks += await run(browser, true, errors);
} finally {
  await browser.close();
  server.kill();
}

if (errors.length) {
  console.error(`Filter check failed (${errors.length} problems):`);
  for (const e of [...new Set(errors)].slice(0, 40)) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Filter check passed: ${checks} chip states, full and reduced motion.`);
