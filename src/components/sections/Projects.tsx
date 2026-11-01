"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { useEffect } from "react";
import Image from "next/image";
import {
  FlagshipProjectCard,
  type FlagshipProjectProps,
} from "@/components/ui/FlagshipProjectCard";
import {
  AlternatingProjectCard,
  type AlternatingProjectProps,
} from "@/components/ui/AlternatingProjectCard";
import { SteadyhandsMock } from "@/components/ui/project-mocks/SteadyhandsMock";
import { FishTechConsultancyShowcase } from "@/components/ui/project-mocks/FishTechConsultancyShowcase";
import { EndoscopySuiteShowcase } from "@/components/ui/project-mocks/EndoscopySuiteShowcase";
import { PortfolioMock } from "@/components/ui/project-mocks/PortfolioMock";
import { HealthLongevityShowcase } from "@/components/ui/project-mocks/HealthLongevityShowcase";
import { SalesAgentShowcase } from "@/components/ui/project-mocks/SalesAgentShowcase";
import { LoopingClip } from "@/components/ui/LoopingClip";
import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  isFilterHash,
  PROJECT_FILTERS,
  useProjectFilter,
  type ProjectFilterId,
  type ProjectGroup,
} from "@/lib/projectFilters";

const FLAGSHIP: FlagshipProjectProps = {
  number: "01",
  category: "EDGE AI · FLAGSHIP",
  title: "FishTech Precision Feeding System",
  sentence:
    "Edge-AI camera that measures fish and works out how much to feed, on the device.",
  tags: ["Computer Vision", "Raspberry Pi", "FastAPI"],
  status: "building",
  href: "/projects/fishtech",
  mockComponent: <FishTechFlagshipPhoto />,
};

// The Precision Feeding System (Iris) is both hardware and computer vision.
const FLAGSHIP_GROUPS: ProjectGroup[] = ["products-hardware", "automation-ai"];

