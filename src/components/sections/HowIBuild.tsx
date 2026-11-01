"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

type Proof = { label: string; href: string };

type Principle = {
  title: string;
  body: string;
  proof: Proof[];
};

// Each line was checked against its source before it shipped (read only):
//   Private by default: ruwende-platform BIBLE.md (D-033 field encryption,
//     D-043 paid text only in the database).
//   AI with guardrails: blueacre-ops whatsapp-bot/app/agent.py (prices come
//     only from code; check_reply blocks a reply before it is sent).
//   Built for real conditions: ruwende-platform BIBLE.md (offline service
//     worker) and docs/UX-JOURNEYS.md (answers kept when the signal drops);
//     fishtech-precision-feeding-system CLAUDE.md (the Pi at the pond is
//     the runtime).
//   Tested and reversible: ruwende-platform .github/workflows/ci.yml and
//     docs/runbooks/going-live.md section 7 (Rollback); this site's
//     preflight and Vercel deployments.
// See DECISIONS.md, 2026-11-01.
const PRINCIPLES: Principle[] = [
  {
    title: "Private by default.",
    body: "Personal and medical details are encrypted. Paid content never sits in a public file.",
    proof: [{ label: "Health & Longevity", href: "/projects/health-and-longevity" }],
  },
  {
    title: "AI with guardrails.",
    body: "The model talks to customers. Code sets every price and checks every reply before it is sent.",
    proof: [{ label: "FishTech Sales Agent", href: "/projects/fishtech-sales-agent" }],
  },
  {
    title: "Built for real conditions.",
    body: "Works offline, on weak signal, and on a small computer at the pond.",
    proof: [
      { label: "Health & Longevity", href: "/projects/health-and-longevity" },
      { label: "Iris", href: "/projects/fishtech" },
    ],
  },
  {
    title: "Tested and reversible.",
    body: "Every change is tested. Every release can be rolled back.",
    proof: [
      { label: "Health & Longevity", href: "/projects/health-and-longevity" },
      { label: "this site", href: "/projects/this-portfolio" },
    ],
  },
];

export function HowIBuild({ graph }: { graph?: ReactNode }) {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
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
            aria-hidden
            className="mb-3 hidden font-mono text-[11px] uppercase tracking-[0.15em] text-accent md:block"
          >
            {"// how-i-build.tsx"}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mb-8 font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white md:mb-14"
          >
            How I build.
          </motion.h2>

          <ul className="flex flex-col border-b border-border">
            {PRINCIPLES.map((p) => (
              <motion.li
                key={p.title}
                variants={itemVariants}
                className="grid gap-2 border-t border-border py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:gap-x-12 md:py-9"
              >
                <h3 className="font-heading text-[clamp(1.375rem,2.6vw,2rem)] font-bold leading-[1.15] tracking-[-0.03em] text-text-primary">
                  {p.title}
                </h3>
                <div className="flex flex-col gap-1">
                  <p className="max-w-[52ch] text-[15px] leading-[1.7] text-text-secondary md:text-[17px]">
                    {p.body}
                  </p>
                  <p className="flex flex-wrap items-center font-mono text-[12px] tracking-[0.02em] text-accent/70">
                    {p.proof.map((link, i) => (
                      <Fragment key={link.href}>
                        {i > 0 ? (
                          <span aria-hidden className="px-2">
                            ·
                          </span>
                        ) : null}
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 items-center rounded-sm text-accent underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:text-white"
                        >
                          {link.label}
                        </Link>
                      </Fragment>
                    ))}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Server-rendered graph; renders nothing if GitHub is unavailable. */}
        {graph}
      </div>
    </section>
  );
}
