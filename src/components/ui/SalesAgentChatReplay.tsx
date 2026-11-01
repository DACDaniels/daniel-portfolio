"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { CONVERSATION, SalesAgentChat } from "@/components/ui/SalesAgentChat";

/**
 * The sample conversation, played back: typing dots, then each message, then
 * the quotation PDF arriving. Starts when scrolled into view; Pause and
 * Replay sit under the phone. Under reduced motion the whole conversation
 * shows at once and there is nothing to play. Same text as SalesAgentChat.
 *
 * The server and the first client render show the full conversation, so it
 * reads complete with JavaScript off and hydration matches. The replay (and
 * the controls) begin only after mount, once the phone scrolls into view.
 */

const TOTAL = CONVERSATION.length;

/** How long the dots show before turn i lands, from its length. */
function typingMs(i: number): number {
  const t = CONVERSATION[i];
  if (t.from === "pdf") return 1100;
  const perChar = t.from === "agent" ? 11 : 8;
  return Math.min(2400, 700 + t.text.length * perChar);
}
const GAP_MS = 650;

/** False on the server and during hydration, true after mount. */
const noop = () => () => {};
function useMounted(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function SalesAgentChatReplay({ className = "" }: { className?: string }) {
  const prefersReduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [shown, setShown] = useState(TOTAL);
  const [typing, setTyping] = useState(false);

  // Before mount, render as reduced: full conversation, no controls. That is
  // what the server sends, whatever the visitor's motion setting.
  const reduceMotion = !mounted || prefersReduced;

  // Start once, the first time the phone is well into view: clear the
  // conversation and play it from the top.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion || started) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(0);
          setTyping(false);
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, started]);

  // One timer at a time: a gap, then the dots, then the message.
  useEffect(() => {
    if (reduceMotion || !started || !playing || shown >= TOTAL) return;
    const id = window.setTimeout(
      () => {
        if (typing) {
          setTyping(false);
          setShown((n) => n + 1);
        } else {
          setTyping(true);
        }
      },
      typing ? typingMs(shown) : shown === 0 ? 300 : GAP_MS,
    );
    return () => window.clearTimeout(id);
  }, [reduceMotion, started, playing, shown, typing]);

  const done = !started || shown >= TOTAL;
  const next = CONVERSATION[shown];
  const typingSide = typing && next ? (next.from === "customer" ? "customer" : "agent") : null;

  const replay = () => {
    setShown(0);
    setTyping(false);
    setPlaying(true);
    setStarted(true);
  };

  const btn =
    "inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-[14px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div
      ref={ref}
      className={className}
      data-chat-replay={!started ? "static" : shown >= TOTAL ? "done" : "playing"}
    >
      {/* Screen readers get the whole conversation once, not a replay. */}
      <ol className="sr-only">
        {CONVERSATION.map((t, i) => (
          <li key={i}>
            {t.from === "pdf" ? `Agent sends ${t.name}` : `${t.from === "agent" ? "Agent" : "Customer"}: ${t.text}`}
          </li>
        ))}
      </ol>
      <div aria-hidden>
        <SalesAgentChat
          className="aspect-[9/17] w-full"
          shown={reduceMotion ? undefined : shown}
          typing={reduceMotion ? null : typingSide}
          animateLast={!reduceMotion && started}
        />
      </div>
      {!reduceMotion && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            disabled={done}
            className={`${btn} border-white/20 text-white hover:border-accent/50 hover:text-accent active:border-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white`}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={replay}
            className={`${btn} border-accent/40 text-accent hover:border-accent hover:bg-accent/10 active:bg-accent/20`}
          >
            Replay
          </button>
        </div>
      )}
    </div>
  );
}
