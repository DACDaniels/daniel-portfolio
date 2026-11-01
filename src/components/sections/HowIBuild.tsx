"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

type Decision = {
  project: string;
  /** Decision ID from the source log, when the log numbers its entries. */
  id?: string;
  /** Shown in the card, e.g. "10 Oct 2026". */
  date: string;
  dateTime: string;
  /** The file the decision is recorded in. */
  file: string;
  /** One or two plain sentences, faithful to the log entry. */
  text: string;
};

type Point = {
  title: string;
  body: string;
  decision: Decision;
  link: { label: string; href: string };
};

// Every decision below is quoted from a real, dated log entry (read only):
//   Health & Longevity: ruwende-platform/DECISIONS.md, D-043 and D-093
//   FishTech: blueacre-ops/CLAUDE.md (reality check, hard constraints) and
//             blueacre-ops/docs/DECISIONS.md (2026-10-30, agent rebuild)
// No prices, counts or client private data. See DECISIONS.md, 2026-11-01.
const POINTS: Point[] = [
  {
    title: "Decisions in writing.",
    body: "Every choice is dated with its reason, so anyone can see why the system is the way it is, long after the conversation that settled it.",
    decision: {
      project: "Health & Longevity",
      id: "D-043",
      date: "10 Oct 2026",
      dateTime: "2026-10-10",
      file: "DECISIONS.md",
      text: "Paid article text never sits in a public file. Only the free preview is built into the site; the paid part is served after the server checks access on every request, and a test searches the built site for every paid sentence.",
    },
    link: {
      label: "Decisions in Health & Longevity",
      href: "/projects/health-and-longevity#decisions",
    },
  },
  {
    title: "Claimed versus true.",
    body: "Business repositories keep a table of what is said against what is true. A claim that fails it stays out of every quotation and pitch until the facts behind it change.",
    decision: {
      project: "FishTech",
      date: "6 Aug 2026",
      dateTime: "2026-08-06",
      file: "Reality check",
      text: "No number leaves the business unless it traces to a file. If a claim is marked untrue, it does not go in a quotation, a deck or an application; the file is fixed first.",
    },
    link: {
      label: "How the sales agent sets every figure",
      href: "/projects/fishtech-sales-agent#how",
    },
  },
  {
    title: "Tested before it ships.",
    body: "Type checks, unit tests and the build run on every pull request. End-to-end and accessibility checks guard payments, private data and sign-in. Every real failure becomes a test.",
    decision: {
      project: "FishTech Sales Agent",
      date: "30 Oct 2026",
      dateTime: "2026-10-30",
      file: "DECISIONS.md",
      text: "When real chats went wrong, the design was at fault, not one bug. Every one of those chats is now a test, and a new failure is added as a test before anything changes.",
    },
    link: {
      label: "Built from real conversations",
      href: "/projects/fishtech-sales-agent#decisions",
    },
  },
  {
    title: "Always a way back.",
    body: "Every change lands on its own branch, with a rollback point before every deploy. Clients get written runbooks and manuals.",
    decision: {
      project: "Health & Longevity",
      id: "D-093",
      date: "10 Oct 2026",
      dateTime: "2026-10-10",
      file: "DECISIONS.md",
      text: "Each step ends as an open pull request and waits. Nothing merges without my word, and after every merge the preview is redeployed from main, so what the client sees always matches main.",
    },
    link: {
      label: "Health & Longevity stack and checks",
      href: "/projects/health-and-longevity#stack",
    },
  },
];

export function HowIBuild() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
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
    <section
      id="how-i-build"
      className="relative w-full overflow-hidden bg-bg-primary py-20 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-accent opacity-[0.05] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent"
          >
            {"// how-i-build.tsx"}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white"
          >
            How I build.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 mb-12 max-w-xl text-[15px] leading-[1.7] text-text-secondary md:mb-16 md:max-w-2xl md:text-[16px]"
          >
            The same habits run through client systems, FishTech and this
            site. Each one is shown with a real decision, quoted from the log
            where it was made.
          </motion.p>

          <ul className="flex flex-col">
            {POINTS.map((point) => (
              <motion.li
                key={point.title}
                variants={itemVariants}
                className="grid gap-5 border-t border-border py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:grid-rows-[auto_1fr] md:gap-x-12 md:gap-y-4 md:py-14 last:pb-0"
              >
                {/* Phone order: point, decision, link. From md the decision
                    sits on the right and the link under the point. */}
                <div className="flex flex-col gap-3 md:col-start-1 md:row-start-1">
                  <h3 className="font-heading text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-text-primary">
                    {point.title}
                  </h3>
                  <p className="max-w-[46ch] text-[15px] leading-[1.7] text-text-secondary md:text-[16px]">
                    {point.body}
                  </p>
                </div>

                <DecisionCard decision={point.decision} />

                <div className="md:col-start-1 md:row-start-2">
                  <Link
                    href={point.link.href}
                    className="group/link inline-flex min-h-[44px] max-w-full items-center gap-1.5 whitespace-nowrap rounded-sm text-[13px] text-white/70 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  >
                    <span className="border-b border-current pb-0.5">
                      {point.link.label}
                    </span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <figure className="self-start rounded-[16px] md:col-start-2 md:row-span-2 md:row-start-1 border border-border bg-bg-elevated p-5 font-mono shadow-[0_24px_60px_-32px_rgba(0,229,192,0.16),0_0_0_1px_rgba(255,255,255,0.02)_inset] md:p-6">
      <figcaption className="flex flex-col gap-1 border-b border-border pb-3 text-[11px] tracking-[0.04em]">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-white/85">{decision.project}</span>
          <span className="text-text-tertiary">{decision.file}</span>
        </span>
        <span className="flex items-baseline gap-3">
          {decision.id ? (
            <span className="text-accent">{decision.id}</span>
          ) : null}
          <time dateTime={decision.dateTime} className="text-text-tertiary">
            {decision.date}
          </time>
        </span>
      </figcaption>
      <blockquote className="mt-4 text-[13px] leading-[1.75] text-white/75">
        <p>{decision.text}</p>
      </blockquote>
    </figure>
  );
}
