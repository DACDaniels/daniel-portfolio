"use client";

import { useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  CM_PER_PIXEL,
  DEFAULT_CYCLE_DAYS,
  FALLBACK_MORTALITY_RATE,
  QUALITY,
  SPECIES,
  calculateFeed,
  estimateBiomass,
  estimatePond,
  lengthToWeight,
  pixelLength,
  simulateSightings,
  type BBox,
  type FeedingResponse,
  type SampleQuality,
  type SpeciesId,
} from "@/lib/iris-sim/model";

/**
 * "See how Iris thinks": the Iris pipeline, stage by stage, on the formulas
 * ported from the Iris repo (src/lib/iris-sim/model.ts, checked against the
 * Python in npm run preflight). Results update live; nothing animates.
 */

const SPECIES_ORDER: SpeciesId[] = ["tilapia_nilotica", "clarias_gariepinus"];

const RESPONSES: { id: FeedingResponse; label: string }[] = [
  { id: "unknown", label: "Not reported" },
  { id: "consumed_fast", label: "Eaten in under 5 min" },
  { id: "consumed_normal", label: "Eaten in 5 to 15 min" },
  { id: "consumed_slow", label: "Eaten in 15 to 30 min" },
  { id: "leftover", label: "Left over after 30 min" },
];

const QUALITY_WORDS: Record<SampleQuality, string> = {
  high: "High: 20 or more fish accepted",
  medium: "Medium: 8 to 19 fish accepted",
  low: "Low: 3 to 7 fish accepted",
  very_low: "Very low: 1 or 2 fish accepted",
  no_detection: "No fish accepted",
};

function grams(g: number): string {
  if (g >= 1000) return `${(g / 1000).toLocaleString("en-GB", { maximumFractionDigits: 1, minimumFractionDigits: 1 })} kg`;
  return `${g.toLocaleString("en-GB", { maximumFractionDigits: 1 })} g`;
}

function fixed(n: number, d: number): string {
  return n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
}

function hourLabel(h: number): string {
  return `${String(h).padStart(2, "0")}:00`;
}

