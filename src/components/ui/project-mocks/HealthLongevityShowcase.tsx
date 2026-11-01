import Image from "next/image";

/**
 * Card visual for Health & Longevity: real screenshots of the live site. The desktop home page sits in a
 * browser frame; the phone view rises from the bottom-right corner over it.
 * Background is the site's own navy hero gradient (--color-hero to
 * --color-hero-deep in its tokens).
 */
export function HealthLongevityShowcase() {
  return (
    <div
      aria-hidden
      inert
      className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_15%_0%,#0A5FA3_0%,#014A81_45%,#013761_100%)]"
    >
      {/* Desktop browser window */}
      <div className="absolute left-[5%] top-[9%] w-[78%] overflow-hidden rounded-[10px] border border-white/10 bg-[#012B4D] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.03)_inset]">
        <div className="flex items-center gap-1 border-b border-white/[0.06] px-2.5 py-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[8px] leading-none text-white/55">
            healthandlongevity.co.zw
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src="/images/health-longevity/hl-home-desktop.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 80vw, 560px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Phone, bleeding off the bottom edge */}
      <div className="absolute right-[5%] top-[30%] w-[23%] rounded-[18px] border border-white/15 bg-[#050A14] p-[3px] shadow-[0_28px_56px_-12px_rgba(0,0,0,0.75),0_8px_24px_-8px_rgba(0,229,192,0.12)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[15px]">
          <Image
            src="/images/health-longevity/hl-home-phone.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 24vw, 170px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Keeps the status badge readable over the browser window. */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent mix-blend-multiply" />
    </div>
  );
}
