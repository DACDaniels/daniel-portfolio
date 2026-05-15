"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { BorderBeam } from "@/components/ui/BorderBeam";

export type AlternatingProjectProps = {
  number: string;
  category: string;
  title: string;
  meta: string;
  description: string;
  tags: string[];
  status: "live" | "building" | "research" | "meta";
  primaryLink?: { label: string; href: string; external?: boolean };
  secondaryLink?: { label: string; href: string; external?: boolean };
  mockComponent: ReactNode;
  side: "left" | "right";
  variants?: Variants;
};

export function AlternatingProjectCard({
  number,
  category,
  title,
  meta,
  description,
  tags,
  status,
  primaryLink,
  secondaryLink,
  mockComponent,
  side,
  variants,
}: AlternatingProjectProps) {
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
      variants={variants}
      className="group relative grid grid-cols-1 items-center gap-6 md:gap-10 lg:grid-cols-12 lg:gap-12"
    >
      <div
        data-cursor-interactive
        className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-surface transition-[border-color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-accent/30 lg:col-span-7 ${
          side === "right" ? "lg:order-2" : "lg:order-1"
        }`}
        style={{
          boxShadow:
            "0 20px 50px -28px rgba(0, 229, 192, 0.14), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
        }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <BorderBeam duration={5} />
        </span>
        <div className="aspect-[16/10] overflow-hidden">
          <div
            className={`absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border bg-black/80 px-2 py-1 backdrop-blur-md ${statusStyles}`}
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "10px",
              letterSpacing: "0.05em",
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

          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            {mockComponent}
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 lg:col-span-5 ${
          side === "right" ? "lg:order-1 lg:pr-2" : "lg:order-2 lg:pl-2"
        }`}
      >
        <div
          className="flex items-center gap-2 text-white/40"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>{number}</span>
          <span aria-hidden className="h-px w-6 bg-white/20" />
          <span>{category}</span>
        </div>

        <h3
          className="font-heading font-semibold text-white"
          style={{
            fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>

        <p
          className="italic text-white/45"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "12px",
            marginTop: "-4px",
            letterSpacing: "0.02em",
          }}
        >
          {meta}
        </p>

        <p
          className="text-white/60"
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
                border: "1px solid rgba(0, 229, 192, 0.15)",
                padding: "4px 8px",
                borderRadius: "100px",
                lineHeight: 1.4,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5 pt-1">
          {primaryLink ? (
            <ProjectLink {...primaryLink} variant="primary" />
          ) : null}
          {secondaryLink ? (
            <ProjectLink {...secondaryLink} variant="secondary" />
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectLink({
  href,
  label,
  external,
  variant,
}: {
  href: string;
  label: string;
  external?: boolean;
  variant: "primary" | "secondary";
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className={`group/link inline-flex items-center gap-1.5 transition-colors duration-200 ${
        variant === "primary"
          ? "text-accent hover:text-white"
          : "text-white/55 hover:text-white"
      }`}
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "12px",
        letterSpacing: "0.02em",
      }}
    >
      <span className="border-b border-current pb-0.5">{label}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover/link:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
