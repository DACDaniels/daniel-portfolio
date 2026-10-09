// Search check, run after `npm run build` (part of npm run preflight).
// Reads the built HTML and fails if Google would get wrong or broken facts.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://dev.danielchadambuka.com";
const APP = ".next/server/app";
const errors = [];
const read = (f) => readFileSync(join(APP, f), "utf8");
const pick = (html, re) => (html.match(re) || [])[1];

const pages = [
  { file: "index.html", canonical: SITE },
  { file: "projects/fishtech.html", canonical: `${SITE}/projects/fishtech` },
];

for (const { file, canonical } of pages) {
  const html = read(file);
  const title = pick(html, /<title>([^<]*)<\/title>/);
  if (!title) errors.push(`${file}: no <title>`);
  else if ((title.match(/Daniel Chadambuka/g) || []).length !== 1)
    errors.push(`${file}: name must appear exactly once in title: "${title}"`);
  if (!pick(html, /<meta name="description" content="([^"]+)"/))
    errors.push(`${file}: no description`);
  const can = pick(html, /<link rel="canonical" href="([^"]+)"/);
  if (can !== canonical) errors.push(`${file}: canonical is ${can}, expected ${canonical}`);
  const ogUrl = pick(html, /<meta property="og:url" content="([^"]+)"/);
  if (ogUrl !== canonical) errors.push(`${file}: og:url is ${ogUrl}, expected ${canonical}`);
  if (!pick(html, /<meta property="og:image" content="([^"]+)"/))
    errors.push(`${file}: no og:image`);
  if (/noindex/.test(pick(html, /<meta name="robots" content="([^"]+)"/) || ""))
    errors.push(`${file}: page is noindex`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  const types = [];
  for (const [, json] of blocks) {
    try {
      types.push(JSON.parse(json)["@type"]);
    } catch (e) {
      errors.push(`${file}: structured data is not valid JSON (${e.message})`);
    }
  }
  if (!types.includes("Person")) errors.push(`${file}: no Person structured data`);
  if (file === "index.html" && !types.includes("ProfilePage"))
    errors.push(`${file}: no ProfilePage structured data`);
}

const sitemap = read("sitemap.xml.body");
if (/\/previews\//.test(sitemap)) errors.push("sitemap.xml lists a /previews/ page");
const robots = read("robots.txt.body");
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) errors.push("robots.txt has no sitemap line");
if (/Disallow:\s*\/\s*$/m.test(robots)) errors.push("robots.txt blocks the whole site");

// Any private client preview must carry its own noindex tag.
const prev = "public/previews";
if (existsSync(prev)) {
  for (const d of readdirSync(prev)) {
    const f = join(prev, d, "index.html");
    if (existsSync(f) && !/<meta name="robots" content="noindex/.test(readFileSync(f, "utf8")))
      errors.push(`${f}: preview without noindex`);
  }
}

if (errors.length) {
  console.error("Search check failed:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log("Search check passed: titles, descriptions, canonical links, Open Graph, structured data, sitemap, robots.txt, previews.");
