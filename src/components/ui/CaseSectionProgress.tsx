"use client";

import { useEffect, useState } from "react";

type ProgressItem = { id: string; label: string };

type Props = {
  items: ProgressItem[];
};

export function CaseSectionProgress({ items }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const visibility: Record<string, number> = {};
    const ratios: Record<string, number> = {};
    const observers: IntersectionObserver[] = [];

    const handle = () => {
      let bestId = items[0]?.id;
      let bestScore = -Infinity;
      for (const item of items) {
        const score = (visibility[item.id] ?? 0) * (ratios[item.id] ?? 0);
        if (score > bestScore) {
          bestScore = score;
          bestId = item.id;
        }
      }
      if (bestId) setActiveId(bestId);
    };

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibility[item.id] = entry.isIntersecting ? 1 : 0;
            ratios[item.id] = entry.intersectionRatio;
          }
          handle();
        },
        {
          threshold: [0, 0.2, 0.5, 0.8],
          rootMargin: "-120px 0px -45% 0px",
        },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className="pointer-events-none fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="pointer-events-auto flex flex-col gap-1.5">
        {items.map((item, i) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-center gap-3"
                aria-current={active ? "true" : undefined}
              >
                <span
                  className="block transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: active
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.35)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="block h-px transition-all duration-300"
                  style={{
                    width: active ? "32px" : "16px",
                    background: active
                      ? "var(--accent)"
                      : "rgba(255,255,255,0.18)",
                    boxShadow: active
                      ? "0 0 8px rgba(0,229,192,0.65)"
                      : "none",
                  }}
                />
                <span
                  className="block whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: active
                      ? "rgba(0,229,192,0.95)"
                      : "rgba(255,255,255,0.55)",
                  }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
