// Live status checks for the systems on the Projects cards.
// The server route (src/app/api/status/route.ts) runs these checks;
// visitors' browsers only ever call /api/status, never the client sites.

export const STATUS_TARGETS = {
  steadyhands: "https://steadyhandscatering.com",
  endoscopy: "https://www.endoscopysuite.co.zw",
  fishtech: "https://www.fishtech.co.zw",
  healthAndLongevity: "https://www.healthandlongevity.co.zw",
  ops: "https://ops.fishtech.co.zw/ping",
} as const;

export type StatusKey = keyof typeof STATUS_TARGETS;

/** What /api/status returns: up or down per system, and when it was checked. */
export type StatusReport = {
  checkedAt: string;
  sites: Record<StatusKey, "up" | "down">;
};

/** A check older than this is not shown, so "live" is never stale. */
export const STATUS_MAX_AGE_MS = 15 * 60 * 1000;

export function isStatusReport(value: unknown): value is StatusReport {
  if (typeof value !== "object" || value === null) return false;
  const v = value as { checkedAt?: unknown; sites?: unknown };
  if (typeof v.checkedAt !== "string" || Number.isNaN(Date.parse(v.checkedAt)))
    return false;
  if (typeof v.sites !== "object" || v.sites === null) return false;
  const sites = v.sites as Record<string, unknown>;
  return (Object.keys(STATUS_TARGETS) as StatusKey[]).every(
    (k) => sites[k] === "up" || sites[k] === "down",
  );
}
