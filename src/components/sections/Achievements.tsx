"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { MediaGallery, type MediaItem } from "@/components/ui/MediaGallery";
import { useScrollReveal } from "@/lib/useScrollReveal";

type Detail = { term: string; value: string };

type Achievement = {
  title: string;
  /** Shown in the card's date block, e.g. "21 Jul 2026". */
  date: string;
  /** Machine-readable date for the time element. */
  dateTime: string;
  /** One plain sentence: what happened. */
  summary: string;
  detail: Detail;
  media?: MediaItem[];
};

// Facts come only from the repo (About timeline, DECISIONS.md, CLAUDE.md).
// Never add a placing, prize, judge or outcome that is not written down
// there first. The Presidential Innovation Awards card states no outcome,
// at Daniel's request.
const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Presidential Innovation Awards",
    date: "21 Jul 2026",
    dateTime: "2026-07-21",
    summary:
      "Presented the FishTech Precision Feeding System Iris, a research prototype, to the national innovation panel.",
    detail: {
      term: "Category",
      value: "Best Innovation in Agriculture and Agro-Processing",
    },
  },
  {
    title: "Zimbabwe Agricultural Show",
    date: "Aug 2026",
    dateTime: "2026-08",
    summary:
      "Exhibited the FishTech Feeder, a working prototype, and met farmers, buyers and Ministry of Skills stakeholders.",
    detail: { term: "Location", value: "NUST stand, Harare Showground" },
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
              <motion.li
                key={achievement.title}
                variants={itemVariants}
              >
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
  return (
    <article className="rounded-[16px] border border-border bg-bg-surface p-6 shadow-[0_24px_60px_-32px_rgba(0,229,192,0.18),0_0_0_1px_rgba(255,255,255,0.02)_inset] md:p-8">
      <time
        dateTime={achievement.dateTime}
        className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent"
      >
        {achievement.date}
      </time>

      <h3 className="mt-3 text-balance font-heading text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-text-primary">
        {achievement.title}
      </h3>

      <div className="mt-5 grid gap-6 md:mt-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10">
        <p className="max-w-[46ch] text-[15px] leading-[1.7] text-text-secondary md:text-[17px]">
          {achievement.summary}
        </p>

        <div className="flex flex-col gap-5 border-t border-border pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <dl className="flex flex-col gap-1.5">
            <dt className="font-mono text-[11px] tracking-[0.06em] text-text-tertiary">
              {achievement.detail.term}
            </dt>
            <dd className="text-balance text-[14px] leading-[1.6] text-white/85">
              {keepHyphenatedWordsWhole(achievement.detail.value)}
            </dd>
          </dl>

          {achievement.media ? (
            <MediaGallery
              layout="strip"
              items={achievement.media}
              className="max-w-[300px]"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}

// Browsers may break a line after a hyphen ("Agro-" / "Processing").
// Wrapping each hyphenated word in a no-wrap span keeps it on one line.
function keepHyphenatedWordsWhole(text: string) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 ? " " : null}
      {word.includes("-") ? (
        <span className="whitespace-nowrap">{word}</span>
      ) : (
        word
      )}
    </Fragment>
  ));
}
