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
import { MediaGallery, type MediaItem } from "@/components/ui/MediaGallery";
import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  isFilterHash,
  PROJECT_FILTERS,
  useProjectFilter,
  type ProjectFilterId,
  type ProjectGroup,
} from "@/lib/projectFilters";

const FLAGSHIP: Omit<FlagshipProjectProps, "variants"> = {
  number: "01",
  category: "EDGE AI · FLAGSHIP",
  title: "FishTech Precision Feeding System",
  meta: "Working prototype · Pilot in preparation",
  description:
    "Closed-loop computer-vision instrument for smallholder pond aquaculture in Zimbabwe. An overhead camera and a Raspberry Pi 5 with a Hailo NPU detect fish, measure them against an auto-calibrated reference, estimate whole-pond biomass with honest confidence intervals, and drive an integrated auger feeder to dispense a precision dose. Runs entirely on the device. Being industrialised through FishTech Consultancy, pilot deployment in preparation.",
  tags: [
    "Computer Vision",
    "IoT",
    "Edge AI",
    "YOLO",
    "Raspberry Pi",
    "Hailo NPU",
    "FastAPI",
  ],
  status: "building",
  caseStudyHref: "/projects/fishtech",
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
        sizes="(max-width: 1024px) 100vw, 640px"
        className="object-cover object-[50%_40%]"
      />
      {/* Darkens the top edge so the flagship label and status badge stay readable. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20 mix-blend-multiply"
      />
    </div>
  );
}

const FEEDER_GALLERY: MediaItem[] = [
  {
    kind: "image",
    src: "/images/feeder/feeder-mechanism.jpg",
    alt: "FishTech Feeder with the door open, showing the auger and electronics",
  },
  {
    kind: "image",
    src: "/images/feeder/feeder-pond-sunset.jpg",
    alt: "The FishTech Feeder beside a fish pond at dusk",
  },
  {
    kind: "image",
    src: "/images/feeder/feeder-pond-visitors.jpg",
    alt: "Visitors at the FishTech Feeder beside the pond",
  },
];

const ENDOSCOPY_GALLERY: MediaItem[] = [
  {
    kind: "image",
    src: "/images/endoscopy-suite/es-services-phone.jpg",
    focus: "top",
    alt: "The Endoscopy Suite services page on a phone: every scope and operation, in plain words",
  },
  {
    kind: "image",
    src: "/images/endoscopy-suite/es-book-phone.jpg",
    focus: "top",
    alt: "The Endoscopy Suite booking page on a phone, choosing what to book",
  },
  {
    kind: "image",
    src: "/images/endoscopy-suite/es-emergencies-phone.jpg",
    focus: "top",
    alt: "The Endoscopy Suite emergencies page on a phone, with the call button first",
  },
];

const FISHTECH_CONSULTANCY_GALLERY: MediaItem[] = [
  {
    kind: "image",
    src: "/images/fishtech-consultancy/ft-prices-phone.jpg",
    focus: "top",
    alt: "FishTech live price panel on a phone, prices read from the published price list",
  },
  {
    kind: "image",
    src: "/images/fishtech-consultancy/ft-calculator-phone.jpg",
    focus: "top",
    alt: "FishTech pond calculator on a phone, with the pond drawn to scale",
  },
  {
    kind: "image",
    src: "/images/fishtech-consultancy/ft-quote-phone.jpg",
    focus: "top",
    alt: "FishTech pond calculator total on a phone, with the button to send it on WhatsApp",
  },
];

const HEALTH_LONGEVITY_GALLERY: MediaItem[] = [
  {
    kind: "image",
    src: "/images/health-longevity/hl-consult-phone.jpg",
    focus: "top",
    alt: "Health & Longevity video consult booking on a phone, with a day and a time picked (sample data)",
  },
  {
    kind: "image",
    src: "/images/health-longevity/hl-aide-match-phone.jpg",
    focus: "top",
    alt: "Health & Longevity nurse-aide match screen on a phone: three sample aides, nearest first",
  },
  {
    kind: "image",
    src: "/images/health-longevity/hl-admin-today-phone.jpg",
    focus: "top",
    alt: "Health & Longevity admin Today screen on a phone, with the next video consult (sample data)",
  },
];

const SALES_AGENT_GALLERY: MediaItem[] = [
  {
    kind: "image",
    src: "/images/fishtech-sales-agent/ops-inbox-phone.jpg",
    focus: "top",
    alt: "FishTech Ops inbox on a phone: a sample chat in English and Shona with the agent's replies",
  },
  {
    kind: "image",
    src: "/images/fishtech-sales-agent/ops-quotations-phone.jpg",
    focus: "top",
    alt: "FishTech Ops quotations on a phone, one waiting for approval (sample data, amounts hidden)",
  },
  {
    kind: "image",
    src: "/images/fishtech-sales-agent/quote-pdf.jpg",
    focus: "top",
    alt: "A FishTech quotation PDF made by the agent's code for an invented customer, prices hidden",
  },
];

type AlternatingProject = Omit<AlternatingProjectProps, "variants" | "side"> & {
  groups: ProjectGroup[];
};

// Sides are not stored: they alternate over whatever is shown, starting
// left, so a filtered list still reads left, right, left.
const ALTERNATING: AlternatingProject[] = [
  {
    number: "02",
    category: "CLIENT SYSTEM",
    title: "Health & Longevity",
    meta: "healthandlongevity.co.zw · Dr Misheck Ruwende",
    description:
      "Health platform for a Harare doctor and health educator. Members pay through Paynow, book video consultations and clinic visits, read paid articles and video lessons, and request nurse aides for care at home. Personal details are encrypted, it installs like an app and works offline, and the practice publishes everything from an admin area built for a phone.",
    tags: ["Astro", "React", "TypeScript", "Cloudflare Workers", "D1", "Paynow", "Playwright"],
    status: "live",
    primaryLink: {
      label: "View Live",
      href: "https://www.healthandlongevity.co.zw",
      external: true,
    },
    secondaryLink: {
      label: "View Case Study",
      href: "/projects/health-and-longevity",
    },
    mockComponent: <HealthLongevityShowcase />,
    gallery: <MediaGallery layout="strip" items={HEALTH_LONGEVITY_GALLERY} />,
    groups: ["client-systems"],
    statusKey: "healthAndLongevity",
  },
  {
    number: "03",
    category: "CLIENT WORK",
    title: "The Endoscopy Suite",
    meta: "endoscopysuite.co.zw · Dr Muguti",
    description:
      "Website for a specialist surgeon's endoscopy and surgery practice in Belvedere, Harare. All 42 services explained in plain words, preparation guides, an emergencies page that puts the phone number first, and appointment requests confirmed on WhatsApp. Built phone-first, because that is how most patients will find it.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
    status: "live",
    primaryLink: {
      label: "View Live",
      href: "https://www.endoscopysuite.co.zw",
      external: true,
    },
    mockComponent: <EndoscopySuiteShowcase />,
    gallery: <MediaGallery layout="strip" items={ENDOSCOPY_GALLERY} />,
    groups: ["client-systems", "websites"],
    statusKey: "endoscopy",
  },
  {
    number: "04",
    category: "AUTOMATION",
    title: "FishTech Sales Agent & Ops",
    meta: "WhatsApp agent · ops.fishtech.co.zw",
    description:
      "AI sales agent on FishTech's WhatsApp line, live with real customers. It answers fish-farming questions in English or Shona, prices ponds, nets, fingerlings and delivery from one price list, and sends quotations as a PDF. Code checks every reply before it goes out, and large quotations wait for approval. Behind it, an operations console holds every chat, client and quotation.",
    tags: ["Python", "FastAPI", "LLM tool use", "WhatsApp Cloud API", "Render"],
    status: "live",
    primaryLink: {
      label: "View Case Study",
      href: "/projects/fishtech-sales-agent",
    },
    mockComponent: <SalesAgentShowcase />,
    gallery: <MediaGallery layout="strip" items={SALES_AGENT_GALLERY} />,
    groups: ["automation-ai"],
    statusKey: "ops",
  },
  {
    number: "05",
    category: "COMPANY SITE",
    title: "FishTech Consultancy",
    meta: "fishtech.co.zw · Lead-gen platform",
    description:
      "Company site for a Zimbabwean fish-farming services business. Prices load from a single price list, and a pond calculator gives an instant cost that sends straight to WhatsApp for a written quote.",
    tags: ["Astro", "TypeScript", "GSAP", "Vercel"],
    status: "live",
    primaryLink: {
      label: "View Live",
      href: "https://www.fishtech.co.zw",
      external: true,
    },
    mockComponent: <FishTechConsultancyShowcase />,
    gallery: <MediaGallery layout="strip" items={FISHTECH_CONSULTANCY_GALLERY} />,
    groups: ["websites"],
    statusKey: "fishtech",
  },
  {
    number: "06",
    category: "EMBEDDED · SOLAR",
    title: "FishTech Feeder",
    meta: "Working prototype · Exhibited at ZAS 2026",
    description:
      "Solar-powered automatic fish feeder in welded steel. The first unit is built and dispensing feed. An auger turns a counted number of revolutions to measure each dose, and a spinning disc spreads it over the pond. It works out the daily ration from fish size and water temperature with no internet, and can take a feed instruction from the Precision Feeding System over Wi-Fi. Two sizes, 10 kg and 25 kg, matched to standard feed bags.",
    tags: ["ESP32", "Embedded", "Solar", "IoT", "Firmware"],
    status: "building",
    mockComponent: (
      <LoopingClip
        src="/videos/feeder-dispensing.mp4"
        poster="/videos/feeder-dispensing-poster.jpg"
        label="FishTech Feeder spreading feed over a pond"
        objectPosition="50% 50%"
      />
    ),
    gallery: <MediaGallery layout="strip" items={FEEDER_GALLERY} />,
    groups: ["products-hardware"],
  },
  {
    number: "07",
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
    groups: ["client-systems"],
    statusKey: "steadyhands",
  },
  {
    number: "08",
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
              className={`flex flex-col gap-20 md:gap-28 ${
                showFlagship ? "mt-16 md:mt-24" : ""
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
