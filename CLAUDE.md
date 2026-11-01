# Daniel Chadambuka — Developer Portfolio

# TARGET: Awwwards-worthy. Not a template. Not basic. The best.

## Always Do First

- Load the frontend-design skill with the Skill tool before writing any frontend code
- Read this entire CLAUDE.md at the start of every session
- Check /public/brand-assets/ for any real assets before designing

## Project Overview

Personal developer portfolio for Daniel Chadambuka — Software Engineer,
Computer Science graduate (NUST Zimbabwe, 2026), builder of real-world systems.
Open to full-time software engineering roles (remote or Zimbabwe).
This site must feel like it belongs on Awwwards, Godly, or Hover.dev.
Every pixel, every animation, every interaction must be intentional.

## Tech Stack

- Next.js 15 (App Router, Turbopack)
- TypeScript (strict mode, always)
- Tailwind CSS v4
- Framer Motion / Motion (motion/react)
- Aceternity UI — spotlight, border beam, moving border, tracing beam
- Magic UI — text animations, shimmer, number counters, marquee
- 21st.dev — buttons, inputs, interactive components
- GSAP (for complex scroll-driven sequences if needed)
- Google Fonts: Geist (headings) + DM Sans (body)
- Puppeteer (for automated screenshot workflow)
- Deployed on Vercel

## Design System — LOCKED. DO NOT DEVIATE.

Colors:

