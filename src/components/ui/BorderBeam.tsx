"use client";

import type { CSSProperties } from "react";

type BorderBeamProps = {
  className?: string;
  duration?: number;
  size?: number;
};

export function BorderBeam({
  className = "",
  duration = 4,
  size = 1,
}: BorderBeamProps) {
  const style: CSSProperties = {
    "--beam-duration": `${duration}s`,
    "--beam-size": `${size}px`,
  } as CSSProperties;

  return (
    <span
      aria-hidden
      data-border-beam
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={style}
    />
  );
}
