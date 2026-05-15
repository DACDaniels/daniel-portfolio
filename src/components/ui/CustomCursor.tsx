"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-spotlight-card], [data-cursor-interactive], input, textarea, select';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest?.(INTERACTIVE_SELECTOR)) {
        ring.dataset.state = "interactive";
      } else {
        ring.dataset.state = "default";
      }
    };

    const tick = () => {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          borderRadius: "999px",
          background: "#00E5C0",
          boxShadow: "0 0 12px rgba(0,229,192,0.65)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "opacity 200ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        data-state="default"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 30,
          height: 30,
          borderRadius: "999px",
          border: "1px solid rgba(0,229,192,0.45)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition:
            "opacity 200ms ease, width 220ms ease, height 220ms ease, border-color 200ms ease, background-color 200ms ease",
          willChange: "transform",
        }}
      />
      <style jsx global>{`
        .custom-cursor-active,
        .custom-cursor-active * {
          cursor: none !important;
        }
        [data-state="interactive"] {
          width: 52px !important;
          height: 52px !important;
          border-color: rgba(0, 229, 192, 0.9) !important;
          background: rgba(0, 229, 192, 0.08);
        }
      `}</style>
    </>
  );
}
