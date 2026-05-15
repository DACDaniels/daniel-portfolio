"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  FlagshipProjectCard,
  type FlagshipProjectProps,
} from "@/components/ui/FlagshipProjectCard";
import {
  AlternatingProjectCard,
  type AlternatingProjectProps,
} from "@/components/ui/AlternatingProjectCard";
import { SteadyhandsMock } from "@/components/ui/project-mocks/SteadyhandsMock";
import { FishTechSmartFeedMock } from "@/components/ui/project-mocks/FishTechSmartFeedMock";
import { FishTechWebsiteMock } from "@/components/ui/project-mocks/FishTechWebsiteMock";
import { PortfolioMock } from "@/components/ui/project-mocks/PortfolioMock";
import { useScrollReveal } from "@/lib/useScrollReveal";

const FLAGSHIP: Omit<FlagshipProjectProps, "variants"> = {
  number: "01",
  category: "EDGE AI · FLAGSHIP",
  title: "FishTech Precision Feeding System",
  meta: "Late-stage prototype · Pilot 2026",
  description:
    "Closed-loop AI instrument for African pond aquaculture. An overhead AI Camera and a Raspberry Pi 5 with a Hailo NPU detect fish, measure them against an auto-calibrated reference, estimate whole-pond biomass with honest confidence intervals, and drive an integrated auger feeder to dispense a precision dose. Runs entirely on the device. Being industrialised for pilot deployment in 2026.",
  tags: [
    "Computer Vision",
    "IoT",
    "Edge AI",
    "YOLO",
    "Raspberry Pi",
    "Hailo NPU",
    "Flask",
  ],
  status: "building",
  caseStudyHref: "/projects/fishtech",
  mockComponent: <FishTechSmartFeedMock />,
};

const ALTERNATING: Omit<AlternatingProjectProps, "variants">[] = [
  {
    number: "02",
    category: "PRODUCTION",
    title: "Steadyhands Catering",
    meta: "steadyhandscatering.com · BATA Club",
    description:
      "Full-stack catering platform with Paynow payment integration, online ordering, and WhatsApp communication funnel. Live, transacting, and deployed on Vercel.",
    tags: ["Next.js", "TypeScript", "Node.js", "Paynow", "Vercel"],
    status: "live",
    primaryLink: {
      label: "View Live",
      href: "https://steadyhandscatering.com",
      external: true,
    },
    mockComponent: <SteadyhandsMock />,
    side: "left",
  },
  {
    number: "03",
    category: "CLIENT WORK",
    title: "FishTech Consultancy",
    meta: "fishtech.co.zw · Lead-gen platform",
    description:
      "Marketing site for aquaculture consultancy. Optimized for Zimbabwean bandwidth. WhatsApp-first conversion funnel.",
    tags: ["React", "TypeScript", "Vite", "Framer Motion"],
    status: "live",
    primaryLink: {
      label: "View Live",
      href: "https://fishtech.co.zw",
      external: true,
    },
    mockComponent: <FishTechWebsiteMock />,
    side: "right",
  },
  {
    number: "04",
    category: "META",
    title: "This Portfolio",
    meta: "You're looking at it",
    description:
      "Awwwards-ambition portfolio. Next.js 15, Geist, motion choreography, screenshot-driven build loop.",
    tags: ["Next.js 15", "TypeScript", "Motion"],
    status: "meta",
    primaryLink: {
      label: "View on GitHub",
      href: "https://github.com/DACDaniels/daniel-portfolio",
      external: true,
    },
    mockComponent: <PortfolioMock />,
    side: "left",
  },
];

export function Projects() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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
      id="projects"
      className="relative w-full overflow-hidden bg-bg-primary py-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div
          ref={revealRef}
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="font-mono text-[11px] uppercase text-accent"
            style={{ letterSpacing: "0.15em", marginBottom: "12px" }}
          >
            {"// projects.tsx"}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-white"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
            }}
          >
            Selected work.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 mb-12 max-w-xl text-[15px] text-white/55 md:mb-16 md:max-w-2xl md:text-[16px]"
            style={{ lineHeight: 1.7 }}
          >
            One flagship edge-AI instrument in active build, one live
            transacting platform, one lead-gen site, and this portfolio itself.
          </motion.p>

          <FlagshipProjectCard {...FLAGSHIP} variants={itemVariants} />

          <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
            {ALTERNATING.map((project) => (
              <AlternatingProjectCard
                key={project.title}
                {...project}
                variants={itemVariants}
              />
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-20 text-center md:mt-28"
          >
            <p
              className="text-white/60"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "15px",
              }}
            >
              More on{" "}
              <a
                href="https://github.com/DACDaniels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                GitHub →
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
