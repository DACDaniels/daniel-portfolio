# Decisions

One line per decision, newest first. Date, what, why.

## 2026-10-09: Google search and identity facts

Goal: a search for Daniel's name finds this site, and Google (including its AI answers) reads one consistent set of facts.

- **Google Search Console ownership is verified by a DNS TXT record on danielchadambuka.com in Cloudflare (a "Domain property"), not a meta tag.** Why: one record covers dev. and the future danielchadambuka.com site, needs no code, and cannot be lost in a code change. **That TXT record must never be removed**, or Google drops ownership and the Search Console history.
- **The FishTech case study gets its own canonical link, Open Graph title and address** (src/app/projects/fishtech/layout.tsx). Bug: it inherited the home page's canonical link, which told Google it was a copy of the home page.
- **Page titles carry the name once.** The root layout adds " · Daniel Chadambuka", so page titles no longer add it by hand (FishTech page and 404 page both read "... · Daniel Chadambuka · Daniel Chadambuka").
- **Structured data:** Person gains the full name "Daniel Anesu Chadambuka" (alternateName), job titles Software Engineer, IT Solutions Specialist, Technology Innovator, and Instagram (instagram.com/dac.daniels, tracking parameters dropped) in sameAs, alongside GitHub and LinkedIn. The home page adds a ProfilePage block pointing at that Person. Email, Harare (city only), NUST and the hero photo stay as they were. No phone, no street address, no awards.
- **Twitter/X handle removed.** Daniel has no X account; "@DACDaniels" there was wrong.
- **CEO of FishTech Consultancy stays off the site for now**, in line with the 2026-10-01 job-search decision.
- **Full name appears once in About** ("I'm Daniel Anesu Chadambuka, ..."), so the structured data matches visible text.
- **Job title in structured data is a list of the three parts** (Software Engineer, IT Solutions Specialist, Technology Innovator) rather than one piped string, so each reads as its own title. The visible title and page titles are set by the "Professional title" entry below.
- **/previews/endoscopy-suite deleted**, with its rewrite and its Google Maps / geolocation exceptions. The client's real site is live at endoscopysuite.co.zw, and a deleted copy cannot leak. Closes the open question from the card entry below.
- **Rule for any future preview:** noindex (meta tag in the file plus the X-Robots-Tag header kept in next.config.ts for /previews/), never in the sitemap, and **never blocked in robots.txt**, because Google must be able to read a page to see its noindex.
- **New build check, scripts/check-seo.mjs, runs in npm run preflight.** It fails the build if a page loses its title, description, canonical link, Open Graph image or Person data, if the name repeats in a title, if structured data stops being valid JSON, if the sitemap lists /previews/, or if a preview lacks noindex.

## 2026-10-09: Professional title and Achievements section

- **The title "Software Engineer | IT Solutions Specialist | Technology Innovator" is used in the hero and all search engine data** (page title, meta description, Open Graph, Twitter, JSON-LD jobTitle, root Open Graph image).
- **The footer heading stays "Software Engineer"** because the column is narrow.
- **Pipes are used to match the LinkedIn headline.** On mobile the three parts stack and the pipes are hidden. The one-line version starts at xl (1280 px), because below that the floating hero badges leave too little room beside the photo.
- **"Technology Innovator" is kept because the Presidential Innovation Awards and Zimbabwe Agricultural Show 2026 back it, so Achievements moved from deferred to live.** The section sits after Projects and is in the navbar. It states only facts already in this repo; PIA month, category and outcome are not documented yet.

## 2026-10-09: Endoscopy Suite card, real screenshots and own domain

- **The card links to https://www.endoscopysuite.co.zw**, the practice's own domain, instead of endoscopy-suite.pages.dev.
- **The drawn mock is replaced by real screenshots of the live site** (public/images/endoscopy-suite/, 600 KB in total): the desktop home page in a browser frame, with the phone view rising from the bottom-right corner, on the site's own navy. Why: the mock was a light-coloured guess that did not look like the real site, and a real screenshot is stronger proof of delivery.
- **Gallery strip of three phone screenshots** (Services, Book, Emergencies), like the Feeder card. Phone shots because the strip thumbnails are portrait and the site is built phone-first. The Dr Muguti page is left out because it shows his photo.
- **MediaGallery items take an optional `focus: "top"`** so tall screenshots are cropped from the top and keep their headline. Default unchanged for every other gallery.
- **Stack tags corrected to Next.js, React, TypeScript, Tailwind CSS, Cloudflare Pages.** Read from the site's own repo (DACDaniels/endoscopy-suite: Next.js 16 static export). The earlier "plain HTML, CSS and JavaScript" described the old single-file preview, not the live site.
- **Meta shortened to "endoscopysuite.co.zw · Dr Muguti"** so it fits on one line at 375 px.

## 2026-10-09: Endoscopy Suite project card

