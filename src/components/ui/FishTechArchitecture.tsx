"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type Stage = {
  label: string;
  detail: string;
  glyph: "camera" | "chip" | "neural" | "detect" | "calibrate" | "biomass" | "engine" | "auger";
};

const STAGES: Stage[] = [
  { label: "Overhead camera", detail: "Sony IMX500", glyph: "camera" },
  { label: "Raspberry Pi 5", detail: "8 GB · edge host", glyph: "chip" },
  { label: "Hailo-8L NPU", detail: "13 TOPS · HEF", glyph: "neural" },
  { label: "YOLO-Pose", detail: "4 keypoints / fish", glyph: "detect" },
  { label: "ChArUco + ultrasonic", detail: "px → cm calibration", glyph: "calibrate" },
  { label: "Biomass · CI", detail: "stratified · ±σ", glyph: "biomass" },
  { label: "Feeding engine", detail: "7-multiplier dose", glyph: "engine" },
  { label: "Auger feeder", detail: "geared DC · dispense", glyph: "auger" },
];

export function FishTechArchitecture() {
  const reduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-surface p-6 md:p-8"
      style={{
        boxShadow:
          "0 24px 60px -28px rgba(0, 229, 192, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,192,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,192,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        variants={itemVariants}
        className="relative mb-5 flex items-center justify-between"
      >
        <div
          className="text-accent"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {"// closed-loop · pipeline"}
        </div>
        <div
          className="text-white/60"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
          }}
        >
          camera → dose · runs on-device
        </div>
      </motion.div>

      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.label}
            variants={itemVariants}
            className="relative flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-bg-elevated/80 p-3.5"
          >
            <span
              className="text-white/55"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "9.5px",
                letterSpacing: "0.18em",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Glyph kind={stage.glyph} />
            <div
              className="text-white"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {stage.label}
            </div>
            <div
              className="text-white/60"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "10px",
                letterSpacing: "0.02em",
              }}
            >
              {stage.detail}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="relative mt-5 flex items-center gap-3"
      >
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />
        <span
          className="text-white/60"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          loop closes · next cycle
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}

function Glyph({ kind }: { kind: Stage["glyph"] }) {
  const common = "h-7 w-7 text-accent";
  if (kind === "camera") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <circle cx="12" cy="12.5" r="3.5" />
        <circle cx="12" cy="12.5" r="1" fill="currentColor" />
        <path d="M8 6 V4 H16 V6" />
      </svg>
    );
  }
  if (kind === "chip") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9.5" y="9.5" width="5" height="5" fill="currentColor" opacity="0.25" />
        <path d="M9 3 V6 M12 3 V6 M15 3 V6 M9 18 V21 M12 18 V21 M15 18 V21 M3 9 H6 M3 12 H6 M3 15 H6 M18 9 H21 M18 12 H21 M18 15 H21" />
      </svg>
    );
  }
  if (kind === "neural") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5" cy="6" r="1.6" fill="currentColor" />
        <circle cx="5" cy="12" r="1.6" fill="currentColor" />
        <circle cx="5" cy="18" r="1.6" fill="currentColor" />
        <circle cx="12" cy="9" r="1.6" fill="currentColor" />
        <circle cx="12" cy="15" r="1.6" fill="currentColor" />
        <circle cx="19" cy="12" r="1.6" fill="currentColor" />
        <path d="M6.4 6 L 10.6 9 M6.4 12 L 10.6 9 M6.4 12 L 10.6 15 M6.4 18 L 10.6 15 M13.4 9 L 17.6 12 M13.4 15 L 17.6 12" opacity="0.6" />
      </svg>
    );
  }
  if (kind === "detect") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="7" width="16" height="10" rx="1" strokeDasharray="2 1.5" />
        <circle cx="7" cy="13" r="1" fill="currentColor" />
        <circle cx="11" cy="11" r="1" fill="currentColor" />
        <circle cx="15" cy="13" r="1" fill="currentColor" />
        <circle cx="18" cy="12" r="1" fill="currentColor" />
        <path d="M7 13 L 11 11 L 15 13 L 18 12" opacity="0.6" />
      </svg>
    );
  }
  if (kind === "calibrate") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="7" height="7" />
        <rect x="4" y="4" width="3.5" height="3.5" fill="currentColor" />
        <rect x="7.5" y="7.5" width="3.5" height="3.5" fill="currentColor" />
        <path d="M14 6 V18 M11 18 H17" />
        <path d="M13 18 L 17 22" strokeDasharray="2 1.5" />
      </svg>
    );
  }
  if (kind === "biomass") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 19 H21" />
        <rect x="5" y="13" width="3" height="6" fill="currentColor" opacity="0.15" />
        <rect x="10" y="9" width="3" height="10" fill="currentColor" opacity="0.3" />
        <rect x="15" y="11" width="3" height="8" fill="currentColor" opacity="0.2" />
        <path d="M5 12 H8 M10 8 H13 M15 10 H18" />
        <path d="M5 14 V11 M8 14 V11 M10 10 V7 M13 10 V7 M15 12 V9 M18 12 V9" strokeDasharray="1.5 1.2" />
      </svg>
    );
  }
  if (kind === "engine") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 5 V3 M12 21 V19 M5 12 H3 M21 12 H19 M7 7 L 5.5 5.5 M16.5 16.5 L 18.5 18.5 M16.5 7 L 18.5 5.5 M5.5 18.5 L 7 17" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 4 L 5 20 L 13 20 L 18 14 L 18 4 Z" />
      <path d="M5 8 L 18 8 M5 12 L 18 12 M5 16 L 18 16" opacity="0.5" />
      <circle cx="18.5" cy="20" r="1.6" fill="currentColor" />
    </svg>
  );
}
