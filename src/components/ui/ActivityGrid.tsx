"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import type { ActivityLevel, ActivityWeeks } from "@/lib/githubActivity";

// Teal shades from the design tokens: surface, accent-dim, accent-glow, accent.
const SHADE: Record<ActivityLevel, string> = {
  none: "bg-white/[0.045]",
  light: "bg-accent-dim",
  steady: "bg-accent-glow",
  heavy: "bg-accent shadow-[0_0_8px_-1px_rgba(0,229,192,0.6)]",
};

const LEVEL_ORDER: ActivityLevel[] = ["none", "light", "steady", "heavy"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Cell = { date: string; level: ActivityLevel } | null;

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/**
 * The contribution grid. Hover or focus shows the date and a level word
 * only. Keyboard: Tab into the grid, arrow keys move by day and week.
 */
export function ActivityGrid({ weeks }: { weeks: ActivityWeeks }) {
  // Columns of seven cells, Sunday at the top; gaps where a week is partial.
  const columns = useMemo<Cell[][]>(
    () =>
      weeks.map((week) => {
        const col: Cell[] = Array.from({ length: 7 }, () => null);
        for (const day of week) col[new Date(`${day.date}T00:00:00Z`).getUTCDay()] = day;
        return col;
      }),
    [weeks],
  );

  // A month label over the first week that starts in that month.
  const monthLabels = useMemo(() => {
    const labels: { col: number; text: string }[] = [];
    let last = -1;
    columns.forEach((col, i) => {
      const first = col.find((c) => c !== null);
      if (!first) return;
      const m = Number(first.date.slice(5, 7)) - 1;
      if (m !== last) {
        if (i > 0 || first.date.slice(8) <= "07") labels.push({ col: i, text: MONTHS[m] });
        last = m;
      }
    });
    // Drop a label that would crowd the next one.
    return labels.filter((l, i) => i === labels.length - 1 || labels[i + 1].col - l.col >= 3);
  }, [columns]);

  const lastCol = columns.length - 1;
  const lastRow = columns[lastCol]?.reduce((acc, c, i) => (c ? i : acc), 0) ?? 0;
  const [active, setActive] = useState<{ w: number; d: number } | null>(null);
  const [focused, setFocused] = useState(false);

  const activeCell = active ? columns[active.w]?.[active.d] : null;
  const readout = activeCell ? `${longDate(activeCell.date)}: ${activeCell.level}` : "";

  const move = (dw: number, dd: number) => {
    const start = active ?? { w: lastCol, d: lastRow };
    let w = start.w;
    let d = start.d;
    // Step until we land on a real day (partial weeks have gaps).
    for (let i = 0; i < 14; i++) {
      d += dd;
      w += dw;
      if (d > 6) {
        d = 0;
        w += 1;
      } else if (d < 0) {
        d = 6;
        w -= 1;
      }
      if (w < 0 || w > lastCol) return;
      if (columns[w]?.[d]) {
        setActive({ w, d });
        return;
      }
      if (dw !== 0) return;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, [number, number]> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    const step = keys[e.key];
    if (step) {
      e.preventDefault();
      move(step[0], step[1]);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive({ w: 0, d: columns[0].findIndex((c) => c !== null) });
    } else if (e.key === "End") {
      e.preventDefault();
      setActive({ w: lastCol, d: lastRow });
    } else if (e.key === "Escape") {
      setActive(null);
    }
  };

  const n = columns.length;

  return (
    <div>
      <div
        role="group"
        tabIndex={0}
        aria-label="GitHub activity, last 12 months. Use the arrow keys to move between days."
        aria-describedby="activity-readout"
        onKeyDown={onKeyDown}
        onFocus={() => {
          setFocused(true);
          if (!active) setActive({ w: lastCol, d: lastRow });
        }}
        onBlur={() => {
          setFocused(false);
          setActive(null);
        }}
        onMouseLeave={() => {
          if (!focused) setActive(null);
        }}
        className="relative rounded-[10px] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-surface"
      >
        <div
          aria-hidden
          className="mb-2 grid font-mono text-[8px] text-text-tertiary sm:text-[10px]"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {monthLabels.map((l) => (
            <span key={`${l.col}-${l.text}`} className="whitespace-nowrap" style={{ gridColumnStart: l.col + 1 }}>
              {l.text}
            </span>
          ))}
        </div>

        <div
          aria-hidden
          className="grid grid-flow-col grid-rows-7 gap-px sm:gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {columns.map((col, w) =>
            col.map((cell, d) => (
              <span
                key={`${w}-${d}`}
                onMouseEnter={cell ? () => setActive({ w, d }) : undefined}
                className={`block aspect-square rounded-[2px] ${cell ? SHADE[cell.level] : ""} ${
                  active && active.w === w && active.d === d ? "ring-[1.5px] ring-accent ring-offset-1 ring-offset-bg-surface" : ""
                }`}
              />
            )),
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p
          id="activity-readout"
          aria-live="polite"
          className="min-h-[20px] font-mono text-[11px] tracking-[0.04em] text-text-secondary"
        >
          {readout ? (
            <>
              <span className="text-text-primary">{readout.split(": ")[0]}</span>
              <span className="text-text-tertiary"> · </span>
              <span className="text-accent">{readout.split(": ")[1]}</span>
            </>
          ) : (
            <span className="text-text-tertiary">Hover or focus a day</span>
          )}
        </p>
        <div aria-hidden className="flex items-center gap-3 font-mono text-[10px] text-text-tertiary">
          {LEVEL_ORDER.map((level) => (
            <span key={level} className="inline-flex items-center gap-1.5">
              <span className={`block h-[9px] w-[9px] rounded-[2px] ${SHADE[level]}`} />
              {level}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
