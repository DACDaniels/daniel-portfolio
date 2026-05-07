"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { FishTechSmartFeedMock } from "@/components/ui/project-mocks/FishTechSmartFeedMock";

const STACK_CARDS = [
  {
    label: "Detection",
    title: "YOLOv8 + custom dataset",
    description:
      "Roboflow for annotation. Custom fish dataset trained on real pond and tank footage.",
  },
  {
    label: "Processing",
    title: "Python · OpenCV · NumPy",
    description:
      "Frame extraction, bounding-box measurement, and pixel-domain post-processing.",
  },
  {
    label: "Calibration",
    title: "Camera intrinsics",
    description:
      "Pixel-to-real-world length mapping using known reference markers in the camera scene.",
  },
  {
    label: "Biology",
    title: "Length–weight regression",
    description:
      "Non-linear W = aL^b relationship, parameters tuned to the local target species.",
  },
];

const HARD_THINGS = [
  "Detecting fish in turbid water with reflections, motion blur, and overlapping bodies — solved by training YOLOv8 on real, noisy pond footage rather than clean lab video.",
  "Converting pixel-domain bounding boxes into real-world fish length — solved with a calibration step using known reference markers in the camera frame.",
  "Applying the non-linear length–weight relationship reliably — validated against manually weighed fish and refined per species.",
  "Integrating detection, measurement, and feed-recommendation logic into a single pipeline — instead of four disconnected scripts.",
];

