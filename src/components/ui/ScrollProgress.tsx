"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 36,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background:
          "linear-gradient(90deg, rgba(0,229,192,0.95), rgba(0,229,192,0.55))",
        transformOrigin: "0% 50%",
        scaleX,
        zIndex: 60,
        boxShadow: "0 0 12px rgba(0, 229, 192, 0.55)",
        pointerEvents: "none",
      }}
    />
  );
}
