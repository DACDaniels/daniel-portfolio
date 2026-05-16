"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { CaseSectionProgress } from "@/components/ui/CaseSectionProgress";
import { FishTechApparatus } from "@/components/ui/FishTechApparatus";
import { FishTechArchitecture } from "@/components/ui/FishTechArchitecture";
import { FishTechSmartFeedMock } from "@/components/ui/project-mocks/FishTechSmartFeedMock";
import { useScrollReveal } from "@/lib/useScrollReveal";

const PROGRESS_ITEMS = [
  { id: "problem", label: "Problem" },
  { id: "build", label: "The build" },
  { id: "pipeline", label: "Closed loop" },
  { id: "innovations", label: "Innovations" },
  { id: "stack", label: "Stack" },
  { id: "state", label: "Current state" },
  { id: "next", label: "What's next" },
];

type Innovation = {
  label: string;
  title: string;
  body: string;
};

const INNOVATIONS: Innovation[] = [
  {
    label: "01",
    title: "Stratified biomass with confidence intervals",
    body: "The camera sees a sample of the pond, not the whole pond. We estimate average per-fish weight from what we see and multiply by what the farmer records: stocking minus mortality. The result is reported with a 1.96 sigma confidence interval, shown explicitly on the dashboard. Honest scientific methodology in a domain where most systems hide their uncertainty.",
  },
  {
    label: "02",
    title: "Multi-multiplier precision feeding engine",
    body: "Feed equals biomass times size-tier rate times temperature multiplier times time-of-day multiplier times prior-response multiplier, divided by feeds per day. Every multiplier is grounded in published aquaculture biology, with hard guards for temperature window, feeding hours, and minimum inter-feed interval. Configurable per pond, per species, in YAML.",
  },
  {
    label: "03",
    title: "Hailo-accelerated keypoint vision",
    body: "Moving from bounding-box detection to YOLO-Pose keypoint detection compiled to Hailo HEF format. Snout, dorsal origin, peduncle, and tail-tip keypoints give true geodesic length measurement that beats the bounding-box approach on angled fish. This is the architectural upgrade that unlocks serious length and biomass accuracy.",
  },
  {
    label: "04",
    title: "Automatic per-frame calibration",
    body: "A floating ChArUco fiducial plus an ultrasonic depth sensor gives self-correcting pixel-to-centimetre calibration on every frame. The system is plug-and-play across ponds of any depth. No manual recalibration on installation.",
  },
  {
    label: "05",
    title: "Integrated automated auger feeder",
    body: "The precision engine emits a dose in grams. A geared DC motor and motor driver rotate a 3D-printed auger to dispense it. The decision flows directly into mechanical actuation. Each feed event is a visible, quantified moment on the OLED, the LED ring, and the pond surface.",
  },
  {
    label: "06",
    title: "Edge-only, sovereign-by-design",
    body: "Every farm runs its own Pi at the pond edge. SQLite on the microSD card is the source of truth. The dashboard is served by the Pi's own Wi-Fi hotspot, accessible by QR scan from any phone on the farm. No cloud, no recurring bills, no farmer data leaving Zimbabwe. Aligned with the National AI Strategy's data sovereignty pillar.",
  },
];

type StackGroup = {
  label: string;
  items: string[];
};

const STACK_GROUPS: StackGroup[] = [
  {
    label: "Vision and Edge Compute",
    items: [
      "Python 3.11 · Ultralytics YOLOv8 (custom-trained)",
      "OpenCV with ArUco / ChArUco modules",
      "Migration in flight to YOLO-Pose on Hailo-8L (HEF compile)",
      "Raspberry Pi 5 (8GB) · Raspberry Pi AI Camera (Sony IMX500)",
      "Raspberry Pi AI Kit (Hailo-8L, 13 TOPS on M.2 HAT+)",
      "JSN-SR04T ultrasonic · MPU6050 IMU · DS18B20 temperature",
    ],
  },
  {
    label: "Backend, Persistence, Actuation",
    items: [
      "Flask + flask-cors (FastAPI migration on the roadmap)",
      "SQLite with WAL mode, five-table per-pond schema",
      "PyYAML config layer (one YAML per deployment)",
      "N20 12V geared DC motor · L298N motor driver",
      "3D-printed auger and hopper",
      "Powder-coated welded steel mast, IP66 ABS enclosure",
    ],
  },
  {
    label: "Dashboard",
    items: [
      "Vite · React 19 · TypeScript 5",
      "TanStack Router · TanStack Query (offline-first)",
      "Tailwind CSS v4 · shadcn/ui · Radix",
      "Motion · Recharts · React Hook Form + Zod",
      "PWA, served from the Pi's local Wi-Fi hotspot",
    ],
  },
];

