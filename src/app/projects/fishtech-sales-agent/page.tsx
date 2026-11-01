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
import { SalesAgentChat } from "@/components/ui/SalesAgentChat";
import { SalesAgentShowcase } from "@/components/ui/project-mocks/SalesAgentShowcase";

const PROGRESS_ITEMS = [
  { id: "problem", label: "The problem" },
  { id: "what", label: "What it does" },
  { id: "how", label: "How it works" },
  { id: "decisions", label: "Decisions" },
  { id: "safety", label: "Safety" },
  { id: "stack", label: "Stack" },
  { id: "screens", label: "Screens" },
];

const FEATURES: CaseCard[] = [
  {
    title: "Answers fish-farming questions",
    body: "From a knowledge sheet the team keeps up to date, in the customer's own language: English, Shona or the mix they write in.",
  },
  {
    title: "Prices from one list",
    body: "Pond digging and lining, bird and predator nets, fingerlings, feed and delivery. Sizes are read either way round, and delivery is priced from the road distance to the customer's town.",
  },
  {
    title: "Sends the quotation",
    body: "As a WhatsApp message and a PDF, both built by code from the same priced quotation.",
  },
  {
    title: "Knows when to hand over",
    body: "Anything it should not answer goes to a person at FishTech, with an alert on WhatsApp and Telegram.",
  },
];

const OPS: CaseCard[] = [
  { title: "Overview", body: "What needs attention, most urgent first, with the last 7 days and what people ask for." },
  { title: "Inbox", body: "Every chat in full, the reply window for each client, replies from the page and what was agreed beside it." },
  { title: "Clients", body: "Stages, private notes, and exports for a spreadsheet or Google Contacts." },
  { title: "Quotations", body: "Every quotation with its PDF. Approve, reject or withdraw the ones waiting." },
  { title: "Price list and Knowledge", body: "Read straight from the repository and edited there, so the agent and the page never disagree." },
  { title: "Settings", body: "How the agent is running and where its files live." },
];

const FLOW: FlowColumn[] = [
  {
    title: "Customer",
    nodes: [{ label: "WhatsApp message", detail: ["English, Shona", "or a mix"] }],
  },
  {
    title: "Webhook",
    nodes: [{ label: "FastAPI on Render", detail: ["Gathers quick", "messages into one"] }],
  },
  {
    title: "Agent",
    nodes: [
      { label: "Language model", detail: ["Reads the whole chat,", "decides what to say"] },
      { label: "Tools", detail: ["Prepare quotation", "Send price list", "Hand to a person"] },
    ],
  },
  {
    title: "Code",
    nodes: [
      { label: "Pricing engine", detail: ["Reads the price list", "live, every figure"], accent: true },
      { label: "Reply checks", detail: ["No figures in prose,", "no false claims"], accent: true },
      { label: "Approval gate", detail: ["Large quotations", "wait in Ops"] },
    ],
  },
  {
    title: "Out",
    nodes: [
      { label: "Reply and PDF", detail: ["On WhatsApp"] },
      { label: "Alerts", detail: ["WhatsApp, Telegram"] },
      { label: "State branch", detail: ["Chats, quotations", "behind Ops"] },
    ],
  },
];

const DECISIONS: CaseCard[] = [
  {
    title: "One model, tools for what matters",
    body: "The first version was a form: once a pond was mentioned, code took over and asked for missing fields, and real customers got looped. Now one model reads the whole chat and decides what to say, and it reaches for a tool for anything that touches a price or a person.",
  },
  {
    title: "The model never produces a price",
    body: "Prices reach the customer only as text that code attaches from the price list. A figure in the model's own words blocks the reply.",
  },
  {
    title: "One price list, shared with the website",
    body: "The pricing engine reads the same price list that fishtech.co.zw shows, through one feed. A price changed there is live in both places.",
  },
  {
    title: "Checks before every send",
    body: "Code blocks invented figures, banned wording, untrue claims about the team and cut-off replies before anything leaves.",
  },
  {
    title: "Approval for large quotations",
    body: "Standard quotations go out on their own. Large or non-standard ones wait in Ops until someone approves, rejects or withdraws them.",
  },
  {
    title: "Quiet when a person steps in",
    body: "When someone at FishTech takes over a chat with TELL, the agent stays silent there for 24 hours, forwards the customer's messages and sends a reminder after 2 hours.",
  },
  {
    title: "Every failed real chat is a test",
    body: "Each real conversation that went wrong became a regression test and a live check against the real model, so the same mistake cannot come back unnoticed.",
  },
  {
    title: "Fails to a plain, correct reply",
    body: "If the model fails, or a reply fails the checks twice, the customer gets one fixed, true sentence and the team is alerted. Never half a sentence, never silence.",
  },
];

const SAFETY: string[] = [
  "Conversations, clients and quotations are stored on a separate state branch of a private repository, never in the main code branch.",
  "The Ops console sits behind a password, with signed sessions and a limit on failed sign-ins.",
  "The agent cannot state anything about the company's legal status. That wording is blocked by code.",
  "It never prices a product that is made to order. Those go to a person.",
  "Each client shows how long is left in WhatsApp's 24-hour reply window, so the team knows when to call instead.",
];

const STACK: StackGroup[] = [
  {
    label: "Agent and web",
    items: ["Python 3.12", "FastAPI and Uvicorn", "Large language model agent with tool use", "A second model as fallback"],
  },
  {
    label: "Pricing and documents",
    items: ["Pricing engine in the standard library", "Price list and knowledge sheet in Markdown", "fpdf2 for the quotation PDF", "Road distances from a town list, then OpenStreetMap routing"],
  },
  {
    label: "Channels and running",
    items: ["WhatsApp Cloud API", "Telegram alerts", "GitHub as the state store", "Render with an uptime monitor", "unittest and real-chat evals"],
  },
];

