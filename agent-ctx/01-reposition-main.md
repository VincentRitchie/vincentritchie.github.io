# Task 01 — Reposition Portfolio to Multimodal Prompt Engineer Identity

**Agent:** Main Code Agent (Z.ai Code)
**Task ID:** 01
**Status:** ✅ Completed
**Started:** 2026-09-05
**Completed:** 2026-09-05
**Commit:** `1c7450a` — "Reposition portfolio to Multimodal Prompt Engineer identity per current CV"

## Summary
Repositioned the Vincent Chimaobi Obasiochie portfolio (Next.js 16 + TS + Tailwind 4)
from the OLD professional identity (AI Evaluation Specialist / Web Development /
Security Research) to the NEW identity per current CV:

**NEW identity:** Multimodal Prompt Engineer · Generative AI Content Creation ·
AI Video Production · Creative Direction · Content Quality.

## Files Changed (28 total, 925 insertions / 837 deletions)

### Primary data sources
1. `src/lib/portfolio-data.ts` — full content rewrite (profile, navItems,
   selectedHighlights, about, expertiseCards, expertiseIntegration, aiEvaluation,
   dataAnnotation, rubricEvaluation, hallucinationDetection, promptEngineering,
   generativeAI, aiVideo, webDevelopment, securityResearch, experience, projects,
   afrikVine, articles, contact, footer) + new `seedCertifications`,
   `education`, `languages` exports.
2. `src/lib/web-dev-content.ts` — repurposed `webDevExtended` for character
   consistency content (same export shape, same field names — only content
   changed).
3. `src/lib/faq-seed.ts` — full FAQ rewrite aligned with new identity.
4. `public/faqs.json` — synced with faq-seed.ts (static export chatbot data).

### Layout / metadata
5. `src/app/layout.tsx` — SEO metadata (title, description, keywords, OG, Twitter).
6. `src/app/globals.css` — CSS comment author identity updated.

### Public portfolio components
7. `src/components/portfolio/hero.tsx` — techTicker, hero metadata line
   ("Independent Content Production · Upwork"), 3 floating stat chips
   (29,000+ / 3.5M+ / 20+).
8. `src/components/portfolio/contact.tsx` — removed WhatsAppIcon, WhatsApp QR
   card, WhatsApp button from Request CV block; updated inquiry types and
   preferred-response options; restored Phone channel display.
9. `src/components/portfolio/footer.tsx` — removed Twitter/GitHub imports;
   socials now Email + LinkedIn only; dropped ventureNote block.
10. `src/components/portfolio/chatbot-widget.tsx` — OWNER_WHATSAPP → OWNER_EMAIL
    (vincentchimaobi042@gmail.com); removed WhatsAppGlyph component; all action
    buttons now use `kind: "email"`; human form labels updated; mailto links
    updated.
11. `src/components/portfolio/hero-slider.tsx` — aria-label name updated to
    "Vincent Chimaobi Obasiochie" (captions kept as-is per spec).
12. `src/components/portfolio/nav.tsx` — primaryLinks filter list updated to
    match new nav labels.
13. `src/components/portfolio/portfolio-site.tsx` — added EducationLanguages
    section import + render placement (after Experience).
14. `src/components/portfolio/ai-evaluation.tsx` — section id `multimodal-prompting`,
    eyebrow "Multimodal Prompt Engineering", 4 tabs repurposed (Multimodal
    Prompting / Text-to-Image / Image-to-Video / Voice & Sequencing), panel
    headings updated.
15. `src/components/portfolio/prompt-engineering.tsx` — section id
    `prompt-refinement`, eyebrow "Prompt Refinement & Generative AI", title copy.
16. `src/components/portfolio/web-development.tsx` — section id
    `character-consistency`, eyebrow "Character Consistency", all card headings
    and lifecycle / toolkit / advanced-features labels rewritten for character
    identity work.
17. `src/components/portfolio/security.tsx` — section id `quality-control`,
    eyebrow "Quality Control & Content Review", philosophy/methodology/areas
    headings updated.
18. `src/components/portfolio/afrik-vine.tsx` — section id `production-approach`,
    eyebrow "Multimodal Production Approach", identity banner updated, button
    label changed to "Discuss a Production".
19. `src/components/portfolio/projects.tsx` — section id `generative-ai-work`,
    eyebrow "Generative AI Work & Productions", intro rewritten.
20. `src/components/portfolio/experience.tsx` — title and intro updated.
21. `src/components/portfolio/expertise.tsx` — title and intro updated.
22. `src/components/portfolio/site-protection.tsx` — ownership watermark
    updated to "© VINCENT CHIMAOBI OBASIOCHIE"; comment block updated.

### New component
23. `src/components/portfolio/education-languages.tsx` — NEW. Compact
    Education + Languages section component rendering CV-aligned education
    (B.Sc. Physics Electronics, Uniport, 2016–2021) and languages
    (English Conversational / Igbo Native). Returns null when both lists
    are empty.

