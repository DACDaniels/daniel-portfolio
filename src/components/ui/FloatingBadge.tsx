"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type FloatingBadgeProps = {
  label: string;
  position: { x: string; y: string };
  delay?: number;
  duration?: number;
  amplitude?: number;
  className?: string;
};

export function FloatingBadge({
  label,
  position,
  delay = 0,
  duration = 6,
  amplitude = 14,
  className,
}: FloatingBadgeProps) {
  return (
    <motion.div
      className={cn(
        "absolute z-30 hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-bg-elevated/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-text-secondary backdrop-blur-md lg:flex",
        "shadow-[0_8px_24px_-4px_rgba(0,229,192,0.15)]",
        className,
      )}
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -amplitude, 0, amplitude, 0],
        x: [0, amplitude / 2, 0, -amplitude / 2, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay + 0.3 },
        scale: { duration: 0.5, delay: delay + 0.3 },
        y: {
          duration,
          delay: delay + 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        },
        x: {
          duration: duration * 1.3,
          delay: delay + 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#00E5C0]" />
      {label}
    </motion.div>
  );
}
