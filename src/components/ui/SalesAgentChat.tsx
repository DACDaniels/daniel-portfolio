import { FileText } from "lucide-react";

/**
 * An invented WhatsApp conversation with the FishTech sales agent, drawn in a
 * phone frame. Sample only: no real customer, number or price. Every size is
 * in container units (cqw), so the same component reads the same in a small
 * project card and in the larger case-study frame.
 */

type Turn =
  | { from: "customer" | "agent"; text: string; time: string }
  | { from: "pdf"; name: string; time: string };

const CONVERSATION: Turn[] = [
  {
    from: "customer",
    text: "Mhoro! Ndoda kutanga kurima hove. Pond ye 20 by 10, ndinoisa fingerlings ngani?",
    time: "09:12",
  },
  {
    from: "agent",
    text: "Mhoroi! A 20 m x 10 m lined pond is 200 square metres. Start with about 600 tilapia fingerlings, roughly 3 per square metre, and feed small amounts three times a day while they grow.",
    time: "09:12",
  },
  {
    from: "customer",
    text: "Ok zvakanaka. Ndiitirei quotation, pond ne net ne fingerlings. Ndiri kuChinhoyi.",
    time: "09:15",
  },
  {
    from: "agent",
    text: "Done: pond digging and liner, a bird and predator net, and 600 fingerlings, delivered to Chinhoyi. Here is your quotation.",
    time: "09:15",
  },
  { from: "pdf", name: "Quotation Q-2026-0142.pdf", time: "09:15" },
  {
    from: "customer",
    text: "Ndatenda. Ndichakuudzai zuva rekutanga.",
    time: "09:18",
  },
];

export function SalesAgentChat({ className = "" }: { className?: string }) {
  return (
    <div className={`@container ${className}`}>
      <div className="h-full rounded-[9cqw] border border-white/15 bg-[#050A14] p-[1.6cqw] shadow-[0_28px_56px_-12px_rgba(0,0,0,0.75),0_8px_24px_-8px_rgba(0,229,192,0.14)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[7.6cqw] bg-bg-elevated">
          {/* Chat header */}
          <div className="flex items-center gap-[3cqw] border-b border-white/[0.06] bg-bg-surface px-[5cqw] pb-[3.5cqw] pt-[6cqw]">
            <span
              aria-hidden
              className="flex h-[10cqw] w-[10cqw] shrink-0 items-center justify-center rounded-full bg-accent-dim font-heading text-[4.4cqw] font-semibold text-accent"
            >
              F
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-[4.6cqw] font-semibold leading-tight text-white">
                FishTech
              </p>
              <p className="truncate text-[3.4cqw] leading-tight text-text-tertiary">
                Sales agent
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-white/15 px-[2.4cqw] py-[0.8cqw] font-mono text-[2.8cqw] leading-none text-text-secondary">
              Sample conversation
            </span>
          </div>
  
          {/* Messages */}
          <ol className="flex flex-1 flex-col gap-[2.6cqw] px-[4cqw] py-[4.5cqw]">
            {CONVERSATION.map((turn, i) => {
              if (turn.from === "pdf") {
                return (
                  <li key={i} className="flex justify-end">
                    <div className="flex w-[78%] items-center gap-[3cqw] rounded-[4cqw] rounded-tr-[1cqw] border border-accent/20 bg-accent/[0.12] px-[3.4cqw] py-[3cqw]">
                      <span className="flex h-[9cqw] w-[9cqw] shrink-0 items-center justify-center rounded-[2cqw] bg-accent/20 text-accent">
                        <FileText aria-hidden className="h-[5cqw] w-[5cqw]" strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[3.5cqw] font-medium leading-tight text-white">
                          {turn.name}
                        </span>
                        <span className="block text-[3cqw] leading-tight text-text-tertiary">
                          PDF · 1 page · {turn.time}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              }
              const mine = turn.from === "agent";
              return (
                <li key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[82%] rounded-[4cqw] px-[3.4cqw] py-[2.4cqw] text-[3.6cqw] leading-[1.45] ${
                      mine
                        ? "rounded-tr-[1cqw] bg-accent/[0.12] text-white/90"
                        : "rounded-tl-[1cqw] bg-white/[0.07] text-white/85"
                    }`}
                  >
                    {turn.text}
                    <span className="ml-[2cqw] inline-block translate-y-[0.4cqw] text-[2.7cqw] text-text-tertiary">
                      {turn.time}
                    </span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
