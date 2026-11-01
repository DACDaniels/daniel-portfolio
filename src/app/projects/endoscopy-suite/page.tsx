"use client";

import { ProjectPage } from "@/components/ui/ProjectPage";
import { EndoscopySuiteShowcase } from "@/components/ui/project-mocks/EndoscopySuiteShowcase";

// Sources (read only): endoscopy-suite CLAUDE.md, BIBLE.md, README.md,
// .github/workflows/deploy.yml, src/lib (booking, planner, search), and
// this repository's CLAUDE.md. The Dr Muguti page is left out of the
// screens because it shows his photo. No booking back end is claimed.
export default function EndoscopySuitePage() {
  return (
    <ProjectPage
      status="live"
      eyebrow="// project · client work"
      statusNote="endoscopysuite.co.zw"
      title="The Endoscopy Suite"
      lead="Website for Dr E.G. Muguti's endoscopy and surgery practice in Belvedere, Harare. Patients find a service, learn how to prepare and ask for an appointment, mostly from a phone."
      facts={[
        { k: "Client", v: "Dr E.G. Muguti, Harare" },
        { k: "Type", v: "Practice website" },
        { k: "Status", v: "Live" },
      ]}
      links={[{ label: "View Live", href: "https://www.endoscopysuite.co.zw" }]}
      hero={<EndoscopySuiteShowcase />}
      heroCaption="Screens from the live site."
      whatItIs={
        <>
          <p>
            A specialist surgeon&apos;s practice needs patients to understand what is done there, get ready for it
            properly and reach the practice quickly. The site does those three jobs in plain English, and explains
            every medical term the first time it appears.
          </p>
          <p>
            It has seven pages: Home, Services, Dr Muguti, Patients, Visit, Emergencies and Book. It is built
            phone-first, because that is how most patients find it.
          </p>
        </>
      }
      whatItDoes={[
        {
          title: "Every service in plain words",
          body: "All 42 services in 8 groups, with search, a filter by group and a body map for finding a service by the part of the body.",
        },
        {
          title: "Preparation as a timetable",
          body: "The standard instructions for a colonoscopy, gastroscopy or surgery become real dates and times for the patient's own appointment.",
        },
        {
          title: "Booking requests on WhatsApp",
          body: "Choose the type, day and time and add your details. The site writes a WhatsApp request with a reference, and the practice confirms it.",
        },
        {
          title: "Emergencies, call first",
          body: "The emergencies page puts the phone number first, with no motion on it at all.",
        },
      ]}
      how={{
        title: "A static site, checked and published on every push.",
        body: (
          <p>
            The site is a static export, so there is no server to keep running. Anything that depends on today&apos;s
            date or time, such as opening hours, is worked out on the visitor&apos;s own phone. Every push runs lint,
            the unit tests and the production build in GitHub Actions, then publishes to Cloudflare Pages.
          </p>
        ),
        flow: {
          columns: [
            { title: "Code", nodes: [{ label: "GitHub", detail: ["Every push"] }] },
            {
              title: "Checks",
              nodes: [{ label: "GitHub Actions", detail: ["Lint, unit tests", "Static build"], accent: true }],
            },
            { title: "Hosting", nodes: [{ label: "Cloudflare Pages", detail: ["Static files", "at the edge"] }] },
            {
              title: "Patients",
              nodes: [
                { label: "Phone or laptop", detail: ["Hours on the", "device's clock"] },
                { label: "WhatsApp", detail: ["Booking request", "with a reference"] },
              ],
            },
          ],
          summary:
            "Code is pushed to GitHub. GitHub Actions runs lint, the unit tests and the static build, then publishes the files to Cloudflare Pages. Patients open the site on a phone or laptop, where the opening hours are worked out on the device's own clock, and send booking requests to the practice on WhatsApp.",
        },
      }}
      stack={[
        { label: "Front end", items: ["Next.js 16, static export", "React 19", "TypeScript", "Tailwind CSS"] },
        {
          label: "Quality",
          items: ["Vitest: hours, booking, preparation timetable, search, service coverage", "ESLint", "axe accessibility checks", "Device sweep, 320 to 1920 px"],
        },
        { label: "Hosting", items: ["Cloudflare Pages", "GitHub Actions", "Cloudflare Web Analytics, cookie-free"] },
      ]}
      screens={{
        note: "Captured from the live site. Tap a screen to open it.",
        items: [
          { kind: "image", wide: true, src: "/images/endoscopy-suite/es-home-desktop.jpg", alt: "The Endoscopy Suite home page on a laptop" },
          { kind: "image", src: "/images/endoscopy-suite/es-home-phone.jpg", focus: "top", alt: "The Endoscopy Suite home page on a phone" },
          { kind: "image", src: "/images/endoscopy-suite/es-services-phone.jpg", focus: "top", alt: "The Endoscopy Suite services page on a phone: every scope and operation, in plain words" },
          { kind: "image", src: "/images/endoscopy-suite/es-book-phone.jpg", focus: "top", alt: "The Endoscopy Suite booking page on a phone, choosing what to book" },
          { kind: "image", src: "/images/endoscopy-suite/es-emergencies-phone.jpg", focus: "top", alt: "The Endoscopy Suite emergencies page on a phone, with the call button first" },
        ],
      }}
      cta={{
        eyebrow: "// similar problem? let's talk",
        title: "Need a site your patients or clients can use on a phone?",
        body: "Clear services, preparation that fits the visitor's own day, and requests that land on WhatsApp. The same approach fits clinics and small practices.",
      }}
    />
  );
}
