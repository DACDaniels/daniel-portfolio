"use client";

import { ProjectPage } from "@/components/ui/ProjectPage";
import { SteadyhandsMock } from "@/components/ui/project-mocks/SteadyhandsMock";

// Sources: this repository's CLAUDE.md and the live site's public pages,
// read only (no orders, no forms), on 1 November 2026. No source repository
// is on this machine, so the page stays short: no architecture sketch and
// no screens until real captures are taken.
export default function SteadyhandsPage() {
  return (
    <ProjectPage
      status="live"
      eyebrow="// project · production"
      statusNote="steadyhandscatering.com"
      title="Steadyhands Catering"
      lead="Website and ordering platform for SteadyHands, the restaurant and caterer at Bata Club in Gweru. Guests see the menu and events, order online and pay through Paynow, or send an order on WhatsApp."
      facts={[
        { k: "Client", v: "SteadyHands, Bata Club" },
        { k: "Type", v: "Ordering platform" },
        { k: "Status", v: "Live" },
      ]}
      links={[{ label: "View Live", href: "https://steadyhandscatering.com" }]}
      hero={<SteadyhandsMock />}
      whatItIs={
        <p>
          SteadyHands offers dining, catering, corporate events and a bar at Bata Club. The site brings those together
          in one place and lets guests act on them: order food, book a table or a venue, and see what is on.
        </p>
      }
      whatItDoes={[
        {
          title: "Online ordering",
          body: "A cart and checkout for ordering online, with payment through Paynow: EcoCash, OneMoney, Visa and Mastercard.",
        },
        {
          title: "Orders on WhatsApp",
          body: "A WhatsApp button opens a chat with the order message already written, for guests who would rather talk.",
        },
        {
          title: "Tables, venues and events",
          body: "Pages for booking a table, booking a venue, conference and corporate hosting, and upcoming events.",
        },
      ]}
      stack={[
        { label: "Front end", items: ["Next.js", "TypeScript"] },
        { label: "Back end", items: ["Node.js", "Paynow payment gateway"] },
        { label: "Hosting", items: ["Vercel"] },
      ]}
      cta={{
        eyebrow: "// similar problem? let's talk",
        title: "Want customers to order and pay from their phone?",
        body: "Online ordering, mobile money through Paynow and WhatsApp for everyone else. The same approach fits restaurants, caterers and venues.",
      }}
    />
  );
}
