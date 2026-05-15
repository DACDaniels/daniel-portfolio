"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BorderBeam } from "@/components/ui/BorderBeam";

export type FlagshipProjectProps = {
  number: string;
  category: string;
  title: string;
  meta: string;
  description: string;
  tags: string[];
  status: "live" | "building" | "research" | "meta";
  caseStudyHref: string;
  liveLink?: { label: string; href: string };
  mockComponent: ReactNode;
  variants?: Variants;
};

export function FlagshipProjectCard({
  number,
  category,
  title,
  meta,
  description,
  tags,
  status,
  caseStudyHref,
  liveLink,
  mockComponent,
  variants,
}: FlagshipProjectProps) {
  const statusLabel =
    status === "live"
      ? "LIVE"
      : status === "building"
        ? "BUILDING"
        : status === "research"
          ? "RESEARCH"
          : "META";

  const statusStyles =
    status === "live"
      ? "text-accent border-accent/35"
      : status === "building"
        ? "text-[#FFC04D] border-[#FFC04D]/35"
        : status === "research"
          ? "text-white/85 border-white/15"
          : "text-white/60 border-white/10";

  const showDot = status === "live" || status === "building";

  return (
    <motion.article
      data-cursor-interactive
      variants={variants}
      className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/30"
      style={{
        boxShadow:
          "0 28px 70px -28px rgba(0, 229, 192, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
      }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <BorderBeam duration={5} />
      </span>
      <div className="pointer-events-none absolute -top-px left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] lg:aspect-auto lg:border-b-0 lg:border-r">
          <div
            className={`absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border bg-black/80 px-2.5 py-1 backdrop-blur-md ${statusStyles}`}
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            {showDot ? (
              <span
                aria-hidden
                className={`block h-[5px] w-[5px] rounded-full ${
                  status === "live" ? "bg-accent" : "bg-[#FFC04D]"
                }`}
                style={{ animation: "live-pulse 2s ease-in-out infinite" }}
              />
            ) : null}
            {statusLabel}
          </div>

          <div
            className="absolute left-4 top-4 z-10 text-white/45"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            // flagship · {number}
          </div>

          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
            {mockComponent}
          </div>
        </div>

        <div className="relative flex flex-col gap-5 p-7 md:p-10">
          <div
            className="text-white/40"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>

          <h3
            className="font-heading font-semibold text-white"
            style={{
              fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </h3>

          <p
            className="text-white/45 italic"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "12px",
              letterSpacing: "0.04em",
              marginTop: "-8px",
            }}
          >
            {meta}
          </p>

          <p
            className="text-white/65"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "15px",
              lineHeight: 1.65,
            }}
          >
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "10px",
                  color: "rgba(0, 229, 192, 0.9)",
                  background: "rgba(0, 229, 192, 0.08)",
                  border: "1px solid rgba(0, 229, 192, 0.18)",
                  padding: "4px 9px",
                  borderRadius: "100px",
                  lineHeight: 1.4,
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={caseStudyHref}
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary shadow-[0_12px_32px_-10px_rgba(0,229,192,0.5)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-10px_rgba(0,229,192,0.75)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
              <span className="relative inline-flex items-center gap-2">
                Read the case study
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  aria-hidden
                >
                  <path
                    d="M2 7h10m0 0L8 3m4 4L8 11"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            {liveLink ? (
              <a
                href={liveLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/65 transition-colors duration-200 hover:text-accent"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.02em",
                }}
              >
                {liveLink.label} <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
