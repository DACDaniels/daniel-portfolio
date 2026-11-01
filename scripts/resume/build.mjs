// Builds public/resume.pdf from scripts/resume/resume.html (npm run resume).
// Uses Puppeteer's Chrome, or the one in PUPPETEER_EXECUTABLE_PATH.
import puppeteer from "puppeteer";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "resume.html");
const out = resolve(here, "../../public/resume.pdf");

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(source).href, { waitUntil: "networkidle0", timeout: 60_000 });
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  });
  console.log(`Saved ${out}`);
} finally {
  await browser.close();
}
