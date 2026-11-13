/**
 * Police Bodycam & Dashcam Reconstructions — production registry.
 *
 * Data-driven source of truth for the "Police Bodycam & Dashcam
 * Reconstructions" category inside the Selected Work section.
 *
 * BATCH GUIDE (future updates):
 *   1. Drop the new production's media into
 *      public/portfolio/police-bodycam/<production-slug>/ following the same
 *      layout: cover.jpg, 01-*.mp4, 02-*.mp4, …, technical-case-study.pdf.
 *   2. Add one entry to `policeReconstructions` below.
 *   3. Nothing else needs to change — the section, cards, showcase modal,
 *      video carousel and case-study viewer are fully data-driven.
 *
 * NOTE: `technicalCaseStudy` is optional. Omit it for productions whose
 * case study has not been supplied yet — the "View Technical Case Study"
 * button only renders when a correct PDF exists for that production.
 *
 * All clip titles reflect the supplied filenames and the actual footage
 * content (verified frame-by-frame). Every production in this category is
 * an AI-generated reconstruction — never authentic police footage.
 */

export type PoliceClip = {
  /** Logical public path (root-relative); wrapped with assetPath() at render time. */
  src: string;
  /** Short, accurate clip title based on filename and actual content. */
  title: string;
};

export type PoliceProduction = {
  id: string;
  title: string;
  /** Short category line shown above the title on cards. */
  category: string;
  status: string;
  /** Concise professional description (60–90 words). */
  summary: string;
  /** Technical capability tags. */
  tags: string[];
  /** Production cover image (logical public path). */
  cover: string;
  /** Independent clips shown in the interactive carousel, in order. */
  clips: PoliceClip[];
  /** Optional path to the production's PDF technical case study. */
  technicalCaseStudy?: string;
  /** Preview label for the case study button tooltip/aria. */
  caseStudyLabel?: string;
  accent: "violet" | "magenta" | "blue";
  icon: string;
};

/** Section copy for the category block inside Selected Work. */
export const policeCategory = {
  eyebrow: "Police Bodycam & Dashcam Reconstructions",
  title: "Police camera-perspective reconstruction productions",
  intro:
    "Completed generative-video productions that reconstruct police body-worn and dashboard camera viewpoints — wearable-camera motion, practical illumination, foreground interaction and day/night highway conditions, each reviewed for camera-pose plausibility, temporal coherence and visible generation artifacts. All clips are AI-generated reconstructions, not authentic police recordings.",
  disclosure:
    "AI-generated reconstructions — not authentic police footage.",
};

export const policeReconstructions: PoliceProduction[] = [
  {
    id: "night-operations-bodycam",
    title: "Night Operations Bodycam Reconstruction",
    category: "Bodycam Reconstruction · 4 clips",
    status: "Completed",
    summary:
      "Four AI-generated body-worn camera reconstruction studies set at night: a residential exterior guided by a moving flashlight beam and intermittent red-and-blue reflections, an industrial loading-bay exterior with a gloved hand entering the foreground, plus street-pursuit and daylight close-contact restraint reference clips. The production demanded credible wearable-camera behaviour, persistent architectural geometry and coherent low-light illumination — supporting police-procedural inserts, documentary reconstruction and previsualization.",
    tags: [
      "Body-worn camera POV",
      "Nighttime illumination",
      "Flashlight interaction",
      "Foreground occlusion",
      "Temporal coherence",
      "Previsualization",
    ],
    cover: "/portfolio/police-bodycam/night-operations/cover.jpg",
    clips: [
      {
        src: "/portfolio/police-bodycam/night-operations/01-night-residential-exterior.mp4",
        title: "Night Residential Exterior",
      },
      {
        src: "/portfolio/police-bodycam/night-operations/02-night-warehouse-exterior.mp4",
        title: "Night Warehouse Exterior",
      },
      {
        src: "/portfolio/police-bodycam/night-operations/03-night-street-pursuit.mp4",
        title: "Night Street Pursuit",
      },
      {
        src: "/portfolio/police-bodycam/night-operations/04-daylight-restraint.mp4",
        title: "Daylight Restraint",
      },
    ],
    technicalCaseStudy:
      "/portfolio/police-bodycam/night-operations/technical-case-study.pdf",
    caseStudyLabel: "Night Operations Bodycam Reconstruction — Technical Case Study",
    accent: "violet",
    icon: "ScanSearch",
  },
  {
    id: "police-dashcam-highway-pursuit",
    title: "Police Dashcam Highway Pursuit Reconstruction",
    category: "Dashcam Reconstruction · 3 clips",
    status: "Completed",
    summary:
      "Three AI-generated dashcam-style reconstruction clips examining highway pursuit from a dashboard-mounted camera: a daytime multi-lane pursuit, a night-time chase under street lighting and headlight glare, and a chaotic multilane traffic scenario. Each clip tests vehicle-perspective framing, stable road geometry, traffic motion continuity and day/night illumination behaviour — evaluated for camera-mount plausibility, temporal coherence and artifact control, with applications in driving-scene inserts, previsualization and generative-video quality review.",
    tags: [
      "Dashcam perspective",
      "Highway pursuit",
      "Day & night lighting",
      "Vehicle-mounted POV",
      "Traffic continuity",
      "Quality review",
    ],
    cover: "/portfolio/police-bodycam/dashcam-highway-pursuit/cover.jpg",
    clips: [
      {
        src: "/portfolio/police-bodycam/dashcam-highway-pursuit/01-daytime-highway-pursuit.mp4",
        title: "Daytime Highway Pursuit",
      },
      {
        src: "/portfolio/police-bodycam/dashcam-highway-pursuit/02-nighttime-highway-pursuit.mp4",
        title: "Nighttime Highway Pursuit",
      },
      {
        src: "/portfolio/police-bodycam/dashcam-highway-pursuit/03-chaotic-multilane-highway-pursuit.mp4",
        title: "Chaotic Multilane Highway Pursuit",
      },
    ],
    accent: "blue",
    icon: "Radar",
  },
];

/**
 * Public CV — the updated professional CV shipped with the portfolio.
 * Used by the "View My CV" interactions (hero + contact) unless an
 * admin-uploaded CV path (profile.cvPath) overrides it in full-stack mode.
 */
export const PUBLIC_CV_PATH = "/documents/cv/vincent-chimaobi-prof-cv.pdf";
