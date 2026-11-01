"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

/**
 * Building blocks for the client and automation case studies, in the same
 * style as /projects/fishtech: header, numbered sections, card grids, stack
 * groups and the closing call to action.
 */

export function useCaseVariants() {
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
  return { reduceMotion, containerVariants, itemVariants };
}

const MONO = "var(--font-jetbrains-mono)";
const BODY = "var(--font-dm-sans)";

export function BackToWork() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center gap-1 text-white/60 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        style={{ fontFamily: MONO, fontSize: "12px", lineHeight: 1.4 }}
      >
        ← Back to work
      </Link>
    </div>
  );
}

export type CaseStatus = "live" | "building" | "meta";

const STATUS_BADGE: Record<CaseStatus, { label: string; className: string; dot: string | null }> = {
  live: { label: "LIVE", className: "border-accent/40 bg-accent/[0.08] text-accent", dot: "bg-accent" },
  building: { label: "BUILDING", className: "border-[#FFC04D]/40 bg-[#FFC04D]/[0.08] text-[#FFC04D]", dot: "bg-[#FFC04D]" },
  meta: { label: "META", className: "border-white/20 bg-white/[0.04] text-white/75", dot: null },
};

type CaseHeaderProps = {
  /** Defaults to live. */
  status?: CaseStatus;
  eyebrow: string;
  statusNote: string;
  title: string;
  lead: string;
  facts: { k: string; v: string }[];
  links?: { label: string; href: string }[];
};

export function CaseHeader({ status = "live", eyebrow, statusNote, title, lead, facts, links }: CaseHeaderProps) {
  const { reduceMotion, containerVariants, itemVariants } = useCaseVariants();
  const badge = STATUS_BADGE[status];
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          variants={itemVariants}
          className="font-mono text-[11px] uppercase text-accent"
          style={{ letterSpacing: "0.15em" }}
        >
          {eyebrow}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-3 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border ${badge.className}`}
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              letterSpacing: "0.08em",
              padding: "4px 10px",
              lineHeight: 1.4,
            }}
          >
            {badge.dot ? (
              <span
                aria-hidden
                className={`block h-[5px] w-[5px] rounded-full ${badge.dot}`}
                style={{ animation: reduceMotion ? "none" : "live-pulse 2s ease-in-out infinite" }}
              />
            ) : null}
            {badge.label}
          </span>
          <span className="text-white/50" style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.04em" }}>
            {statusNote}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-6 font-heading font-bold text-white"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.035em", lineHeight: 1.02 }}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-2xl text-white/60"
          style={{ fontFamily: BODY, fontSize: "18px", lineHeight: 1.6 }}
        >
          {lead}
        </motion.p>

        <motion.dl
          variants={itemVariants}
          className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-3"
          style={{ fontFamily: MONO, fontSize: "12px", lineHeight: 1.5 }}
        >
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="text-white/45">{f.k}</dt>
              <dd className="mt-0.5 text-white/80">{f.v}</dd>
            </div>
          ))}
        </motion.dl>

        {links?.length ? (
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/40 px-5 text-sm font-medium text-accent transition-[background-color,border-color,transform] duration-200 hover:border-accent hover:bg-accent/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.98]"
              >
                {l.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            ))}
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}

export function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const { containerVariants, itemVariants } = useCaseVariants();
  const { ref, revealed } = useScrollReveal<HTMLElement>();
  return (
    <motion.section
      ref={ref}
      id={id}
      className="scroll-mt-28"
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="text-accent"
        style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="font-heading font-semibold text-white"
        style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "16px" }}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="space-y-4 text-white/70"
        style={{ fontFamily: BODY, fontSize: "16px", lineHeight: 1.75 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

export type CaseCard = { title: string; body: string };

export function CardGrid({ cards }: { cards: CaseCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-white/[0.06] bg-bg-surface p-4 transition-[border-color] duration-300 hover:border-accent/25"
        >
          <div
            className="font-heading font-semibold text-white"
            style={{ fontSize: "16px", letterSpacing: "-0.015em", marginBottom: "8px", lineHeight: 1.3 }}
          >
            {card.title}
          </div>
          <p className="text-white/60" style={{ fontFamily: BODY, fontSize: "14px", lineHeight: 1.65 }}>
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PointList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 pt-1">
      {items.map((line) => (
        <li key={line} className="flex gap-3 text-white/70" style={{ fontFamily: BODY, fontSize: "16px", lineHeight: 1.65 }}>
          <span aria-hidden className="mt-[0.7em] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/80" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

export type StackGroup = { label: string; items: string[] };

export function StackGrid({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3">
      {groups.map((group) => (
        <div key={group.label} className="rounded-xl border border-white/[0.06] bg-bg-surface p-4">
          <div
            className="text-accent"
            style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}
          >
            {group.label}
          </div>
          <ul className="space-y-1.5 text-white/65" style={{ fontFamily: BODY, fontSize: "13px", lineHeight: 1.55 }}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ClosingCTA({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const { reduceMotion } = useCaseVariants();
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
      style={{ boxShadow: "0 24px 60px -28px rgba(0, 229, 192, 0.28), 0 0 0 1px rgba(0, 229, 192, 0.05) inset" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[280px] w-[280px] rounded-full bg-accent opacity-[0.18] blur-[100px]"
      />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <div>
          <div
            className="text-accent"
            style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}
          >
            {eyebrow}
          </div>
          <h3
            className="font-heading font-semibold text-white"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
          >
            {title}
          </h3>
          <p className="mt-3 max-w-[52ch] text-white/60" style={{ fontFamily: BODY, fontSize: "15px", lineHeight: 1.65 }}>
            {body}
          </p>
        </div>
        <Link
          href="/#contact"
          className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-semibold shadow-[0_12px_32px_-10px_rgba(0,229,192,0.5)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_16px_40px_-10px_rgba(0,229,192,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.98]"
          style={{ color: "#080808" }}
        >
          Start a conversation
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
