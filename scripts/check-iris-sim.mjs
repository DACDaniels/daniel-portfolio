// Iris simulation check, part of npm run preflight. Runs the TypeScript port
// in src/lib/iris-sim/model.ts against fixtures.json, which holds outputs of
// the real Python functions in fishtech-precision-feeding-system (commit noted
// in the file). Numbers must agree within 0.5 percent; words (sample quality,
// feed or not, the engine's reason, next window) must match exactly.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Node warns that model.ts has no "type" in package.json; that is expected.
process.removeAllListeners("warning");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const model = await import(pathToFileURL(resolve(root, "src/lib/iris-sim/model.ts")).href);
const fixtures = JSON.parse(readFileSync(resolve(root, "src/lib/iris-sim/fixtures.json"), "utf8"));

const TOL = 0.005;
let failures = 0;
let compared = 0;

function num(caseName, field, ts, py) {
  compared++;
  const ok = py === 0 ? Math.abs(ts) < 1e-9 : Math.abs(ts - py) / Math.abs(py) <= TOL;
  if (!ok) {
    failures++;
    console.error(`  ✗ ${caseName}: ${field} TypeScript ${ts}, Python ${py}`);
  }
}
function same(caseName, field, ts, py) {
  compared++;
  if (ts !== py) {
    failures++;
    console.error(`  ✗ ${caseName}: ${field} TypeScript ${JSON.stringify(ts)}, Python ${JSON.stringify(py)}`);
  }
}

for (const c of fixtures.cases) {
  const i = c.input;
  const { sample, estimate, feed } = model.runPipeline({
    species: i.species,
    bboxes: i.bboxes,
    stockingCount: i.stockingCount,
    daysSinceStocking: i.daysSinceStocking,
    loggedMortality: i.loggedMortality,
    hour: i.hour,
    waterTempC: i.waterTempC,
    minutesSinceLastFeed: i.minutesSinceLastFeed,
    lastFeedResponse: i.lastFeedResponse,
  });
  const n = c.name;
  same(n, "fish_count", sample.fishCount, c.sample.fish_count);
  same(n, "accepted_count", sample.acceptedCount, c.sample.accepted_count);
  num(n, "average_length_cm", sample.averageLengthCm, c.sample.average_length_cm);
  num(n, "average_weight_g", sample.averageWeightG, c.sample.average_weight_g);
  num(n, "total_biomass_g", sample.totalBiomassG, c.sample.total_biomass_g);
  num(n, "length_stddev_cm", sample.lengthStddevCm, c.sample.length_stddev_cm);
  same(n, "gate_drop_reasons", JSON.stringify(sample.gateDropReasons), JSON.stringify(c.sample.gate_drop_reasons));
  num(n, "estimated_population", estimate.estimatedPopulation, c.estimate.estimated_population);
  num(n, "estimated_total_biomass_g", estimate.estimatedTotalBiomassG, c.estimate.estimated_total_biomass_g);
  num(n, "confidence_lower_g", estimate.confidenceLowerG, c.estimate.confidence_lower_g);
  num(n, "confidence_upper_g", estimate.confidenceUpperG, c.estimate.confidence_upper_g);
  same(n, "sample_quality", estimate.sampleQuality, c.estimate.sample_quality);
  num(n, "recommended_feed_g", feed.recommendedFeedG, c.feed.recommended_feed_g);
  same(n, "should_feed_now", feed.shouldFeedNow, c.feed.should_feed_now);
  same(n, "reason", feed.reason, c.feed.reason);
  num(n, "base_rate", feed.baseRate, c.feed.base_rate);
  num(n, "temp_multiplier", feed.tempMultiplier, c.feed.temp_multiplier);
  num(n, "time_multiplier", feed.timeMultiplier, c.feed.time_multiplier);
  num(n, "response_multiplier", feed.responseMultiplier, c.feed.response_multiplier);
  same(n, "next_feed_window", feed.nextFeedWindow, c.feed.next_feed_window);
  same(n, "feeds_per_day", feed.feedsPerDay, c.feed.feeds_per_day);
}

const cases = fixtures.cases.length;
if (cases < 10) {
  console.error(`  ✗ only ${cases} fixture cases; at least 10 are required`);
  failures++;
}
if (failures > 0) {
  console.error(`Iris simulation check failed: ${failures} of ${compared} comparisons off (tolerance 0.5%).`);
  process.exit(1);
}
console.log(`Iris simulation matches the Python fixtures: ${cases} cases, ${compared} values, tolerance 0.5% (Iris commit ${fixtures.commit.slice(0, 7)}).`);
