"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const HIGHLIGHT_TERMS = [
  "FishTech Precision Feeding System",
  "FishTech Consultancy",
  "Steadyhands Catering",
  "ManageEngine ServiceDesk Plus",
  "SAP Business One",
  "Microsoft 365",
  "Raspberry Pi 5",
  "Hailo NPU",
  "Bata Club",
  "RedHat Linux",
  "Wi-Fi hotspot",
  "Checkpoint",
  "VMware",
  "SOPHOS",
  "RUCKUS",
  "CISCO",
  "RADIUS",
  "VLAN",
  "Paynow",
  "Ecocash",
  "OneMoney",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Vercel",
  "NUST",
  "Zimbabwe",
  "Harare",
];

const HIGHLIGHT_PATTERN = new RegExp(
  `(${[...HIGHLIGHT_TERMS]
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "g",
);

const HIGHLIGHT_SET = new Set(HIGHLIGHT_TERMS);

function highlightEntities(text: string): ReactNode {
  const parts = text.split(HIGHLIGHT_PATTERN);
  return parts.map((part, i) =>
    HIGHLIGHT_SET.has(part) ? (
      <span key={i} className="text-text-primary">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const BIO_STEADYHANDS =
  "I recently delivered Steadyhands Catering at Bata Club, an end-to-end production platform built on Next.js, TypeScript, and Node.js, with Paynow gateway integration for Ecocash, OneMoney, Visa and Mastercard, and a WhatsApp Business funnel for custom catering inquiries. It's live, transacting, and deployed on Vercel.";

const BIO_FISHTECH =
  "Right now I'm building FishTech Precision Feeding System for FishTech Consultancy. It's a closed-loop AI instrument for African pond aquaculture. An overhead AI Camera streams the pond to a Raspberry Pi 5 with a Hailo NPU, which detects fish with a custom-trained vision model, measures each one against an auto-calibrated reference, and estimates whole-pond biomass with an honest confidence interval. A precision feeding engine grounded in tilapia and catfish biology converts that into a feed dose in grams, and an integrated auger feeder dispenses it automatically. The whole loop runs locally on the device. No cloud, no farmer data leaving Zimbabwe, served to any phone on the farm through the Pi's own Wi-Fi hotspot. I'm the founding engineer, the CV and embedded and full-stack and product designer, and the CEO.";

const MARQUEE_ROW_1 = [
  "Python",
  "Computer Vision",
  "OpenCV",
  "YOLOv8",
  "PyTorch",
  "Ultralytics",
  "AI Engineering",
  "Edge AI",
];

const MARQUEE_ROW_2 = [
  "TypeScript",
  "React",
  "Next.js",
  "Vue 3",
  "Node.js",
  "Flask",
  "IoT",
  "Raspberry Pi",
  "Hailo",
  "Linux",
];

type TimelineEntry = {
  date: string;
  title: string;
  body: string | string[];
  active?: boolean;
  building?: boolean;
};

const TIMELINE: TimelineEntry[] = [
  {
    date: "2026 · NOW",
    title: "Final year BSc Computer Science, NUST",
    body: "Wrapping up the degree. Industrialising FishTech. Open to roles.",
    active: true,
  },
  {
    date: "2026 · BUILDING",
    title: "FishTech Precision Feeding System",
    body: "Closed-loop AI instrument for African pond aquaculture. Raspberry Pi 5 with Hailo NPU, custom-trained YOLO, automated auger feeder, integrated mast and enclosure. Pilot deployment 2026.",
    building: true,
  },
  {
    date: "2025",
    title: "Steadyhands Catering Platform",
    body: "Recently shipped full-stack platform for Bata Club, Harare. Next.js, TypeScript, Node.js, Paynow gateway, WhatsApp Business funnel. Live at steadyhandscatering.com.",
  },
  {
    date: "May 2024 to Jun 2025",
    title: "ZIMDEF · IT Industrial Attachment",
    body: [
      "Thirteen months inside a live enterprise data centre. Hands-on with VMware virtualisation, RedHat Linux at production scale, server management, and routine backup operations.",
      "Contributed to the SOPHOS to Checkpoint firewall migration. Worked on RUCKUS wireless, CISCO telephony, RADIUS authentication, and VLAN segmentation. Operated alongside SAP Business One, ManageEngine ServiceDesk Plus, and Microsoft 365 administration in an integrated, interdependent stack.",
    ],
  },
  {
    // "Smart Feed" is the historical proper-noun name of the Nov 2025
    // dissertation artefact, kept verbatim for accuracy. Not a violation
    // of the CLAUDE.md AVOID list, which applies to the current product.
    date: "Nov 2025",
    title: "FishTech Smart Feed (dissertation submission)",
    body: "Final-year research submission. The foundation work that evolved into the FishTech Precision Feeding System now in active development.",
  },
  {
    date: "2022",
    title: "Started serious coding",
    body: "First real systems beyond coursework. Python, web fundamentals, the long road to shipping.",
  },
];

export function About() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
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

  const underlineVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
          scaleX: 1,
          opacity: 1,
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-bg-primary py-20 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-accent opacity-[0.08] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-x-16">
          <div className="order-1 min-w-0 lg:order-none">
            <motion.div variants={itemVariants} className="mb-5 flex items-center gap-3">
              <span
                className="text-text-tertiary"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                About
              </span>
              <motion.span
                aria-hidden
                variants={underlineVariants}
                style={{ originX: 0 }}
                className="h-px w-10 bg-accent"
              />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-heading font-semibold text-text-primary"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
              }}
            >
              What I&apos;m working on right now.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-text-primary"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              I&apos;m a final-year Computer Science student at NUST, based
              in Harare, Zimbabwe. For the past two to three years I&apos;ve
              been building real systems for real users: full-stack
              platforms, computer vision pipelines, and now an edge-AI IoT
              product being industrialised for the African market.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-text-secondary"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              {highlightEntities(BIO_STEADYHANDS)}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-text-secondary"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              {highlightEntities(BIO_FISHTECH)}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <div
                className="mb-4 text-text-tertiary"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Currently
              </div>
              <ul
                className="space-y-2 text-text-secondary"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                <CurrentlyItem>
                  Wrapping up BSc Computer Science at NUST (2022 to 2026)
                </CurrentlyItem>
                <CurrentlyItem>
                  Open to remote engineering roles and select Zimbabwean
                  client work
                </CurrentlyItem>
                <CurrentlyItem>
                  Building FishTech Precision Feeding System, closed-loop
                  edge-AI for African aquaculture, piloting 2026
                </CurrentlyItem>
                <CurrentlyItem>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-text-secondary underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
                  >
                    Resume / CV
                    <span aria-hidden className="text-text-tertiary">
                      ·
                    </span>
                    <span
                      className="text-text-tertiary"
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      PDF ↗
                    </span>
                  </a>
                </CurrentlyItem>
              </ul>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="order-2 min-w-0 lg:order-none">
            <Timeline reduceMotion={reduceMotion} />
          </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 md:mt-20"
          >
            <div
              className="mb-5 flex items-center gap-3 text-text-tertiary"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <span>Stack</span>
              <span aria-hidden className="h-px w-10 bg-accent/40" />
            </div>
            <Marquee row={MARQUEE_ROW_1} direction="left" reduceMotion={reduceMotion} />
            <div className="mt-3">
              <Marquee row={MARQUEE_ROW_2} direction="right" reduceMotion={reduceMotion} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CurrentlyItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden className="mt-[0.45em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(0,229,192,0.6)]" />
      <span>{children}</span>
    </li>
  );
}

function Marquee({
  row,
  direction,
  reduceMotion,
}: {
  row: string[];
  direction: "left" | "right";
  reduceMotion: boolean;
}) {
  const duration = direction === "left" ? 32 : 36;
  const animationName =
    direction === "left" ? "about-marquee-left" : "about-marquee-right";

  const style: CSSProperties = reduceMotion
    ? {}
    : {
        animation: `${animationName} ${duration}s linear infinite`,
      };

  if (reduceMotion) {
    return (
      <div className="flex flex-wrap gap-2">
        {row.map((label) => (
          <Pill key={label} label={label} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="group/marquee relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-3 will-change-transform hover:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]"
        style={style}
      >
        {[...row, ...row].map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} aria-hidden={i >= row.length} />
        ))}
      </div>
    </div>
  );
}

function Pill({
  label,
  "aria-hidden": ariaHidden,
}: {
  label: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="inline-flex shrink-0 items-center rounded-full border border-border bg-bg-surface px-4 py-2 text-text-secondary transition-[color,border-color] duration-200 hover:border-accent/30 hover:text-accent"
      style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "14px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function Timeline({ reduceMotion }: { reduceMotion: boolean }) {
  const { ref: revealRef, revealed } = useScrollReveal<HTMLOListElement>();
  const entryVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  return (
    <motion.ol
      ref={revealRef}
      variants={listVariants}
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      className="relative"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-[5px] w-px bg-white/[0.06]"
      />

      <div className="space-y-6 md:space-y-7">
        {TIMELINE.map((entry) => (
          <motion.li
            key={entry.title}
            variants={entryVariants}
            className="relative pl-8"
          >
            <span className="absolute left-0 top-[6px] block h-[11px] w-[11px]">
              {entry.active ? (
                <>
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(0, 229, 192, 0.4)",
                      animation: reduceMotion
                        ? "none"
                        : "about-timeline-pulse 1.6s ease-in-out infinite",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-[1px] rounded-full bg-accent shadow-[0_0_10px_rgba(0,229,192,0.65)]"
                  />
                </>
              ) : entry.building ? (
                <span
                  aria-hidden
                  className="block h-full w-full rounded-full border border-accent bg-accent/30 shadow-[0_0_6px_rgba(0,229,192,0.35)]"
                />
              ) : (
                <span
                  aria-hidden
                  className="block h-full w-full rounded-full border border-accent/40 bg-[#1a1a1a]"
                />
              )}
            </span>
            <div
              className="text-text-tertiary"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {entry.date}
            </div>
            <div
              className="mt-2 text-text-primary"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {entry.title}
            </div>
            {Array.isArray(entry.body) ? (
              <div
                className="mt-3 space-y-3 text-text-secondary"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                }}
              >
                {entry.body.map((paragraph, i) => (
                  <div key={i} className="relative pl-4">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1 bottom-1 left-0 w-px bg-gradient-to-b from-accent/45 via-accent/15 to-transparent"
                    />
                    <p>{highlightEntities(paragraph)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="mt-1 text-text-secondary"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {entry.body}
              </div>
            )}
          </motion.li>
        ))}
      </div>
    </motion.ol>
  );
}
