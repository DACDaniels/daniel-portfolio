"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { CaseSectionProgress } from "@/components/ui/CaseSectionProgress";
import {
  BackToWork,
  CardGrid,
  CaseHeader,
  CaseSection,
  ClosingCTA,
  StackGrid,
  useCaseVariants,
  type CaseCard,
  type CaseStatus,
  type StackGroup,
} from "@/components/ui/CaseStudyKit";
import { FlowDiagram, type FlowColumn } from "@/components/ui/FlowDiagram";
import { MediaGallery, type MediaItem } from "@/components/ui/MediaGallery";

/**
 * One short page per project, built from the CaseStudyKit pieces:
 * What it is, What it does, How it's built (a sketch only where the source
 * supports one), Stack, Screens, and the links. Every fact on these pages
 * comes from the project's own repository or from CLAUDE.md.
 */

export type ProjectPageProps = {
  status: CaseStatus;
  eyebrow: string;
  statusNote: string;
  title: string;
  lead: string;
  facts: { k: string; v: string }[];
  links?: { label: string; href: string }[];
  hero: ReactNode;
  heroCaption?: string;
  /** Plain paragraphs. */
  whatItIs: ReactNode;
  whatItDoes: CaseCard[];
  how?: { title: string; body: ReactNode; flow?: { columns: FlowColumn[]; summary: string } };
  stack: StackGroup[];
  screens?: { note?: string; items: MediaItem[] };
  cta: { eyebrow: string; title: string; body: string };
};

export function ProjectPage({
  status,
  eyebrow,
  statusNote,
  title,
  lead,
  facts,
  links,
  hero,
  heroCaption,
  whatItIs,
  whatItDoes,
  how,
  stack,
  screens,
  cta,
}: ProjectPageProps) {
  const { reduceMotion } = useCaseVariants();

  const progress = [
    { id: "what-it-is", label: "What it is" },
    { id: "what-it-does", label: "What it does" },
    ...(how ? [{ id: "how", label: "How it's built" }] : []),
    { id: "stack", label: "Stack" },
    ...(screens ? [{ id: "screens", label: "Screens" }] : []),
  ];

  return (
    <>
      <Navbar />
      <CaseSectionProgress items={progress} />

      <main id="main" className="relative w-full bg-bg-primary pb-32 pt-28 md:pt-32">
        <BackToWork />

        <CaseHeader
          status={status}
          eyebrow={eyebrow}
          statusNote={statusNote}
          title={title}
          lead={lead}
          facts={facts}
          links={links}
        />

        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-surface"
            style={{ boxShadow: "0 24px 60px -28px rgba(0, 229, 192, 0.2)" }}
          >
            {hero}
          </motion.div>
          {heroCaption ? (
            <p className="mt-3 text-text-tertiary" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px" }}>
              {heroCaption}
            </p>
          ) : null}
        </div>

        <article className="mx-auto mt-16 w-full max-w-3xl space-y-16 px-6 md:mt-24 md:space-y-20 md:px-8">
          <CaseSection id="what-it-is" eyebrow="// what it is" title="What it is">
            {whatItIs}
          </CaseSection>

          <CaseSection id="what-it-does" eyebrow="// what it does" title="What it does">
            <CardGrid cards={whatItDoes} />
          </CaseSection>

          {how ? (
            <CaseSection id="how" eyebrow="// how it's built" title={how.title}>
              {how.body}
              {how.flow ? (
                <div className="pt-2">
                  <FlowDiagram columns={how.flow.columns} summary={how.flow.summary} />
                </div>
              ) : null}
            </CaseSection>
          ) : null}

          <CaseSection id="stack" eyebrow="// stack" title="Stack">
            <StackGrid groups={stack} />
          </CaseSection>

          {screens ? (
            <CaseSection id="screens" eyebrow="// screens" title="Screens">
              {screens.note ? <p>{screens.note}</p> : null}
              <MediaGallery layout="grid" items={screens.items} className="pt-2" />
            </CaseSection>
          ) : null}

          <ClosingCTA eyebrow={cta.eyebrow} title={cta.title} body={cta.body} />
        </article>
      </main>
    </>
  );
}
