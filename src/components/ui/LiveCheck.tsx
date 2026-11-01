"use client";

import { useEffect, useState } from "react";
import {
  isStatusReport,
  STATUS_MAX_AGE_MS,
  type StatusKey,
  type StatusReport,
} from "@/lib/siteStatus";

// One request per page view, shared by every card.
let pending: Promise<StatusReport | null> | null = null;

function loadStatus(): Promise<StatusReport | null> {
  if (!pending) {
    pending = fetch("/api/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: unknown) => (isStatusReport(data) ? data : null))
      .catch(() => null);
  }
  return pending;
}

function useStatus() {
  const [report, setReport] = useState<StatusReport | null>(null);
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    let alive = true;
    loadStatus().then((r) => {
      if (!alive) return;
      setReport(r);
      setNow(Date.now());
    });
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  return { report, now };
}

function agoLabel(ms: number) {
  const min = Math.floor(ms / 60_000);
  return min < 1 ? "checked just now" : `checked ${min} min ago`;
}

/**
 * "Live · checked N min ago" beside a LIVE badge, shown only when the
 * server's check of that system was 2xx and is fresh. On any failure,
 * error or stale check it renders nothing: never red, never a guess.
 */
export function LiveCheck({ statusKey }: { statusKey: StatusKey }) {
  const { report, now } = useStatus();
  if (!report || now === 0) return null;
  if (report.sites[statusKey] !== "up") return null;
  const age = now - Date.parse(report.checkedAt);
  if (age > STATUS_MAX_AGE_MS) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-black/80 px-2 py-1 text-white/80 backdrop-blur-md"
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "10px",
        letterSpacing: "0.02em",
        lineHeight: 1,
      }}
    >
      <span
        aria-hidden
        className="live-check-dot block h-[5px] w-[5px] rounded-full bg-accent"
      />
      <time dateTime={report.checkedAt}>
        Live · {agoLabel(Math.max(0, age))}
      </time>
    </span>
  );
}
