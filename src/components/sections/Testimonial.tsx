"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useScrollReveal } from "@/lib/useScrollReveal";

// TODO(testimonial): Replace the placeholder quote, author name, role, and
// company with a real Bata Club / Steadyhands testimonial once Daniel has
// permission from the client. Until then this section reads as a clearly
// labelled placeholder — see the // pending-approval eyebrow above the
// card. Audit reference: B6 (Bata Club testimonial).
const PLACEHOLDER = {
  quote:
    "Daniel built and shipped our entire ordering platform end to end. Paynow payments, WhatsApp funnel, the full menu flow. It transacts, our customers use it, and our kitchen runs on it.",
  attribution: {
    name: "Client name pending approval",
    role: "Role pending approval",
    company: "Bata Club · Steadyhands Catering",
  },
};

export function Testimonial() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } =
    useScrollReveal<HTMLDivElement>();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <section
      aria-label="Client quote"
      className="relative w-full overflow-hidden bg-bg-primary py-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[min(720px,90vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,229,192,0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
          className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-surface p-7 md:p-12"
          style={{
            boxShadow:
              "0 24px 60px -28px rgba(0, 229, 192, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
          }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span
              className="text-accent"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              // client · steadyhands
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC04D]/35 bg-[#FFC04D]/[0.08] text-[#FFC04D]"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "9.5px",
                letterSpacing: "0.18em",
                padding: "3px 8px",
                lineHeight: 1,
              }}
              title="Placeholder copy. Awaiting client permission for the real quote."
            >
              <span
                aria-hidden
                className="block h-[5px] w-[5px] rounded-full bg-[#FFC04D]"
              />
              Pending approval
            </span>
          </motion.div>

          <motion.span
            variants={itemVariants}
            aria-hidden
            className="block font-serif text-accent"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(4rem, 8vw, 8rem)",
              lineHeight: 0.8,
              fontStyle: "italic",
              marginBottom: "-30px",
              marginLeft: "-6px",
              opacity: 0.55,
            }}
          >
            &ldquo;
          </motion.span>

          <motion.blockquote
            variants={itemVariants}
            className="relative max-w-[60ch] text-text-primary"
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
              fontWeight: 500,
              lineHeight: 1.45,
              letterSpacing: "-0.015em",
            }}
          >
            {PLACEHOLDER.quote}
          </motion.blockquote>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <span
              aria-hidden
              className="h-px w-10 bg-accent/60"
            />
            <div className="flex flex-col">
              <span
                className="text-text-primary"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "-0.005em",
                }}
              >
                {PLACEHOLDER.attribution.name}
              </span>
              <span
                className="text-text-tertiary"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                {PLACEHOLDER.attribution.role} ·{" "}
                {PLACEHOLDER.attribution.company}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