export default function FishTechCaseStudyPage() {
  const reduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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
    <>
      <Navbar />

      <main className="relative w-full bg-bg-primary pb-32 pt-28 md:pt-32">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 text-white/60 transition-colors duration-200 hover:text-accent"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "12px",
              lineHeight: 1.4,
            }}
          >
            ← Back to work
          </Link>
        </div>

        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:px-8 md:py-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="font-mono text-[11px] uppercase text-accent"
              style={{ letterSpacing: "0.15em" }}
            >
              // case-study.md
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-3 flex flex-wrap gap-2"
            >
              {[
                "RESEARCH PROTOTYPE",
                "Submitted Nov 2025",
                "NUST Zimbabwe",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/5 text-white/70"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    padding: "4px 10px",
                    lineHeight: 1.4,
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 font-heading font-bold text-white"
              style={{
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
              }}
            >
              FishTech Smart Feed System
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-3xl text-white/60"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "18px",
                lineHeight: 1.55,
              }}
            >
              A computer vision pipeline for fish biomass estimation, built for
              small-scale aquaculture in Zimbabwe.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-white/40"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
                lineHeight: 1.4,
              }}
            >
              <span>
                <span className="text-white/30">Role · </span>Solo builder
              </span>
              <span aria-hidden className="text-white/20">
                ·
              </span>
              <span>
                <span className="text-white/30">Timeline · </span>8 months
              </span>
              <span aria-hidden className="text-white/20">
                ·
              </span>
              <span>
                <span className="text-white/30">Status · </span>Research
                prototype
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="aspect-video overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            <FishTechSmartFeedMock />
          </motion.div>
        </div>

        <article className="mx-auto mt-24 w-full max-w-3xl space-y-16 px-6 md:px-8">
          <CaseSection
            id="problem"
            eyebrow="// section-01"
            title="The problem"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <p>
              Most small-scale aquaculture farmers in Zimbabwe feed their fish
              based on estimation and experience, not measurable biomass. They
              guess. The guess is sometimes right, often wrong, and the cost of
              being wrong stacks up quietly over a grow-out cycle.
            </p>
            <p>
              Overfeeding wastes feed and degrades water quality. Underfeeding
              slows growth. Existing biomass-measurement solutions exist for
              commercial-scale farms — they require dedicated sensors, vendor
              support, and budgets that the smallholders this project is
              designed for simply don&apos;t have.
            </p>
          </CaseSection>

          <CaseSection
            id="approach"
            eyebrow="// section-02"
            title="The approach"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <p>
              The pipeline is a sequence of well-understood pieces wired
              together: video footage from a low-cost camera feeds a YOLOv8
              detection model trained on real pond imagery. Detected bounding
              boxes are mapped from pixels to real-world length using camera
              calibration. Each measured length is converted to estimated
              weight via the standard biological length-weight regression. The
              per-fish weights aggregate to a biomass figure, and that figure
              drives a feed recommendation surfaced through a mobile interface.
            </p>

            <motion.figure
              variants={itemVariants}
              className="border-l-2 border-accent pl-4 italic text-white/70"
            >
              <div
                className="not-italic text-accent"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "20px",
                  lineHeight: 1.4,
                  marginBottom: "8px",
                }}
              >
                W = aL^b
              </div>
              <figcaption
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  fontStyle: "normal",
                }}
                className="text-white/55"
              >
                Biological length–weight relationship — converts detected fish
                length to estimated weight. Parameters{" "}
                <span
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  className="text-white/70"
                >
                  a
                </span>{" "}
                and{" "}
                <span
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  className="text-white/70"
                >
                  b
                </span>{" "}
                are species-specific.
              </figcaption>
            </motion.figure>
          </CaseSection>

          <CaseSection
            id="stack"
            eyebrow="// section-03"
            title="Technical stack"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              {STACK_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-white/[0.06] bg-bg-surface p-4"
                >
                  <div
                    className="text-accent"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {card.label}
                  </div>
                  <div
                    className="font-heading font-semibold text-white"
                    style={{
                      fontSize: "16px",
                      letterSpacing: "-0.015em",
                      marginBottom: "6px",
                    }}
                  >
                    {card.title}
                  </div>
                  <p
                    className="text-white/55"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      lineHeight: 1.55,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </CaseSection>

          <CaseSection
            id="hard"
            eyebrow="// section-04"
            title="What was hard"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <motion.ul variants={itemVariants} className="space-y-3">
              {HARD_THINGS.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-white/70"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    lineHeight: 1.65,
                  }}
                >
                  <span
                    aria-hidden
                    className="flex-shrink-0 text-accent"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      lineHeight: 1.65,
                    }}
                  >
                    →
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </motion.ul>
          </CaseSection>

          <CaseSection
            id="state"
            eyebrow="// section-05"
            title="Where it is now"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <p>
              The system is an advanced prototype. It has been demonstrated in
              controlled environments using recorded pond and tank footage. It
              has not been deployed to real farms. There are no paying
              customers, no commercial pilots, and no live users.
            </p>
            <p>
              Evaluation is at the model and pipeline level — precision, recall
              and mAP for detection; predicted-versus-measured weight
              comparisons for biomass estimation. There are no real-world
              business-impact metrics yet, because there are no real-world
              deployments yet. That distinction matters.
            </p>
          </CaseSection>

          <CaseSection
            id="next"
            eyebrow="// section-06"
            title="What's next"
            itemVariants={itemVariants}
            containerVariants={containerVariants}
          >
            <p>
              Next steps: real-time inference on Raspberry Pi hardware, a field
              pilot with one or two partner farms for honest validation, and
              expansion of the training set to additional species beyond the
              ones already covered.
            </p>
          </CaseSection>

          <motion.section
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="pt-8"
          >
            <motion.div
              variants={itemVariants}
              className="text-white/40"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Related
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              <a
                href="https://fishtech.co.zw"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.06] bg-bg-surface p-4 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent/30"
              >
                <div
                  className="text-accent"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Live site
                </div>
                <div
                  className="font-heading font-semibold text-white"
                  style={{ fontSize: "15px", letterSpacing: "-0.015em" }}
                >
                  FishTech Consultancy
                </div>
                <div
                  className="mt-1 text-white/50"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "11px",
                  }}
                >
                  fishtech.co.zw →
                </div>
              </a>
              <div className="rounded-xl border border-white/[0.06] bg-bg-surface p-4">
                <div
                  className="text-white/40"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Thesis
                </div>
                <div
                  className="font-heading font-semibold text-white"
                  style={{ fontSize: "15px", letterSpacing: "-0.015em" }}
                >
                  Research thesis · NUST Zimbabwe
                </div>
                <div
                  className="mt-1 text-white/50"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "11px",
                  }}
                >
                  November 2025
                </div>
              </div>
            </motion.div>
          </motion.section>
        </article>
      </main>
    </>
  );
}

function CaseSection({
  id,
  eyebrow,
  title,
  children,
  itemVariants,
  containerVariants,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  itemVariants: Variants;
  containerVariants: Variants;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="text-accent"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="font-heading font-semibold text-white"
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: "16px",
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="space-y-4 text-white/70"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "16px",
          lineHeight: 1.75,
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
