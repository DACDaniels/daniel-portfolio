import Image from "next/image";
import { SalesAgentChat } from "@/components/ui/SalesAgentChat";

/**
 * Card visual for the FishTech Sales Agent & Ops: the Ops Overview (rendered
 * with invented data) in a browser frame, and the sample WhatsApp
 * conversation in a phone over its right edge. Background is FishTech's
 * Deep Ocean.
 */
export function SalesAgentShowcase() {
  return (
    <div
      aria-hidden
      inert
      className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_15%_0%,#0B4A6B_0%,#04263F_50%,#021626_100%)]"
    >
      {/* Ops console in a desktop browser window */}
      <div className="absolute left-[5%] top-[9%] w-[70%] overflow-hidden rounded-[10px] border border-white/10 bg-[#04263F] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.03)_inset]">
        <div className="flex items-center gap-1 border-b border-white/[0.06] px-2.5 py-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[8px] leading-none text-white/55">
            ops.fishtech.co.zw
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src="/images/fishtech-sales-agent/ops-overview-desktop.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 72vw, 500px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* The agent's side: a sample chat in a phone, bleeding off the bottom */}
      <SalesAgentChat className="absolute right-[4%] top-[12%] h-[112%] w-[34%] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0" />

      {/* Keeps the status badge readable over the browser window. */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent mix-blend-multiply" />
    </div>
  );
}
