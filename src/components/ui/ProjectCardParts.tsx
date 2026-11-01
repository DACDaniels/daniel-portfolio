import Link from "next/link";
import { LiveCheck } from "@/components/ui/LiveCheck";
import type { StatusKey } from "@/lib/siteStatus";

/**
 * Shared pieces of the home page project cards. A card is one clickable
 * surface: the "Read the case study" link stretches over the whole card
 * (its ::after covers the card), and View Live sits above that overlay, so
 * there are no nested anchors and a keyboard user gets two tab stops.
 */

export type ProjectStatus = "live" | "building" | "research" | "meta";
export type ProjectLiveLink = { label: string; href: string };

const MONO = "var(--font-jetbrains-mono)";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "LIVE",
  building: "BUILDING",
  research: "RESEARCH",
  meta: "META",
};

const STATUS_STYLE: Record<ProjectStatus, string> = {
  live: "text-accent border-accent/35",
  building: "text-[#FFC04D] border-[#FFC04D]/35",
  research: "text-white/85 border-white/15",
  meta: "text-white/75 border-white/15",
};

/** Status badge plus the live check, top right of the card image. */
export function CardStatus({
  status,
  statusKey,
}: {
  status: ProjectStatus;
  statusKey?: StatusKey;
}) {
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5">
      {status === "live" && statusKey ? <LiveCheck statusKey={statusKey} /> : null}
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border bg-black/80 px-2 py-1 backdrop-blur-md ${STATUS_STYLE[status]}`}
        style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.05em", lineHeight: 1 }}
      >
        {/* The teal dot means a fresh, passing check, so it lives on
            LiveCheck. BUILDING keeps its amber dot. */}
        {status === "building" ? (
          <span
            aria-hidden
            className="live-check-dot block h-[5px] w-[5px] rounded-full bg-[#FFC04D]"
          />
        ) : null}
        {STATUS_LABEL[status]}
      </div>
    </div>
  );
}

/** Up to three tags. */
export function CardTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {tags.slice(0, 3).map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-accent/15 bg-accent/[0.08] px-2 py-1 text-accent/90"
          style={{ fontFamily: MONO, fontSize: "10px", lineHeight: 1.4 }}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/**
 * The two links. "Read the case study" is the card's stretched link;
 * View Live (or View on GitHub) opens in a new tab and sits above it.
 */
export function CardLinks({
  title,
  href,
  live,
  emphasis = "quiet",
}: {
  title: string;
  href: string;
  live?: ProjectLiveLink;
  emphasis?: "quiet" | "filled";
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
      <Link
        href={href}
        className={`group/link inline-flex min-h-11 items-center gap-2 outline-none after:absolute after:inset-0 after:z-[1] after:content-[''] ${
          emphasis === "filled" ? "after:rounded-[24px]" : "after:rounded-2xl"
        } focus-visible:after:ring-2 focus-visible:after:ring-accent focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-bg-primary ${
          emphasis === "filled"
            ? "rounded-full bg-accent px-6 text-sm font-semibold shadow-[0_12px_32px_-10px_rgba(0,229,192,0.5)] transition-shadow duration-300 group-hover:shadow-[0_16px_40px_-10px_rgba(0,229,192,0.75)]"
            : "text-accent transition-colors duration-200 group-hover:text-white"
        }`}
        style={
          emphasis === "filled"
            ? { color: "#080808" }
            : { fontFamily: MONO, fontSize: "12px", letterSpacing: "0.02em" }
        }
      >
        <span className={emphasis === "filled" ? "" : "border-b border-current pb-0.5"}>
          Read the case study
          <span className="sr-only">: {title}</span>
        </span>
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          →
        </span>
      </Link>

      {live ? (
        <a
          href={live.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-[2] inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/[0.28] px-4 text-white/85 transition-[color,border-color,background-color,transform] duration-200 hover:border-accent/60 hover:bg-accent/[0.06] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.97]"
          style={{ fontFamily: MONO, fontSize: "12px", letterSpacing: "0.02em" }}
        >
          {live.label}
          <span className="sr-only">: {title} (opens in a new tab)</span>
          <span aria-hidden>↗</span>
        </a>
      ) : null}
    </div>
  );
}

/** Number and category, decorative, desktop only (hidden below 768 px). */
export function CardEyebrow({ number, category }: { number: string; category: string }) {
  return (
    <div
      aria-hidden
      className="hidden items-center gap-2 text-text-secondary md:flex"
      style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}
    >
      <span>{number}</span>
      <span className="h-px w-6 bg-white/20" />
      <span>{category}</span>
    </div>
  );
}
