// A TypeScript port of the Iris (FishTech Precision Feeding System) maths, for
// the "See how Iris thinks" simulation on /projects/fishtech.
//
// Source of truth: github.com/DACDaniels/fishtech-precision-feeding-system,
// commit e624125 (main, 2026-08-14). Every constant below names its file and
// line there. Nothing here is invented: where the deployed code does not
// compute something (keypoints, ChArUco calibration, lucky-frame selection),
// the simulation leaves it out.
//
// scripts/check-iris-sim.mjs runs this file against fixtures.json (outputs of
// the real Python functions) inside npm run preflight. Keep this file free of
// imports and of non-erasable TypeScript (enums, parameter properties) so Node
// can load it directly.

export type SpeciesId = "tilapia_nilotica" | "clarias_gariepinus";

export type FeedingResponse =
  | "unknown"
  | "consumed_fast"
  | "consumed_normal"
  | "consumed_slow"
  | "leftover";

export type BBox = readonly [number, number, number, number];

export type FeedingProfile = {
  fingerlingRate: number;
  juvenileRate: number;
  growoutRate: number;
  marketRate: number;
  tempMinFeeding: number;
  tempOptimalLow: number;
  tempOptimalHigh: number;
  tempMaxFeeding: number;
  feedingHourStart: number;
  feedingHourPeakStart: number;
  feedingHourPeakEnd: number;
  feedingHourEnd: number;
  minHoursBetweenFeeds: number;
  feedsPerDay: number;
};

export type Species = {
  id: SpeciesId;
  common: string;
  latin: string;
  /** W = a * L^b. backend/app/core/config.py:39-42 (SPECIES_LW_DEFAULTS). */
  a: number;
  b: number;
  feeding: FeedingProfile;
};

// backend/app/feeding/feeding_service.py:80-102 (SpeciesFeedingProfile
// defaults, which are the tilapia profile, TILAPIA_NILOTICA at line 109).
const TILAPIA_FEEDING: FeedingProfile = {
  fingerlingRate: 0.06,
  juvenileRate: 0.04,
  growoutRate: 0.025,
  marketRate: 0.015,
  tempMinFeeding: 18.0,
  tempOptimalLow: 26.0,
  tempOptimalHigh: 30.0,
  tempMaxFeeding: 33.0,
  feedingHourStart: 7,
  feedingHourPeakStart: 9,
  feedingHourPeakEnd: 16,
  feedingHourEnd: 18,
  minHoursBetweenFeeds: 3.0,
  feedsPerDay: 3,
};

// backend/app/feeding/feeding_service.py:111-127 (CLARIAS_GARIEPINUS).
// Fields it does not override keep the defaults above.
const CATFISH_FEEDING: FeedingProfile = {
  ...TILAPIA_FEEDING,
  fingerlingRate: 0.08,
  juvenileRate: 0.05,
  growoutRate: 0.03,
  marketRate: 0.02,
  tempMinFeeding: 20.0,
  tempOptimalLow: 28.0,
  tempOptimalHigh: 32.0,
  tempMaxFeeding: 35.0,
  feedingHourStart: 16,
  feedingHourPeakStart: 18,
  feedingHourPeakEnd: 22,
  feedingHourEnd: 23,
  feedsPerDay: 2,
};

export const SPECIES: Record<SpeciesId, Species> = {
  tilapia_nilotica: {
    id: "tilapia_nilotica",
    common: "Nile tilapia",
    latin: "Oreochromis niloticus",
    a: 0.0185, // config.py:40
    b: 2.98, // config.py:40
    feeding: TILAPIA_FEEDING,
  },
  clarias_gariepinus: {
    id: "clarias_gariepinus",
    common: "African catfish",
    latin: "Clarias gariepinus",
    a: 0.0042, // config.py:41
    b: 3.12, // config.py:41
    feeding: CATFISH_FEEDING,
  },
};

/** cm per pixel. pond_config.yaml:37 (calibration.cm_per_pixel), also the
 *  CalibrationService default, calibration_service.py:18. */
export const CM_PER_PIXEL = 0.1;