- **The Endoscopy Suite (Dr E.G. Muguti's practice site) is a project card at position 02, directly under the FishTech Precision Feeding System flagship.** The card links to the live site at https://endoscopy-suite.pages.dev, not to the /previews/endoscopy-suite copy. Why under the flagship and not above it: the flagship is the strongest technical signal for the job search, so it stays first.
- **Cards below it renumbered 03 to 06, sides flipped to keep the left/right alternation.** Feeder 03, Steadyhands 04, FishTech Consultancy 05, Portfolio 06.
- **Card copy states only what the site contains:** procedure pages, preparation timetables, emergency guidance, appointment requests confirmed on WhatsApp, a referral form. It does not claim a booking back end, patient numbers or clinical results. Stack tags are HTML, CSS, JavaScript, WhatsApp, Cloudflare Pages (the site uses no framework).
- **Card image is a hand-built mock** (EndoscopySuiteMock.tsx) in the site's own colours, like the other client cards. No real screenshot yet because no browser was available in the build session.
- **Projects intro line now reads "two live websites"** (FishTech Consultancy and the Endoscopy Suite) instead of "one lead-gen site".
- **/previews/endoscopy-suite is unchanged and still unlinked and noindex.** Whether to remove it now that the real site is live is open.

## 2026-10-07: Endoscopy Suite preview v4

- **Endoscopy Suite preview updated to v4 (final build: single Belvedere location, new surgeries, emergencies page, booking with slots, Suite Desk staff preview). Previews CSP now allows Google Maps frames; geolocation allowed on previews only.**

## 2026-10-04: client previews

- **Client design previews are hosted as static files under /previews/<client>/ on the portfolio domain, marked noindex. First: The Endoscopy Suite & Surgical Clinic (Dr E.G. Muguti).** Why: own domain looks professional and keeps previews off third-party hosts.

## 2026-10-01: cursor

- **Custom cursor (D8).** The dot follows the pointer 1:1 (set from pointermove in the next frame, no easing); the ring trails on a stiff critically damped spring that catches up in about 85 ms, because the old slow ring made the cursor feel draggy. Only transform and opacity animate; off on touch devices and under reduced motion.

## 2026-10-01: media

- **Video size rule.** A video may be up to 8 MB if it never downloads before the visitor scrolls to it. public/videos/ may total up to 12 MB. This replaces the earlier 5 MB per-file and 8 MB total caps, which had no recorded reason. Why: quality on the flagship hardware clip matters more than size, and mobile-data visitors only pay for it when they choose to scroll to it.
- **Feeder clip settings.** feeder-dispensing.mp4 is the full 9 s of the original, 720x1280, 30 fps, H.264 crf 25, preset slow, yuv420p, faststart, no audio: 7.25 MB. Poster is the frame at 2 s, 720x1280. The earlier 406x720 crf 28 encode looked too soft.
- **Lightbox cursor.** While a lightbox is open the normal system cursor shows and the custom cursor hides, because the dialog sits above the custom cursor. A click on the dark area outside the picture closes it.
- **grad-studio.jpg opens in the lightbox.** It is the first photo of the graduation group, so the arrows move through studio, corridor, outdoor and ceremony.
- **Feeder strip: sunset replaces pond demo.** The pond demo and pond visitors photos looked almost the same as thumbnails. Strip is mechanism, sunset, visitors.
- **Iris main image is a real photo** (images/iris/iris-hero.jpg). No "render" label needed.
- **The FishTech Feeder works and dispenses feed.** Status becomes "Working prototype · Exhibited at ZAS 2026". Still no claim of measured dose accuracy until the dose test is written up.
- **Certificate photo stays off the site.** It shows the certificate and serial numbers. The degree is stated in words.
- **Hero photo unchanged.** Graduation photos go in About next to the graduation timeline entry.
- **NUST team group photo left out**, by Daniel's choice.
- **Videos:** clips that play automatically are short, silent and looping. The case study may carry one talking clip with controls, which never plays on its own. Full-length originals never go in the repo.
- **Media files live in public/images/{iris,feeder,zas,graduation}/ and public/videos/**, resized to 2000 px on the long edge.
- Main graduation photo is grad-studio.jpg (Daniel's pick); strip uses corridor, outdoor, ceremony.

## 2026-10-01: graduation and job-search update

- **Education wording.** "Bachelor of Science Honours Degree in Computer Science, Upper Second Division, NUST", conferred 17 September 2026. Matches the degree certificate. Shown because a 2.1 helps a job application.
- **Status.** Daniel is looking for a full-time job. Site copy says "open to full-time software engineering roles, remote or in Zimbabwe" and keeps client work as secondary.
- **No CEO / founder label.** Blue Acre and the CEO title stay off the site. FishTech appears as projects. Reason: job search, and CLAUDE.md already says identity shows through projects.
- **Years of experience: 2+.** Counted from the ZIMDEF attachment start (1 July 2024). The old "3+" in CLAUDE.md had no recorded basis and contradicted the About text ("over two years").
- **ZIMDEF dates: 1 July 2024 to 30 June 2025.** The live site said June 2024 to May 2025, which was wrong.
- **FishTech backend is FastAPI.** Remove "Flask" from FishTech tags and the case study stack.
- **No year on the pilot.** "Pilot 2026" is replaced with "pilot deployment in preparation" until a pilot starts.
- **FishTech Feeder gets its own project card.** It is a separate product with its own repo (fishtech-feeder). Badge BUILDING. No dose-accuracy claims and no price.
- **New achievements.** Zimbabwe Agricultural Show 2026 (feeder exhibited, with photos) and the Presidential Innovation Awards 2026 (presented FishTech) go on the timeline.
- **Résumé.** New neutral-colour (navy and grey) CV at public/resume.pdf, replacing the missing file that made /resume.pdf a dead link. Company-coloured CVs stay out of the repo.
- **No redesign.** Content and correctness update only, plus the new feeder card and achievements. Design system unchanged.
- **Record keeping.** This file plus CLAUDE.md. No BIBLE.md for this repo; CLAUDE.md is the canonical reference.