export function IrisSimulation() {
  const [speciesId, setSpeciesId] = useState<SpeciesId>("tilapia_nilotica");
  const [lengthCm, setLengthCm] = useState(15);
  const [stocked, setStocked] = useState(1000);
  const [days, setDays] = useState(60);
  const [sighted, setSighted] = useState(12);
  const [spread, setSpread] = useState(1.5);
  const [seed, setSeed] = useState(7);
  const [temp, setTemp] = useState(28);
  const [noSensor, setNoSensor] = useState(false);
  const [hour, setHour] = useState(10);
  const [fedEarlier, setFedEarlier] = useState(false);
  const [minutesSince, setMinutesSince] = useState(240);
  const [response, setResponse] = useState<FeedingResponse>("unknown");

  const species = SPECIES[speciesId];
  const profile = species.feeding;

  // Stage 2 and 3: one fish. Its box is the shape the camera returns.
  const fishPx = Math.round(lengthCm / CM_PER_PIXEL);
  const fishBox: BBox = [0, 0, fishPx, Math.max(1, Math.round(fishPx / 3))];
  const measuredPx = pixelLength(fishBox);
  const measuredCm = measuredPx * CM_PER_PIXEL;
  const fishWeight = lengthToWeight(measuredCm, species.a, species.b);

  // Stage 4: a simulated sample around that length, then the real estimator.
  const sightings = useMemo(() => simulateSightings(lengthCm, spread, sighted, seed), [lengthCm, spread, sighted, seed]);
  const sample = useMemo(() => estimateBiomass(sightings, species), [sightings, species]);
  const pond = useMemo(
    () => estimatePond(sample, { stockingCount: stocked, daysSinceStocking: days, loggedMortality: 0 }),
    [sample, stocked, days],
  );

  // Stage 5: the feeding engine on that estimate.
  const feed = calculateFeed(profile, {
    biomassG: pond.estimatedTotalBiomassG,
    avgLengthCm: sample.averageLengthCm,
    fishCount: pond.estimatedPopulation,
    waterTempC: noSensor ? null : temp,
    hour,
    minutesSinceLastFeed: fedEarlier ? minutesSince : null,
    lastFeedResponse: response,
  });

  const setAside = sample.fishCount - sample.acceptedCount;

  return (
    <div data-iris-sim className="rounded-[16px] border border-white/[0.08] bg-bg-surface shadow-[0_24px_48px_-24px_rgba(0,229,192,0.18)]">
      <p className="border-b border-white/[0.06] px-5 py-4 text-[14px] leading-[1.6] text-white md:px-7">
        Simulation using the same formulas as the Iris software. Not field measurements.
      </p>

      <ol className="divide-y divide-white/[0.06]">
        {/* 1. Species */}
        <Stage n={1} title="Species" lede="Iris carries length-weight and feeding settings for two of its target fish. Pick one.">
          <fieldset>
            <legend className="sr-only">Species</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SPECIES_ORDER.map((id) => {
                const s = SPECIES[id];
                const on = id === speciesId;
                return (
                  <label
                    key={id}
                    className={`flex min-h-11 cursor-pointer flex-col justify-center rounded-xl border px-4 py-3 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                      on ? "border-accent/60 bg-accent/[0.08]" : "border-white/15 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="iris-species"
                      value={id}
                      checked={on}
                      onChange={() => setSpeciesId(id)}
                      className="sr-only"
                    />
                    <span className="font-heading text-[15px] font-semibold text-white">{s.common}</span>
                    <span className="text-[13px] italic text-text-secondary">{s.latin}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <Result>
            <dl className="grid grid-cols-2 gap-3">
              <Figure term="a, the species constant" value={String(species.a)} />
              <Figure term="b, the growth exponent" value={String(species.b)} />
            </dl>
            <p className="mt-3 text-[13px] leading-[1.6] text-text-secondary">
              FishBase defaults. A pond can override them in its config file.
            </p>
          </Result>
        </Stage>

        {/* 2. Measure */}
        <Stage
          n={2}
          title="Measure"
          lede="The camera looks down on the pond and draws a box around each fish. Iris takes the longer side of the box in pixels and multiplies it by the calibration scale."
        >
          <Slider
            label="Fish length"
            min={QUALITY.minLengthCm}
            max={QUALITY.maxLengthCm}
            step={0.5}
            value={lengthCm}
            onChange={setLengthCm}
            display={`${fixed(lengthCm, 1)} cm`}
          />
          <p className="text-[13px] leading-[1.6] text-text-secondary">
            The slider covers 4 to 45 cm, the range the quality check accepts. The scale comes from a marker of known
            length: scale = real length ÷ length in pixels. The default pond setup uses {CM_PER_PIXEL} cm per pixel.
          </p>
          <Result>
            <OverheadFish lengthCm={measuredCm} px={measuredPx} />
            <p className="mt-3 font-mono text-[13px] text-white">
              {measuredPx} px × {CM_PER_PIXEL} cm = <output>{fixed(measuredCm, 1)} cm</output>
            </p>
          </Result>
        </Stage>

        {/* 3. Weigh */}
        <Stage n={3} title="Weigh" lede={
            <>
              Weight comes from length with the fisheries length-weight formula, W = a × L<sup>b</sup>.
            </>
          }>
          <Result>
            <p className="font-mono text-[13px] text-text-secondary">
              {species.a} × {fixed(measuredCm, 1)}
              <sup>{species.b}</sup>
            </p>
            <p className="mt-1 font-heading text-[clamp(2rem,6vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-white">
              <output>{fixed(fishWeight, 1)} g</output>
            </p>
            <p className="mt-3 text-[13px] leading-[1.6] text-text-secondary">One {species.common} at this length.</p>
          </Result>
        </Stage>

        {/* 4. Pond biomass */}
        <Stage
          n={4}
          title="Pond biomass"
          lede="The camera sees a sample, not the pond. Iris takes the average weight of the fish it accepts and multiplies it by how many fish should be in the pond: the number stocked, less expected losses."
        >
          <NumberField label="Fish stocked" value={stocked} min={1} max={100000} onChange={setStocked} />
          <Slider label="Days since stocking" min={0} max={240} step={1} value={days} onChange={setDays} display={`${days} days`} />
          <Slider label="Fish the camera sees" min={1} max={40} step={1} value={sighted} onChange={setSighted} display={String(sighted)} />
          <Slider
            label="Spread of sizes"
            min={0}
            max={6}
            step={0.1}
            value={spread}
            onChange={setSpread}
            display={`± ${fixed(spread, 1)} cm`}
          />
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="inline-flex min-h-11 items-center justify-center self-start rounded-full border border-white/20 px-5 text-[14px] font-medium text-white transition-colors duration-200 hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:border-accent"
          >
            Draw a new sample
          </button>
          <Result>
            <SampleStrip sightings={sightings} />
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <Figure term="Accepted" value={`${sample.acceptedCount} of ${sample.fishCount}`} />
              <Figure term="Set aside, outside 4 to 45 cm" value={String(setAside)} />
              <Figure term="Average length" value={`${fixed(sample.averageLengthCm, 1)} cm`} />
              <Figure term="Average weight" value={grams(sample.averageWeightG)} />
              <Figure term="Fish in the pond" value={pond.estimatedPopulation.toLocaleString("en-GB")} />
              <Figure term="Sample quality" value={QUALITY_WORDS[pond.sampleQuality].split(":")[0]} />
            </dl>
            <p className="mt-2 text-[13px] leading-[1.6] text-text-secondary">
              With no losses logged, Iris assumes {FALLBACK_MORTALITY_RATE * 100}% over a {DEFAULT_CYCLE_DAYS}-day cycle,
              in proportion to the days so far: {fixed(pond.mortalityFraction * 100, 1)}% here.
            </p>
            <BiomassRange
              estimate={pond.estimatedTotalBiomassG}
              lower={pond.confidenceLowerG}
              upper={pond.confidenceUpperG}
            />
            <p className="mt-3 text-[13px] leading-[1.6] text-text-secondary">
              The range is 1.96 standard errors either side. It widens with the spread of lengths and narrows as more
              fish are seen. With one or two fish accepted it is widened by half again.
            </p>
          </Result>
        </Stage>

        {/* 5. Feed */}
        <Stage
          n={5}
          title="Feed"
          lede="The feeding engine turns the biomass into a dose. These are the only inputs it takes besides the biomass and the average length."
        >
          <Slider
            label="Water temperature"
            min={14}
            max={37}
            step={0.5}
            value={temp}
            onChange={setTemp}
            display={noSensor ? "No reading" : `${fixed(temp, 1)} °C`}
            disabled={noSensor}
          />
          <Check label="No temperature reading (Iris then assumes the water is fine)" checked={noSensor} onChange={setNoSensor} />
          <Slider label="Time of day" min={0} max={23} step={1} value={hour} onChange={setHour} display={hourLabel(hour)} />
          <Check label="Already fed today" checked={fedEarlier} onChange={setFedEarlier} />
          {fedEarlier && (
            <Slider
              label="Minutes since the last feed"
              min={0}
              max={600}
              step={15}
              value={minutesSince}
              onChange={setMinutesSince}
              display={`${minutesSince} min`}
            />
          )}
          <fieldset>
            <legend className="mb-2 text-[14px] font-medium text-white">How the last feed was eaten</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {RESPONSES.map((r) => {
                const on = r.id === response;
                return (
                  <label
                    key={r.id}
                    className={`flex min-h-11 cursor-pointer items-center rounded-xl border px-4 text-[14px] transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                      on ? "border-accent/60 bg-accent/[0.08] text-white" : "border-white/15 text-text-secondary hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="iris-response"
                      value={r.id}
                      checked={on}
                      onChange={() => setResponse(r.id)}
                      className="sr-only"
                    />
                    {r.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <Result>
            <div aria-live="polite">
              {feed.shouldFeedNow ? (
                <>
                  <p className="text-[13px] text-text-secondary">Feed now</p>
                  <p className="mt-1 font-heading text-[clamp(2rem,6vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-white">
                    <output>{grams(feed.recommendedFeedG)}</output>
                  </p>
                  <p className="mt-2 text-[14px] text-text-secondary">
                    per feed, {profile.feedsPerDay} feeds a day for {species.common}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[13px] text-text-secondary">Hold</p>
                  <p className="mt-1 font-heading text-[clamp(1.5rem,5vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
                    {holdText(feed.guard, profile)}
                  </p>
                  {feed.nextFeedWindow && (
                    <p className="mt-2 text-[14px] text-text-secondary">Next window: {feed.nextFeedWindow}</p>
                  )}
                </>
              )}
            </div>
            <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              <Multiplier
                name="base_rate"
                value={`${fixed(feed.baseRate * 100, 1)}%`}
                meaning="Share of body weight to feed a day, by size: under 6 cm, 6 to 12, 12 to 20, over 20."
              />
              <Multiplier
                name="temp_multiplier"
                value={fixed(feed.tempMultiplier, 2)}
                meaning={`Appetite at this water temperature. Full from ${profile.tempOptimalLow} to ${profile.tempOptimalHigh} °C, none below ${profile.tempMinFeeding} or above ${profile.tempMaxFeeding}.`}
              />
              <Multiplier
                name="time_multiplier"
                value={fixed(feed.timeMultiplier, 2)}
                meaning={`Full in peak hours (${hourLabel(profile.feedingHourPeakStart)} to ${hourLabel(profile.feedingHourPeakEnd)}), half either side, none outside ${hourLabel(profile.feedingHourStart)} to ${hourLabel(profile.feedingHourEnd)}.`}
              />
              <Multiplier
                name="response_multiplier"
                value={fixed(feed.responseMultiplier, 2)}
                meaning="More after a fast clear-up, less after a slow one or leftovers."
              />
            </dl>
            <p className="mt-3 font-mono text-[12px] leading-[1.7] text-text-secondary">
              biomass × base_rate × temp_multiplier × response_multiplier ÷ feeds_per_day × time_multiplier
            </p>
            <p className="mt-1 font-mono text-[12px] leading-[1.7] text-text-tertiary">Engine: {feed.reason}</p>
          </Result>
        </Stage>
      </ol>

      <p className="border-t border-white/[0.06] px-5 py-4 text-[13px] leading-[1.6] text-text-secondary md:px-7">
        Not simulated: keypoint length, automatic calibration and lucky-frame sampling. They are specified in the Iris
        repo and not yet in its running code.
      </p>
    </div>
  );
}

function holdText(guard: string, p: (typeof SPECIES)[SpeciesId]["feeding"]): string {
  switch (guard) {
    case "interval":
      return `The last feed was under ${p.minHoursBetweenFeeds} hours ago.`;
    case "temperature":
      return `Water is outside the feeding range, ${p.tempMinFeeding} to ${p.tempMaxFeeding} °C.`;
    case "hours":
      return `Outside feeding hours, ${hourLabel(p.feedingHourStart)} to ${hourLabel(p.feedingHourEnd)}.`;
    default:
      return "No fish in the sample.";
  }
}

// ------------------------------------------------------------------ parts

function Stage({ n, title, lede, children }: { n: number; title: string; lede: ReactNode; children: ReactNode }) {
  const items = Array.isArray(children) ? children : [children];
  const result = items.find((c) => isResult(c));
  const controls = items.filter((c) => !isResult(c));
  return (
    <li className="grid grid-cols-1 gap-5 px-5 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:px-7 md:py-8">
      <div className="flex min-w-0 flex-col gap-4">
        <div>
          <p className="font-mono text-[12px] text-accent">Stage {n}</p>
          <h3 className="mt-1 font-heading text-[20px] font-semibold leading-tight tracking-[-0.02em] text-white">{title}</h3>
          <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary">{lede}</p>
        </div>
        {controls}
      </div>
      {result}
    </li>
  );
}

function Result({ children }: { children: ReactNode }) {
  return <div className="min-w-0 rounded-xl border border-white/[0.06] bg-bg-elevated p-4 md:p-5">{children}</div>;
}
Result.displayName = "IrisResult";

function isResult(node: ReactNode): boolean {
  return typeof node === "object" && node !== null && "type" in node && node.type === Result;
}

function Figure({ term, value }: { term: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] leading-[1.5] text-text-secondary">{term}</dt>
      <dd className="mt-0.5 font-heading text-[17px] font-semibold text-white">{value}</dd>
    </div>
  );
}

function Multiplier({ name, value, meaning }: { name: string; value: string; meaning: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 py-3">
      <dt className="font-mono text-[12px] text-accent">{name}</dt>
      <dd className="row-span-2 self-center font-heading text-[17px] font-semibold text-white">{value}</dd>
      <dd className="mt-1 text-[13px] leading-[1.55] text-text-secondary">{meaning}</dd>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  display,
  disabled = false,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  display: string;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className={disabled ? "opacity-50" : undefined}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-medium text-white">
          {label}
        </label>
        <span className="font-mono text-[13px] text-accent" aria-hidden>
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${((value - min) / (max - min)) * 100}%` } as CSSProperties}
        className="iris-range mt-1 h-11 w-full cursor-pointer disabled:cursor-not-allowed"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={50}
        value={value}
        onChange={(e) => {
          const v = Math.round(Number(e.target.value));
          if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
        className="mt-2 block h-11 w-full max-w-[220px] rounded-xl border border-white/15 bg-bg-elevated px-4 font-mono text-[15px] text-white transition-colors duration-200 hover:border-white/30 focus-visible:border-accent focus-visible:outline-none"
      />
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[14px] text-text-secondary">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-[#00E5C0]"
      />
      {label}
    </label>
  );
}

// ---------------------------------------------------------------- visuals

/** An overhead fish, drawn to scale against the 45 cm upper limit, inside
 *  its detection box. The box is a third as tall as it is long, like the
 *  boxes the simulation feeds the code. */
function OverheadFish({ lengthCm, px }: { lengthCm: number; px: number }) {
  const W = 360;
  const pad = 12;
  const w = Math.max(24, (lengthCm / QUALITY.maxLengthCm) * (W - 2 * pad));
  const h = w / 3;
  const H = (W - 2 * pad) / 3 + 2 * pad + 22;
  const x = pad;
  const y = pad + ((W - 2 * pad) / 3 - h) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Overhead view of a ${fixed(lengthCm, 1)} cm fish inside its detection box, ${px} pixels long`}>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#00E5C0" strokeWidth={1.5} strokeDasharray="5 4" />
      <g transform={`translate(${x + w * 0.02} ${y + h * 0.06}) scale(${w * 0.96} ${h * 0.88})`}>
        <path
          d="M1,0.5 C0.95,0.2 0.72,0.06 0.46,0.1 C0.33,0.12 0.25,0.3 0.2,0.4 L0.02,0.1 C0.07,0.35 0.07,0.65 0.02,0.9 L0.2,0.6 C0.25,0.7 0.33,0.88 0.46,0.9 C0.72,0.94 0.95,0.8 1,0.5 Z"
          fill="rgba(255,255,255,0.14)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
        />
        <path d="M0.7,0.32 C0.64,0.12 0.58,0.08 0.55,0.12 M0.7,0.68 C0.64,0.88 0.58,0.92 0.55,0.88" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </g>
      <line x1={x} x2={x + w} y1={y + h + 12} y2={y + h + 12} stroke="#00E5C0" strokeWidth={1} />
      <line x1={x} x2={x} y1={y + h + 8} y2={y + h + 16} stroke="#00E5C0" strokeWidth={1} />
      <line x1={x + w} x2={x + w} y1={y + h + 8} y2={y + h + 16} stroke="#00E5C0" strokeWidth={1} />
      <text x={x + w / 2} y={y + h + 28} textAnchor="middle" className="fill-white/75 font-mono text-[13px]">
        longer side {px} px
      </text>
    </svg>
  );
}

/** Each sighted fish on a length axis. Dim dots fall outside 4 to 45 cm and
 *  are set aside by the quality check. */
function SampleStrip({ sightings }: { sightings: readonly BBox[] }) {
  const W = 360;
  const H = 78;
  const max = 50;
  const sx = (cm: number) => 10 + (Math.min(cm, max) / max) * (W - 20);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Lengths of the fish the camera saw, on a scale from 0 to 50 cm">
      <rect x={sx(QUALITY.minLengthCm)} y={6} width={sx(QUALITY.maxLengthCm) - sx(QUALITY.minLengthCm)} height={44} fill="rgba(0,229,192,0.06)" />
      <line x1={10} x2={W - 10} y1={50} y2={50} stroke="rgba(255,255,255,0.25)" />
      {[0, 10, 20, 30, 40, 50].map((t) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={50} y2={54} stroke="rgba(255,255,255,0.35)" />
          <text x={sx(t)} y={70} textAnchor="middle" className="fill-white/70 font-mono text-[13px]">
            {t}
          </text>
        </g>
      ))}
      {sightings.map((b, i) => {
        const cm = pixelLength(b) * CM_PER_PIXEL;
        const ok = cm >= QUALITY.minLengthCm && cm <= QUALITY.maxLengthCm;
        return <circle key={i} cx={sx(cm)} cy={14 + (i % 6) * 6} r={3} fill={ok ? "#00E5C0" : "rgba(255,255,255,0.3)"} />;
      })}
    </svg>
  );
}

function BiomassRange({ estimate, lower, upper }: { estimate: number; lower: number; upper: number }) {
  const max = Math.max(upper * 1.15, 1);
  const pct = (v: number) => `${(v / max) * 100}%`;
  return (
    <div className="mt-4">
      <p className="text-[12px] text-text-secondary">Fish in the pond, by weight</p>
      <p className="mt-0.5 font-heading text-[clamp(1.75rem,5vw,2.25rem)] font-semibold leading-none tracking-[-0.03em] text-white">
        <output>{grams(estimate)}</output>
      </p>
      <p className="mt-1 text-[13px] text-text-secondary">
        likely between {grams(lower)} and {grams(upper)}
      </p>
      <div aria-hidden className="relative mt-3 h-2 rounded-full bg-white/[0.06]">
        <div className="absolute inset-y-0 rounded-full bg-accent/35" style={{ left: pct(lower), width: `calc(${pct(upper)} - ${pct(lower)})` }} />
        <div className="absolute -top-1 h-4 w-0.5 bg-accent" style={{ left: pct(estimate) }} />
      </div>
    </div>
  );
}