/** Sample quality gate, pond_config.yaml:44-48 and
 *  backend/app/quality/sample_quality_gate.py:42-46. */
export const QUALITY = {
  minLengthCm: 4.0,
  maxLengthCm: 45.0,
  aspectRatioMin: 1.5,
  aspectRatioMax: 6.0,
  minConfidence: 0.45,
} as const;

/** biomass_estimator.py:54-56. */
export const QUALITY_N = { high: 20, medium: 8, low: 3 } as const;
/** biomass_estimator.py:60. */
export const DEFAULT_CYCLE_DAYS = 180;
/** pond_config.yaml:18 and config.py:63 (PondConfig default). */
export const FALLBACK_MORTALITY_RATE = 0.12;

/** feeding_service.py:315-321 (_response_multiplier). */
export const RESPONSE_MULTIPLIER: Record<FeedingResponse, number> = {
  unknown: 1.0,
  consumed_fast: 1.1,
  consumed_normal: 1.0,
  consumed_slow: 0.9,
  leftover: 0.75,
};

// ---------------------------------------------------------------- helpers

/** Python's round(x, n): half to even on the decimal value. */
export function pyRound(x: number, n = 0): number {
  const f = 10 ** n;
  const v = x * f;
  const r = Math.round(v);
  // Exact .5 ties go to the even neighbour, as Python does.
  if (Math.abs(v % 1) === 0.5) return (2 * Math.round(v / 2)) / f;
  return r / f;
}

