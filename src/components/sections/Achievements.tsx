"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { MediaGallery, type MediaItem } from "@/components/ui/MediaGallery";
import { useScrollReveal } from "@/lib/useScrollReveal";

type Detail = { term: string; value: string };

type Achievement = {
  title: string;
  year: string;
  details: Detail[];
  media?: MediaItem[];
};

// Facts come only from the repo (About timeline, DECISIONS.md 2026-10-01,
// CLAUDE.md). Never add a placing, prize, judge or outcome that is not
// written down there first.
const ACHIEVEMENTS: Achievement[] = [
  {
    // TODO: ACHIEVEMENT DETAIL NEEDED FROM DANIEL. Month, category, which
    // FishTech system was presented, and any outcome are not documented.
    title: "Presidential Innovation Awards",
    year: "2026",
    details: [
      { term: "Presented", value: "FishTech, a research prototype" },
      { term: "To", value: "The national innovation panel" },
    ],
  },
  {
    title: "Zimbabwe Agricultural Show",
    year: "2026",
    details: [
      { term: "When", value: "August 2026" },
      { term: "Where", value: "NUST stand, Harare" },
      { term: "Exhibited", value: "FishTech Feeder, working prototype" },
      {
        term: "Met",
        value: "Farmers, buyers and Ministry of Skills stakeholders",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/zas/zas-01.jpg",
        alt: "FishTech Feeder on the NUST stand at the Zimbabwe Agricultural Show 2026",
      },
      {
        kind: "image",
        src: "/images/zas/zas-02.jpg",
        alt: "Visitors at the FishTech Feeder, ZAS 2026",
      },
      {
        kind: "image",
        src: "/images/zas/zas-03.jpg",
        alt: "FishTech Feeder with a demo tank on the stand, ZAS 2026",
      },
    ],
  },
];

export function Achievements() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
      };

  return (
    <section
      id="achievements"
      className="relative w-full overflow-hidden bg-bg-primary py-20 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-accent opacity-[0.06] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent"
          >
            {"// achievements.tsx"}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white"
          >
            On the national stage.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 mb-12 max-w-xl text-[15px] leading-[1.7] text-text-secondary md:mb-16 md:max-w-2xl md:text-[16px]"
          >
            FishTech research prototypes, taken out of the lab and put in front
            of a national innovation panel and the farmers they are built for.
          </motion.p>

          <ol className="flex flex-col gap-5 md:gap-6">
            {ACHIEVEMENTS.map((achievement) => (
              <motion.li key={achievement.title} variants={itemVariants}>
                <AchievementCard achievement={achievement} />
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const hasMedia = achievement.media !== undefined;

  return (
    <article
      className={`relative grid gap-8 overflow-hidden rounded-[16px] border border-border bg-bg-surface p-6 shadow-[0_24px_60px_-32px_rgba(0,229,192,0.18),0_0_0_1px_rgba(255,255,255,0.02)_inset] md:p-8 ${
        hasMedia ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10" : ""
      }`}
    >
      <div className="flex min-w-0 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-[clamp(1.375rem,2.4vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-text-primary">
            {achievement.title}
          </h3>
          <span className="shrink-0 font-heading text-[clamp(1.375rem,2.4vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-accent">
            {achievement.year}
          </span>
        </div>

        <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
          {achievement.details.map((detail) => (
            <div key={detail.term} className="min-w-0">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-tertiary">
                {detail.term}
              </dt>
              <dd className="mt-1 text-[15px] leading-[1.6] text-text-primary">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {achievement.media ? (
        <MediaGallery
          layout="strip"
          items={achievement.media}
          className="self-start"
        />
      ) : null}
    </article>
  );
}
