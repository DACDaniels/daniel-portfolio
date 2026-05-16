"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
  staggerMs?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerMs = 40,
  as = "span",
}: AnimatedTextProps) {
  const chars = Array.from(text);
  const Wrapper = motion[as];

  return (
    <Wrapper
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerMs / 1000,
          },
        },
      }}
    >
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          className="inline-block"
          style={{ willChange: "transform, opacity, filter" }}
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(20px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.95],
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Wrapper>
  );
}