/** Python's str() of a float: 16 -> "16.0", 21.5 -> "21.5". */
function pyFloat(x: number): string {
  return Number.isInteger(x) ? x.toFixed(1) : String(x);
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

// ------------------------------------------------------------ measurement

/** vision/pixel_extractor.py:14-30. The longer side of the detection box. */
export function pixelLength(bbox: BBox): number {
  const [x1, y1, x2, y2] = bbox;
  const w = x2 - x1;
  const h = y2 - y1;
  if (w <= 0 || h <= 0) return 0;
  return Math.max(w, h);
}

/** calibration_service.py:34-43. L_cm = L_pixel * S. */
export function pixelsToCm(pixels: number, cmPerPixel = CM_PER_PIXEL): number {
  return pixels * cmPerPixel;
}

/** weight_model.py:21-32. W = a * L^b, grams from cm. */
export function lengthToWeight(lengthCm: number, a: number, b: number): number {
  if (lengthCm <= 0) throw new Error("Length must be greater than zero.");
  return a * Math.pow(lengthCm, b);
}

export type GateReason = "length_below_min" | "length_above_max" | "aspect_ratio_extreme" | "low_confidence";

/** sample_quality_gate.py:57-89 in bbox mode (the two keypoint gates
 *  short-circuit there, lines 93-94 and 108-109). */
export function gate(bbox: BBox, lengthCm: number, confidence = 1.0): GateReason | null {
  if (lengthCm < QUALITY.minLengthCm) return "length_below_min";
  if (lengthCm > QUALITY.maxLengthCm) return "length_above_max";
  const [x1, y1, x2, y2] = bbox;
  const w = Math.max(1, x2 - x1);
  const h = Math.max(1, y2 - y1);
  const ratio = Math.max(w, h) / Math.min(w, h);
  if (ratio < QUALITY.aspectRatioMin || ratio > QUALITY.aspectRatioMax) return "aspect_ratio_extreme";
  if (confidence < QUALITY.minConfidence) return "low_confidence";
  return null;
}

// ---------------------------------------------------------------- biomass

export type Sample = {
  fishCount: number;
  acceptedCount: number;
  averageLengthCm: number;
  averageWeightG: number;
  totalBiomassG: number;
  lengthStddevCm: number;
  gateDropReasons: Partial<Record<GateReason, number>>;
};

/** biomass/biomass_engine.py:36-89 (BiomassEngine.estimate_biomass). The
 *  detector's confidence is the bbox-mode placeholder 1.0 (line 56). */
export function estimateBiomass(bboxes: readonly BBox[], species: Species): Sample {
  const empty = (detected: number, drops: Sample["gateDropReasons"] = {}): Sample => ({
    fishCount: detected,
    acceptedCount: 0,
    averageLengthCm: 0,
    averageWeightG: 0,
    totalBiomassG: 0,
    lengthStddevCm: 0,
    gateDropReasons: drops,
  });
  if (bboxes.length === 0) return empty(0);

  const lengths: number[] = [];
  const weights: number[] = [];
  const drops: Sample["gateDropReasons"] = {};
  for (const bbox of bboxes) {
    const lengthCm = pixelsToCm(pixelLength(bbox));
    const reason = gate(bbox, lengthCm, 1.0);
    if (reason) {
      drops[reason] = (drops[reason] ?? 0) + 1;
      continue;
    }
    lengths.push(lengthCm);
    weights.push(lengthToWeight(lengthCm, species.a, species.b));
  }
  const n = lengths.length;
  if (n === 0) return empty(bboxes.length, drops);

  const avgL = lengths.reduce((s, v) => s + v, 0) / n;
  const avgW = weights.reduce((s, v) => s + v, 0) / n;
  const total = weights.reduce((s, v) => s + v, 0);
  // statistics.stdev: sample standard deviation (n - 1).
  const sd = n > 1 ? Math.sqrt(lengths.reduce((s, v) => s + (v - avgL) ** 2, 0) / (n - 1)) : 0;

  return {
    fishCount: bboxes.length,
    acceptedCount: n,
    averageLengthCm: pyRound(avgL, 2),
    averageWeightG: pyRound(avgW, 2),
    totalBiomassG: pyRound(total, 2),
    lengthStddevCm: pyRound(sd, 3),
    gateDropReasons: drops,
  };
}

export type SampleQuality = "high" | "medium" | "low" | "very_low" | "no_detection";

export type PondEstimate = {
  estimatedPopulation: number;
  estimatedTotalBiomassG: number;
  confidenceLowerG: number;
  confidenceUpperG: number;
  sampleQuality: SampleQuality;
  /** True when the population came from the literature mortality fallback. */
  usedFallbackMortality: boolean;
  mortalityFraction: number;
};

/** biomass_estimator.py:181-197. */
export function qualityForN(n: number): SampleQuality {
  if (n === 0) return "no_detection";
  if (n >= QUALITY_N.high) return "high";
  if (n >= QUALITY_N.medium) return "medium";
  if (n >= QUALITY_N.low) return "low";
  return "very_low";
}

export type PondRecords = {
  stockingCount: number;
  daysSinceStocking: number;
  /** Farmer-logged losses. 0 means none logged, so the fallback applies. */
  loggedMortality: number;
};

/** biomass_estimator.py:65-179 (BiomassEstimator.estimate, the stratified
 *  estimator, which is what main runs; lucky-frame is spec only). */
export function estimatePond(sample: Sample, pond: PondRecords): PondEstimate {
  const detected = sample.fishCount;
  const quality = qualityForN(sample.acceptedCount);

  // _population_estimate, lines 159-179.
  let population: number;
  let usedFallback = false;
  let mortalityFraction = 0;
  if (pond.loggedMortality > 0) {
    population = Math.max(0, pond.stockingCount - pond.loggedMortality);
  } else {
    usedFallback = true;
    const progress = Math.min(1, Math.max(0, pond.daysSinceStocking / DEFAULT_CYCLE_DAYS));
    mortalityFraction = FALLBACK_MORTALITY_RATE * progress;
    population = Math.max(0, Math.trunc(pond.stockingCount * (1 - mortalityFraction)));
  }

  const base = { estimatedPopulation: population, sampleQuality: quality, usedFallbackMortality: usedFallback, mortalityFraction };
  if (detected === 0 || population <= 0) {
    return { ...base, estimatedTotalBiomassG: 0, confidenceLowerG: 0, confidenceUpperG: 0 };
  }

  const total = sample.averageWeightG * population;
  let ciHalf: number;
  if (sample.averageLengthCm > 0 && detected > 1) {
    // relative_se = 3 * sd / (avg_l * sqrt(n)); the 3 is b ~ 3 in W = aL^b.
    const relativeSe = (3.0 * sample.lengthStddevCm) / sample.averageLengthCm / Math.sqrt(detected);
    ciHalf = 1.96 * total * relativeSe;
  } else {
    ciHalf = total * 0.3; // broad fallback, line 136
  }
  if (quality === "very_low") ciHalf *= 1.5; // line 140

  return {
    ...base,
    estimatedTotalBiomassG: pyRound(total, 1),
    confidenceLowerG: pyRound(Math.max(0, total - ciHalf), 1),
    confidenceUpperG: pyRound(total + ciHalf, 1),
  };
}

// ---------------------------------------------------------------- feeding

export type FeedingContext = {
  biomassG: number;
  avgLengthCm: number;
  fishCount: number;
  /** null = no sensor reading, the engine assumes optimal. */
  waterTempC: number | null;
  hour: number;
  /** null = no feed yet today. */
  minutesSinceLastFeed: number | null;
  lastFeedResponse: FeedingResponse;
};

export type FeedGuard = "none" | "no_fish" | "interval" | "temperature" | "hours";

export type FeedingDecision = {
  recommendedFeedG: number;
  shouldFeedNow: boolean;
  /** The engine's own reason string. */
  reason: string;
  guard: FeedGuard;
  baseRate: number;
  tempMultiplier: number;
  timeMultiplier: number;
  responseMultiplier: number;
  nextFeedWindow: string | null;
  feedsPerDay: number;
};

/** feeding_service.py:256-264. */
export function sizeBasedRate(p: FeedingProfile, avgLengthCm: number): number {
  if (avgLengthCm < 6) return p.fingerlingRate;
  if (avgLengthCm < 12) return p.juvenileRate;
  if (avgLengthCm < 20) return p.growoutRate;
  return p.marketRate;
}

/** feeding_service.py:266-295. */
export function temperatureMultiplier(p: FeedingProfile, t: number | null): number {
  if (t === null) return 1.0;
  if (t < p.tempMinFeeding || t > p.tempMaxFeeding) return 0.0;
  if (t < p.tempOptimalLow) {
    return 0.3 + 0.7 * ((t - p.tempMinFeeding) / (p.tempOptimalLow - p.tempMinFeeding));
  }
  if (t <= p.tempOptimalHigh) return 1.0;
  return 1.0 - 0.7 * ((t - p.tempOptimalHigh) / (p.tempMaxFeeding - p.tempOptimalHigh));
}

/** feeding_service.py:297-311. */
export function timeOfDayMultiplier(p: FeedingProfile, hour: number): number {
  if (hour < p.feedingHourStart || hour >= p.feedingHourEnd) return 0.0;
  if (p.feedingHourPeakStart <= hour && hour < p.feedingHourPeakEnd) return 1.0;
  return 0.5;
}

/** feeding_service.py:325-331. */
function nextFeedWindow(p: FeedingProfile, hour: number): string {
  if (hour < p.feedingHourPeakStart) return `${pad2(p.feedingHourPeakStart)}:00-${pad2(p.feedingHourPeakStart + 1)}:00`;
  if (hour < p.feedingHourPeakEnd) return `${pad2(hour + 1)}:00-${pad2(hour + 2)}:00`;
  return `tomorrow ${pad2(p.feedingHourPeakStart)}:00`;
}

/** feeding_service.py:164-252 (PrecisionFeedingEngine.calculate_feed). */
export function calculateFeed(p: FeedingProfile, ctx: FeedingContext): FeedingDecision {
  const feedsPerDay = p.feedsPerDay;
  if (ctx.biomassG <= 0 || ctx.fishCount <= 0) {
    return {
      recommendedFeedG: 0,
      shouldFeedNow: false,
      reason: "no fish detected in this frame",
      guard: "no_fish",
      baseRate: 0,
      tempMultiplier: 0,
      timeMultiplier: 0,
      responseMultiplier: 0,
      nextFeedWindow: null,
      feedsPerDay,
    };
  }
  const baseRate = sizeBasedRate(p, ctx.avgLengthCm);
  const tempMultiplier = temperatureMultiplier(p, ctx.waterTempC);
  const timeMultiplier = timeOfDayMultiplier(p, ctx.hour);
  const responseMultiplier = RESPONSE_MULTIPLIER[ctx.lastFeedResponse];
  const mults = { baseRate, tempMultiplier, timeMultiplier, responseMultiplier, feedsPerDay };

  if (ctx.minutesSinceLastFeed !== null && ctx.minutesSinceLastFeed < p.minHoursBetweenFeeds * 60) {
    return {
      ...mults,
      recommendedFeedG: 0,
      shouldFeedNow: false,
      reason: `only ${ctx.minutesSinceLastFeed} min since last feed; minimum interval is ${pyFloat(p.minHoursBetweenFeeds)}h`,
      guard: "interval",
      nextFeedWindow: nextFeedWindow(p, ctx.hour),
    };
  }
  if (tempMultiplier === 0 && ctx.waterTempC !== null) {
    return {
      ...mults,
      recommendedFeedG: 0,
      shouldFeedNow: false,
      reason: `water temp ${pyFloat(ctx.waterTempC)}°C outside feeding range [${pyFloat(p.tempMinFeeding)}-${pyFloat(p.tempMaxFeeding)}°C]`,
      guard: "temperature",
      nextFeedWindow: null,
    };
  }
  if (timeMultiplier === 0) {
    return {
      ...mults,
      recommendedFeedG: 0,
      shouldFeedNow: false,
      reason: `outside feeding hours (${pad2(p.feedingHourStart)}:00-${pad2(p.feedingHourEnd)}:00)`,
      guard: "hours",
      nextFeedWindow: nextFeedWindow(p, ctx.hour),
    };
  }

  const dailyRationG = ctx.biomassG * baseRate * tempMultiplier * responseMultiplier;
  const perFeedG = (dailyRationG / feedsPerDay) * timeMultiplier;
  return {
    ...mults,
    recommendedFeedG: pyRound(perFeedG, 1),
    shouldFeedNow: true,
    reason: "precision feed calculation",
    guard: "none",
    nextFeedWindow: null,
  };
}

// --------------------------------------------------------------- pipeline

export type PipelineInput = PondRecords & {
  species: SpeciesId;
  bboxes: readonly BBox[];
  hour: number;
  waterTempC: number | null;
  minutesSinceLastFeed: number | null;
  lastFeedResponse: FeedingResponse;
};

/** core/system_pipeline.py:111-165 (analyze_frame), one cycle. BiomassHistory
 *  with a single value returns that value (biomass_history.py:14-22). */
export function runPipeline(input: PipelineInput) {
  const species = SPECIES[input.species];
  const sample = estimateBiomass(input.bboxes, species);
  const estimate = estimatePond(sample, input);
  const feed = calculateFeed(species.feeding, {
    biomassG: estimate.estimatedTotalBiomassG,
    avgLengthCm: sample.averageLengthCm,
    fishCount: estimate.estimatedPopulation,
    waterTempC: input.waterTempC,
    hour: input.hour,
    minutesSinceLastFeed: input.minutesSinceLastFeed,
    lastFeedResponse: input.lastFeedResponse,
  });
  return { sample, estimate, feed };
}

// ------------------------------------------------- simulated camera sample
// Not Iris code: this only invents the fish the camera "sees", so the real
// maths above has something to work on. Lengths are drawn from a normal
// distribution with a fixed seed; each becomes a detection box whose longer
// side is the length in pixels and whose shorter side is a third of it, the
// same shape the fixtures use (inside the gate's aspect range).

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function simulateSightings(meanCm: number, spreadCm: number, n: number, seed: number): BBox[] {
  const rand = mulberry32(seed);
  const out: BBox[] = [];
  for (let i = 0; i < n; i++) {
    const u = Math.max(rand(), 1e-12);
    const v = rand();
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    const lengthCm = Math.max(0.5, meanCm + z * spreadCm);
    const w = Math.round(lengthCm / CM_PER_PIXEL);
    const h = Math.max(1, Math.round(w / 3));
    out.push([i * 10, 0, i * 10 + w, h]);
  }
  return out;
}
