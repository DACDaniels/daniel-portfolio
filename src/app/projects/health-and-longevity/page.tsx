"use client";

import { motion } from "motion/react";
import { Navbar } from "@/components/sections/Navbar";
import { CaseSectionProgress } from "@/components/ui/CaseSectionProgress";
import {
  BackToWork,
  CardGrid,
  CaseHeader,
  CaseSection,
  ClosingCTA,
  PointList,
  StackGrid,
  useCaseVariants,
  type CaseCard,
  type StackGroup,
} from "@/components/ui/CaseStudyKit";
import { FlowDiagram, type FlowColumn } from "@/components/ui/FlowDiagram";
import { MediaGallery, type MediaItem } from "@/components/ui/MediaGallery";
import { HealthLongevityShowcase } from "@/components/ui/project-mocks/HealthLongevityShowcase";

const PROGRESS_ITEMS = [
  { id: "problem", label: "The problem" },
  { id: "what", label: "What it does" },
  { id: "how", label: "How it works" },
  { id: "decisions", label: "Decisions" },
  { id: "privacy", label: "Privacy" },
  { id: "stack", label: "Stack" },
  { id: "screens", label: "Screens" },
];

const FEATURES: CaseCard[] = [
  {
    title: "Articles and video lessons",
    body: "Free pieces for everyone. Paid ones unlock with a membership or are bought to keep as an article PDF, a topic guide or a video lesson set.",
  },
  {
    title: "Video consultations",
    body: "Pick a day and a time in Harare time, pay, and a join link opens the call at the right moment. The practice starts the call from the admin area.",
  },
  {
    title: "Visits at the clinic",
    body: "The same booking flow for consults in person at the Centre in Belvedere, with closed days set by the practice.",
  },
  {
    title: "Nurse aides at home",
    body: "A step-by-step request, then up to three aides who fit, nearest first. Aides apply themselves, and the practice checks and approves them before they can be matched.",
  },
  {
    title: "Community",
    body: "Questions and posts in topic communities, with questions for the doctor answered first and a review queue for anything hidden or reported.",
  },
  {
    title: "An admin area built for a phone",
    body: "Today, the diary, articles and lessons, topics and prices, community review and nurse aides, run by the doctor and his assistant from their phones. A written manual walks through every screen.",
  },
];

const FLOW: FlowColumn[] = [
  {
    title: "Phones",
    nodes: [
      { label: "Visitors and members", detail: ["Installable app", "Works offline"] },
      { label: "Practice staff", detail: ["Admin area", "Phone-first"] },
    ],
  },
  {
    title: "Cloudflare edge",
    nodes: [
      { label: "Pages front door", detail: ["Public pages", "No paid text"] },
      { label: "Worker", detail: ["Sign-in, access checks", "Payments, bookings"], accent: true },
    ],
  },
  {
    title: "Data",
    nodes: [
      { label: "D1 database", detail: ["Personal and clinical", "fields encrypted"], accent: true },
      { label: "R2 storage", detail: ["Video lessons"] },
    ],
  },
  {
    title: "Services",
    nodes: [
      { label: "Paynow", detail: ["EcoCash, OneMoney,", "cards"] },
      { label: "Video calls", detail: ["Consult rooms,", "join links"] },
      { label: "WhatsApp links", detail: ["Confirmations"] },
    ],
  },
];

const DECISIONS: CaseCard[] = [
  {
    title: "Paid text never ships as a file",
    body: "Paid article text lives only in the database. The Worker serves it after an access check, so nothing in the built site gives it away.",
  },
  {
    title: "Nothing to write down",
    body: "Every confirmation says \"Saved in My space. Nothing to write down.\" A private link brings everything back on a new phone. A membership works on up to two phones, and a third moves the oldest.",
  },
  {
    title: "Mobile money first, with a pretend mode",
    body: "Paynow takes EcoCash, OneMoney and cards. A pretend Paynow with test numbers runs locally and on the preview, so every payment path is tested without real money.",
  },
  {
    title: "A deploy that refuses to be unsafe",
    body: "Before the real site is deployed, a check refuses any build that still has pretend payments, test keys, placeholder IDs or the wrong switches.",
  },
  {
    title: "Checks on pull requests",
    body: "Type checks, unit tests, the colour and size-scale checks and the build run on pull requests. End-to-end, accessibility and Lighthouse checks run on changes to payments, private data, consults or sign-in, and before a launch.",
  },
  {
    title: "Free-tier hosting",
    body: "Static pages from Cloudflare Pages, everything private through one Worker and D1. Built to a running-cost target of free hosting tiers plus the domain.",
  },
];

const PRIVACY: string[] = [
  "Personal and clinical details are encrypted field by field before they reach the database.",
  "Quick exit and Discreet mode sit in the header of every page.",
  "Phone numbers and email addresses are removed from community posts before they are saved.",
  "Aides are told the area of a request, never the name or number of the person asking. Contact details are cleared 90 days after a request closes.",
  "Only the doctor and his assistant sign in. There are no public accounts, and every admin change is logged with who and when.",
  "Links carry their codes after the #, so the codes never reach a server log.",
];

