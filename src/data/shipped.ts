// "Recently shipped" strip at the top of About. Newest first; the strip
// shows the first five. Rule (CLAUDE.md): every portfolio PR that ships
// something visible adds one line here. Each date is checked against its
// source; the source is noted beside the entry. Same copy rules as the site.

export type ShippedEntry = {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** One plain line. No counts, prices or dollar figures. */
  text: string;
  href?: string;
};

export const SHIPPED: ShippedEntry[] = [
  {
    // This repo, DECISIONS.md 2026-11-01 (phone first, project pages).
    date: "2026-11-01",
    text: "Portfolio: a page for every project, shorter cards and a phone-first pass.",
    href: "/projects/this-portfolio",
  },
  {
    // This repo, DECISIONS.md 2026-11-01.
    date: "2026-11-01",
    text: "Portfolio: hiring page, Ctrl K search, live status lights and How I build.",
    href: "/hire",
  },
  {
    // blueacre-ops docs/DECISIONS.md, 2026-10-30.
    date: "2026-10-30",
    text: "FishTech Sales Agent rebuilt as an agent with tools, every reply checked in code.",
    href: "/projects/fishtech-sales-agent",
  },
  {
    // ruwende-platform DECISIONS.md, D-298 and D-306 (go-live 2026-10-17).
    date: "2026-10-17",
    text: "Health & Longevity live at healthandlongevity.co.zw.",
    href: "/projects/health-and-longevity",
  },
  {
    // blueacre-ops CLAUDE.md, "2026-10-09: fishtech.co.zw rebuilt and live".
    date: "2026-10-09",
    text: "fishtech.co.zw rebuilt and live, with a pond calculator and one price list.",
    href: "https://www.fishtech.co.zw",
  },
  {
    // endoscopy-suite DECISIONS.md, D35 (9 Oct 2026).
    date: "2026-10-09",
    text: "The Endoscopy Suite live at endoscopysuite.co.zw.",
    href: "https://www.endoscopysuite.co.zw",
  },
];

export const SHIPPED_SHOWN = 5;
