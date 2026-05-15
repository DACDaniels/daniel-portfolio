"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BorderBeam } from "@/components/ui/BorderBeam";

type Tone = "live" | "building";

export type ProjectHighlightProps = {
  tone: Tone;
  eyebrow: string;
  title: string;
  body: string;
  signals: string[];
  mock: ReactNode;
  primary: {
    label: string;
    href: string;
    external?: boolean;
  };
  variants?: Variants;
};

export function ProjectHighlight({
  tone,
  eyebrow,
  title,
  body,
  signals,
  mock,
  primary,
  variants,
}: ProjectHighlightProps) {
  const dotColor = tone === "live" ? "#00E5C0" : "#FFC04D";
  const dotShadow =
    tone === "live"
      ? "0 0 8px rgba(0,229,192,0.6)"
      : "0 0 8px rgba(255,192,77,0.55)";
  const eyebrowColor =
    tone === "live" ? "rgba(0,229,192,0.95)" : "rgba(255,192,77,0.95)";

  const isExternal = primary.external === true;
  const LinkEl = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.article
      data-cursor-interactive
      variants={variants}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/30"
      style={{
        boxShadow:
          "0 20px 50px -28px rgba(0, 229, 192, 0.14), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
      }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <BorderBeam duration={5} />
      </span>

      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06]">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {mock}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div
          className="flex items-center gap-2"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10.5px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: eyebrowColor,
          }}
        >
          <span
            aria-hidden
            className="block h-[6px] w-[6px] rounded-full"
            style={{
              background: dotColor,
              boxShadow: dotShadow,
              animation: "live-pulse 2s ease-in-out infinite",
            }}
          />
          {eyebrow}
        </div>

        <h3
          className="font-heading font-semibold text-text-primary"
          style={{
            fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h3>

        <p
          className="text-text-secondary"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "14px",
            lineHeight: 1.65,
          }}
        >
          {body}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {signals.map((signal) => (
            <span
              key={signal}
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "10px",
                color: "rgba(0, 229, 192, 0.9)",
                background: "rgba(0, 229, 192, 0.08)",
                border: "1px solid rgba(0, 229, 192, 0.16)",
                padding: "3px 8px",
                borderRadius: "100px",
                lineHeight: 1.4,
                letterSpacing: "0.02em",
              }}
            >
              {signal}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <LinkEl
            href={primary.href}
            {...linkProps}
            className="group/btn inline-flex min-h-[44px] items-center gap-1.5 text-accent transition-colors duration-200 hover:text-white"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "12px",
              letterSpacing: "0.04em",
            }}
          >
            <span className="border-b border-current pb-0.5">
              {primary.label}
            </span>
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
            >
              {isExternal ? "↗" : "→"}
            </span>
          </LinkEl>
        </div>
      </div>
    </motion.article>
  );
}
