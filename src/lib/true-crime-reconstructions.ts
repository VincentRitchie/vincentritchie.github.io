/**
 * AI True-Crime Reconstruction: production registry.
 *
 * Data-driven source of truth for case-linked reconstruction productions
 * shown in the "AI True-Crime Reconstruction" category inside the Selected
 * Work section. These are distinct from the Police Bodycam & Dashcam
 * Reconstructions category: entries here reconstruct moments from
 * documented real cases for which no original footage is available to the
 * production.
 *
 * BATCH GUIDE (future updates):
 *   1. Drop the new production's media into
 *      public/portfolio/true-crime/<production-slug>/ following the same
 *      layout: cover.jpg, showcase.mp4 (one connected sequence),
 *      case-study/p-01.jpg..p-NN.jpg (page images generated from the
 *      private source PDF during development; the PDF is never published).
 *   2. Add one entry to `trueCrimeProductions` below.
 *   3. Nothing else needs to change: the nested work explorer, cards,
 *      single-video player and case-study reader are fully data-driven.
 *
 * EDITORIAL RULES for this category:
 *   - Keep the documented historical case and the reconstructed visual
 *     interpretation clearly separate (`documentedNote` states the split).
 *   - Never present generated footage as original surveillance evidence.
 *   - PUNCTUATION: website-authored text must not contain em dashes
 *     (U+2014); scripts/check-punctuation.py enforces this at build time.
 */

import type { WorkDocument } from "./work-documents";

export type TrueCrimeProduction = {
  id: string;
  title: string;
  /** Short category line shown above the title on cards. */
  category: string;
  status: string;
  /** Concise professional description (50-90 words). */
  summary: string;
  /** Technical capability tags. */
  tags: string[];
  /** Production cover image (logical public path). */
  cover: string;
  /** The single connected showcase video for this production. */
  video: {
    src: string;
    title: string;
  };
  /** Optional read-only case study document (page images inside the site reader). */
  caseStudy?: WorkDocument;
  /**
   * Documents what is historical record and what is reconstructed,
   * displayed in the showcase so visitors keep the distinction clear.
   */
  documentedNote: string;
  accent: "violet" | "magenta" | "blue";
  icon: string;
};

/** Copy for the category inside the AI True-Crime parent work card. */
export const trueCrimeCategory = {
  eyebrow: "AI True-Crime Reconstruction",
  title: "Case-linked reconstruction productions",
  intro:
    "Case-linked generative-video productions that reconstruct documented moments for which no original footage is available to the production. Each reconstruction works from the documented record into a disciplined visual interpretation: research-anchored scene planning, surveillance or witness-perspective framing, and continuity review across the sequence. The results support investigative documentary illustration, filmmaking, cinematic previsualization and generative-video evaluation, and are always clearly identified as reconstructions rather than original evidence.",
  disclosure:
    "AI-generated reconstruction, not original surveillance footage.",
};

export const trueCrimeProductions: TrueCrimeProduction[] = [
  {
    id: "martin-knell-cctv",
    title: "Martin Knell Bank Encounter CCTV Reconstruction",
    category: "True-Crime Reconstruction · CCTV",
    status: "Completed",
    summary:
      "A single connected CCTV-style reconstruction, approximately 37 seconds long, of the documented January 2015 bank encounter linked to the Martin Knell case, developed from the appellate record because no original surveillance footage was available to the production. One stationary surveillance viewpoint carries the full sequence: elevated framing, a consistent curved counter, monochrome image response and controlled human movement. Useful for investigative documentary illustration, editorial inserts, cinematic previsualization and generative-video evaluation.",
    tags: [
      "CCTV perspective",
      "Case-linked reconstruction",
      "Stationary camera",
      "Monochrome response",
      "Documentary illustration",
      "Video evaluation",
    ],
    cover: "/portfolio/true-crime/martin-knell-cctv/cover.jpg",
    video: {
      src: "/portfolio/true-crime/martin-knell-cctv/showcase.mp4",
      title: "CCTV Reconstruction Showcase",
    },
    caseStudy: {
      actionLabel: "View Technical Case Study",
      title: "Martin Knell CCTV Reconstruction: Technical Case Study",
      subtitle: "Read online · AI-generated reconstruction portfolio",
      pagesDir: "/portfolio/true-crime/martin-knell-cctv/case-study",
      pageCount: 15,
    },
    documentedNote:
      "Documented: the real Martin Knell case and a January 13, 2015 bank visit noted in the appellate record. Reconstructed: the on-screen interaction, gestures, room layout and camera view, all generated for this production and never presented as original surveillance evidence.",
    accent: "magenta",
    icon: "Cctv",
  },
];
