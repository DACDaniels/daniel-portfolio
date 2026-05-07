"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ProjectCard, type ProjectCardProps } from "@/components/ui/ProjectCard";
import { SteadyhandsMock } from "@/components/ui/project-mocks/SteadyhandsMock";
import { FishTechSmartFeedMock } from "@/components/ui/project-mocks/FishTechSmartFeedMock";
import { FishTechWebsiteMock } from "@/components/ui/project-mocks/FishTechWebsiteMock";
import { PortfolioMock } from "@/components/ui/project-mocks/PortfolioMock";

const PROJECTS: ProjectCardProps[] = [
  {
    number: "01",
    category: "PRODUCTION",
    title: "Steadyhands Catering",
    meta: "steadyhandscatering.com · BATA Club",
    description:
      "Full-stack catering platform with Paynow payment integration, online ordering, and WhatsApp communication funnel. Processes real transactions.",
    tags: ["Next.js", "TypeScript", "Node.js", "Paynow", "Vercel"],
    status: "live",
    primaryLink: {
      label: "View Live",
      href: "https://steadyhandscatering.com",
      external: true,
    },
    mockComponent: <SteadyhandsMock />,
  },
  {
    number: "02",
    category: "RESEARCH",
    title: "FishTech Smart Feed",
    meta: "Final-year prototype · Nov 2025",
    description:
      "Computer vision pipeline for fish biomass estimation. YOLOv8 detection combined with length-weight regression. Designed for future Raspberry Pi edge deployment.",
    tags: ["YOLOv8", "OpenCV", "Python", "Edge AI"],
    status: "research",
    primaryLink: { label: "Read Case Study", href: "/projects/fishtech" },
    mockComponent: <FishTechSmartFeedMock />,
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
  },
  {
    number: "04",
    category: "META",
    title: "This Portfolio",
    meta: "You're looking at it",
    description:
      "Awwwards-ambition portfolio. Next.js 15, Geist, motion choreography, command palette, screenshot-driven build loop.",
    tags: ["Next.js 15", "TypeScript", "Motion"],
    status: "meta",
    primaryLink: {
      label: "View on GitHub",
      href: "https://github.com/DACDaniels/daniel-portfolio",
      external: true,
    },
    mockComponent: <PortfolioMock />,
  },
];

export function Projects() {
  const reduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={itemVariants}
            className="font-mono text-[11px] uppercase text-accent"
            style={{ letterSpacing: "0.15em", marginBottom: "12px" }}
          >
            // projects.tsx
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
            Things I&apos;ve{" "}
            <span
              className="font-normal italic"
              style={{
                fontFamily: "var(--font-serif)",
                color: "rgba(255, 255, 255, 0.55)",
                letterSpacing: "-0.035em",
              }}
            >
              actually
            </span>{" "}
            built.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 mb-12 max-w-xl text-[15px] text-white/55 md:mb-20 md:max-w-2xl md:text-[16px]"
            style={{ lineHeight: 1.7 }}
          >
            Four projects. One live in production, one research prototype, one
            lead-gen site, and this portfolio itself.
          </motion.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
                variants={itemVariants}
              />
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 text-center md:mt-20"
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
