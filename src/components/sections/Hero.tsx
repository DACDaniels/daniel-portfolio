"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { CodeTerminal } from "@/components/ui/CodeTerminal";
import { DotGrid } from "@/components/ui/DotGrid";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NumberTicker } from "@/components/ui/NumberTicker";

const STATS = [
  { value: 5, suffix: "+", label: "Projects" },
  { value: 3, suffix: "+", label: "Years" },
  { value: 2, suffix: "", label: "Live Products" },
  { value: 100, suffix: "%", label: "Committed" },
];

export function Hero() {
  const nameDuration = 0.8;
  const danielChars = 6;
  const chadambukaChars = 10;
  const staggerMs = 40;
  const line2Delay = (danielChars * staggerMs) / 1000 + 0.1;
  const subtitleDelay =
    line2Delay + (chadambukaChars * staggerMs) / 1000 + nameDuration * 0.4;
  const bioDelay = subtitleDelay + 0.5;
  const ctaDelay = bioDelay + 0.3;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden pt-24 md:pb-[140px]"
    >
      <DotGrid />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent opacity-[0.12] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent opacity-[0.08] blur-[120px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 items-center px-5 md:px-8 lg:px-10">
        <div className="flex w-full flex-col items-stretch gap-12 md:flex-row md:items-center md:gap-10 lg:gap-12">
          <div className="flex min-w-0 flex-1 flex-col md:pr-6 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-bg-surface/60 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.2em] text-text-secondary backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#00E5C0]" />
              </span>
              AVAILABLE FOR WORK
            </motion.div>

            <h1 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,8vw,2.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-text-primary md:text-[clamp(1.875rem,4.5vw,3.5rem)] lg:text-[clamp(2.5rem,5.25vw,4.5rem)]">
              <AnimatedText
                text="Daniel"
                as="span"
                className="block whitespace-nowrap"
                delay={0}
                staggerMs={staggerMs}
              />
              <AnimatedText
                text="Chadambuka"
                as="span"
                className="block whitespace-nowrap"
                delay={line2Delay}
                staggerMs={staggerMs}
              />
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: subtitleDelay }}
              className="mt-6 flex w-fit flex-col"
            >
              <span className="font-[family-name:var(--font-dm-sans)] text-xl font-medium text-text-primary md:text-2xl">
                Software Engineer
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: subtitleDelay + 0.2,
                  ease: [0.2, 0.65, 0.3, 0.95],
                }}
                style={{ originX: 0 }}
                className="mt-1 h-[2px] w-full bg-accent shadow-[0_0_12px_rgba(0,229,192,0.6)]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: bioDelay }}
              className="mt-7 max-w-xl text-base leading-[1.7] text-text-secondary md:text-lg"
            >
              I build real-world software systems — from computer vision on
              edge devices to production web platforms — out of Harare,
              Zimbabwe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ctaDelay }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#projects"
                strength={18}
                className="group relative min-h-[48px] overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg-primary shadow-[0_12px_32px_-8px_rgba(0,229,192,0.5)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-8px_rgba(0,229,192,0.75)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative inline-flex items-center gap-2">
                  View My Work
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2 7h10m0 0L8 3m4 4L8 11"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </MagneticButton>

              <MagneticButton
                href="#contact"
                strength={18}
                className="group min-h-[48px] rounded-full border border-accent/60 px-7 py-3.5 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent/10"
              >
                Let&apos;s Talk
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: subtitleDelay, ease: [0.2, 0.65, 0.3, 0.95] }}
            className="relative mx-auto w-full max-w-[420px] shrink-0 md:mx-0 md:ml-auto md:w-[380px] lg:w-[480px]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-14 z-0 rounded-[32px] bg-accent/20 blur-[90px]"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[1px] z-10 rounded-[17px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,229,192,0.45) 0%, rgba(0,229,192,0.08) 35%, rgba(255,255,255,0.04) 55%, rgba(0,229,192,0.08) 75%, rgba(0,229,192,0.35) 100%)",
              }}
            />

            <div className="relative z-20 h-[360px] overflow-hidden rounded-[16px] border border-border bg-bg-surface shadow-[0_28px_70px_-16px_rgba(0,229,192,0.25),0_0_0_1px_rgba(255,255,255,0.04)] md:h-[400px] lg:h-[460px]">
              <CodeTerminal />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: ctaDelay + 0.3 }}
        className="relative z-10 mt-8 border-t border-border bg-bg-primary/40 backdrop-blur-sm md:absolute md:inset-x-0 md:bottom-0 md:mt-0"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 divide-x divide-border px-5 md:grid-cols-4 md:px-10">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 px-4 py-7 md:px-6 md:py-8"
            >
              <span className="font-[family-name:var(--font-syne)] text-3xl font-extrabold tracking-[-0.03em] text-accent md:text-4xl lg:text-5xl">
                <NumberTicker
                  value={stat.value}
                  suffix={stat.suffix}
                  triggerOnMount
                />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-tertiary md:text-[11px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
