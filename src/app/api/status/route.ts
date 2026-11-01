import {
  STATUS_TARGETS,
  type StatusKey,
  type StatusReport,
} from "@/lib/siteStatus";

// Cached for 5 minutes: at most one round of checks every 5 minutes,
// whatever the traffic.
export const revalidate = 300;

const TIMEOUT_MS = 4000;

async function check(url: string, round: string): Promise<"up" | "down"> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      // The round's time is part of the request, so it is part of Next's
      // fetch cache key: each regeneration of this route really checks
      // again, and checkedAt never sits on an older result.
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "user-agent": "dev.danielchadambuka.com status check",
        "x-status-round": round,
      },
    });
    // Free the connection; only the status code matters.
    await res.body?.cancel().catch(() => undefined);
    return res.status >= 200 && res.status < 300 ? "up" : "down";
  } catch {
    return "down";
  }
}

export async function GET() {
  const keys = Object.keys(STATUS_TARGETS) as StatusKey[];
  const checkedAt = new Date().toISOString();
  const results = await Promise.all(
    keys.map((k) => check(STATUS_TARGETS[k], checkedAt)),
  );
  const report: StatusReport = {
    checkedAt,
    sites: Object.fromEntries(keys.map((k, i) => [k, results[i]])) as StatusReport["sites"],
  };
  // Only up/down and the time go out: no URLs, codes or timings.
  return Response.json(report);
}
