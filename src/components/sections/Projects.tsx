"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
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
import { FishTechWebsiteMock } from "@/components/ui/project-mocks/FishTechWebsiteMock";
import { EndoscopySuiteShowcase } from "@/components/ui/project-mocks/EndoscopySuiteShowcase";
import { PortfolioMock } from "@/components/ui/project-mocks/PortfolioMock";
import { LoopingClip } from "@/components/ui/LoopingClip";
import { MediaGallery, type MediaItem } from "@/components/ui/MediaGallery";
import { useScrollReveal } from "@/lib/useScrollReveal";

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

const ALTERNATING: Omit<AlternatingProjectProps, "variants">[] = [
  {
    number: "02",
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
    side: "left",
  },
  {
    number: "03",
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
    side: "right",
  },
  {
    number: "04",
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
    number: "05",
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
    number: "06",
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
            Two edge instruments in active build, one live transacting
            platform, two live websites, and this portfolio itself.
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
