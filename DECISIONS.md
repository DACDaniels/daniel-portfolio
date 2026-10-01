# Decisions

One line per decision, newest first. Date, what, why.

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
