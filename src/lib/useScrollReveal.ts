"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  amount?: number;
  rootMargin?: string;
  fallbackMs?: number;
};

/**
 * Reveal hook with an IO + timeout fallback.
 *
 * motion's `whileInView` leaves the SSR'd HTML at the `hidden` variant until
 * IntersectionObserver fires. Full-page screenshots, scrapers, and any path
 * where IO never fires would leave the content invisible forever. This hook
 * guarantees a reveal after `fallbackMs` even if IO never triggers.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: Options,
) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    const fallbackMs = options?.fallbackMs ?? 1500;
    let observer: IntersectionObserver | null = null;

    const fallback = window.setTimeout(() => setRevealed(true), fallbackMs);

    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setRevealed(true);
            observer?.disconnect();
            window.clearTimeout(fallback);
          }
        },
        {
          threshold: options?.amount ?? 0.1,
          rootMargin: options?.rootMargin ?? "0px 0px -5% 0px",
        },
      );
      observer.observe(el);
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(fallback);
    };
  }, [revealed, options?.amount, options?.rootMargin, options?.fallbackMs]);

  return { ref, revealed };
}