- bg-primary: #080808 (near-black base)
- bg-surface: #0d0d0d (cards, sections)
- bg-elevated: #111111 (elevated cards)
- border: rgba(255,255,255,0.06)
- border-hover: rgba(0,229,192,0.3)
- accent: #00E5C0 (electric teal — primary accent)
- accent-dim: rgba(0,229,192,0.15)
- accent-glow: rgba(0,229,192,0.4)
- text-primary: #FFFFFF
- text-secondary: rgba(255,255,255,0.75) (was 0.6 until 2026-11-01; raised for
  phone readability, about 11:1 on #080808. See DECISIONS.md)
- text-tertiary: rgba(255,255,255,0.5)

Status palette (project + section badges):

- LIVE: #00E5C0 (accent) — production, transacting
- BUILDING: #FFC04D (amber) — late-stage prototype in active development
  → e.g. FishTech Precision Feeding System, pre-pilot
- RESEARCH: rgba(255,255,255,0.85) — earlier-stage exploration
- META: rgba(255,255,255,0.6) — self-referential / not a product

The amber BUILDING token is the only colour outside the locked teal palette.
It exists so a research-stage project doesn't read as live (false signal) or
as inert text (under-sells the work). Use sparingly — only on status badges
and case-study eyebrows, never on body copy or accent flourishes.

Typography:

- Heading font: Geist (weights 500, 600, 700)
- Body font: DM Sans (weights 400, 500)
- Tight tracking on headings: -0.03em
- Body line-height: 1.7

Radii:

- Cards: 16px
- Buttons: 100px (pill)

## Owner Details

- Name: Daniel Chadambuka
- Location: Harare, Zimbabwe
- GitHub: https://github.com/DACDaniels
- Email: chadambukadaniel@gmail.com
- Education: Bachelor of Science Honours Degree in Computer Science, Upper Second
  Division, NUST Zimbabwe. Conferred 17 September 2026 (study 2022 to 2026)
- Job status: actively looking for employment. Do NOT label him CEO / founder of
  Blue Acre in site copy; FishTech appears as projects, not a title
- Full name: Daniel Anesu Chadambuka (shown once in About and as alternateName
  in the structured data; "Daniel Chadambuka" everywhere else)
- Title: Software Engineer | IT Solutions Specialist | Technology Innovator
  → Used in the hero and all search engine data (page title, Open Graph,
    Twitter, JSON-LD jobTitle, root and FishTech case-study share images).
    Pipes match the LinkedIn headline
  → In JSON-LD the jobTitle is the same three parts as a list
  → Footer identity column heading stays "Software Engineer" (narrow column)
  → "Software Engineer" alone stays in the layout.tsx keyword list, the
    JSON-LD WebSite description and manifest.ts (the term recruiters search)
- Profiles ("same person" links in structured data): GitHub, LinkedIn
  (daniel-chadambuka-792b74277), Instagram (instagram.com/dac.daniels).
  No X/Twitter account
- Entrepreneurial identity shows THROUGH projects, never as a label

## Target Audience (in priority order)

1. Clients seeking software development services
   → Needs: clear services, proof of delivery, case studies, easy contact
   → Location in site: Services section, Projects section, Contact CTA

2. Potential employers (remote-first global + regional African tech companies)
   → Needs: technical depth, modern stack, real projects, clean code
   → Location in site: Projects section, Tech stack marquee, GitHub link, case studies

3. Fellow developers / engineering community
   → Needs: code quality, interesting technical problems, GitHub, thoughtful writing
   → Location in site: GitHub link, FishTech deep case study, tech depth

## Audience-Driven Site Decisions

- Hero must work for ALL three — confident title, real name, clear positioning
- Two primary CTAs in hero: "View My Work" (for employers/devs) + "Hire Me" (for clients)
  → Note: change "Download CV" to "Hire Me" — it's more action-oriented for all three
- Services section directly addresses CLIENT needs with clear offerings
- Projects section shows EMPLOYER and DEV audience real technical work
- FishTech case study goes deep technically — satisfies dev audience, impresses employers
- Contact section offers multiple paths: form (clients), email (anyone), GitHub (devs)
- Copy should be confident and direct — not humble-brag, not overselling
- Tone: "I build serious things that work" not "I'm a student trying to learn"

## Site Structure

Single long-scroll page with smooth section transitions.
One page per project (since 2026-11-01), plus /hire ("Hiring? Start here"):
/projects/fishtech, /projects/health-and-longevity, /projects/endoscopy-suite,
/projects/fishtech-sales-agent, /projects/fishtech-consultancy,
/projects/fishtech-feeder, /projects/steadyhands, /projects/this-portfolio.
The five newer ones use src/components/ui/ProjectPage.tsx (What it is, What it
does, How it's built only where the source supports a sketch, Stack, Screens,
links). Each page: own title, description, canonical, share image, sitemap
entry, projectSchema.ts entry and check-seo coverage.

### Section order (exact):

1. Navbar
2. Hero
3. Services
4. Projects
5. Achievements (live since 2026-10-09, no longer deferred)
6. How I build (since 2026-11-01)
7. About
8. Testimonials
9. Contact
10. Footer

## Section Specifications

### 1. Navbar

- Sticky, fixed top
- Glassmorphism: backdrop-blur-md, bg transparent on load,
  bg rgba(8,8,8,0.8) + border-bottom on scroll
- Left: "DC." in Geist 700, teal on hover
- Right: nav links with magnetic hover effect (Home, Work, Achievements,
  How I build, About, Contact, "Hiring? Start here" → /hire; links tighten
  at md and lg, the "// section" eyebrow shows from xl). The hire link reads
  "Hiring?" below 2xl; the Contact text link shows from xl only (below that
  the Contact Me button covers it). Recheck 768 to 1536 px for overlap when
  adding a link
- Far right: "Ctrl K" (⌘ K on Mac) palette hint button from lg, then the
  teal CTA button "Contact Me" with shimmer on hover
- Mobile: hamburger with full-screen overlay menu
- Below 1024 px: a search icon button (44 px) opens the command palette.
  Between 768 and 1023 px Home leaves the bar (the logo goes home) to make
  room for it

### 2. Hero — THE MOST IMPORTANT SECTION

- Full viewport height (min-h-screen)
- LEFT: text content
  - Small tag: "AVAILABLE FOR WORK" with teal pulsing dot
  - Name: "Daniel" line 1, "Chadambuka" line 2
    → Each letter animates in individually (blur + translateY + stagger)
  - Title: "Software Engineer | IT Solutions Specialist | Technology Innovator"
    with animated underline. One line with pipes from xl (1280px); below
    that the three parts stack and the pipes are hidden
  - Bio: 1 sentence, fades in after name
  - Two CTAs: "View My Work" (teal filled, magnetic) + "Let's Talk" (outlined, magnetic)
    → "View My Work" → scrolls to Projects section
    → "Let's Talk" → scrolls to Contact section
    → Both audience-neutral, action-oriented, confident
- RIGHT: Professional photo
  → Circular/rounded frame with animated rotating teal border
  → Subtle teal glow behind photo
  → Floating tech badges (Python, Next.js, OpenCV, FastAPI, Pi)
  with sine wave float animation
- BOTTOM: Stats bar full width
  → Animated number counters count up when in viewport
  → "8 Projects" "2+ Years" "5 Live Systems" "BSc Hons CS · NUST 2026"
  → The five live systems: Steadyhands, The Endoscopy Suite, fishtech.co.zw,
    Health & Longevity, FishTech Sales Agent & Ops (DECISIONS.md, 2026-10-31)
  → Years counted from the ZIMDEF attachment (July 2024). See DECISIONS.md
- BACKGROUND:
  → Animated dot grid that responds subtly to mouse
  → Blurred teal gradient orb in corner
  → Subtle noise texture overlay

### 3. Services

- Title with reveal animation
- 4 cards in 2x2 grid (desktop) / 1 col (mobile)
- Cards: dark surface, teal icon, animated border beam on hover
- Cursor spotlight across section
- Services:
  1. Full-Stack Development — Next.js, React, Node.js, FastAPI, Python
     → proof: "Shipped in Health & Longevity" → /projects/health-and-longevity
  2. Systems Architecture — Distributed systems, embedded, IoT, edge
  3. Computer Vision & ML — OpenCV, edge CV, custom metrics engineering
  4. AI & Intelligent Systems — AI integration, intelligent automation
     → proof: "Shipped in FishTech Sales Agent" → /projects/fishtech-sales-agent
     → pills name no model vendor

### 4. Projects

- Every card, the flagship included, shows only: image, title and status,
  one sentence of at most 20 words, at most 3 tags, and the links
  → "View Live" only where a public site exists: Health & Longevity, The
    Endoscopy Suite, FishTech Consultancy, Steadyhands. This Portfolio gets
    "View on GitHub". Iris, the Feeder and the Sales Agent get none
  → "Read the case study" is a stretched link (its ::after covers the card),
    so clicking anywhere on the card opens the project's page. View Live
    sits above it and opens a new tab. No nested anchors; one tab stop for
    the card plus one for View Live (src/components/ui/ProjectCardParts.tsx)
  → No galleries or long descriptions on cards: they live on the project pages
  → Number and category ("02 CLIENT SYSTEM") only from 768 px
- FishTech Precision Feeding System (LARGE FLAGSHIP CARD, full width)
  → Real photo: public/images/iris/iris-hero.jpg
  → Tags: Computer Vision, Raspberry Pi, FastAPI
  → "Read the case study" → /projects/fishtech
- 7 other projects in alternating left/right layout (02 left), in this order:
  → 02 Health & Longevity (healthandlongevity.co.zw, client system)
  → 03 The Endoscopy Suite (endoscopysuite.co.zw, client work)
  → 04 FishTech Sales Agent & Ops (WhatsApp agent, ops console)
  → 05 FishTech Consultancy Website (fishtech.co.zw)
  → 06 FishTech Feeder
  → 07 Steadyhands Catering
  → 08 This Portfolio
  → Order is Daniel's decision (see DECISIONS.md, 2026-10-31)
- Desktop keeps the large main image and the left/right alternation
- Each card's presence wrapper owns its reveal; cards carry no variants
  (a re-entering card otherwise stayed at opacity 0, fixed 2026-11-01)
- Filter chips above the cards: All, Client systems (Health & Longevity,
  Endoscopy Suite, Steadyhands), Products and hardware (Iris, Feeder),
  Automation and AI (Sales Agent & Ops, Iris), Websites (FishTech
  Consultancy, Endoscopy Suite, This Portfolio). aria-pressed buttons, the
  choice in the URL hash (#work-<filter>), transform-only layout animation.
  Default All, flagship first whenever shown. Card numbers never change;
  sides re-alternate over the visible cards (src/lib/projectFilters.ts)
  → One horizontally scrolling row with a fade on the right below 768 px,
    sticky under the navbar (top 80 px) while Projects is on screen (the
    section uses overflow-x-clip, never overflow-hidden, so it can stick).
    Active chip solid #00E5C0 with dark text; inactive border at least
    rgba(255,255,255,0.28); 44 px tall
  → scripts/check-filters.mjs (in npm run preflight) clicks every chip pair
    and All > X > Y > All, full and reduced motion, and checks cards,
    opacity above 0.9 and aria-pressed. Update its expected lists with any
    change to the groups
- Status lights: /api/status (cached 5 min) checks the five live systems
  (GET, 4 s timeout, 2xx is up) and returns only up/down plus the check
  time. Cards fetch only /api/status. A passing check under 15 min old shows
  a teal dot and "Live · checked N min ago" beside the LIVE badge; any
  failure, error or stale check hides both. Never red, never "live" without a
  fresh check, no pulse under reduced motion. The LIVE badge has no dot

### 5. Achievements (LIVE)

- Sits after Projects, before How I build. In the navbar as "Achievements"
- Full-width stacked cards, one structure for both: mono date block
  (teal, the only teal in the card), Geist title on its own row, then one
  plain sentence on the left and a quiet detail (mono key + value) on the
  right. From md the Show photos sit under the sentence in the left column,
  so the right column holds only the one detail and both cards share one
  shape; on mobile they come last, after the detail. No big year, no label grid,
  no placeholder images
- Presidential Innovation Awards: 21 July 2026. Presented the FishTech
  Precision Feeding System Iris, a research prototype, to the national
  innovation panel. Category: Best Innovation in Agriculture and
  Agro-Processing. No outcome is stated, at Daniel's request
- Zimbabwe Agricultural Show: August 2026, NUST stand, Harare Showground.
  Exhibited the FishTech Feeder, a working prototype, and met farmers, buyers
  and Ministry of Skills stakeholders. Three small photos from
  public/images/zas/ (MediaGallery strip, max 300 px wide)
- These two events are NOT repeated in the About timeline (removed
  2026-11-01: on a phone the repeat costs more than it adds)
- Only facts already written in this repo. No placings, prizes, judges or
  outcomes until Daniel supplies them. FishTech is a research prototype,
  never commercially deployed

### 6. How I build

- After Achievements, before About. In the navbar as "How I build"
- Title "How I build." and four principles, no intro, no cards, no numbers:
  → Private by default. "Personal and medical details are encrypted. Paid
    content never sits in a public file." Proof: Health & Longevity
  → AI with guardrails. "The model talks to customers. Code sets every
    price and checks every reply before it is sent." Proof: FishTech Sales
    Agent
  → Built for real conditions. "Works offline, on weak signal, and on a
    small computer at the pond." Proof: Health & Longevity · Iris
  → Tested and reversible. "Every change is tested. Every release can be
    rolled back." Proof: Health & Longevity · this site
- Each principle: one bold Geist line, one short body line, a small teal
  mono proof label linking to the project page(s). Thin dividers
- Every line was checked against its source (DECISIONS.md, 2026-11-01);
  re-check before changing a word. /hire's How I work uses the same four
- Under the four principles: "Shipping, every week", the GitHub contribution
  graph (src/components/sections/ShippingGraph.tsx, src/lib/githubActivity.ts).
  Server-side GraphQL, viewer contributionCalendar, last 12 months,
  revalidate 86400, env GITHUB_CONTRIBUTIONS_TOKEN (name in .env.example,
  value only in .env.local and Vercel; never print or commit it). Missing
  token, failed call or empty data = section not rendered. Teal token shades.
  NO total or count anywhere, not even in the browser payload: date and level
  word only (none, light, steady, heavy), never repository names. Includes
  private repository work

### 7. About

- Top: "Recently shipped" strip from src/data/shipped.ts (date, one line,
  optional link; newest first, three shown on phones, five from 768 px)
  → RULE: every portfolio PR that ships something visible adds one line to
    shipped.ts, with a date checked against its source
- Two column layout
- LEFT: Heading "About Me", paragraphs
  → NUST CS student → builder → real products
  → Zimbabwe context, real-world problems
  → Honest, human, not corporate
- RIGHT:
  → Tech stack pills in animated marquee (two rows, opposite directions)
  → Small timeline of milestones (no Presidential Innovation Awards or
    Zimbabwe Agricultural Show entries: those live in Achievements only)
- Subtle background texture

### 8. Testimonials (built, hidden until there is one)

- RULE: a testimonial goes in only word for word, with written permission
  recorded in the entry with its date (permission true, permissionDate).
  Never invent, shorten or tidy a quote
- Data: src/data/testimonials.ts (quote, name, role, organisation, project
  page link, permission, permissionDate). Seeded empty
- Section src/components/sections/Testimonials.tsx sits after About, before
  Contact. It renders only entries with permission true and a date. With
  none it renders nothing and stays out of the navbar and the footer
- With one or more: "In their words.", one card per quote (quote, name,
  role and organisation, "Read the case study" link); two columns from
  768 px when there are two or more. Linked from the footer and the
  full-screen menu only (menuOnly), never the crowded navbar bar

### 9. Contact

- Large headline: "Let's Build Something"
- Left: contact form (name, email, message, animated send button)
- Right: direct links (email, GitHub, LinkedIn)
- Magnetic "Send Message" button
- Subtle animated gradient background

### 10. Footer

- Minimal: name, nav links, social icons, copyright
- Navigate column in the navbar's order: Home, Work, Achievements, How I
  build, About, Contact, "Hiring? Start here" (root-relative links)
- Teal hover states
- Contact links come from src/lib/contactLinks.ts (shared with /hire and the
  palette)

### /hire ("Hiring? Start here")

- Own page with title, description, canonical, Open Graph image (case-study
  style) and sitemap entry; check-seo covers it
- Linked from a secondary hero button, the navbar, the footer and the palette
- Reads in 60 seconds: one line with the full title; Roles I fit (Full-stack
  engineer, Systems and edge engineer, AI and automation engineer, each with
  one proof line linking to a case study); Live systems (the five, with
  status lights from /api/status); How I work (the four How I build principles, one line each,
  linking to #how-i-build); Availability (full-time software engineering,
  remote or in Zimbabwe; Harare, UTC+2); Education as in Owner Details;
  actions (Download résumé, Email, WhatsApp, LinkedIn, GitHub)
- No response-time promises, no salary

### Command palette

- Ctrl+K (Windows, Linux), Cmd+K (Mac), plus the navbar hint button
- Lists every section, every project and case study, /hire, Download
  résumé, Copy email, WhatsApp, GitHub, LinkedIn
- Fuzzy search, arrow keys, Enter, Esc; aria-modal dialog, focus trapped and
  returned; opacity only under reduced motion
- Lazy-loaded: CommandPaletteLauncher (layout) only listens for the keys;
  CommandPalette.tsx loads on first open

## Projects to Showcase

1. FishTech Precision Feeding System (FLAGSHIP)
   - Edge-AI precision feeding system for African pond aquaculture
   - Overhead camera, Raspberry Pi 5 with Hailo-8L accelerator,
     runs end-to-end at the pondside, no cloud dependency
   - Pipeline: YOLOv8-Pose keypoint detection (4 points per fish),
     ByteTrack tracking, ChArUco + ultrasonic + Snell-law
     calibration, FishBase length-weight, lucky-frame biomass
     estimator with confidence intervals, 7-multiplier precision
     feeding engine grounded in tilapia and catfish biology,
     servo-auger feeder
   - Backend: Python 3.11, FastAPI, OpenCV, SQLite (WAL mode,
     per-pond DB files), pytest
   - Front end: Flutter PWA served from the Pi's local Wi-Fi
     access point via QR code, USSD/SMS bridge in Shona for
     feature-phone farmers
   - Hardware: Raspberry Pi 5 (8 GB), Raspberry Pi AI Kit
     (Hailo-8L, 13 TOPS), Arducam IMX477 (12 MP CSI), JSN-SR04T
     waterproof ultrasonic sensor, ChArUco fiducial board,
     servo-auger feeder
   - Target species: Oreochromis mossambicus, Oreochromis niloticus,
     Clarias gariepinus
   - Honest accuracy framing: keypoint-distance length is
     orientation-invariant, lucky-frame estimator extrapolates
     with confidence intervals, no per-fish counting claim
   - Started Jan 2025 as final-year CS dissertation at NUST;
     being extended toward production through FishTech Consultancy
   - Working prototype, pilot pond secured, pilot deployment in
     preparation. No commercial deployment yet, no paying users
   - Hardware envelope target: USD 200-300 per pond (do NOT put
     this number in the portfolio's public copy, see "AVOID in
     copy" section)
2. Steadyhands Catering Platform (LIVE)
   - Production e-commerce platform for Bata Club, Gweru (the live site
     says Gweru, along Bulawayo Road; checked 2026-11-01)
   - Next.js, TypeScript, Node.js, Paynow gateway (Ecocash,
     OneMoney, Visa, Mastercard), WhatsApp Business funnel
   - Live and transacting at steadyhandscatering.com
3. FishTech Consultancy Website at https://www.fishtech.co.zw (LIVE since
   2026-10-09, per blueacre-ops/CLAUDE.md; badge switched 2026-10-31)
   - Daniel's own company site, not client work. Card label "COMPANY SITE"
   - Single price list feeding every price, pond calculator with an instant
     cost that sends to WhatsApp for a written quote
   - Stack (verified 2026-10-09 against github.com/DACDaniels/fishtech-consultancy
     and the live build): Astro, TypeScript, GSAP, hosted on Vercel. Not
     React, Vite or Framer Motion
   - Card visual: real screenshots in public/images/fishtech-consultancy/
     (ft-home-desktop in a browser frame plus ft-home-phone), same layout
     as The Endoscopy Suite card, plus a strip of three phone shots: price
     panel, pond calculator, calculator total with the WhatsApp button
   - Card sits at position 05. Call it the company site; never CEO,
     founder or owner on the card. No prices, client counts or traffic
     figures in the copy
4. FishTech Feeder (BUILDING, working prototype: first unit built and dispensing feed)
   - Standalone welded-steel, solar-powered automatic feeder (ESP32).
     Auger turns a counted number of revolutions to meter each dose,
     spinning disc broadcasts it. Ration from fish size and water
     temperature, no internet. F10 (10 kg) and F25 (25 kg) models.
     Can take a grams-per-feed instruction from the Precision Feeding
     System over Wi-Fi, but sells and runs on its own
   - Exhibited at the Zimbabwe Agricultural Show (ZAS) 2026, Harare
   - Canonical source: github.com/DACDaniels/fishtech-feeder (private)
   - Real photos in public/images/feeder/. NEVER CLAIM validated dose
     accuracy or field results: the dose test is not written up. No price in public copy (withdrawn)
5. Daniel Chadambuka Portfolio (this site)
6. The Endoscopy Suite (LIVE, client work) at https://www.endoscopysuite.co.zw
   - Website for Dr E.G. Muguti's endoscopy and surgery practice in
     Belvedere, Harare. Next.js 16 static export, React 19, TypeScript,
     Tailwind CSS, Vitest; published to Cloudflare Pages by GitHub Actions.
     Canonical source: github.com/DACDaniels/endoscopy-suite (private)
   - Pages: Services (42 services in 8 groups), Dr Muguti, Patients
     (guides and preparation), Visit, Emergencies, Book (requests
     confirmed on WhatsApp)
   - Card visual: real screenshots in public/images/endoscopy-suite/
     (desktop home in a browser frame plus the phone view; strip of phone
     shots of Services, Book, Emergencies, cropped from the top). The Dr
     Muguti page is left out because it shows his photo
   - Card sits at position 03 in the Projects section (see DECISIONS.md,
     2026-10-31). Never claim a booking back end, patient numbers or
     clinical results
7. Health & Longevity (LIVE, client system) at https://www.healthandlongevity.co.zw
   - Health platform for Dr Misheck Ruwende, Harare. Paynow membership
     (on up to two phones, "Saved in My space. Nothing to write down."),
     video consults with join links, visits at the Centre, paid articles
     and video lessons, nurse aides who apply, are approved and matched,
     community, offline and installable, phone-first admin area with a
     written manual
   - Stack: Astro, React, TypeScript, Tailwind CSS v4, Cloudflare Workers
     and Pages, D1 with Drizzle, R2, Paynow (with a pretend mode for
     testing), Vitest, Playwright, axe, Lighthouse CI, GitHub Actions
   - Canonical source: github.com/DACDaniels/ruwende-platform (private).
     BIBLE.md there wins over its other docs
   - Card at position 02 (CLIENT SYSTEM). Case study /projects/health-and-longevity
   - Screenshots: public pages (Home, Articles, Membership, consult booking
     with a day and time picked) from the live site, read only: never submit,
     pay, book, send a request, sign in or open /admin. Screens behind a
     request or sign-in (nurse-aide match, admin Today) from the local
     preview on the same code (npm run preview: sample content, pretend
     Paynow). Never real people. Leave out frames whose main subject is
     Dr Ruwende's portrait (Home is captured scrolled past the hero).
     Platform test banners are hidden in captures
   - NEVER CLAIM: patient records (not built), licences or regulators,
     user, member, payment or revenue figures, test counts. Paid text never
     appears in public files, so never quote it
8. FishTech Sales Agent & Ops (LIVE, automation for FishTech)
   - Large language model agent with tool use on FishTech's WhatsApp line:
     answers fish-farming questions in English, Shona or a mix, prices
     ponds, nets, fingerlings, feed and delivery from one price list
     (shared live with fishtech.co.zw), sends quotations as a message plus
     a PDF. Code checks every reply; large or non-standard quotations wait
     for approval; silent for 24 hours after TELL; alerts on WhatsApp and
     Telegram; every failed real chat became a test; one fixed true
     sentence if the model fails. Ops console at ops.fishtech.co.zw:
     Overview, Inbox, Clients, Quotations, Price list, Knowledge, Settings.
     Chats and quotations live on a separate state branch
   - Stack: Python 3.12, FastAPI, Uvicorn, fpdf2, WhatsApp Cloud API,
     Telegram, GitHub as state store, Render
   - Canonical source: github.com/DACDaniels/blueacre-ops, whatsapp-bot/
     (private). Read it from a fresh clone; never commit to it
   - Card at position 04 (AUTOMATION). Link: case study only
     (/projects/fishtech-sales-agent). Ops is password-protected and the
     bot number is never linked
   - Screenshots: the real ops.html rendered with invented data, amounts
     masked, phone numbers shown as "+263 77 XXX XXXX", "Sample data" label
     on every image. Chat component
     SalesAgentChat.tsx is an invented conversation, "Sample conversation"
   - NEVER CLAIM: the model vendor (say "large language model agent with
     tool use"), the approval threshold or any dollar figure, message,
     customer or quotation counts, an ERP. Never name Blue Acre

## FishTech Copy Discipline

When writing portfolio copy about FishTech, the canonical
source is the FishTech Precision Feeding System reference
document in the Claude project knowledge. The following
rules apply:

USE:
- "FishTech Precision Feeding System" (full name)
- "Precision feeding"
- "Overhead camera"
- "Biomass estimation"
- "Smallholder aquaculture"
- "Edge", "pondside", "on the Pi"
- "FCR" (Feed Conversion Ratio)
- "Tilapia and catfish" (specific species)
- "Zimbabwe" / "SADC"

AVOID:
- "FishTech Smart Feed" (old name, retired)
- "FishTech Precise Feeding System" (legacy spelling)
- "Smart feeding" / "AI-powered feeding"
- "Underwater camera" (it isn't)
- "Fish counting" (it samples, not counts)
- "Industrial aquaculture" (smallholder is the market)
- "Cloud platform" / "SaaS" (edge-first)
- "Various fish species" (be specific)
- "Africa" (be specific to Zimbabwe / SADC)
- "AI-powered" (generic, use "computer-vision-based")

NEVER CLAIM:
- "Counts every fish in the pond"
- "Reduces feed costs by X percent" (no commercial data yet)
- "Deployed on N farms" (pilot pending)
- "Industry-leading accuracy" (not benchmarked)
- Specific dollar figures (the USD 200-300 hardware target
  is internal, not public)
- Test counts, line counts, contributor counts. Say what is tested, never
  how many (real counts go stale; DECISIONS.md, 2026-10-31)

CURRENT STAGE LANGUAGE:
- Backend is FastAPI (migration from Flask is done). Never tag FishTech "Flask"
- Do not attach a year to the pilot ("pilot 2026" went stale). Say "pilot
  deployment in preparation" until a pilot has actually started
- "Working prototype, pilot pond secured, pilot deployment in
  preparation"
- "Being industrialised through FishTech Consultancy"
- "Started as the author's final-year CS dissertation at NUST,
  submitted November 2025, currently being extended toward a
  production-ready product"

NO EM-DASHES in portfolio copy. Use commas, periods, or
rewrite. The em-dash is a stylistic crutch that adds nothing
but visual noise.

## Media

- public/images/iris/: FishTech Precision Feeding System (iris-hero.jpg is the
  flagship photo; pond rig, indoor demo and platform screen go in the case study)
- public/images/feeder/: FishTech Feeder (card strip: mechanism, pond sunset,
  visitors; feeder-pond-demo.jpg stays in the repo but is not used)
- public/images/zas/: Zimbabwe Agricultural Show 2026 (About timeline strip)
- public/images/fishtech-consultancy/: screenshots of www.fishtech.co.zw taken
  2026-10-09 (ft-home-desktop 2000 px wide from a 1440 px capture, ft-home-phone
  600 px wide from a 390 px capture; card strip ft-prices-phone,
  ft-calculator-phone, ft-quote-phone, 780 x 1688 from 390 px captures).
  Retake them if the site changes a lot
- public/images/health-longevity/: Health & Longevity, 2026-11-01
  (hl-*-desktop 2000 x 1250 from 1440 px, hl-*-phone 780 x 1688 from 390 px).
  hl-membership-phone and hl-consult-phone from the live site, read only;
  hl-home-* and hl-articles-phone stay on the sample-content versions until
  a real article is live (see Known issues); hl-aide-match-phone and hl-admin-today-*
  from the local preview with sample data, test banners hidden. Home is
  scrolled past the hero so the portrait is not the subject. No clip: no
  flow.webm exists. Retake the live ones when the site changes a lot
- Screenshot rules for client and FishTech systems: public pages from the
  live site, read only; anything behind a request or sign-in from a local
  copy with sample data; platform test banners hidden; sample phone numbers
  masked as "+263 77 XXX XXXX"; amounts in Ops masked
- public/images/fishtech-sales-agent/: FishTech Ops (real ops.html, invented
  data, amounts masked) and quote-pdf.jpg (pdf_quote.py, invented customer,
  prices and business number masked), each with a "Sample data" label
- public/images/endoscopy-suite/: screenshots of endoscopysuite.co.zw taken
  2026-10-09 (es-home-desktop 2000 px wide, es-home-phone, and three phone
  pages for the card strip). Retake them if the client site changes a lot
- public/images/graduation/: graduation (grad-studio.jpg is the main portrait
  and the first lightbox photo, then corridor, outdoor, ceremony; grad-seated.jpg
  stays in the repo but is not used)
- public/videos/: feeder-dispensing.mp4 (card clip: full 9 s, 720x1280, 30 fps,
  H.264 crf 25, preset slow, no audio, 7.25 MB) and iris-presenting.mp4 (case
  study, controls, no autoplay), each with a poster jpg
- public/_incoming/ is a local drop folder, gitignored, never committed
- public/previews/<client>/index.html: private client design previews. None at
  present (endoscopy-suite deleted 2026-10-09). A new one needs a rewrite in
  next.config.ts, a noindex meta tag in the file (the X-Robots-Tag header for
  /previews/ is already in next.config.ts), stays out of the sitemap, and is
  never blocked in robots.txt
- Clips that play automatically are short, silent and looping. The case study may
  carry one talking clip with controls, which never plays on its own. Never
  full-length originals
- Video size: up to 8 MB per video if it never downloads before the visitor
  scrolls to it; public/videos/ up to 12 MB in total
- Certificate images never go on the site
- Galleries use src/components/ui/MediaGallery.tsx (strip or grid, dialog lightbox)

## Tech Stack Pills (About section marquee)

Row 1 (AI / CV / Edge):
  Python · Computer Vision · OpenCV · YOLOv8 · YOLOv8-Pose
  · PyTorch · Ultralytics · AI Engineering · Edge AI · Hailo

Row 2 (Full-stack / IoT):
  TypeScript · React · Next.js · Vue 3 · Flutter · Node.js
  · FastAPI · IoT · Raspberry Pi · Linux

Drop: TensorFlow, SQLite as standalone, PostgreSQL as standalone,
      Tailwind as standalone.

## Animation Standards — AWWWARDS LEVEL

Every interaction must feel alive. Basic fade-ins are NOT acceptable.

### Required animations:

- Split text: Name letters animate in one by one (blur + translateY + opacity)
- Magnetic buttons: CTAs pull toward cursor on hover
- Custom cursor: Teal dot follows mouse, scales on interactive elements
- Scroll progress: Thin teal line at top of viewport
- Number counters: Stats count up from 0 when entering viewport
- Card spotlight: Radial gradient follows cursor inside project cards
- Border beam: Animated teal light travels around card borders on hover
- Marquee: Tech pills scroll infinite loop, two rows opposite directions
- Section reveals: Blur-in + rise on scroll, staggered
- Floating badges: Tech pills float on sine wave around hero photo
- Background grid: Dot grid with parallax on mouse move
- Navbar: Smooth glassmorphism transition on scroll
- Rotating border: Gradient border rotates around profile photo
- Hover states: Every clickable element has satisfying hover

### Performance rules:

- Only animate transform and opacity — never top/left/width/margin
- No transition-all — animate specific properties only
- Use will-change sparingly
- Respect prefers-reduced-motion
- Spring-style easing (not linear)
- GPU-accelerated always

## Anti-Generic Guardrails — HARD RULES

- NO default Tailwind palette (blue-500, indigo-600, slate-800 etc.)
  Only use our custom design tokens defined above
- NO flat shadow-md. Use layered color-tinted shadows with low opacity
  Example: 0 8px 24px -4px rgba(0,229,192,0.15)
- NO same font for headings and body — Geist + DM Sans split
- Apply tight tracking (-0.03em) on large headings
- Apply generous line-height (1.7) on body text
- Layer multiple radial gradients for atmosphere, not flat backgrounds
- Add SVG noise/grain texture for depth on key surfaces
- Every interactive element needs hover + focus-visible + active states
- Images: gradient overlay (from-black/60) + mix-blend-multiply treatment
- Intentional spacing tokens, not random Tailwind steps
- Depth layering: base → surface → elevated → floating
- Custom brand color palette only — derive all shades from #00E5C0 and #080808

## Hard Rules — DO NOT VIOLATE

- Do NOT use transition-all
- Do NOT use Tailwind default colors as primary
- Do NOT stop after one screenshot pass — minimum 3 rounds per section
- Do NOT use the same font for headings and body
- Do NOT use flat shadows
- Do NOT use placeholder lorem ipsum — real Daniel content only
- Do NOT add features not in the spec above
- Do NOT "improve" the spec — build what's specified
- Do NOT ship a section until screenshot matches the spec

## Mobile-First — NON-NEGOTIABLE

This site must be exceptional on mobile. Most visitors will be on phones.

### Mobile rules:

- Design mobile FIRST, desktop is the enhancement
- Test at 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone Pro Max)
- Test at 768px (iPad portrait) and 1024px (iPad landscape)
- Navbar: hamburger menu below 768px, full-screen overlay with animated links
- Hero: text stacks above photo on mobile, stats bar becomes 2x2 grid
- Services: single column below 768px
- Projects: alternating layout collapses to single column on mobile
- About: columns stack on mobile
- Contact: form full width, links stack below
- Hero name font-size scales smoothly with clamp(2.5rem, 10vw, 7rem)
- All touch targets minimum 44x44px (Apple HIG)
- Magnetic buttons become regular tap on touch devices (detect touch)
- Custom cursor disabled on touch devices
- Animations still work but reduced intensity on mobile for performance
- Images use next/image with responsive sizing
- No horizontal scroll at any viewport
- Body text uses text-secondary (0.75) or brighter on the dark background
- Below 768 px, hide decorative code-style labels ("// projects.tsx",
  card number and category, case-study eyebrows); keep them from 768 px
- Tap targets at least 44 px on phones, including footer and proof links
- Test screenshots at 375px, 768px, 1920px — all 3 must be clean

### Screenshot workflow update:

For each section, take 3 screenshots:

- node screenshot.mjs http://localhost:3000 section-mobile (375px)
- node screenshot.mjs http://localhost:3000 section-tablet (768px)
- node screenshot.mjs http://localhost:3000 section-desktop (1920px)

Note: screenshot.mjs needs to accept a viewport width argument. Update it to support: node screenshot.mjs URL label width

## Automated Screenshot Workflow

A screenshot.mjs script lives at project root.

Usage: node screenshot.mjs http://localhost:3000 [label]

Screenshots save to ./screenshots/screenshot-N.png (auto-incremented).

### After building ANY section, execute this loop:

1. Run the dev server on localhost:3000 (if not running)
2. Take screenshot: node screenshot.mjs http://localhost:3000 section-name
3. Read the PNG with the Read tool — analyze the image directly
4. Compare against spec in this CLAUDE.md
5. Be specific when noting issues:
   - "heading is 32px but spec shows ~48px"
   - "card gap is 16px but should be 24px"
   - "accent color too dim, should be #00E5C0"
   - "animation missing on stat counters"
6. Fix issues in code
7. Re-screenshot, re-compare
8. Repeat minimum 3 times per section
9. Only mark section complete when it matches spec exactly

### What to check in screenshots:

- Spacing / padding / margins
- Font sizes, weights, line-heights
- Exact hex colors match design system
- Alignment (horizontal and vertical)
- Border-radius consistency
- Shadow depth and color
- Image sizing and treatment
- Animation endpoints
- Responsive breakpoints (test 1920, 1440, 768, 375)

## Development Rules

- TypeScript strict mode always, no any types
- Tailwind classes only — no inline styles except dynamic JS values
- Components in src/components/
- Section components in src/components/sections/
- UI primitives in src/components/ui/
- Pages in src/app/
- Images in public/images/
- Brand assets in public/brand-assets/
- Commit after every section with descriptive message
- Real content only, never lorem ipsum
- Mobile-first responsive
- Lighthouse target: 90+ performance, 100 accessibility

## File Structure

```
src/
  app/
    page.tsx
    layout.tsx
    globals.css
    projects/
      fishtech/
        page.tsx
  components/
    sections/
      Navbar.tsx
      Hero.tsx
      Services.tsx
      Projects.tsx
      Achievements.tsx
      HowIBuild.tsx
      About.tsx
      Testimonials.tsx
      Contact.tsx
      Footer.tsx
    ui/
      AnimatedText.tsx
      MagneticButton.tsx
      CustomCursor.tsx
      ScrollProgress.tsx
      NumberTicker.tsx
      CardSpotlight.tsx
      MarqueeTicker.tsx
      BorderBeam.tsx
      FloatingBadge.tsx
      DotGrid.tsx
public/
  images/
  brand-assets/
screenshots/
screenshot.mjs
```

## Known issues

- In dev with prefers-reduced-motion on, React logs a hydration mismatch on
  every motion section (server renders the full-motion variant, client the
  reduced one). Not yet fixed; a separate task
- Health & Longevity Home and Articles captures (hl-home-desktop.jpg,
  hl-home-phone.jpg, hl-articles-phone.jpg) stay on the sample-content
  versions until the live site shows a real published article; the only live
  article is titled "Test Article". Retake those three from the live site,
  read only, once a real article is published (DECISIONS.md, 2026-11-01)

## Commands

- Dev: npm run dev
- Build: npm run build
- Lint: npm run lint
- Type check: npx tsc --noEmit
- Screenshot: node screenshot.mjs http://localhost:3000 [label]
- Résumé: npm run resume (builds public/resume.pdf from
  scripts/resume/resume.html with Puppeteer; set PUPPETEER_EXECUTABLE_PATH
  to Chrome if Puppeteer's own browser is missing)

## Résumé

- Source: scripts/resume/resume.html. Never edit public/resume.pdf by hand;
  change the HTML and run npm run resume. One or two A4 pages, navy and grey
- Contact block stays exactly as it is (name, Software Engineer, Harare,
  phone, email, site, GitHub, LinkedIn). Education wording as in Owner Details
- Same copy rules as the site: no em-dashes, no test, user, revenue or
  dollar figures, no CEO, founder or owner labels, no ERP, no model vendor,
  Iris is a research prototype, FastAPI not Flask

## Final Standard

Before marking any component or section complete, ask:
"Would this get attention on Awwwards?"
If no — make it better. Every time.

## Search (Google) — keep these working

- Google Search Console: ownership by a DNS TXT record on danielchadambuka.com
  in Namecheap (Advanced DNS). Never remove that record. The dev subdomain
  is a CNAME to Vercel in the same Namecheap DNS; leave it alone.
- Every page sets its own title (name added once by the root layout template),
  description, canonical link (alternates.canonical) and Open Graph title/url.
  A page that sets none inherits the home page's canonical and is treated as a
  copy of it.
- Structured data: Person and WebSite in src/app/layout.tsx, ProfilePage in
  src/app/page.tsx. Only confirmed facts; no phone, street address or awards.
- Project data: src/lib/projectSchema.ts. The home page has an ItemList of
  the eight projects (name, url, description, author = Person @id); each
  case study has its own entry as main entity. check-seo fails the build if
  a case study loses its entry or the data has a phone, address, award,
  price, rating, em-dash, dollar figure or Blue Acre. A new project or case
  study = add it there and to the pages list in scripts/check-seo.mjs.
- robots.txt (src/app/robots.ts) allows everything; sitemap (src/app/sitemap.ts)
  lists public pages only. New public page = add it to the sitemap.
- npm run preflight runs scripts/check-seo.mjs after the build; it must pass.
