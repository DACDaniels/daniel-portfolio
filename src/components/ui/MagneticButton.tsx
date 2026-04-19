"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 20,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!canHover) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const maxX = rect.width / 2;
    const maxY = rect.height / 2;
    const normalizedX = Math.max(-1, Math.min(1, relX / maxX));
    const normalizedY = Math.max(-1, Math.min(1, relY / maxY));
    x.set(normalizedX * strength);
    y.set(normalizedY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToTarget = (event: MouseEvent<HTMLElement>) => {
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (href) {
    return (
      <motion.a
        ref={(el) => {
          ref.current = el;
        }}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={(e) => {
          scrollToTarget(e);
          onClick?.();
        }}
        style={{ x: springX, y: springY }}
        className={cn("inline-flex select-none", className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={(el) => {
        ref.current = el;
      }}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex select-none", className)}
    >
      {children}
    </motion.button>
  );
}
