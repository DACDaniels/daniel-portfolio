"use client";

import { ProjectPage } from "@/components/ui/ProjectPage";
import { PortfolioMock } from "@/components/ui/project-mocks/PortfolioMock";

// Source: this repository (package.json, src/app/api/status, scripts/,
// DECISIONS.md, CLAUDE.md).
export default function ThisPortfolioPage() {
  return (
    <ProjectPage
      status="meta"
      eyebrow="// project · meta"
      statusNote="You're looking at it"
      title="This Portfolio"
      lead="The site you're on, built to the same standard as client work: every claim traced to a source, every change checked before it ships."
      facts={[
        { k: "Type", v: "Personal site" },
        { k: "Built with", v: "Next.js 16, TypeScript" },
        { k: "Hosting", v: "Vercel" },
      ]}
      links={[{ label: "View on GitHub", href: "https://github.com/DACDaniels/daniel-portfolio" }]}
      hero={<PortfolioMock />}
      whatItIs={
        <>
          <p>
            A portfolio for clients, employers and other developers, with one long home page, a page for every
            project and a page for hiring. It is phone-first, because most visitors arrive on a phone.
          </p>
          <p>
            The copy follows written rules: no figures that cannot be checked, prototypes called prototypes, and a
            dated decision log for every change of direction.
          </p>
        </>
      }
      whatItDoes={[
        {
          title: "Live status lights",
          body: "A server route checks the five live systems, caches the answer for five minutes and returns only up or down. A card shows its light only after a fresh, passing check, and never shows red.",
        },
        {
          title: "A tested project filter",
          body: "Filter chips keep the choice in the address, so a link opens the same view. A script clicks every chip in every order and fails the preflight if a card is missing or faded out.",
        },
        {
          title: "Search checks",
          body: "After every build a script reads the pages and fails if a title, description, canonical link, share image, structured data entry or sitemap line is wrong.",
        },
        {
          title: "Command palette",
          body: "Ctrl K or Cmd K opens a search over every section, project and action. It loads only the first time it is opened.",
        },
      ]}
      how={{
        title: "Nothing ships until the checks pass.",
        body: (
          <p>
            One preflight command runs lint, the type check, the production build, the search check and the filter
            check, and stops at the first failure. Pages are static where they can be; the status route is the only
            part that calls out, and the cards only ever call it.
          </p>
        ),
        flow: {
          columns: [
            { title: "Code", nodes: [{ label: "Branch and PR", detail: ["One commit", "per step"] }] },
            {
              title: "Preflight",
              nodes: [{ label: "Checks", detail: ["Lint, types, build", "Search, filters"], accent: true }],
            },
            { title: "Hosting", nodes: [{ label: "Vercel", detail: ["Static pages", "Status route"] }] },
            { title: "Checked", nodes: [{ label: "Five live systems", detail: ["Up or down", "Cached 5 min"] }] },
          ],
          summary:
            "Each change lands on a branch and a pull request. The preflight runs lint, the type check, the build, the search check and the filter check. Vercel serves the static pages and the status route, which checks the five live systems and reports up or down, cached for five minutes.",
        },
      }}
      stack={[
        { label: "Front end", items: ["Next.js 16, App Router", "React 19", "TypeScript, strict", "Tailwind CSS v4", "Motion"] },
        { label: "Quality", items: ["ESLint", "Search check", "Filter check in Puppeteer", "Screenshots at 375, 768 and 1920 px"] },
        { label: "Platform", items: ["Vercel", "Resend for the contact form", "GitHub GraphQL for the activity graph"] },
      ]}
      cta={{
        eyebrow: "// like how this is built? let's talk",
        title: "Want this level of care on your project?",
        body: "Written decisions, honest copy and checks that stop a bad build. I bring the same habits to client and team work.",
      }}
    />
  );
}
