"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bgAlpha = useTransform(scrollY, [0, 80], [0, 0.8]);
  const blurPx = useTransform(scrollY, [0, 80], [0, 14]);
  const borderAlpha = useTransform(scrollY, [0, 80], [0, 0.06]);

  const bg = useMotionTemplate`rgba(8, 8, 8, ${bgAlpha})`;
  const backdrop = useMotionTemplate`blur(${blurPx}px) saturate(140%)`;
  const borderBottomColor = useMotionTemplate`rgba(255, 255, 255, ${borderAlpha})`;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        style={{
          background: bg,
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
          borderBottom: "1px solid transparent",
          borderBottomColor,
        }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a
            href="#home"
            className="group relative font-[family-name:var(--font-syne)] text-2xl font-bold tracking-tight text-text-primary transition-colors duration-300 hover:text-accent"
          >
            DC<span className="text-accent">.</span>
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <MagneticButton
                  href={link.href}
                  strength={10}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </MagneticButton>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton
              href="#contact"
              strength={14}
              className="group relative overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg-primary shadow-[0_8px_24px_-4px_rgba(0,229,192,0.4)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-4px_rgba(0,229,192,0.6)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">Contact Me</span>
            </MagneticButton>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-5 bg-text-primary transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-5 bg-text-primary transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-primary/95 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.4 }}
                className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-bg-primary"
            >
              Contact Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