const NEXT_BULLETS = [
  "YOLO-Pose keypoint detection, compiled to Hailo HEF",
  "Hailo-8L AI Kit integration on the Pi 5",
  "Automatic per-frame calibration via ChArUco plus ultrasonic",
  "Auger feeder mechanical assembly and dispense calibration",
  "Productised mast, IP66 enclosure, faceplate, and branded demo unit",
  "Pilot pond deployment, target 30-day live farm run",
  "FastAPI migration and a WebSocket live layer",
  "SMS bridge in Shona for feature-phone farmers",
];

export default function FishTechCaseStudyPage() {
  const reduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <>
      <Navbar />
      <CaseSectionProgress items={PROGRESS_ITEMS} />

      <main id="main" className="relative w-full bg-bg-primary pb-32 pt-28 md:pt-32">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 text-white/60 transition-colors duration-200 hover:text-accent"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "12px",
              lineHeight: 1.4,
            }}
          >
            ← Back to work
          </Link>
        </div>

        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:px-8 md:py-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="font-mono text-[11px] uppercase text-accent"
              style={{ letterSpacing: "0.15em" }}
            >
              {"// case-study · in active build"}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-3 flex flex-wrap items-center gap-3"
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC04D]/40 bg-[#FFC04D]/[0.08] text-[#FFC04D]"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  padding: "4px 10px",
                  lineHeight: 1.4,
                }}
              >
                <span
                  aria-hidden
                  className="block h-[5px] w-[5px] rounded-full bg-[#FFC04D]"
                  style={{
                    animation: reduceMotion
                      ? "none"
                      : "live-pulse 2s ease-in-out infinite",
                  }}
                />
                BUILDING
              </span>
              <span
                className="text-white/50"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                }}
              >
                Late-stage prototype · industrialising for pilot
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 font-heading font-bold text-white"
              style={{
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
              }}
            >
              FishTech Precision Feeding System
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-3xl text-white/60"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "18px",
                lineHeight: 1.55,
              }}
            >
              Precision feeding for African pond aquaculture. A closed loop
              that sees fish, decides the dose, and dispenses it.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-white/40"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
                lineHeight: 1.4,
              }}
            >
              <span>
                <span className="text-white/30">Role · </span>Founding engineer
              </span>
              <span aria-hidden className="text-white/20">
                ·
              </span>
              <span>
                <span className="text-white/30">Timeline · </span>Active build,
                pilot 2026
              </span>
              <span aria-hidden className="text-white/20">
                ·
              </span>
              <span>
                <span className="text-white/30">Status · </span>Late-stage
                prototype
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="aspect-video overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            <FishTechApparatus />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            {[
              { k: "Camera", v: "Sony IMX500" },
              { k: "Compute", v: "Pi 5 · Hailo-8L" },
              { k: "Vision", v: "YOLO-Pose" },
              { k: "Actuation", v: "Auger feeder" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-xl border border-white/[0.06] bg-bg-surface px-4 py-3"
              >
                <div
                  className="text-white/40"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.k}
                </div>
                <div
                  className="mt-1.5 text-white"
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <article className="mx-auto mt-24 w-full max-w-3xl space-y-16 px-6 md:px-8">
          <CaseSection
            id="problem"
            eyebrow="// section-01"
            title="Smallholders feed by guess."
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <p>
              Fish farming runs on a tight margin where feed is 60 to 70
              percent of operating cost. Zimbabwean smallholders, including
              the thousands of ponds in the Presidential Community Fisheries
              Scheme, feed their fish by guess. The result is overfeeding,
              which wastes feed and degrades water quality, and underfeeding,
              which slows growth. Norwegian salmon operations have precision
              feeding systems engineered for industrial cages at a cost
              African smallholders have no access to. The price tier that
              fits African pond aquaculture has, until now, had nothing in
              it.
            </p>
          </CaseSection>

          <CaseSection
            id="build"
            eyebrow="// section-02"
            title="A closed loop, not a monitoring tool."
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <p>
              FishTech Precision Feeding System is a closed-loop AI
              instrument. An overhead AI Camera, a Sony IMX500 with an
              on-sensor neural accelerator, streams the pond to a Raspberry
              Pi 5 with a Hailo NPU for accelerated vision inference. A
              custom-trained YOLO model, currently moving to a keypoint
              architecture for true geodesic length measurement, detects
              each fish. A floating ChArUco fiducial plus an ultrasonic
              depth sensor give per-frame auto-calibration, so the
              camera&apos;s pixel measurements convert to centimetres
              correctly at any installed height. A species-specific
              length-to-weight relationship from FishBase converts size to
              mass. The biomass estimator stratifies: the farmer owns the
              population count, the camera owns the average size, and the
              system reports the whole-pond biomass with an explicit
              confidence interval. From biomass, a precision feeding engine
              grounded in published tilapia, catfish, and carp biology
              returns a feed dose in grams, with hard guards for water
              temperature, feeding hours, and minimum inter-feed interval.
              When the engine emits a dose, the Pi drives a geared DC motor
              and motor driver, which rotates an auger to dispense the dose
              into the pond. The OLED display shows the number. The status
              LED ring goes green. The feed lands. The next analysis cycle
              reads the new state, and the loop closes.
            </p>
          </CaseSection>

          <CaseSection
            id="pipeline"
            eyebrow="// section-03"
            title="The closed loop, end to end."
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <motion.p variants={itemVariants}>
              Eight stages, one device. Detection runs on the Hailo
              accelerator. Calibration runs every frame against a floating
              ChArUco fiducial and an ultrasonic depth reading. Biomass and
              dose are computed in Python on the Pi. The auger fires. The
              cycle repeats.
            </motion.p>
            <motion.div variants={itemVariants} className="pt-4">
              <FishTechArchitecture />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 pt-3 md:grid-cols-2"
            >
              <div className="aspect-video overflow-hidden rounded-xl border border-white/[0.06]">
                <FishTechSmartFeedMock />
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-xl border border-white/[0.06] bg-bg-surface px-5 py-5 md:px-6">
                <div
                  className="text-accent"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {"// what the camera sees"}
                </div>
                <p
                  className="text-white/65"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    lineHeight: 1.65,
                  }}
                >
                  YOLO-Pose returns four keypoints per fish: snout, dorsal
                  origin, peduncle, tail-tip. Length is the sum of geodesic
                  segments, not a bounding-box diagonal — orientation-
                  invariant and far more accurate for fish at an angle.
                  ChArUco + ultrasonic give the pixel-to-centimetre
                  conversion per frame, so the camera can sit at any depth.
                </p>
              </div>
            </motion.div>
          </CaseSection>

          <CaseSection
            id="innovations"
            eyebrow="// section-04"
            title="The innovations"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              {INNOVATIONS.map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-white/[0.06] bg-bg-surface p-4"
                >
                  <div
                    className="text-accent"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {card.label}
                  </div>
                  <div
                    className="font-heading font-semibold text-white"
                    style={{
                      fontSize: "16px",
                      letterSpacing: "-0.015em",
                      marginBottom: "8px",
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </div>
                  <p
                    className="text-white/55"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </motion.div>
          </CaseSection>

          <CaseSection
            id="stack"
            eyebrow="// section-05"
            title="The stack"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              {STACK_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="rounded-xl border border-white/[0.06] bg-bg-surface p-4"
                >
                  <div
                    className="text-accent"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    {group.label}
                  </div>
                  <ul
                    className="space-y-1.5 text-white/65"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      lineHeight: 1.55,
                    }}
                  >
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </CaseSection>

          <CaseSection
            id="state"
            eyebrow="// section-06"
            title="The system sees fish, decides the dose, and is being industrialised."
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <p>
              The end-to-end pipeline runs on a real Raspberry Pi 5 with the
              AI Camera today. Detection, length extraction, calibrated
              pixel-to-centimetre conversion, species-specific
              length-to-weight, stratified biomass with confidence intervals,
              and the multi-multiplier precision feeding engine are all live.
              The dashboard is wired to the live backend across Live, Pond,
              Growth, Mortality, and Settings routes. The persistence layer
              captures every analysis cycle, every feed event, and every
              mortality entry. The product engineering is locked: welded
              steel mast specifications, IP66 enclosure layout, status LED
              ring and OLED faceplate, branded demo plinth and acrylic tank.
              The Hailo accelerator, keypoint vision pipeline, automated
              auger, and field enclosure are in active build for pilot
              deployment in 2026.
            </p>
          </CaseSection>

          <CaseSection
            id="next"
            eyebrow="// section-07"
            title="What's next"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <motion.ul variants={itemVariants} className="space-y-3">
              {NEXT_BULLETS.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-white/70"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    lineHeight: 1.65,
                  }}
                >
                  <span
                    aria-hidden
                    className="flex-shrink-0 text-accent"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      lineHeight: 1.65,
                    }}
                  >
                    →
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </motion.ul>
          </CaseSection>

          <ClosingCTA reduceMotion={reduceMotion} />

          <RelatedSection containerVariants={containerVariants}>
            <motion.div
              variants={itemVariants}
              className="text-white/40"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Related
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              <a
                href="https://fishtech.co.zw"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.06] bg-bg-surface p-4 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent/30"
              >
                <div
                  className="text-accent"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Live site
                </div>
                <div
                  className="font-heading font-semibold text-white"
                  style={{ fontSize: "15px", letterSpacing: "-0.015em" }}
                >
                  FishTech Consultancy
                </div>
                <div
                  className="mt-1 text-white/50"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "11px",
                  }}
                >
                  fishtech.co.zw →
                </div>
              </a>
              <div className="rounded-xl border border-white/[0.06] bg-bg-surface p-4">
                <div
                  className="text-white/40"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Foundation
                </div>
                <div
                  className="font-heading font-semibold text-white"
                  style={{ fontSize: "15px", letterSpacing: "-0.015em" }}
                >
                  FishTech dissertation submission
                </div>
                <div
                  className="mt-1 text-white/50"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "11px",
                  }}
                >
                  NUST Zimbabwe · Nov 2025
                </div>
              </div>
            </motion.div>
          </RelatedSection>
        </article>
      </main>
    </>
  );
}

