"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties } from "react";

const MARQUEE_ROW_1 = [
  "Python",
  "TypeScript",
  "Next.js",
  "React",
  "Flask",
  "OpenCV",
];

const MARQUEE_ROW_2 = [
  "TensorFlow",
  "Raspberry Pi",
  "SQLite",
  "PostgreSQL",
  "Git",
  "Linux",
  "Node.js",
  "Tailwind",
];

type TimelineEntry = {
  date: string;
  title: string;
  body: string;
  active?: boolean;
};

const TIMELINE: TimelineEntry[] = [
  {
    date: "2026 · NOW",
    title: "Final year BSc Computer Science, NUST",
    body: "Building this portfolio, deepening Rust and computer vision optimisation.",
    active: true,
  },
  {
    date: "Nov 2025",
    title: "FishTech Smart Feed System",
    body: "Final-year research prototype — biomass estimation on Raspberry Pi with custom MEI / SAD / TCS / RBP metrics.",
  },
  {
    date: "May 2024 – Jun 2025",
    title: "ZIMDEF Industrial Attachment",
    body: "Systems administration and IT operations — SAP B1, ManageEngine ServiceDesk Plus, Microsoft 365 administration.",
  },
  {
    date: "2024",
    title: "Steadyhands Platform shipped",
    body: "First end-to-end production system: online ordering, venue booking, Paynow payment integration. Live at Bata Club, Harare.",
  },
  {
    date: "2022",
    title: "Started serious coding",
    body: "First real systems beyond coursework — Python, web fundamentals.",
  },
];

export function About() {
  const reduceMotion = useReducedMotion() ?? false;

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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-14 lg:grid-cols-[3fr_2fr] lg:gap-x-16 lg:gap-y-14"
        >
          <div className="order-1 min-w-0 lg:order-none lg:row-span-2">
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
              Building{" "}
              <span
                className="font-normal italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "rgba(255, 255, 255, 0.55)",
                  letterSpacing: "-0.025em",
                }}
              >
                real
              </span>{" "}
              systems, not just learning to code.
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
              in Harare, Zimbabwe — but I&apos;ve been building production
              systems for the past two-to-three years, well before any class
              required it. My strongest work isn&apos;t theoretical: it&apos;s
              the end-to-end platforms I&apos;ve shipped for real users in
              environments where bandwidth is unreliable, hardware is
              constrained, and clients expect things to actually work.
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
              Steadyhands Catering at Bata Club was my first shipped
              production system — restaurant management, online ordering,
              venue booking, payment via Paynow, all running live in Harare.
              FishTech Smart Feed, my final-year project, is a computer
              vision system for aquaculture biomass estimation running on
              $35 Raspberry Pi hardware — a research prototype, not yet
              deployed commercially, but proof I can take a problem from
              optical physics to a deployable embedded system.
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
              I&apos;m not interested in being the developer who can quote a
              framework but can&apos;t ship. I care about systems that hold up
              outside of demo conditions. Right now I&apos;m deepening my work
              in Rust, computer vision optimisation, and production-grade
              architecture — moving from &ldquo;it works on my machine&rdquo;
              toward &ldquo;it works in someone else&apos;s, at scale, for
              years.&rdquo;
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
                  Wrapping up BSc Computer Science at NUST
                </CurrentlyItem>
                <CurrentlyItem>
                  Open to remote engineering roles + select client work
                </CurrentlyItem>
                <CurrentlyItem>
                  Learning: Rust, CV optimisation, distributed systems
                </CurrentlyItem>
              </ul>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="order-3 min-w-0 md:order-2 lg:order-none">
            <Marquee row={MARQUEE_ROW_1} direction="left" reduceMotion={reduceMotion} />
            <div className="mt-3">
              <Marquee row={MARQUEE_ROW_2} direction="right" reduceMotion={reduceMotion} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-2 min-w-0 md:order-3 lg:order-none">
            <Timeline reduceMotion={reduceMotion} />
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
  const duration = direction === "left" ? 30 : 35;
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
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
          </motion.li>
        ))}
      </div>
    </motion.ol>
  );
}