const SCREENS: MediaItem[] = [
  { kind: "image", wide: true, src: "/images/fishtech-sales-agent/ops-overview-desktop.jpg", alt: "FishTech Ops overview on a laptop: three things that need attention, messages over 14 days and what people ask for (sample data)" },
  { kind: "image", src: "/images/fishtech-sales-agent/quote-pdf.jpg", focus: "top", alt: "A quotation PDF made by the agent's code for an invented customer, prices hidden" },
  { kind: "image", wide: true, src: "/images/fishtech-sales-agent/ops-inbox-desktop.jpg", alt: "FishTech Ops inbox on a laptop: a sample chat in English and Shona, with the quotation waiting for approval beside it" },
  { kind: "image", src: "/images/fishtech-sales-agent/ops-inbox-phone.jpg", focus: "top", alt: "FishTech Ops inbox on a phone, with a sample chat" },
  { kind: "image", wide: true, src: "/images/fishtech-sales-agent/ops-quotations-desktop.jpg", alt: "FishTech Ops quotations on a laptop, with amounts hidden (sample data)" },
  { kind: "image", src: "/images/fishtech-sales-agent/ops-quotations-phone.jpg", focus: "top", alt: "FishTech Ops quotations on a phone, one waiting for approval (sample data)" },
];

export default function SalesAgentCaseStudyPage() {
  const { reduceMotion } = useCaseVariants();

  return (
    <>
      <Navbar />
      <CaseSectionProgress items={PROGRESS_ITEMS} />

      <main id="main" className="relative w-full bg-bg-primary pb-32 pt-28 md:pt-32">
        <BackToWork />

        <CaseHeader
          eyebrow="// case-study · automation"
          statusNote="Live with real customers"
          title="FishTech Sales Agent & Ops"
          lead="A large language model agent with tool use on FishTech's WhatsApp line, and the operations console behind it. It answers, prices and sends quotations at any hour. Code decides every figure and checks every reply."
          facts={[
            { k: "Built for", v: "FishTech, Zimbabwe" },
            { k: "Role", v: "Design, build and running" },
            { k: "Status", v: "Live on WhatsApp" },
          ]}
        />

        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="group aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            <SalesAgentShowcase />
          </motion.div>
          <p className="mt-3 text-text-tertiary" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px" }}>
            Sample data and an invented conversation. No real customer appears on this page.
          </p>
        </div>

        <article className="mx-auto mt-20 w-full max-w-3xl space-y-20 px-6 md:mt-24 md:px-8">
          <CaseSection id="problem" eyebrow="// the problem" title="Every enquiry needs the same careful work.">
            <p>
              FishTech digs and lines fish ponds, sells nets, fingerlings and feed, and delivers across Zimbabwe.
              Customers write on WhatsApp at any hour, often in Shona or a mix of Shona and English.
            </p>
            <p>
              Each enquiry needs the same things: a sound answer about fish farming, the right size, a price from the
              current list, delivery for the distance, and a written quotation. Done by hand, enquiries that arrive at
              night wait, and quoted prices can drift from the published list.
            </p>
          </CaseSection>

          <CaseSection id="what" eyebrow="// what it does" title="It sells on WhatsApp. Ops shows everything behind it.">
            <div className="grid grid-cols-1 items-start gap-8 pt-2 md:grid-cols-[minmax(0,1fr)_260px]">
              <CardGrid cards={FEATURES} />
              <SalesAgentChat className="mx-auto aspect-[9/17] w-full max-w-[300px]" />
            </div>
            <p className="pt-4">
              The console at ops.fishtech.co.zw holds every chat, client and quotation, from the same code as the
              WhatsApp commands.
            </p>
            <CardGrid cards={OPS} />
          </CaseSection>

          <CaseSection id="how" eyebrow="// how it works" title="The model talks. Code decides every figure.">
            <p>
              A message arrives at the webhook. One model reads the whole chat and decides what to say, using tools for
              anything that touches a price or a person. Before a reply leaves, code checks it, and large quotations
              stop at an approval gate.
            </p>
            <div className="pt-2">
              <FlowDiagram
                columns={FLOW}
                summary="A customer's WhatsApp message reaches a FastAPI webhook on Render, which gathers quick messages into one. A language model reads the whole chat and uses tools to prepare a quotation, send the price list or hand the chat to a person. Code then prices every item from the live price list, checks the reply, and holds large quotations for approval. The reply and PDF go out on WhatsApp, alerts go to WhatsApp and Telegram, and chats and quotations are stored on a separate state branch read by the Ops console."
              />
            </div>
          </CaseSection>

          <CaseSection id="decisions" eyebrow="// engineering decisions" title="Built from real conversations.">
            <CardGrid cards={DECISIONS} />
          </CaseSection>

          <CaseSection id="safety" eyebrow="// privacy and safety" title="What it can never do.">
            <PointList items={SAFETY} />
          </CaseSection>

          <CaseSection id="stack" eyebrow="// stack" title="The stack">
            <StackGrid groups={STACK} />
          </CaseSection>

          <CaseSection id="screens" eyebrow="// screens" title="Screens">
            <p>
              The real Ops page, rendered with invented clients, chats and quotations. Amounts are hidden. Tap a screen
              to open it.
            </p>
            <MediaGallery layout="grid" items={SCREENS} className="pt-2" />
          </CaseSection>

          <ClosingCTA
            eyebrow="// similar problem? let's talk"
            title="Want an agent your customers can trust?"
            body="Language models where they help, code where the answer must be right. The same pattern fits any business that sells, books or quotes on WhatsApp."
          />
        </article>
      </main>
    </>
  );
}
