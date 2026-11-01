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

export type FlagshipProjectProps = {
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
  live?: ProjectLiveLink;
  mockComponent: ReactNode;
};

export function FlagshipProjectCard({
  number,
  category,
  title,
  sentence,
  tags,
  status,
  href,
  live,
  mockComponent,
}: FlagshipProjectProps) {
  return (
    <article
      data-project-card={title}
      data-cursor-interactive
      className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/30 motion-reduce:hover:translate-y-0"
      style={{
        boxShadow:
          "0 28px 70px -28px rgba(0, 229, 192, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
      }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <BorderBeam duration={5} />
      </span>
      <div className="pointer-events-none absolute -top-px left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] lg:aspect-auto lg:min-h-[420px] lg:border-b-0 lg:border-r">
          <CardStatus status={status} />
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100">
            {mockComponent}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 p-6 md:gap-4 md:p-10">
          <CardEyebrow number={number} category={category} />

          <h3
            className="font-heading font-semibold text-white"
            style={{
              fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </h3>

          <p
            className="max-w-[42ch] text-text-secondary"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "16px", lineHeight: 1.65 }}
          >
            {sentence}
          </p>

          <CardTags tags={tags} />

          <div className="pt-1">
            <CardLinks title={title} href={href} live={live} emphasis="filled" />
          </div>
        </div>
      </div>
    </article>
  );
}
