/**
 * AI 3D Documentary Video Production: project registry.
 *
 * Data-driven source of truth for documentary projects opened from the
 * "AI 3D Documentary Video Production" parent work card inside Selected
 * Work. Future documentaries only add media and one entry here; the parent
 * card design and the nested explorer do not change.
 *
 * BATCH GUIDE (future updates):
 *   1. Drop the new documentary's media into
 *      public/portfolio/documentary/<production-slug>/ following the same
 *      layout: cover.jpg, 01-*.mp4, 02-*.mp4, ...,
 *      case-study/p-01.jpg..p-NN.jpg (page images generated from the
 *      private source PDF during development; the PDF is never published).
 *   2. Add one entry to `documentaryProductions` below.
 *
 * EDITORIAL RULES for this category:
 *   - Keep the documented historical record and the reconstructed visual
 *     interpretation clearly separate (`documentedNote` states the split).
 *   - Present the aircraft transport scenario as a theory, never as
 *     established fact, and never present the "$100 million" title framing
 *     as a verified appraisal.
 *   - Identify generated footage as reconstruction, not authentic footage
 *     of the historical incident.
 *   - PUNCTUATION: website-authored text must not contain em dashes
 *     (U+2014); scripts/check-punctuation.py enforces this at build time.
 */

import type { WorkDocument } from "./work-documents";

export type DocumentaryProject = {
  id: string;
  title: string;
  /** Short category line shown above the title on cards. */
  category: string;
  status: string;
  /** Concise professional description (60-100 words). */
  summary: string;
  /** Technical capability tags. */
  tags: string[];
  /** Project cover image (logical public path). */
  cover: string;
  /** Independently playable excerpts in supplied file-number order. */
  clips: {
    src: string;
    title: string;
  }[];
  /** Optional read-only case study document (page images inside the site reader). */
  caseStudy?: WorkDocument;
  /** Optional external streaming link for the full production. */
  externalLink?: {
    label: string;
    url: string;
  };
  /** Case context separating documented record from reconstruction. */
  documentedNote: string;
  /** Short disclosure line shown in the project detail. */
  disclosure: string;
  accent: "violet" | "magenta" | "blue";
  icon: string;
};

export const documentaryCategory = {
  title: "Documentary productions",
  intro:
    "Long-form investigative documentary productions built from research and reference analysis through final assembly, using a consistent 3D CGI documentary style. Each documentary project carries its own selected excerpts, technical case study and streaming link.",
};

export const documentaryProductions: DocumentaryProject[] = [
  {
    id: "db5-hangar-mystery",
    title:
      "James Bond's Missing Aston Martin DB5 | Historical Mystery Documentary in 3D CGI",
    category: "3D CGI Documentary · Historical Mystery",
    status: "Completed",
    summary:
      "An investigative documentary reconstructing the 1997 disappearance of the Goldfinger Aston Martin DB5 from a private hangar at Boca Raton Airport, Florida. Research-led narration traces the car's film history and ownership, while AI-generated 3D CGI-style sequences illustrate the reported break-in, the vehicle's cinematic identity and competing explanations for its fate. The excerpts show aerial establishing work, monochrome vehicle reconstruction, mechanical cutting animation and a transport-theory visualization. The aircraft scenario remains a theory, and every generated sequence is identified as reconstruction rather than authentic footage of the incident.",
    tags: [
      "Investigative research",
      "Historical reconstruction",
      "3D CGI-style visualization",
      "Narrative direction",
      "Audiovisual production",
    ],
    cover: "/portfolio/documentary/db5/cover.jpg",
    clips: [
      {
        src: "/portfolio/documentary/db5/01-nighttime-aerial-establishing.mp4",
        title: "Nighttime Aerial Establishing Sequence",
      },
      {
        src: "/portfolio/documentary/db5/02-aston-martin-db5-monochrome.mp4",
        title: "Aston Martin DB5 Monochrome Reconstruction",
      },
      {
        src: "/portfolio/documentary/db5/03-hangar-door-cutting.mp4",
        title: "Hangar Door Cutting Reconstruction",
      },
      {
        src: "/portfolio/documentary/db5/04-aircraft-hangar-transport-theory.mp4",
        title: "Aircraft Hangar Transport Theory Visualization",
      },
    ],
    caseStudy: {
      actionLabel: "View Technical Case Study",
      title:
        "James Bond's Missing Aston Martin DB5: Historical Reconstruction Portfolio",
      subtitle: "Read online · Research-led 3D CGI documentary case study",
      pagesDir: "/portfolio/documentary/db5/case-study",
      pageCount: 19,
    },
    externalLink: {
      label: "Watch Full Documentary",
      url: "https://youtu.be/LyXvcdz1rpQ",
    },
    documentedNote:
      "Documented: the real 1964 Goldfinger association and the June 1997 disappearance of the DB5 from a private hangar at Boca Raton Airport, Florida, which remains unresolved. Reconstructed: every environment, vehicle and action sequence in this production. The aircraft transport scenario is presented as one competing theory, not established fact, and the $100 million figure is editorial framing from the documentary title, not a verified appraisal.",
    disclosure:
      "AI-generated CGI-style reconstructions. Illustrative scenes are not authentic recordings of the historical incident.",
    accent: "blue",
    icon: "BrainCircuit",
  },
];