function FishTechFlagshipPhoto() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/iris/iris-hero.jpg"
        alt="FishTech Precision Feeding System at a pond at sunset, overhead camera on the boom and a calibration board on the water"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 680px"
        className="object-cover object-[50%_40%]"
      />
      {/* Darkens the top edge so the status badge stays readable. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20 mix-blend-multiply"
      />
    </div>
  );
}

type AlternatingProject = Omit<AlternatingProjectProps, "side"> & {
  groups: ProjectGroup[];
};

// Sides are not stored: they alternate over whatever is shown, starting
// left, so a filtered list still reads left, right, left. Long copy and the
// screen galleries live on each project's own page.
const ALTERNATING: AlternatingProject[] = [
  {
    number: "02",
    category: "CLIENT SYSTEM",
    title: "Health & Longevity",
    sentence:
      "Health platform for a Harare doctor: Paynow memberships, video consults and nurse-aide matching.",
    tags: ["Astro", "Cloudflare Workers", "Paynow"],
    status: "live",
    href: "/projects/health-and-longevity",
    live: { label: "View Live", href: "https://www.healthandlongevity.co.zw" },
    mockComponent: <HealthLongevityShowcase />,
    groups: ["client-systems"],
    statusKey: "healthAndLongevity",
  },
  {
    number: "03",
    category: "CLIENT WORK",
    title: "The Endoscopy Suite",
    sentence:
      "Website for a Harare endoscopy and surgery practice, with booking requests confirmed on WhatsApp.",
    tags: ["Next.js", "TypeScript", "Cloudflare Pages"],
    status: "live",
    href: "/projects/endoscopy-suite",
    live: { label: "View Live", href: "https://www.endoscopysuite.co.zw" },
    mockComponent: <EndoscopySuiteShowcase />,
    groups: ["client-systems", "websites"],
    statusKey: "endoscopy",
  },
  {
    number: "04",
    category: "AUTOMATION",
    title: "FishTech Sales Agent & Ops",
    sentence: "AI agent that answers and quotes on WhatsApp. Code checks every reply.",
    tags: ["Python", "FastAPI", "WhatsApp Cloud API"],
    status: "live",
    href: "/projects/fishtech-sales-agent",
    mockComponent: <SalesAgentShowcase />,
    groups: ["automation-ai"],
    statusKey: "ops",
  },
  {
    number: "05",
    category: "COMPANY SITE",
    title: "FishTech Consultancy",
    sentence:
      "Company site with live prices and a pond calculator that sends a quote request to WhatsApp.",
    tags: ["Astro", "TypeScript", "GSAP"],
    status: "live",
    href: "/projects/fishtech-consultancy",
    live: { label: "View Live", href: "https://www.fishtech.co.zw" },
    mockComponent: <FishTechConsultancyShowcase />,
    groups: ["websites"],
    statusKey: "fishtech",
  },
  {
    number: "06",
    category: "EMBEDDED · SOLAR",
    title: "FishTech Feeder",
    sentence:
      "Solar automatic fish feeder that meters each dose. Working prototype, exhibited at ZAS 2026.",
    tags: ["ESP32", "Embedded", "Solar"],
    status: "building",
    href: "/projects/fishtech-feeder",
    mockComponent: (
      <LoopingClip
        src="/videos/feeder-dispensing.mp4"
        poster="/videos/feeder-dispensing-poster.jpg"
        label="FishTech Feeder spreading feed over a pond"
        objectPosition="50% 50%"
      />
    ),
    groups: ["products-hardware"],
  },
  {
    number: "07",
    category: "PRODUCTION",
    title: "Steadyhands Catering",
    sentence:
      "Catering platform for Bata Club with Paynow payments and online ordering.",
    tags: ["Next.js", "Paynow", "Vercel"],
    status: "live",
    href: "/projects/steadyhands",
    live: { label: "View Live", href: "https://steadyhandscatering.com" },
    mockComponent: <SteadyhandsMock />,
    groups: ["client-systems"],
    statusKey: "steadyhands",
  },
  {
    number: "08",
    category: "META",
    title: "This Portfolio",
    sentence:
      "The site you're on. Next.js, a live status check and a tested filter.",
    tags: ["Next.js", "TypeScript", "Motion"],
    status: "meta",
    href: "/projects/this-portfolio",
    live: {
      label: "View on GitHub",
      href: "https://github.com/DACDaniels/daniel-portfolio",
    },
    mockComponent: <PortfolioMock />,
    groups: ["websites"],
  },
];

export function Projects() {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: revealRef, revealed } = useScrollReveal<HTMLDivElement>();
  const { active, setActive } = useProjectFilter();

  // A shared link like /#work-websites lands on this section.
  useEffect(() => {
    if (isFilterHash(window.location.hash)) {
      document.getElementById("projects")?.scrollIntoView();
    }
  }, []);

  const showFlagship = active === "all" || FLAGSHIP_GROUPS.includes(active);
  const visible = ALTERNATING.filter(
    (p) => active === "all" || p.groups.includes(active),
  );
  const shownCount = visible.length + (showFlagship ? 1 : 0);

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

  // Filtering: cards that stay glide to their new place (transform only),
  // cards that leave fade out of the flow at once, so nothing jumps.
  const layoutTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 32, mass: 0.9 };
  // Each card's wrapper owns its whole reveal. The cards carry no variants
  // of their own: a card that re-enters through AnimatePresence would
  // otherwise stay at its hidden variant (opacity 0), because the label
  // from the section container does not reach it after the first reveal.
  const hiddenCard = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 };
  const cardMotion = (i: number) => ({
    initial: hiddenCard,
    animate: revealed
      ? {
          opacity: 1,
          y: 0,
          transition: reduceMotion
            ? { duration: 0.2 }
            : { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const, delay: Math.min(i, 4) * 0.08 },
        }
      : hiddenCard,
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.2 } },
  });

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
            className="mt-5 max-w-xl text-[15px] text-white/55 md:max-w-2xl md:text-[16px]"
            style={{ lineHeight: 1.7 }}
          >
            Five live systems running for clients and for FishTech, two
            edge devices in active build, and this portfolio itself.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 mb-10 md:mb-14">
            <FilterChips active={active} onChange={setActive} />
            <p className="sr-only" aria-live="polite">
              {active === "all"
                ? "Showing all projects"
                : `Showing ${shownCount} ${shownCount === 1 ? "project" : "projects"}`}
            </p>
          </motion.div>

          <LayoutGroup>
            <AnimatePresence mode="popLayout" initial={false}>
              {showFlagship ? (
                <motion.div
                  key="flagship"
                  layout={!reduceMotion}
                  transition={layoutTransition}
                  {...cardMotion(0)}
                >
                  <FlagshipProjectCard {...FLAGSHIP} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.div
              layout={!reduceMotion}
              transition={layoutTransition}
              className={`flex flex-col gap-14 md:gap-24 ${
                showFlagship ? "mt-14 md:mt-24" : ""
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project, i) => (
                  <motion.div
                    key={project.title}
                    layout={!reduceMotion}
                    transition={layoutTransition}
                    {...cardMotion(i + 1)}
                  >
                    <AlternatingProjectCard
                      {...project}
                      side={i % 2 === 0 ? "left" : "right"}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              layout={!reduceMotion}
              transition={layoutTransition}
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
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  );
}

function FilterChips({
  active,
  onChange,
}: {
  active: ProjectFilterId;
  onChange: (id: ProjectFilterId) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects"
      className="flex flex-wrap gap-2"
    >
      {PROJECT_FILTERS.map((f) => {
        const pressed = active === f.id;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(f.id)}
            data-cursor-interactive
            className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.97] ${
              pressed
                ? "border-accent/40 bg-accent/[0.12] text-accent shadow-[0_8px_24px_-12px_rgba(0,229,192,0.45)]"
                : "border-white/[0.08] bg-bg-surface text-white/65 hover:border-accent/30 hover:text-white"
            }`}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
