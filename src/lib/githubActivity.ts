// GitHub contribution calendar for the "Shipping, every week" graph in
// How I build. Server only: the token never reaches the browser, and only
// the date and a level word per day leave this file. No counts, no totals,
// no repository names (DECISIONS.md, 2026-11-01).

export type ActivityLevel = "none" | "light" | "steady" | "heavy";
export type ActivityDay = { date: string; level: ActivityLevel };
/** Weeks oldest first; each week Sunday to Saturday (may be partial at the ends). */
export type ActivityWeeks = ActivityDay[][];

const LEVELS: Record<string, ActivityLevel> = {
  NONE: "none",
  FIRST_QUARTILE: "light",
  SECOND_QUARTILE: "steady",
  THIRD_QUARTILE: "steady",
  FOURTH_QUARTILE: "heavy",
};

const QUERY = `query($from: DateTime!, $to: DateTime!) {
  viewer {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks { contributionDays { date contributionLevel } }
      }
    }
  }
}`;

type CalendarResponse = {
  data?: {
    viewer?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: { contributionDays?: { date?: unknown; contributionLevel?: unknown }[] }[];
        };
      };
    };
  };
};

/**
 * Last 12 months, refreshed once a day. Returns null when the token is
 * missing, the call fails or the data looks wrong, so the section hides
 * instead of showing an empty or broken graph.
 */
export async function getActivity(): Promise<ActivityWeeks | null> {
  const token = process.env.GITHUB_CONTRIBUTIONS_TOKEN;
  if (!token) return null;

  // Whole days, so the request (and Next's fetch cache key) is stable for a day.
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const from = new Date(today);
  from.setUTCFullYear(from.getUTCFullYear() - 1);
  from.setUTCDate(from.getUTCDate() + 1);

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
        "content-type": "application/json",
        "user-agent": "dev.danielchadambuka.com activity graph",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { from: from.toISOString(), to: new Date(today.getTime() + 86_399_999).toISOString() },
      }),
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as CalendarResponse;
    const weeks = json.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks;
    if (!Array.isArray(weeks) || weeks.length < 40) return null;

    const out: ActivityWeeks = weeks.map((w) =>
      (w.contributionDays ?? []).flatMap((d) =>
        typeof d.date === "string" && typeof d.contributionLevel === "string" && d.contributionLevel in LEVELS
          ? [{ date: d.date, level: LEVELS[d.contributionLevel] }]
          : [],
      ),
    );
    // A graph with no activity at all is treated as a failure, never shown.
    if (!out.some((w) => w.some((d) => d.level !== "none"))) return null;
    return out;
  } catch {
    return null;
  }
}
