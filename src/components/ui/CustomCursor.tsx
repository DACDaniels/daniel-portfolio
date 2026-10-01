"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-spotlight-card], [data-cursor-interactive], input, textarea, select';

const RING_SIZE = 30;
const RING_HOVER_SCALE = 52 / RING_SIZE;
// Critically damped spring for the ring: it lands within 1 px of a 400 px
// jump in about 85 ms, so it trails the dot slightly but never floats.
const OMEGA = 100;

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

    // Pointer target, written by pointermove and read in the frame callback.
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    // Ring spring state: position, scale and their velocities.
    let rx = mx;
    let ry = my;
    let vx = 0;
    let vy = 0;
    let rs = 1;
    let vs = 0;
    let targetScale = 1;
    let visible = false;
    let raf = 0;
    let last = 0;

    const settled = () =>
      Math.abs(mx - rx) < 0.1 &&
      Math.abs(my - ry) < 0.1 &&
      Math.abs(vx) < 0.1 &&
      Math.abs(vy) < 0.1 &&
      Math.abs(targetScale - rs) < 0.001 &&
      Math.abs(vs) < 0.001;

    // Exact step of a critically damped spring towards target. Closed form,
    // so it stays stable however long a frame takes.
    const spring = (x: number, v: number, target: number, dt: number) => {
      const offset = x - target;
      const decay = Math.exp(-OMEGA * dt);
      const k = v + OMEGA * offset;
      return [
        target + (offset + k * dt) * decay,
        (v - OMEGA * k * dt) * decay,
      ] as const;
    };

    const frame = (now: number) => {
      // Clamp dt so a backgrounded tab does not make the ring jump.
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;

      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      [rx, vx] = spring(rx, vx, mx, dt);
      [ry, vy] = spring(ry, vy, my, dt);
      [rs, vs] = spring(rs, vs, targetScale, dt);
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${rs})`;

      if (settled()) {
        rx = mx;
        ry = my;
        rs = targetScale;
        vx = vy = vs = 0;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${rs})`;
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const show = (on: boolean) => {
      visible = on;
      const value = on ? "1" : "0";
      dot.style.opacity = value;
      ring.style.opacity = value;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        // Appear at the pointer instead of springing in from the last spot.
        rx = mx;
        ry = my;
        vx = vy = 0;
        show(true);
      }
      schedule();
    };

    const onLeave = () => show(false);

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const interactive = Boolean(target?.closest?.(INTERACTIVE_SELECTOR));
      ring.dataset.state = interactive ? "interactive" : "default";
      targetScale = interactive ? RING_HOVER_SCALE : 1;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        data-custom-cursor
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
        data-custom-cursor
        data-state="default"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: "999px",
          border: "1px solid rgba(0,229,192,0.45)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 200ms ease",
          willChange: "transform",
        }}
      />
      <style jsx global>{`
        .custom-cursor-active,
        .custom-cursor-active * {
          cursor: none !important;
        }
        /* An open <dialog> sits in the top layer, above the custom cursor,
           so the lightbox gets the normal system cursor instead. Both
           revert on their own when the dialog closes. */
        .custom-cursor-active dialog[open],
        .custom-cursor-active dialog[open] * {
          cursor: auto !important;
        }
        html:has(dialog[open]) [data-custom-cursor] {
          opacity: 0 !important;
        }
        /* Size changes come from the scale() in the transform; colour
           switches instantly. */
        [data-custom-cursor][data-state="interactive"] {
          border-color: rgba(0, 229, 192, 0.9) !important;
          background: rgba(0, 229, 192, 0.08);
        }
      `}</style>
    </>
  );
}
