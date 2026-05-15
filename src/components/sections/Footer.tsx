"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const CONNECT_LINKS = [
  { label: "GitHub", href: "https://github.com/DACDaniels" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/daniel-chadambuka-792b74277",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/263780802880?text=Hi%20Daniel%2C%20I%20saw%20your%20portfolio%20and",
  },
  { label: "Email", href: "mailto:chadambukadaniel@gmail.com" },
] as const;

const COLOPHON_LINES = ["Next.js 15", "Vercel", "Geist · DM Sans", "v.2026.05"];

const NAME_WORDS = ["Daniel", "Chadambuka"] as const;

export function Footer() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

  const sectionVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  const signatureVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const wordVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.95] },
        },
      };

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden bg-bg-primary pt-20 pb-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[200px] left-1/2 z-0 h-[400px] w-[min(800px,90vw)] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 229, 192, 0.08), transparent 70%)",
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={sectionVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent"
          >
            {"// footer.tsx"}
          </motion.div>

          <motion.div
            variants={signatureVariants}
            aria-hidden
            className="font-heading font-bold text-text-primary pt-10 pb-16 md:whitespace-nowrap"
            style={{
              fontSize: "clamp(2.5rem, 7.5vw, 7rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
            }}
          >
            <motion.span variants={wordVariants} className="inline-block">
              {NAME_WORDS[0]}
            </motion.span>{" "}
            <motion.span variants={wordVariants} className="inline-block">
              {NAME_WORDS[1]}
              <span
                className="inline-block w-[0.18em] h-[0.18em] rounded-[0.025em] bg-accent align-baseline ml-[0.04em]"
                style={{
                  filter: "drop-shadow(0 0 24px rgba(0, 229, 192, 0.5))",
                }}
              />
            </motion.span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            aria-hidden
            className="h-[0.5px] w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.12) 20%, rgba(255, 255, 255, 0.12) 80%, transparent)",
            }}
          />

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12"
          >
            <FooterColumn label="Identity">
              <div className="font-heading text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-text-primary">
                Software Engineer
              </div>
              <div className="mt-1.5 font-body text-[14px] font-normal leading-[1.5] text-white/60">
                Harare, ZW · Available for remote work
              </div>
            </FooterColumn>

            <FooterColumn label="Navigate">
              <ul className="m-0 list-none p-0">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block font-body text-[14px] font-normal leading-[2] text-white/70 no-underline transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn label="Connect">
              <ul className="m-0 list-none p-0">
                {CONNECT_LINKS.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-label={
                          isExternal
                            ? `${link.label} (opens in new tab)`
                            : link.label
                        }
                        className="group inline-flex items-center gap-2 font-body text-[14px] font-normal leading-[2] text-white/70 no-underline transition-colors duration-200 hover:text-accent"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="text-white/30 transition-[color,transform] duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-accent"
                          size={14}
                          strokeWidth={2}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </FooterColumn>

            <FooterColumn label="Colophon">
              <ul className="m-0 list-none p-0 font-mono text-[12px] leading-[1.9] text-white/50">
                {COLOPHON_LINES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </FooterColumn>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 border-t-[0.5px] border-white/[0.06] py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
          >
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.06em] text-text-tertiary">
              © 2026 Daniel Chadambuka · All rights reserved
            </p>

            <div className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                style={{
                  boxShadow: "0 0 8px var(--accent)",
                  animation: reduceMotion
                    ? "none"
                    : "live-pulse 2s ease-in-out infinite",
                }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/50">
                Available for work
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
        {label}
      </div>
      {children}
    </div>
  );
}
