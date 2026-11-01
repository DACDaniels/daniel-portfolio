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
  { file: "hire.html", canonical: `${SITE}/hire` },
  { file: "projects/fishtech.html", canonical: `${SITE}/projects/fishtech`, caseStudy: "fishtech" },
  { file: "projects/health-and-longevity.html", canonical: `${SITE}/projects/health-and-longevity`, caseStudy: "health-and-longevity" },
  { file: "projects/fishtech-sales-agent.html", canonical: `${SITE}/projects/fishtech-sales-agent`, caseStudy: "fishtech-sales-agent" },
  { file: "projects/endoscopy-suite.html", canonical: `${SITE}/projects/endoscopy-suite`, caseStudy: "endoscopy-suite" },
  { file: "projects/fishtech-consultancy.html", canonical: `${SITE}/projects/fishtech-consultancy`, caseStudy: "fishtech-consultancy" },
  { file: "projects/fishtech-feeder.html", canonical: `${SITE}/projects/fishtech-feeder`, caseStudy: "fishtech-feeder" },
  { file: "projects/steadyhands.html", canonical: `${SITE}/projects/steadyhands`, caseStudy: "steadyhands" },
  { file: "projects/this-portfolio.html", canonical: `${SITE}/projects/this-portfolio`, caseStudy: "this-portfolio" },
];

// Project structured data (src/lib/projectSchema.ts): the home page lists
// all eight projects; every case study carries its own entry. Each entry
// names the project, links it and credits the Person. Never a phone,
// address, award, price or rating.
const PROJECT_COUNT = 8;
const FORBIDDEN_KEYS = ["telephone", "address", "award", "awards", "offers", "price", "aggregateRating", "review"];

function checkProjectEntry(where, item) {
  for (const k of ["@type", "@id", "name", "url", "description"])
    if (!item?.[k]) errors.push(`${where}: project entry has no ${k}`);
  if (item?.author?.["@id"] !== `${SITE}/#person`)
    errors.push(`${where}: project "${item?.name}" has no author pointing at the Person`);
  for (const k of FORBIDDEN_KEYS)
    if (item && k in item) errors.push(`${where}: project "${item.name}" carries "${k}"`);
  const text = JSON.stringify(item ?? {});
  if (/—/.test(text)) errors.push(`${where}: project "${item?.name}" has an em-dash`);
  if (/\$\s?\d/.test(text)) errors.push(`${where}: project "${item?.name}" has a dollar figure`);
  if (/blue acre/i.test(text)) errors.push(`${where}: project "${item?.name}" names Blue Acre`);
}

function checkProjectData(file, parsed, caseStudy) {
  if (file === "index.html") {
    const list = parsed.find((d) => d["@type"] === "ItemList");
    if (!list) return errors.push(`${file}: no ItemList of projects`);
    const items = list.itemListElement ?? [];
    if (items.length !== PROJECT_COUNT || list.numberOfItems !== PROJECT_COUNT)
      errors.push(`${file}: ItemList has ${items.length} projects, expected ${PROJECT_COUNT}`);
    items.forEach((li, i) => {
      if (li.position !== i + 1) errors.push(`${file}: ItemList position ${i + 1} is ${li.position}`);
      checkProjectEntry(file, li.item);
    });
  }
  if (caseStudy) {
    const id = `${SITE}/#project-${caseStudy}`;
    const own = parsed.find((d) => d["@id"] === id);
    if (!own) return errors.push(`${file}: no project entry (${id})`);
    checkProjectEntry(file, own);
    if (own.mainEntityOfPage !== `${SITE}/projects/${caseStudy}`)
      errors.push(`${file}: project entry mainEntityOfPage is ${own.mainEntityOfPage}`);
  }
}

for (const { file, canonical, caseStudy } of pages) {
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
  const parsed = [];
  for (const [, json] of blocks) {
    try {
      const data = JSON.parse(json);
      parsed.push(data);
      types.push(data["@type"]);
    } catch (e) {
      errors.push(`${file}: structured data is not valid JSON (${e.message})`);
    }
  }
  checkProjectData(file, parsed, caseStudy);
  if (!types.includes("Person")) errors.push(`${file}: no Person structured data`);
  if (file === "index.html" && !types.includes("ProfilePage"))
    errors.push(`${file}: no ProfilePage structured data`);
}

const sitemap = read("sitemap.xml.body");
if (/\/previews\//.test(sitemap)) errors.push("sitemap.xml lists a /previews/ page");
for (const { canonical } of pages)
  if (!sitemap.includes(`<loc>${canonical === SITE ? `${SITE}/` : canonical}</loc>`))
    errors.push(`sitemap.xml does not list ${canonical}`);
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
console.log("Search check passed: titles, descriptions, canonical links, Open Graph, structured data, project entries, sitemap, robots.txt, previews.");