function CaseSection({
  id,
  eyebrow,
  title,
  children,
  itemVariants,
  containerVariants,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  itemVariants: Variants;
  containerVariants: Variants;
}) {
  const { ref, revealed } = useScrollReveal<HTMLElement>();
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="text-accent"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="font-heading font-semibold text-white"
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: "16px",
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="space-y-4 text-white/70"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "16px",
          lineHeight: 1.75,
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

function ClosingCTA({ reduceMotion }: { reduceMotion: boolean }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={
        reduceMotion
          ? undefined
          : revealed
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 24, filter: "blur(8px)" }
      }
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl border border-accent/25 bg-bg-surface p-7 md:p-10"
      style={{
        boxShadow:
          "0 24px 60px -28px rgba(0, 229, 192, 0.28), 0 0 0 1px rgba(0, 229, 192, 0.05) inset",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[280px] w-[280px] rounded-full bg-accent opacity-[0.18] blur-[100px]"
      />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <div>
          <div
            className="text-accent"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            {"// similar problem? let's talk"}
          </div>
          <h3
            className="font-heading font-semibold text-white"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            Have a CV-on-edge or IoT product you&apos;re trying to ship?
          </h3>
          <p
            className="mt-3 max-w-[52ch] text-white/60"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "15px",
              lineHeight: 1.65,
            }}
          >
            FishTech is the proof. The same playbook works for fleet
            telemetry, precision agriculture, retail inventory vision, and
            any other on-device AI instrument that has to survive without a
            cloud.
          </p>
        </div>
        <Link
          href="/#contact"
          className="group inline-flex items-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary shadow-[0_12px_32px_-10px_rgba(0,229,192,0.5)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-10px_rgba(0,229,192,0.75)]"
        >
          Start a conversation
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

function RelatedSection({
  children,
  containerVariants,
}: {
  children: ReactNode;
  containerVariants: Variants;
}) {
  const { ref, revealed } = useScrollReveal<HTMLElement>();
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      variants={containerVariants}
      className="pt-8"
    >
      {children}
    </motion.section>
  );
}
