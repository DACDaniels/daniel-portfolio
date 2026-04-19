"use client";

import { useEffect, useMemo, useState } from "react";

type TokenType =
  | "comment"
  | "keyword"
  | "string"
  | "fn"
  | "property"
  | "operator"
  | "bracket"
  | "arrow"
  | "plain";

type Token = { type: TokenType; text: string };

const COLORS: Record<TokenType, { color: string; italic?: boolean }> = {
  comment: { color: "#4a5568", italic: true },
  keyword: { color: "#00E5C0" },
  string: { color: "#a8d4ff" },
  fn: { color: "#ffd580" },
  property: { color: "#ffffff" },
  operator: { color: "rgba(255,255,255,0.6)" },
  bracket: { color: "rgba(255,255,255,0.8)" },
  arrow: { color: "#00E5C0" },
  plain: { color: "rgba(255,255,255,0.7)" },
};

const LINES: Token[][] = [
  [{ type: "comment", text: "// what i believe" }],
  [
    { type: "keyword", text: "const" },
    { type: "plain", text: " " },
    { type: "property", text: "daniel" },
    { type: "operator", text: " = " },
    { type: "bracket", text: "{" },
  ],
  [
    { type: "plain", text: "  " },
    { type: "property", text: "role" },
    { type: "operator", text: ": " },
    { type: "string", text: '"Software Engineer"' },
    { type: "operator", text: "," },
  ],
  [
    { type: "plain", text: "  " },
    { type: "property", text: "location" },
    { type: "operator", text: ": " },
    { type: "string", text: '"Harare, Zimbabwe"' },
    { type: "operator", text: "," },
  ],
  [
    { type: "plain", text: "  " },
    { type: "property", text: "building" },
    { type: "operator", text: ": " },
    { type: "bracket", text: "[" },
  ],
  [
    { type: "plain", text: "    " },
    { type: "string", text: '"fish biomass detection on $35 hardware"' },
    { type: "operator", text: "," },
  ],
  [
    { type: "plain", text: "    " },
    { type: "string", text: '"custom metrics for edge computer vision"' },
    { type: "operator", text: "," },
  ],
  [
    { type: "plain", text: "    " },
    { type: "string", text: '"real systems that solve real problems"' },
  ],
  [
    { type: "plain", text: "  " },
    { type: "bracket", text: "]" },
    { type: "operator", text: "," },
  ],
  [
    { type: "plain", text: "  " },
    { type: "property", text: "philosophy" },
    { type: "operator", text: ": " },
    { type: "bracket", text: "(" },
    { type: "plain", text: "problem" },
    { type: "bracket", text: ")" },
    { type: "plain", text: " " },
    { type: "arrow", text: "=>" },
    { type: "plain", text: " " },
    { type: "bracket", text: "{" },
  ],
  [
    { type: "plain", text: "    " },
    { type: "keyword", text: "return" },
    { type: "plain", text: " problem." },
    { type: "fn", text: "solve" },
    { type: "bracket", text: "(" },
    { type: "string", text: '"from first principles"' },
    { type: "bracket", text: ")" },
  ],
  [
    { type: "plain", text: "  " },
    { type: "bracket", text: "}" },
  ],
  [{ type: "bracket", text: "}" }],
];

const PILLS = ["TypeScript", "Python", "OpenCV", "Edge AI"];
const START_DELAY_MS = 1500;

export function CodeTerminal() {
  const totalChars = useMemo(() => {
    let total = 0;
    for (let i = 0; i < LINES.length; i++) {
      for (const t of LINES[i]) total += t.text.length;
      if (i < LINES.length - 1) total += 1;
    }
    return total;
  }, []);

  const [typedCount, setTypedCount] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mm = window.matchMedia("(max-width: 767px)");
    const syncRm = () => setReducedMotion(rm.matches);
    const syncMm = () => setIsMobile(mm.matches);
    syncRm();
    syncMm();
    rm.addEventListener("change", syncRm);
    mm.addEventListener("change", syncMm);
    return () => {
      rm.removeEventListener("change", syncRm);
      mm.removeEventListener("change", syncMm);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setTypedCount(totalChars);
      return;
    }
    const charDelay = isMobile ? 12 : 18;
    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setTypedCount((prev) => {
          if (prev >= totalChars) {
            if (interval) clearInterval(interval);
            return totalChars;
          }
          return prev + 1;
        });
      }, charDelay);
    }, START_DELAY_MS);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [totalChars, isMobile, reducedMotion]);

  const isTypingActive = typedCount > 0 && typedCount < totalChars;
  useEffect(() => {
    if (isTypingActive) {
      setCursorOn(true);
      return;
    }
    const id = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(id);
  }, [isTypingActive]);

  let remaining = typedCount;
  let activeLineIndex = 0;
  const renderedLines: React.ReactNode[][] = LINES.map(() => []);

  for (let li = 0; li < LINES.length; li++) {
    const line = LINES[li];
    if (remaining <= 0) break;
    const lineLength = line.reduce((s, t) => s + t.text.length, 0);
    const lineConsume = Math.min(remaining, lineLength);
    remaining -= lineConsume;
    activeLineIndex = li;

    let lineRem = lineConsume;
    const nodes: React.ReactNode[] = [];
    for (let ti = 0; ti < line.length; ti++) {
      if (lineRem <= 0) break;
      const token = line[ti];
      const take = Math.min(token.text.length, lineRem);
      lineRem -= take;
      const text = token.text.slice(0, take);
      if (!text) continue;
      const { color, italic } = COLORS[token.type];
      nodes.push(
        <span
          key={ti}
          style={{ color, fontStyle: italic ? "italic" : undefined }}
        >
          {text}
        </span>,
      );
    }
    renderedLines[li] = nodes;

    if (li < LINES.length - 1 && remaining > 0) {
      remaining -= 1;
      activeLineIndex = li + 1;
    }
  }

  const cursor = (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: "7px",
        height: "1.05em",
        marginLeft: "1px",
        background: "#00E5C0",
        verticalAlign: "text-bottom",
        opacity: cursorOn ? 1 : 0,
        boxShadow: "0 0 8px rgba(0,229,192,0.5)",
      }}
    />
  );

  return (
    <div className="relative flex h-full w-full flex-col bg-[#0c0c0c]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#111] px-4">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "#ff5f57" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "#febc2e" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "rgba(0,229,192,0.6)" }}
          />
        </div>
        <span
          className="font-[family-name:var(--font-jetbrains-mono)] text-[11px]"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          ~/daniel@harare
        </span>
      </div>

      <div className="relative flex-1 overflow-x-auto overflow-y-hidden px-4 py-3.5 md:px-5 md:py-[18px] lg:px-[22px] lg:py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10.5px] leading-[1.75] md:text-[11.5px] lg:text-[12.5px]">
          {LINES.map((_, i) => (
            <div key={i} className="whitespace-pre">
              {renderedLines[i].length > 0 ? renderedLines[i] : "\u200B"}
              {i === activeLineIndex && cursor}
            </div>
          ))}
        </div>
      </div>

      <div className="flex h-[42px] shrink-0 items-center gap-1.5 border-t border-white/[0.06] bg-[#0a0a0a] px-4">
        {PILLS.map((p) => (
          <span
            key={p}
            className="rounded px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px]"
            style={{
              color: "rgba(0,229,192,0.9)",
              border: "1px solid rgba(0,229,192,0.2)",
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
