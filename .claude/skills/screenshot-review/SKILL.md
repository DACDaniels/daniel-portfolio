---
name: screenshot-review
description: Screenshot-and-compare loop for this portfolio. Use after building or changing any section, to capture mobile/tablet/desktop screenshots with screenshot.mjs and check them against the CLAUDE.md spec (minimum 3 rounds per section).
---

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
4. Compare against spec in CLAUDE.md
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
