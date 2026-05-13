"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export type ProjectCardProps = {
  number: string;
  category: string;
  title: string;
  meta: string;
  description: string;
  tags: string[];
  status: "live" | "research" | "meta" | "building";
  primaryLink?: { label: string; href: string; external?: boolean };
  secondaryLink?: { label: string; href: string; external?: boolean };
  mockComponent: ReactNode;
};

type Props = ProjectCardProps & {
  variants?: Variants;
};

export function ProjectCard({
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
  variants,
}: Props) {
  return (
    <motion.article
      variants={variants}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-surface p-5 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent/30 md:p-6"
    >
      <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-white/[0.06]">
        <StatusBadge status={status} />
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {mockComponent}
        </div>
      </div>

      <p
        className="text-white/35"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "10px",
          letterSpacing: "0.15em",
          marginBottom: "6px",
        }}
      >
        {number} · {category}
      </p>

      <h3
        className="font-heading font-semibold leading-tight text-white"
        style={{
          fontSize: "18px",
          letterSpacing: "-0.02em",
          marginBottom: "6px",
        }}
      >
        {title}
      </h3>

      <p
        className="italic text-white/40"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          marginBottom: "10px",
        }}
      >
        {meta}
      </p>

      <p
        className="text-white/55"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "14px",
          lineHeight: 1.55,
          marginBottom: "14px",
        }}
      >
        {description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
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

      <div className="mt-auto flex gap-4 border-t border-white/5 pt-3">
        {primaryLink ? (
          <ProjectLink {...primaryLink} variant="primary" />
        ) : null}
        {secondaryLink ? (
          <ProjectLink {...secondaryLink} variant="secondary" />
        ) : null}
      </div>
    </motion.article>
  );
}

function StatusBadge({ status }: { status: ProjectCardProps["status"] }) {
  const label =
    status === "live"
      ? "LIVE"
      : status === "building"
        ? "BUILDING"
        : status === "research"
          ? "RESEARCH"
          : "META";

  const styles: Record<ProjectCardProps["status"], string> = {
    live: "text-accent border border-accent/30",
    building: "text-[#FFC04D] border border-[#FFC04D]/35",
    research: "text-white/85 border border-white/15",
    meta: "text-white/60 border border-white/10",
  };

  const showDot = status === "live" || status === "building";

  return (
    <div
      className={`absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/80 px-2 py-1 backdrop-blur-md ${styles[status]}`}
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
      {label}
    </div>
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
      className={`inline-flex items-center gap-1 transition-colors duration-200 ${
        variant === "primary"
          ? "text-accent hover:text-white"
          : "text-white/70 hover:text-white"
      }`}
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "11px",
        lineHeight: 1.4,
      }}
    >
      {label} <span aria-hidden>→</span>
    </a>
  );
}
