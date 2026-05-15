"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

type TimelineEntry =
  | {
      kind: "simple";
      date: string;
      title: string;
      body: string;
      active?: boolean;
      building?: boolean;
    }
  | {
      kind: "zimdef";
      date: string;
      title: string;
      duration: string;
    };

const TIMELINE: TimelineEntry[] = [
  {
    kind: "simple",
    date: "2026 · NOW",
    title: "Final year BSc Computer Science, NUST",
    body: "Wrapping up the degree. Industrialising FishTech. Open to roles.",
    active: true,
  },
  {
    kind: "simple",
    date: "2026 · BUILDING",
    title: "FishTech Precision Feeding System",
    body: "Closed-loop AI instrument for African pond aquaculture. Raspberry Pi 5 with Hailo NPU, custom-trained YOLO, automated auger feeder, integrated mast and enclosure. Pilot deployment 2026.",
    building: true,
  },
  {
    kind: "simple",
    date: "2025",
    title: "Steadyhands Catering Platform",
    body: "Recently shipped full-stack platform for Bata Club, Harare. Next.js, TypeScript, Node.js, Paynow gateway, WhatsApp Business funnel. Live at steadyhandscatering.com.",
  },
  {
    kind: "zimdef",
    date: "May 2024 to Jun 2025",
    title: "ZIMDEF · IT Industrial Attachment",
    duration: "12 months",
  },
  {
    // "Smart Feed" is the historical proper-noun name of the Nov 2025
    // dissertation artefact, kept verbatim for accuracy. Not a violation
    // of the CLAUDE.md AVOID list, which applies to the current product.
    kind: "simple",
    date: "Nov 2025",
    title: "FishTech Smart Feed (dissertation submission)",
    body: "Final-year research submission. The foundation work that evolved into the FishTech Precision Feeding System now in active development.",
  },
  {
    kind: "simple",
    date: "2022",
    title: "Started serious coding",
    body: "First real systems beyond coursework. Python, web fundamentals, the long road to shipping.",
  },
];

type Cluster = {
  label: string;
  items: string[];
};

const ZIMDEF_CLUSTERS: Cluster[] = [
  {
    label: "Infrastructure",
    items: [
      "VMware virtualisation",
      "RedHat Linux at production scale",
      "Enterprise server management",
      "Resource allocation",
      "Routine backup operations",
    ],
  },
  {
    label: "Network",
    items: [
      "SOPHOS → Checkpoint firewall migration",
      "RUCKUS wireless infrastructure",
      "CISCO telephony",
      "RADIUS authentication",
      "VLAN segmentation, IP addressing",
    ],
  },
  {
    label: "Software stack",
    items: [
      "SAP Business One",
      "ManageEngine ServiceDesk Plus",
      "Microsoft 365 administration",
      "Integrated, interdependent ERP layer",
    ],
  },
];

const ZIMDEF_INTRO =
  "Twelve months inside a live enterprise data centre ecosystem. Hands-on across the full stack of an institutional IT operation. Servers, networking, ERP, authentication, communications, and end-user services, all integrated and interdependent.";

