"use client";

import { ProjectPage } from "@/components/ui/ProjectPage";
import { FishTechConsultancyShowcase } from "@/components/ui/project-mocks/FishTechConsultancyShowcase";

// Sources (read only): github.com/DACDaniels/fishtech-consultancy (README,
// package.json, src/pages, src/components) and the website brief in the
// FishTech business repository (docs/specs/website.md), plus this
// repository's CLAUDE.md. No prices, client counts or traffic figures.
export default function FishTechConsultancyPage() {
  return (
    <ProjectPage
      status="live"
      eyebrow="// project · company site"
      statusNote="fishtech.co.zw"
      title="FishTech Consultancy"
      lead="FishTech's company site: fish ponds, bird nets, tilapia fingerlings and feed across Zimbabwe. Prices are always current, and every page ends one tap from WhatsApp with the request already typed."
      facts={[
        { k: "Site", v: "www.fishtech.co.zw" },
        { k: "Type", v: "Company site" },
        { k: "Status", v: "Live since October 2026" },
      ]}
      links={[{ label: "View Live", href: "https://www.fishtech.co.zw" }]}
      hero={<FishTechConsultancyShowcase />}
      heroCaption="Screens from the live site."
      whatItIs={
        <>
          <p>
            Most visitors are smallholder and new commercial farmers on phones, with data that is patchy and costly.
            They want to see what a pond costs and ask for it without filling in a form. The site gives them prices
            straight away and sends them to the WhatsApp sales line, open around the clock.
          </p>
          <p>
            Beside the home page are three detailed guides written for search: pond prices and sizes, starting fish
            farming in Zimbabwe, and the areas FishTech covers.
          </p>
        </>
      }
      whatItDoes={[
        {
          title: "Prices from one list",
          body: "Every price comes from the same price feed the WhatsApp sales agent uses, so the site and the agent never disagree. No price is typed into the code.",
        },
        {
          title: "Pond calculator",
          body: "Pick a pond size and liner and see the cost at once, with the pond drawn to scale. One button sends it to WhatsApp for a written quote.",
        },
        {
          title: "Delivery by town",
          body: "A searchable town picker shows the road distance and the delivery price, and still accepts a town that is not on the list.",
        },
        {
          title: "WhatsApp with the request typed",
          body: "Every WhatsApp link opens with the message already written and a short tag that records which part of the site sent it.",
        },
      ]}
      how={{
        title: "Static pages, prices refreshed in the browser.",
        body: (
          <p>
            The site is built with Astro as static pages on Vercel. At build time it saves a copy of the price feed, so
            it always builds and loads even if the feed is down. In the browser it fetches the feed again and updates
            every price on the page; if the feed is slow or wrong, the saved prices stay.
          </p>
        ),
        flow: {
          columns: [
            { title: "Source", nodes: [{ label: "Price list", detail: ["One file", "for every price"] }] },
            {
              title: "Feed",
              nodes: [{ label: "Price feed", detail: ["Shared with the", "sales agent"], accent: true }],
            },
            {
              title: "Site",
              nodes: [
                { label: "Build snapshot", detail: ["Astro, on Vercel"] },
                { label: "Live refresh", detail: ["In the browser"] },
              ],
            },
            { title: "Visitor", nodes: [{ label: "WhatsApp", detail: ["Request typed", "and tagged"] }] },
          ],
          summary:
            "Every price starts in one price list, which is published as a price feed shared with the WhatsApp sales agent. The Astro site saves a snapshot of the feed at build time on Vercel and refreshes it in the visitor's browser. Visitors send their request to WhatsApp with the message typed and tagged.",
        },
      }}
      stack={[
        { label: "Site", items: ["Astro, static pages", "TypeScript", "GSAP", "Plain CSS from brand tokens", "Self-hosted Archivo"] },
        {
          label: "Quality",
          items: ["Vitest: price arithmetic", "Playwright: calculator, live prices, links, phone layout", "Playwright: forbidden words, search address, sitemap"],
        },
        { label: "Hosting", items: ["Vercel", "Previews from branches", "Vercel Web Analytics"] },
      ]}
      screens={{
        note: "Captured from the live site on 9 October 2026. Tap a screen to open it.",
        items: [
          { kind: "image", wide: true, src: "/images/fishtech-consultancy/ft-home-desktop.jpg", alt: "FishTech home page on a laptop" },
          { kind: "image", src: "/images/fishtech-consultancy/ft-home-phone.jpg", focus: "top", alt: "FishTech home page on a phone" },
          { kind: "image", src: "/images/fishtech-consultancy/ft-prices-phone.jpg", focus: "top", alt: "FishTech live price panel on a phone, prices read from the published price list" },
          { kind: "image", src: "/images/fishtech-consultancy/ft-calculator-phone.jpg", focus: "top", alt: "FishTech pond calculator on a phone, with the pond drawn to scale" },
          { kind: "image", src: "/images/fishtech-consultancy/ft-quote-phone.jpg", focus: "top", alt: "FishTech pond calculator total on a phone, with the button to send it on WhatsApp" },
        ],
      }}
      cta={{
        eyebrow: "// similar problem? let's talk",
        title: "Need a site that turns visitors into WhatsApp conversations?",
        body: "Prices that stay current, a calculator people trust and a request that arrives already typed. The same approach fits any business that sells on WhatsApp.",
      }}
    />
  );
}
