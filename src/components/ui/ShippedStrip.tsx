import { SHIPPED, SHIPPED_SHOWN } from "@/data/shipped";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Newest five entries from src/data/shipped.ts, as a quiet changelog. */
export function ShippedStrip() {
  const entries = SHIPPED.slice(0, SHIPPED_SHOWN);
  return (
    <section aria-labelledby="shipped-title" className="mb-16 md:mb-24">
      <h2
        id="shipped-title"
        className="mb-4 flex items-center gap-2.5 font-mono text-[11px] font-normal uppercase tracking-[0.15em] text-text-tertiary"
      >
        <span aria-hidden className="block h-[5px] w-[5px] rounded-full bg-accent" />
        Recently shipped
      </h2>
      <ol className="overflow-hidden rounded-[16px] border border-border bg-bg-surface shadow-[0_24px_60px_-36px_rgba(0,229,192,0.18)]">
        {entries.map((e) => {
          const external = e.href?.startsWith("http") ?? false;
          const body = (
            <>
              <time
                dateTime={e.date}
                className="shrink-0 font-mono text-[11px] tracking-[0.04em] text-accent sm:w-[104px]"
              >
                {shortDate(e.date)}
              </time>
              <span className="min-w-0 flex-1 text-[14px] leading-[1.6] text-text-secondary transition-colors duration-200 group-hover:text-text-primary md:text-[15px]">
                {e.text}
              </span>
              {e.href ? (
                <span
                  aria-hidden
                  className="hidden shrink-0 text-text-tertiary transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-accent sm:inline"
                >
                  {external ? "↗" : "→"}
                </span>
              ) : null}
            </>
          );
          const rowClass =
            "flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-5 md:px-6";
          return (
            <li key={`${e.date}-${e.text}`} className="border-t border-border first:border-t-0">
              {e.href ? (
                <a
                  href={e.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`group ${rowClass} min-h-[44px] transition-colors duration-200 hover:bg-white/[0.02] focus-visible:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent active:bg-white/[0.04]`}
                >
                  {body}
                  {external ? <span className="sr-only"> (opens in new tab)</span> : null}
                </a>
              ) : (
                <div className={rowClass}>{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
