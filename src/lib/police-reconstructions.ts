/**
 * Police Bodycam & Dashcam Reconstructions: production registry.
 *
 * Data-driven source of truth for the "Police Bodycam & Dashcam
 * Reconstructions" category inside the Selected Work section.
 *
 * BATCH GUIDE (future updates):
 *   1. Drop the new production's media into
 *      public/portfolio/police-bodycam/<production-slug>/ following the same
 *      layout: cover.jpg, 01-*.mp4, 02-*.mp4, ..., technical-case-study.pdf.
 *   2. Add one entry to `policeReconstructions` below.
 *   3. Nothing else needs to change: the section, cards, showcase modal,
 *      video carousel and case-study viewer are fully data-driven.
 *
 * NOTE: `technicalCaseStudy` is optional. Omit it for productions whose
 * case study has not been supplied yet; the "View Technical Case Study"
 * button only renders when a correct PDF exists for that production.
 *
 * All clip titles reflect the supplied filenames and the actual footage
 * content (verified frame-by-frame). Every production in this category is
 * an AI-generated reconstruction, never authentic police footage.
 *
 * PUNCTUATION: website-authored text in this file must not contain em
 * dashes (U+2014). scripts/check-punctuation.py enforces this at build
 * time; use commas, colons, semicolons or parentheses instead.
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
  /** Concise professional description (60-90 words). */
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
    "Completed generative-video productions that reconstruct police body-worn and dashboard camera viewpoints: wearable-camera motion, practical illumination, foreground interaction, moving first-person coverage and day/night highway conditions, each reviewed for camera-pose plausibility, temporal coherence and visible generation artifacts. All clips are AI-generated reconstructions, not authentic police recordings.",
  disclosure:
    "AI-generated reconstructions, not authentic police footage.",
};

export const policeReconstructions: PoliceProduction[] = [
  {
    id: "night-operations-bodycam",
    title: "Night Operations Bodycam Reconstruction",
    category: "Bodycam Reconstruction · 4 clips",
    status: "Completed",
    summary:
      "Four AI-generated body-worn camera reconstruction studies set at night: a residential exterior guided by a moving flashlight beam and intermittent red-and-blue reflections, an industrial loading-bay exterior with a gloved hand entering the foreground, plus street-pursuit and daylight close-contact restraint reference clips. The production demanded credible wearable-camera behaviour, persistent architectural geometry and coherent low-light illumination, supporting police-procedural inserts, documentary reconstruction and previsualization.",
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
    caseStudyLabel: "Night Operations Bodycam Reconstruction: Technical Case Study",
    accent: "violet",
    icon: "ScanSearch",
  },
  {
    id: "outdoor-police-bodycam",
    title: "Outdoor Police Bodycam Reconstruction",
    category: "Bodycam Reconstruction · 3 clips",
    status: "Completed",
    summary:
      "Three AI-generated outdoor body-worn camera studies examining movement-linked viewpoint behaviour: an operational approach on foot, a residential patrol, and a pursuit sequence in which the camera follows a running figure past parked vehicles toward a front yard. The production connects forward movement, footstep-related oscillation and changing camera orientation while keeping sidewalks, houses and vehicles spatially intelligible, with wide-angle framing and recording-style presentation. Suited to police-procedural inserts, action previsualization, stunt planning and generative-video quality review.",
    tags: [
      "Body-worn camera POV",
      "Egocentric motion",
      "Pursuit coverage",
      "Wide-angle framing",
      "Scene geometry",
      "Previsualization",
    ],
    cover: "/portfolio/police-bodycam/outdoor-bodycam/cover.jpg",
    clips: [
      {
        src: "/portfolio/police-bodycam/outdoor-bodycam/01-outdoor-operational-approach.mp4",
        title: "Operational Approach",
      },
      {
        src: "/portfolio/police-bodycam/outdoor-bodycam/02-outdoor-residential-patrol.mp4",
        title: "Residential Patrol",
      },
      {
        src: "/portfolio/police-bodycam/outdoor-bodycam/03-outdoor-residential-foot-pursuit.mp4",
        title: "Residential Foot Pursuit",
      },
    ],
    technicalCaseStudy:
      "/portfolio/police-bodycam/outdoor-bodycam/technical-case-study.pdf",
    caseStudyLabel: "Outdoor Police Bodycam Reconstruction: Technical Case Study",
    accent: "magenta",
    icon: "Eye",
  },
  {
    id: "police-dashcam-highway-pursuit",
    title: "Police Dashcam Highway Pursuit Reconstruction",
    category: "Dashcam Reconstruction · 3 clips",
    status: "Completed",
    summary:
      "Three AI-generated reconstructions from a forward-facing, vehicle-mounted dashboard camera: a daytime multi-lane pursuit with changing following distance, a night-time chase under street lighting and headlight glare, and a chaotic multilane scenario where several moving vehicles interact with a motorcycle. The dashboard and windshield framing hold a stable camera origin while lane markings, road infrastructure and traffic change position, testing road geometry, object persistence and day/night illumination for fictional dashcam inserts, pursuit previsualization and generative-video evaluation.",
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
    technicalCaseStudy:
      "/portfolio/police-bodycam/dashcam-highway-pursuit/technical-case-study.pdf",
    caseStudyLabel:
      "Police Dashcam Highway Pursuit Reconstruction: Technical Case Study",
    accent: "blue",
    icon: "Radar",
  },
];

/**
 * Public CV: the updated professional CV shipped with the portfolio.
 * Used by the "View My CV" interactions (hero + contact) unless an
 * admin-uploaded CV path (profile.cvPath) overrides it in full-stack mode.
 */
export const PUBLIC_CV_PATH = "/documents/cv/vincent-chimaobi-prof-cv.pdf";
