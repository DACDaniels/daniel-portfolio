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
import { FishTechConsultancyShowcase } from "@/components/ui/project-mocks/FishTechConsultancyShowcase";
import { EndoscopySuiteShowcase } from "@/components/ui/project-mocks/EndoscopySuiteShowcase";
import { PortfolioMock } from "@/components/ui/project-mocks/PortfolioMock";
import { HealthLongevityShowcase } from "@/components/ui/project-mocks/HealthLongevityShowcase";
import { SalesAgentShowcase } from "@/components/ui/project-mocks/SalesAgentShowcase";
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

const ALTERNATING: Omit<AlternatingProjectProps, "variants">[] = [
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
    side: "left",
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
    side: "right",
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
    side: "left",
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
    side: "right",
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
    side: "left",
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
    side: "right",
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
            Five live systems running for clients and for FishTech, two
            edge devices in active build, and this portfolio itself.
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
