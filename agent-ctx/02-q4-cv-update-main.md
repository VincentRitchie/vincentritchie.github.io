# Task 02 — Update Portfolio Content to Latest Q4 CV

**Agent:** Main Code Agent (Z.ai Code)
**Task ID:** 02
**Status:** ✅ Completed
**Date:** 2026-11-10
**Repo:** VincentRitchie/vincentritchie.github.io (live: https://vincentritchie.github.io/)

## Summary
Targeted content update of the Vincent Chimaobi Obasiochie portfolio (already
repositioned to "Multimodal Prompt Engineer" in Task 01) to the LATEST Q4 CV.
Visual design, component architecture, animations, responsive behavior, build
system and privacy architecture were fully PRESERVED — only content changed.

**Updated identity (three-part):** Multimodal Prompt Engineer | AI Video Producer |
Video Annotation Specialist.

**Critical metric change:** 3.5M+ → **13.5M+ combined views** (29,000+ subscribers,
20+ Nollywood-style AI films).

## Key Changes

1. **Professional identity** (`portfolio-data.ts`, `layout.tsx`): three-part role,
   new heroIntro, new SEO title/description/keywords/openGraph/twitter metadata.
2. **Metrics**: every "3.5M"/"3.5 million" replaced with "13.5M"/"13.5 million+";
   hero floating chips → 29,000+ / 13.5M+ / 20+; generativeAI.stats updated.
3. **Experience**: replaced with 8 CV entries (most recent first): CVAT Academy
   Independent Practice (with amber "Independent Practice" badge), Turing LLM
   Trainer, Self-Owned AI Nollywood channels, OneForma, NDA true-crime freelance
   (amber "NDA" badge + confidentiality note), AI 3D Documentary, TELUS Digital,
   Remotasks. Component gained optional `badge`/`note` rendering.
4. **Expertise**: 7 categories replacing the old 10 (added Video Annotation,
   CV Annotation, Annotation QA, Investigative Research; removed Model Stumping
   & Prompt Stress Testing etc.).
5. **Contact**: added `email2` (sekretv.contact@gmail.com) as "Email 2" channel;
   whatsapp/twitter/github set to null; new 7 inquiry types (also updated
   `api/contact/route.ts` VALID_INQUIRY_TYPES); mailto unchanged (already correct).
6. **Hero button fix**: "View My Work" now scrolls to `#generative-ai-work`
   (was `#projects`, which had no matching section).
7. **Section repurposing** (ids unchanged, nav labels renamed):
   - `#multimodal-prompting` → "Video Annotation" (Turing robot-arm workflow,
     tabs: Robot-Arm Video Annotation / Intent Captions & Atomic Subtasks /
     Outcome Ratings & Execution Errors / CVAT Video Tracking)
   - `#prompt-refinement` → "Multimodal Prompting" (reusable workflows with
     ChatGPT, Gemini, Claude; tools list now ChatGPT/Gemini/Claude/CVAT/CapCut)
   - `#character-consistency` → "CV Annotation" (CVAT-centric image annotation &
     instance segmentation; web-dev-content.ts fully rewritten)
   - `#quality-control` → "Annotation QA" (missed objects, wrong classes, merged
     objects, duplicates, boundary inaccuracies, track identity, position drift)
   - `#production-approach` → 13-step pipeline (Investigative research → … →
     Final assembly)
   - `#generative-ai-work` → "Selected Work" (5 cards)
8. **Navigation**: labels renamed (Video Annotation / Multimodal Prompting /
   CV Annotation / Annotation QA / Selected Work); nav.tsx primaryLinks filter
   updated to match.
9. **Chatbot**: OWNER_EMAIL already vincentchimaobi042@gmail.com (verified);
   `faq-seed.ts` and `public/faqs.json` rewritten (14 FAQs) with new role,
   Turing/CVAT/OneFormA facts, 13.5M+ metrics, both emails, new tools; removed
   web-dev/security/Afrik-Vine/WhatsApp/Upwork/model-stumping FAQs.
10. **Type support**: `portfolio-site.tsx` profile type gained `email2`,
    `whatsapp/twitter/github: string | null`; `content.ts` merge updated;
    `prisma/seed.ts` placeholder access made safe.
11. **Dev DB sync**: SiteSetting, CompanyInfo, Projects (5 new), Skills (7 new)
    refreshed so the dev preview matches the static fallback content.

## Removed / Forbidden Content Verified Gone
"3.5M" (standalone), Upwork (as employment), penetration testing, Afrik-Vine,
Model Stumping, Prompt Stress Testing, Nano Banana, Veo 3.1, Midjourney,
web development, WhatsApp — all 0 occurrences in out/index.html.

## Verification (all passed)
- `bun run lint` → clean (0 errors)
- `bunx tsc --noEmit` → 52 errors, ALL pre-existing on HEAD (53 before; my
  changes fixed one — prisma/seed.ts placeholder). No new type errors introduced.
- Static build: `REPO_NAME=vincentritchie.github.io REPO_OWNER=VincentRitchie
  bash scripts/build-static.sh` → success; out/index.html generated; CV removed
  from static output (privacy preserved); server routes restored.
- out/index.html MUST-NOT-CONTAIN: 3.5M(standalone)=0, Upwork=0, penetration=0,
  Afrik-Vine=0, Model Stumping=0, Stress Testing=0, Nano Banana=0, Midjourney=0
- out/index.html MUST-CONTAIN: 13.5M=4, Turing=11, CVAT=35, OneForma=1,
  sekretv.contact=3, Video Annotation Specialist=19, Independent Practice=4
- Live DOM (headless browser): hero chips 29,000+/13.5M+/20+; nav labels correct;
  8 experience entries with Independent Practice + NDA badges; contact channels
  Email/Email 2/Phone/Location/LinkedIn; inquiry dropdown shows the 7 new types;
  no console errors.

## Files Changed (21 tracked source files)
- src/lib/portfolio-data.ts (full content rewrite)
- src/lib/web-dev-content.ts (full content rewrite — CV annotation)
- src/lib/faq-seed.ts (rewrite, 14 FAQs)
- src/lib/content.ts (null-safe social merge, email2)
- src/app/layout.tsx (metadata)
- src/app/api/contact/route.ts (VALID_INQUIRY_TYPES)
- src/components/portfolio/{hero,nav,hero-slider,experience,expertise,
  ai-evaluation,prompt-engineering,web-development,security,afrik-vine,
  projects,education-languages,portfolio-site}.tsx (content/labels/badge+note)
- public/faqs.json (regenerated from FAQ_SEED)
- prisma/seed.ts (safe placeholder access)
- db/custom.db (dev DB content sync — untracked runtime artifact)

## Notes for Next Agent
- Section component file names (ai-evaluation.tsx, web-development.tsx,
  security.tsx, afrik-vine.tsx) and export names (aiEvaluation, webDevelopment,
  securityResearch, afrikVine, webDevExtended) are HISTORICAL — content is
  repurposed; do not rename without updating all imports.
- Experience entries support optional `badge` (amber chip) and `note` (amber
  box) fields; used for "Independent Practice" and "NDA".
- The static build (GitHub Pages) reads pure fallbacks from portfolio-data.ts
  (buildStaticContent); the dev server merges DB over fallbacks — both were
  synced to identical content.
- Commit made with message: "Update portfolio content to latest Q4 CV: 8
  experience entries, Turing/CVAT roles, 13.5M+ views" — NOT pushed.
