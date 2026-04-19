"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

type DotGridProps = {
  className?: string;
  dotColor?: string;
  spacing?: number;
  dotSize?: number;
  parallaxStrength?: number;
};

export function DotGrid({
  className,
  dotColor = "rgba(0, 229, 192, 0.18)",
  spacing = 40,
  dotSize = 1.5,
  parallaxStrength = 20,
}: DotGridProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const y = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx * parallaxStrength);
      my.set(ny * parallaxStrength);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, parallaxStrength]);

  return (
    <motion.div
      aria-hidden
      style={{
        x,
        y,
        backgroundImage: `radial-gradient(circle at center, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
      className={cn(
        "pointer-events-none absolute -inset-20 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]",
        className,
      )}
    />
  );
}
