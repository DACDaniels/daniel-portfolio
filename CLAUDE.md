# Daniel Chadambuka — Developer Portfolio

# TARGET: Awwwards-worthy. Not a template. Not basic. The best.

## Always Do First

- Invoke the `frontend-design` skill before writing any frontend code
- Read this entire CLAUDE.md at the start of every session
- Check /public/brand-assets/ for any real assets before designing

## Project Overview

Personal developer portfolio for Daniel Chadambuka — Software Engineer,
final-year CS student at NUST Zimbabwe, builder of real-world systems.
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
- Google Fonts: Syne (headings) + DM Sans (body)
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
- text-secondary: rgba(255,255,255,0.6)
- text-tertiary: rgba(255,255,255,0.35)

Typography:

- Heading font: Syne (weights 700, 800)
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
- Education: BSc Computer Science, NUST Zimbabwe (Final Year)
- Title: Software Engineer
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
Separate deep-dive case study pages for each project.

### Section order (exact):

1. Navbar
2. Hero
3. Services
4. Projects
5. About
6. Testimonials
7. Contact
8. Footer

## Section Specifications

### 1. Navbar

- Sticky, fixed top
- Glassmorphism: backdrop-blur-md, bg transparent on load,
  bg rgba(8,8,8,0.8) + border-bottom on scroll
- Left: "DC." in Syne 700, teal on hover
- Right: nav links with magnetic hover effect
- Far right: teal CTA button "Contact Me" with shimmer on hover
- Mobile: hamburger with full-screen overlay menu

### 2. Hero — THE MOST IMPORTANT SECTION

- Full viewport height (min-h-screen)
- LEFT: text content
  - Small tag: "AVAILABLE FOR WORK" with teal pulsing dot
  - Name: "Daniel" line 1, "Chadambuka" line 2
    → Each letter animates in individually (blur + translateY + stagger)
  - Title: "Software Engineer" with animated underline
  - Bio: 1 sentence, fades in after name
  - Two CTAs: "View My Work" (teal filled, magnetic) + "Let's Talk" (outlined, magnetic)
    → "View My Work" → scrolls to Projects section
    → "Let's Talk" → scrolls to Contact section
    → Both audience-neutral, action-oriented, confident
- RIGHT: Professional photo
  → Circular/rounded frame with animated rotating teal border
  → Subtle teal glow behind photo
  → Floating tech badges (Python, Next.js, OpenCV, Flask, Pi)
  with sine wave float animation
- BOTTOM: Stats bar full width
  → Animated number counters count up when in viewport
  → "5+ Projects" "3+ Years" "2 Live Products" "100% Committed"
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
  1. Full-Stack Development — Next.js, React, Node.js, Flask, Python
  2. Systems Architecture — Distributed systems, embedded, IoT, edge
  3. Computer Vision & ML — OpenCV, edge CV, custom metrics engineering
  4. AI & Intelligent Systems — AI integration, intelligent automation

### 4. Projects

- FishTech Smart Feed System (LARGE FLAGSHIP CARD — full width)
  → Real project screenshot
  → Tags: COMPUTER VISION · EMBEDDED · FLASK · RASPBERRY PI
  → Title, description
  → Key metrics: custom MEI/SAD/TCS/RBP metrics
  → "View Case Study" → /projects/fishtech
  → Cursor-tracking spotlight effect
- 3 other projects in alternating left/right layout:
  → FishTech Website (fishtech.co.zw)
  → Steadyhands Platform
  → This Portfolio
- Each card: image, tags, title, description, GitHub + Live links
- Staggered slide-in from alternating sides on scroll

### 5. About

- Two column layout
- LEFT: Heading "About Me", paragraphs
  → NUST CS student → builder → real products
  → Zimbabwe context, real-world problems
  → Honest, human, not corporate
- RIGHT:
  → Tech stack pills in animated marquee (two rows, opposite directions)
  → Small timeline of milestones
- Subtle background texture

### 6. Testimonials

- Horizontal scroll or card carousel
- Each card: quote, name, role, company
- Skip if no real testimonials available

### 7. Contact

- Large headline: "Let's Build Something"
- Left: contact form (name, email, message, animated send button)
- Right: direct links (email, GitHub, LinkedIn)
- Magnetic "Send Message" button
- Subtle animated gradient background

### 8. Footer

- Minimal: name, nav links, social icons, copyright
- Teal hover states

## Projects to Showcase

1. FishTech Smart Feed Management System (FLAGSHIP)
   - Computer vision biomass estimation
   - Custom novel metrics: MEI, SAD, TCS, RBP
   - Raspberry Pi edge deployment (low-cost, offline-capable)
   - Flask backend, MJPEG streaming, SQLite
   - Real commercial product with paying customers
2. FishTech Website — fishtech.co.zw
3. Steadyhands Platform
4. Daniel Chadambuka Portfolio (this site)

## Tech Stack Pills (About section marquee)

Python, TypeScript, Next.js, React, Flask, OpenCV, TensorFlow,
Raspberry Pi, SQLite, PostgreSQL, Git, Linux, Node.js, Tailwind

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
- NO same font for headings and body — Syne + DM Sans split
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

## Commands

- Dev: npm run dev
- Build: npm run build
- Lint: npm run lint
- Type check: npx tsc --noEmit
- Screenshot: node screenshot.mjs http://localhost:3000 [label]

## Final Standard

Before marking any component or section complete, ask:
"Would this get attention on Awwwards?"
If no — make it better. Every time.