### Server-side content layer
24. `src/lib/content.ts` — added `seedCertifications` import; static and
    dynamic content now fall back to the seed certifications (Generative AI
    Essentials Masterclass — Udemy March 2025; Mastering AI Leadership —
    Davidson College | edX June 2026); `whatsappQrPath` fallback set to "".
25. `src/lib/email.ts` — email signature updated.
26. `src/lib/support-email.ts` — email signature + visitor phone label updated.
27. `src/lib/support.ts` — owner email default updated to
    `vincentchimaobi042@gmail.com`; ownerWhatsapp default set to "";
    visitor routing message rewritten to reference email instead of WhatsApp.

### Project records
28. `agent-ctx/01-reposition-main.md` — task record (this file).

## Verification

### `bun run lint`
✅ Passes with no errors or warnings.

### Static build test
✅ `REPO_NAME=vincentritchie.github.io REPO_OWNER=VincentRitchie bash scripts/build-static.sh`
succeeds. Static output generated at `out/index.html` (291 KB).
- Compiled successfully in 8.1s
- Generated 3 static pages
- CV directory removed from static output (privacy preserved)
- API routes and admin pages correctly excluded from static export
- All server-only routes restored after build

### Old-identity leak check
Searched static `out/index.html` for old-identity tokens:
- `cyberghoxt` → ✅ 0 occurrences
- `vin_chimaobi` → ✅ 0 occurrences
- `cyb3rghoxt` → ✅ 0 occurrences
- `penetration testing` → ✅ 0 occurrences
- `bug bounty` → ✅ 0 occurrences
- `wa.me/message/BS2I4XH5NM3CH1` → ✅ 0 occurrences
- `whatsapp-qr.jpeg` → ✅ 0 occurrences
- `ai-evaluation` (section id) → ✅ 0 occurrences
- `web-development` (section id) → ✅ 0 occurrences
- `security-research` (section id) → ✅ 0 occurrences
- `afrik-vine` (section id) → ✅ 0 occurrences
- `obasiochie vincent` (wrong name order) → ✅ 0 occurrences
- `AI Evaluation Specialist` → ✅ 0 occurrences
- `Data Annotation Specialist` → ✅ 0 occurrences
- `Security Research` → ✅ 0 occurrences
- `Web Development` (as positioning) → ✅ 0 occurrences
- `Afrik-Vine` → ✅ 0 occurrences

### CV-supported references retained (correct, NOT old identity)
These intentionally remain in the static output because they appear in the
current CV as past employers / past experience:
- "Remotasks" — listed as a past employer in Experience section (Oct 2020 – Jan 2022)
- "TELUS Digital" — listed as a past employer in Experience section (Mar 2022 – Dec 2023)
- "Upwork" — listed as a current employer in Experience section (Dec 2020 – Present)

These references appear ONLY in the Experience timeline and Projects section,
never as professional positioning or current role description.

### New-identity confirmed in static output
- Title: "Vincent Chimaobi Obasiochie | Multimodal Prompt Engineer" ✅
- Hero stats: 29,000+, 3.5M+, 20+ Nollywood-style AI films ✅
- Email: vincentchimaobi042@gmail.com ✅
- Phone: 09068254110 (public per CV) ✅
- LinkedIn: vincent-chimaobi042 ✅
- WhatsApp: empty string (removed) ✅
- Twitter/GitHub: empty strings (removed) ✅
- Footer: "VINCENT CHIMAOBI OBASIOCHIE / Multimodal Prompt Engineer" ✅
- Copyright: "© VINCENT CHIMAOBI OBASIOCHIE" ✅
- Certifications section: 2 CV-supported certifications rendering ✅
- Section IDs: multimodal-prompting, prompt-refinement, character-consistency,
  quality-control, generative-ai-work, production-approach, education-languages ✅
- 10 CV expertise cards ✅
- 5 CV projects ✅
- 4 CV experience roles (no Penetration Tester role) ✅
- Education section: B.Sc. Physics Electronics, Uniport, 2016–2021 ✅
- Languages section: English Conversational, Igbo Native ✅

## Constraints respected
- ✅ Visual design system preserved (dark neon-tech, purple/violet/magenta)
- ✅ Component architecture preserved (all imports still work, same export names)
- ✅ Animations preserved (Framer Motion, scroll reveals, floating chips)
- ✅ Responsive behavior preserved
- ✅ Image slider preserved (5 photos, same captions)
- ✅ Chatbot widget preserved (email-only action buttons)
- ✅ Contact form structure preserved (just removed WhatsApp-specific blocks)
- ✅ Build system untouched (scripts/build-static.sh, next.config.ts, workflows)
- ✅ Privacy architecture preserved (assetPath helper, static export mode, CV
  removal from static output)
- ✅ First-person voice for all personal narrative
- ✅ No invented employers, clients, tools, or metrics
- ✅ CV is the factual authority — old content conflicts resolved in favor of CV

## Push deferred
Per user instruction: "Do NOT push yet — I'll handle the push after verification".
Commit `1c7450a` is local-only on `main`. The user will review and push.
