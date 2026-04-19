"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type NumberTickerProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  triggerOnMount?: boolean;
};

export function NumberTicker({
  value,
  suffix = "+",
  duration = 1.8,
  className,
  triggerOnMount = false,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [mountTriggered, setMountTriggered] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!triggerOnMount) return;
    const t = setTimeout(() => setMountTriggered(true), 400);
    return () => clearTimeout(t);
  }, [triggerOnMount]);

  const active = triggerOnMount ? mountTriggered : inView;

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.65, 0.3, 0.95],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
      {suffix}
    </span>
  );
}
