"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

type CardSpotlightProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function CardSpotlight({
  children,
  className,
  style,
}: CardSpotlightProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll<HTMLElement>(
        "[data-spotlight-card]",
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    },
    [isTouch],
  );

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
