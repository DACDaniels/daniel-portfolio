import {
  STATUS_TARGETS,
  type StatusKey,
  type StatusReport,
} from "@/lib/siteStatus";

// Cached for 5 minutes: at most one round of checks every 5 minutes,
// whatever the traffic.
export const revalidate = 300;

const TIMEOUT_MS = 4000;

async function check(url: string): Promise<"up" | "down"> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "dev.danielchadambuka.com status check" },
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
  const results = await Promise.all(keys.map((k) => check(STATUS_TARGETS[k])));
  const report: StatusReport = {
    checkedAt: new Date().toISOString(),
    sites: Object.fromEntries(keys.map((k, i) => [k, results[i]])) as StatusReport["sites"],
  };
  // Only up/down and the time go out: no URLs, codes or timings.
  return Response.json(report);
}
