import type { ReactNode } from "react";
import { BorderBeam } from "@/components/ui/BorderBeam";
import {
  CardEyebrow,
  CardLinks,
  CardStatus,
  CardTags,
  type ProjectLiveLink,
  type ProjectStatus,
} from "@/components/ui/ProjectCardParts";
import type { StatusKey } from "@/lib/siteStatus";

export type AlternatingProjectProps = {
  number: string;
  category: string;
  title: string;
  /** One sentence, at most 20 words. */
  sentence: string;
  /** At most three. */
  tags: string[];
  status: ProjectStatus;
  /** The project's own page. The whole card links here. */
  href: string;
  /** View Live, or View on GitHub. Opens in a new tab. */
  live?: ProjectLiveLink;
  mockComponent: ReactNode;
  side: "left" | "right";
  /** Which /api/status check backs this card's live line, if any. */
  statusKey?: StatusKey;
};

export function AlternatingProjectCard({
  number,
  category,
  title,
  sentence,
  tags,
  status,
  href,
  live,
  mockComponent,
  side,
  statusKey,
}: AlternatingProjectProps) {
  return (
    <article
      data-project-card={title}
      className="group relative grid grid-cols-1 items-center gap-5 rounded-2xl md:gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div
        data-cursor-interactive
        className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-surface transition-[border-color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-accent/30 motion-reduce:group-hover:translate-y-0 lg:col-span-7 ${
          side === "right" ? "lg:order-2" : "lg:order-1"
        }`}
        style={{
          boxShadow:
            "0 20px 50px -28px rgba(0, 229, 192, 0.14), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
        }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <BorderBeam duration={5} />
        </span>
        <div className="aspect-[16/10] overflow-hidden">
          <CardStatus status={status} statusKey={statusKey} />
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
            {mockComponent}
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col gap-3 md:gap-4 lg:col-span-5 ${
          side === "right" ? "lg:order-1 lg:pr-2" : "lg:order-2 lg:pl-2"
        }`}
      >
        <CardEyebrow number={number} category={category} />

        <h3
          className="font-heading font-semibold text-white"
          style={{
            fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>

        <p
          className="max-w-[44ch] text-text-secondary"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.65 }}
        >
          {sentence}
        </p>

        <CardTags tags={tags} />

        <CardLinks title={title} href={href} live={live} />
      </div>
    </article>
  );
}