const STACK: StackGroup[] = [
  {
    label: "Front end",
    items: ["Astro", "React islands", "TypeScript", "Tailwind CSS v4", "Radix UI", "Service worker and web app manifest"],
  },
  {
    label: "Edge and data",
    items: ["Cloudflare Workers and Pages", "D1 (SQLite) with Drizzle ORM", "R2 for video", "Field encryption", "Paynow", "pdf-lib for buyer-marked PDFs"],
  },
  {
    label: "Quality",
    items: ["Vitest", "Playwright end-to-end", "axe accessibility checks", "Lighthouse CI", "GitHub Actions", "Deploy safety check"],
  },
];

const SCREENS: MediaItem[] = [
  { kind: "image", wide: true, src: "/images/health-longevity/hl-home-desktop.jpg", alt: "Health & Longevity home page on a laptop: the six service tiles and a sample featured article" },
  { kind: "image", src: "/images/health-longevity/hl-membership-phone.jpg", focus: "top", alt: "Membership pay step on a phone, with EcoCash picked and the pretend Paynow test panel" },
  { kind: "image", wide: true, src: "/images/health-longevity/hl-admin-today-desktop.jpg", alt: "Health & Longevity admin Today screen on a laptop, with the next video consult (sample data)" },
  { kind: "image", src: "/images/health-longevity/hl-consult-phone.jpg", focus: "top", alt: "Video consult booking on a phone, with a day and a time picked" },
  { kind: "image", src: "/images/health-longevity/hl-aide-match-phone.jpg", focus: "top", alt: "Nurse-aide match screen on a phone: three sample aides, nearest first" },
  { kind: "image", src: "/images/health-longevity/hl-articles-phone.jpg", focus: "top", alt: "Articles page on a phone, with sample free and paid articles by topic" },
  { kind: "image", src: "/images/health-longevity/hl-admin-today-phone.jpg", focus: "top", alt: "Admin Today screen on a phone, with the next video consult (sample data)" },
];

export default function HealthLongevityCaseStudyPage() {
  const { reduceMotion } = useCaseVariants();

  return (
    <>
      <Navbar />
      <CaseSectionProgress items={PROGRESS_ITEMS} />

      <main id="main" className="relative w-full bg-bg-primary pb-32 pt-28 md:pt-32">
        <BackToWork />

        <CaseHeader
          eyebrow="// case-study · client system"
          statusNote="healthandlongevity.co.zw"
          title="Health & Longevity"
          lead="A health platform for Dr Misheck Ruwende, a Harare doctor and health educator. People learn, pay, book him and ask for care at home from one site on their phone, and his practice runs all of it from theirs."
          facts={[
            { k: "Client", v: "Dr Misheck Ruwende, Harare" },
            { k: "Role", v: "Sole developer" },
            { k: "Status", v: "Live" },
          ]}
          links={[{ label: "View the live site", href: "https://www.healthandlongevity.co.zw" }]}
        />

        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="group aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            <HealthLongevityShowcase />
          </motion.div>
          <p className="mt-3 text-text-tertiary" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px" }}>
            Screens from the local preview with sample content.
          </p>
        </div>

        <article className="mx-auto mt-20 w-full max-w-3xl space-y-20 px-6 md:mt-24 md:px-8">
          <CaseSection id="problem" eyebrow="// the problem" title="An audience that wants more than a post.">
            <p>
              Dr Ruwende explains health in plain words to a large audience online. The people who follow him want to
              go further: read and watch in depth, see him, and find help at home for someone they care for.
            </p>
            <p>
              In Zimbabwe that has to work on a mid-range Android phone, on patchy data, with mobile money. It has to keep
              health questions private. And it has to be run by a doctor and one assistant, from their phones, without a
              developer on call.
            </p>
          </CaseSection>

          <CaseSection id="what" eyebrow="// what it does" title="One site for learning, paying, booking and care.">
            <CardGrid cards={FEATURES} />
          </CaseSection>

          <CaseSection id="how" eyebrow="// how it works" title="Public pages at the edge, everything private through one Worker.">
            <p>
              Public pages are built ahead of time and served from Cloudflare&apos;s edge. Anything private, from paid text
              to bookings and payments, goes through one Worker that checks access and talks to the database, Paynow and
              the video service.
            </p>
            <div className="pt-2">
              <FlowDiagram
                columns={FLOW}
                summary="Phones reach public pages on the Cloudflare Pages front door. Private requests go to one Worker, which reads and writes the D1 database with encrypted personal and clinical fields, serves video from R2 storage, and calls Paynow for payments, the video service for consults and WhatsApp links for confirmations."
              />
            </div>
          </CaseSection>

          <CaseSection id="decisions" eyebrow="// engineering decisions" title="Decisions that keep it simple to run.">
            <CardGrid cards={DECISIONS} />
          </CaseSection>

          <CaseSection id="privacy" eyebrow="// privacy and safety" title="Private by default.">
            <PointList items={PRIVACY} />
          </CaseSection>

          <CaseSection id="stack" eyebrow="// stack" title="The stack">
            <StackGrid groups={STACK} />
          </CaseSection>

          <CaseSection id="screens" eyebrow="// screens" title="Screens">
            <p>Sample content only, captured from the local preview. Tap a screen to open it.</p>
            <MediaGallery layout="grid" items={SCREENS} className="pt-2" />
          </CaseSection>

          <ClosingCTA
            eyebrow="// similar problem? let's talk"
            title="Need a platform people pay for and use on a phone?"
            body="Mobile money, bookings, private data and an admin area the client runs alone. The same approach fits clinics, schools and member organisations."
          />
        </article>
      </main>
    </>
  );
}
