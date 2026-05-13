import puppeteer from "puppeteer";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.argv[2] ?? "http://localhost:3000";
const label = process.argv[3];
const width = process.argv[4] ? parseInt(process.argv[4], 10) : 1920;

const heightByWidth = (w) => {
  if (w <= 414) return 812;
  if (w <= 500) return 844;
  if (w <= 834) return 1112;
  if (w <= 1280) return 800;
  if (w <= 1440) return 900;
  return 1080;
};
const height = heightByWidth(width);
const isMobile = width < 768;

const outDir = resolve(__dirname, "screenshots");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const existing = readdirSync(outDir).filter((f) => /^screenshot-\d+/.test(f));
const nextIndex =
  existing.reduce((max, f) => {
    const m = f.match(/^screenshot-(\d+)/);
    const n = m ? parseInt(m[1], 10) : 0;
    return n > max ? n : max;
  }, 0) + 1;

const suffix = label ? `-${label.replace(/[^a-zA-Z0-9_-]/g, "_")}` : "";
const filename = `screenshot-${nextIndex}${suffix}.png`;
const outPath = resolve(outDir, filename);

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 2,
    isMobile,
    hasTouch: isMobile,
  });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 });
  await new Promise((r) => setTimeout(r, 1200));

  // Scroll to bottom in chunks at the natural viewport so every
  // IntersectionObserver-driven motion.div (whileInView) fires on the
  // way down and commits to its visible state (viewport.once = true).
  // Then return to top before capturing.
  // We keep the viewport at its natural size — resizing to docHeight
  // breaks 100vh-based layouts (min-h-screen sections explode).
  await page.evaluate(async () => {
    // Smaller steps + longer per-step waits so every IntersectionObserver
    // threshold is comfortably crossed, and framer-motion's staggered
    // entries have time to commit before the next step scrolls past.
    const step = Math.min(500, window.innerHeight * 0.5);
    const max = document.documentElement.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 450));
    }
    window.scrollTo(0, max);
    await new Promise((r) => setTimeout(r, 1500));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Modern Puppeteer captures fullPage in a single CDP call
  // (captureBeyondViewport=true by default), so fixed-position
  // elements appear once at the top — no tiling artifacts.
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved ${outPath} @ ${width}x${height}`);
} finally {
  await browser.close();
}