const ZIMDEF_CLOSE =
  "Real exposure to system maintenance, downtime sensitivity, user support, and IT governance. The layer most software work sits on top of without ever seeing. Transfers directly into cloud, DevOps, cybersecurity, systems engineering, and backend infrastructure.";

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

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 flex items-center gap-3"
          >
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
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
            }}
          >
            About me.
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mt-8 max-w-[58ch] text-text-secondary"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(16px, 1.5vw, 18px)",
              lineHeight: 1.75,
            }}
          >
            <p>
              Final-year Computer Science student at NUST, based in Harare,
              Zimbabwe. For two to three years I&apos;ve been building real
              systems for real users, with most of my time spent in the seam
              between full-stack web, computer vision, and edge devices.
            </p>
            <div
              aria-hidden
              className="my-7 h-px w-12 bg-accent/40"
            />
            <p>
              What I care about is the work that survives contact with the
              real world. Software that has to ship. Hardware that has to
              work. Problems people actually feel. I&apos;d rather own a
              system end to end than hand it off the moment it starts
              hurting, and I&apos;d rather see African problems treated as
              engineering problems than as charity cases.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-x-16"
          >
            <div className="min-w-0">
              <div
                className="mb-4 flex items-center gap-3 text-text-tertiary"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                <span>Currently</span>
                <span aria-hidden className="h-px w-8 bg-accent/40" />
              </div>
              <ul
                className="space-y-3 text-text-secondary"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  lineHeight: 1.65,
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
                  Industrialising FishTech for pilot deployment, 2026
                </CurrentlyItem>
                <CurrentlyItem>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-text-secondary underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
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
            </div>

            <div className="min-w-0">
              <div
                className="mb-4 flex items-center gap-3 text-text-tertiary"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                <span>Timeline</span>
                <span aria-hidden className="h-px w-8 bg-accent/40" />
              </div>
              <Timeline reduceMotion={reduceMotion} />
            </div>
          </motion.div>

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
            <Marquee
              row={MARQUEE_ROW_1}
              direction="left"
              reduceMotion={reduceMotion}
            />
            <div className="mt-3">
              <Marquee
                row={MARQUEE_ROW_2}
                direction="right"
                reduceMotion={reduceMotion}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CurrentlyItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-[0.45em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(0,229,192,0.6)]"
      />
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
          "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-3 will-change-transform hover:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]"
        style={style}
      >
        {[...row, ...row].map((label, i) => (
          <Pill
            key={`${label}-${i}`}
            label={label}
            aria-hidden={i >= row.length}
          />
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

      <div className="space-y-7 md:space-y-8">
        {TIMELINE.map((entry) => (
          <motion.li
            key={entry.title}
            variants={entryVariants}
            className="relative pl-8"
          >
            <span className="absolute left-0 top-[6px] block h-[11px] w-[11px]">
              {entry.kind === "simple" && entry.active ? (
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
              ) : entry.kind === "simple" && entry.building ? (
                <span
                  aria-hidden
                  className="block h-full w-full rounded-full border border-accent bg-accent/30 shadow-[0_0_6px_rgba(0,229,192,0.35)]"
                />
              ) : entry.kind === "zimdef" ? (
                <span
                  aria-hidden
                  className="block h-full w-full rounded-full border border-[#FFC04D]/70 bg-[#FFC04D]/20"
                  style={{ boxShadow: "0 0 6px rgba(255,192,77,0.35)" }}
                />
              ) : (
                <span
                  aria-hidden
                  className="block h-full w-full rounded-full border border-accent/40 bg-[#1a1a1a]"
                />
              )}
            </span>

            {entry.kind === "zimdef" ? (
              <ZimdefEntry entry={entry} />
            ) : (
              <SimpleEntry entry={entry} />
            )}
          </motion.li>
        ))}
      </div>
    </motion.ol>
  );
}

function SimpleEntry({
  entry,
}: {
  entry: Extract<TimelineEntry, { kind: "simple" }>;
}) {
  return (
    <>
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
    </>
  );
}

function ZimdefEntry({
  entry,
}: {
  entry: Extract<TimelineEntry, { kind: "zimdef" }>;
}) {
  return (
    <div
      className="relative -ml-2 rounded-xl border border-[#FFC04D]/15 bg-[#FFC04D]/[0.025] p-4 md:p-5"
      style={{
        boxShadow:
          "0 18px 40px -28px rgba(255,192,77,0.12), 0 0 0 1px rgba(255,192,77,0.04) inset",
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="text-text-tertiary"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {entry.date}
        </span>
        <span
          aria-hidden
          className="h-1 w-1 rounded-full bg-[#FFC04D]/50"
        />
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC04D]/30 px-2 py-0.5 text-[#FFC04D]"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}
        >
          {entry.duration}
        </span>
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

      <p
        className="mt-2 text-text-secondary"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "14px",
          lineHeight: 1.65,
        }}
      >
        {ZIMDEF_INTRO}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2.5">
        {ZIMDEF_CLUSTERS.map((cluster) => (
          <div
            key={cluster.label}
            className="rounded-lg border border-white/[0.05] bg-bg-elevated/60 px-3 py-3"
          >
            <div
              className="mb-2 text-[#FFC04D]/90"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "9.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {cluster.label}
            </div>
            <ul
              className="space-y-1 text-text-secondary"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "12.5px",
                lineHeight: 1.5,
              }}
            >
              {cluster.items.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span
                    aria-hidden
                    className="mt-[0.6em] inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-[#FFC04D]/60"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p
        className="mt-4 text-text-secondary"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          lineHeight: 1.65,
          fontStyle: "italic",
        }}
      >
        {ZIMDEF_CLOSE}
      </p>
    </div>
  );
}
