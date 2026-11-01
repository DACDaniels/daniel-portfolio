import Link from "next/link";
import { publishedTestimonials } from "@/data/testimonials";

/**
 * Testimonials, between About and Contact. Only quotes with written
 * permission render (src/data/testimonials.ts); with none, nothing renders.
 * Server component: no motion, the quotes are the content.
 */
export function Testimonials() {
  const items = publishedTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative w-full bg-bg-primary py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 md:px-8">
        <h2
          id="testimonials-title"
          className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary"
        >
          In their words.
        </h2>

        <ul
          className={`mt-10 grid grid-cols-1 gap-4 md:mt-14 md:gap-6 ${items.length > 1 ? "md:grid-cols-2" : "max-w-[760px]"}`}
        >
          {items.map((t) => (
            <li key={`${t.name}-${t.permissionDate}`}>
              <figure className="flex h-full flex-col rounded-[16px] border border-white/[0.06] bg-bg-surface p-6 shadow-[0_24px_48px_-28px_rgba(0,229,192,0.16)] md:p-8">
                <span aria-hidden className="font-heading text-[48px] leading-none text-accent">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-[17px] leading-[1.7] text-white md:text-[19px]">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-white/[0.06] pt-5">
                  <p className="font-heading text-[16px] font-semibold text-white">{t.name}</p>
                  <p className="text-[14px] leading-[1.6] text-text-secondary">
                    {t.role}, {t.organisation}
                  </p>
                  <Link
                    href={t.projectHref}
                    className="mt-2 inline-flex min-h-11 items-center font-mono text-[13px] text-accent underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80 md:min-h-0"
                  >
                    Read the case study
                  </Link>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
