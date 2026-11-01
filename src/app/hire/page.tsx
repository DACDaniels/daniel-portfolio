import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { LiveCheck } from "@/components/ui/LiveCheck";
import { CONTACT_LINKS } from "@/lib/contactLinks";
import type { StatusKey } from "@/lib/siteStatus";

// /hire: everything a hiring team needs, readable in about a minute.
// No response-time promises, no salary. Copy rules as in CLAUDE.md.

const ROLES = [
  {
    role: "Full-stack engineer",
    proof: "Built and runs Health & Longevity: Paynow membership, consult booking, paid lessons and a phone-first admin area.",
    href: "/projects/health-and-longevity",
    label: "Health & Longevity case study",
  },
  {
    role: "Systems and edge engineer",
    proof: "Designed the FishTech Precision Feeding System: computer vision on a Raspberry Pi at the pondside, with no cloud.",
    href: "/projects/fishtech",
    label: "FishTech case study",
  },
  {
    role: "AI and automation engineer",
    proof: "Runs the FishTech Sales Agent: a large language model agent with tool use that prices and quotes on WhatsApp, every reply checked in code.",
    href: "/projects/fishtech-sales-agent",
    label: "Sales Agent case study",
  },
] as const;

const LIVE: { name: string; what: string; href: string; status: StatusKey; external: boolean }[] = [
  { name: "Health & Longevity", what: "Health platform for a Harare doctor", href: "https://www.healthandlongevity.co.zw", status: "healthAndLongevity", external: true },
  { name: "The Endoscopy Suite", what: "Website for a surgical practice", href: "https://www.endoscopysuite.co.zw", status: "endoscopy", external: true },
  { name: "FishTech Sales Agent & Ops", what: "WhatsApp agent and ops console", href: "/projects/fishtech-sales-agent", status: "ops", external: false },
  { name: "fishtech.co.zw", what: "Company site with a pond calculator", href: "https://www.fishtech.co.zw", status: "fishtech", external: true },
  { name: "Steadyhands Catering", what: "Ordering with Paynow payments", href: "https://steadyhandscatering.com", status: "steadyhands", external: true },
];

const HABITS = [
  ["Decisions in writing.", "Every choice is dated with its reason."],
  ["Claimed versus true.", "No claim ships unless a file backs it."],
  ["Tested before it ships.", "Every real failure becomes a test."],
  ["Always a way back.", "Own branch for each change, rollback point before each deploy."],
] as const;

const ACTIONS = [
  { label: "Download résumé", href: CONTACT_LINKS.resume, primary: true, download: true },
  { label: "Email", href: CONTACT_LINKS.email },
  { label: "WhatsApp", href: CONTACT_LINKS.whatsapp, external: true },
  { label: "LinkedIn", href: CONTACT_LINKS.linkedin, external: true },
  { label: "GitHub", href: CONTACT_LINKS.github, external: true },
] as const;

export default function HirePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden bg-bg-primary">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -right-48 h-[520px] w-[520px] rounded-full bg-accent opacity-[0.07] blur-[140px]"
        />
        <div className="relative mx-auto w-full max-w-[960px] px-5 pt-32 pb-20 sm:px-6 md:px-8 md:pt-40 md:pb-28">
          <header className="hire-rise" style={{ animationDelay: "0ms" }}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
              {"// hire"}
            </p>
            <h1 className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] tracking-[-0.035em] text-text-primary">
              Hiring? Start here.
            </h1>
            <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.7] text-text-secondary md:text-[18px]">
              Daniel Chadambuka, Software Engineer | IT Solutions Specialist |
              Technology Innovator, in Harare. I build systems that run for
              real clients, and I keep them running.
            </p>
          </header>

          <div className="mt-14 md:mt-20">
            <Row label="Roles I fit" delay={80}>
              <ul className="flex flex-col gap-6">
                {ROLES.map((r) => (
                  <li key={r.role}>
                    <h3 className="font-heading text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] text-text-primary md:text-[22px]">
                      {r.role}
                    </h3>
                    <p className="mt-1.5 max-w-[62ch] text-[15px] leading-[1.7] text-text-secondary">
                      {r.proof}{" "}
                      <Link href={r.href} className="hire-link whitespace-nowrap text-text-primary">
                        {r.label}
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            </Row>

            <Row label="Live systems" delay={160}>
              <ul className="flex flex-col">
                {LIVE.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-col gap-2 border-t border-border py-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="min-w-0">
                      <a
                        href={s.href}
                        target={s.external ? "_blank" : undefined}
                        rel={s.external ? "noopener noreferrer" : undefined}
                        className="hire-link font-heading text-[17px] font-semibold tracking-[-0.015em] text-text-primary"
                      >
                        {s.name}
                      </a>
                      <p className="text-[14px] leading-[1.6] text-text-tertiary">
                        {s.what}
                      </p>
                    </div>
                    <div className="min-h-[22px] shrink-0">
                      <LiveCheck statusKey={s.status} />
                    </div>
                  </li>
                ))}
              </ul>
            </Row>

            <Row label="How I work" delay={240}>
              <ul className="flex flex-col gap-3">
                {HABITS.map(([title, line]) => (
                  <li key={title} className="text-[15px] leading-[1.7] text-text-secondary">
                    <span className="font-medium text-text-primary">{title}</span>{" "}
                    {line}
                  </li>
                ))}
              </ul>
              <Link href="/#how-i-build" className="hire-link mt-4 inline-block text-[14px]">
                Each one with a real dated decision
              </Link>
            </Row>

            <Row label="Availability" delay={320}>
              <p className="text-[15px] leading-[1.7] text-text-secondary">
                <span className="text-text-primary">
                  Open to full-time software engineering roles, remote or in
                  Zimbabwe.
                </span>{" "}
                Based in Harare, UTC+2.
              </p>
            </Row>

            <Row label="Education" delay={400}>
              <p className="text-[15px] leading-[1.7] text-text-secondary">
                <span className="text-text-primary">
                  Bachelor of Science Honours Degree in Computer Science, Upper
                  Second Division.
                </span>{" "}
                National University of Science and Technology (NUST), Zimbabwe,
                2022 to 2026. Conferred 17 September 2026.
              </p>
            </Row>

            <Row label="Get in touch" delay={480} last>
              <ul className="flex flex-wrap gap-3">
                {ACTIONS.map((a) => {
                  const external = "external" in a && a.external;
                  const primary = "primary" in a && a.primary;
                  return (
                    <li key={a.label}>
                      <a
                        href={a.href}
                        download={"download" in a && a.download ? "Daniel-Chadambuka-Resume.pdf" : undefined}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className={
                          primary
                            ? "inline-flex min-h-[44px] items-center rounded-full bg-accent px-6 text-[14px] font-semibold text-bg-primary shadow-[0_12px_32px_-8px_rgba(0,229,192,0.5)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_16px_40px_-8px_rgba(0,229,192,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.97]"
                            : "inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-5 text-[14px] font-medium text-text-primary transition-[border-color,color,transform] duration-300 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.97]"
                        }
                      >
                        {a.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Row>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({
  label,
  delay,
  last,
  children,
}: {
  label: string;
  delay: number;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`hire-rise grid gap-4 border-t border-border py-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:py-10 ${last ? "border-b" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.15em] text-text-tertiary md:pt-1">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
