/**
 * Portfolio content repository for Vincent Chimaobi Obasiochie.
 * Source of truth for public copy.
 *
 * Identity: Multimodal Prompt Engineer · AI Video Producer ·
 * Video Annotation Specialist · Content Quality.
 *
 * NOTE: This file is the single source of truth for public copy. All personal
 * narrative uses first-person voice. The CV is the factual authority: no
 * invented employers, clients, tools, or metrics.
 */

export const profile = {
  // Primary personal identity: displayed in uppercase everywhere it appears as the main identity.
  name: "VINCENT CHIMAOBI OBASIOCHIE",
  // Homepage hero animated name only (rule: large main animated name shows only "VINCENT CHIMAOBI").
  heroName: "VINCENT CHIMAOBI",
  shortName: "VINCENT",
  initials: "VCO",
  role: "Multimodal Prompt Engineer | AI Video Producer | Video Annotation Specialist",
  location: "Abuja, Nigeria",
  tagline:
    "Multimodal Prompt Engineering · AI Video Production · Video Annotation · Content Quality",
  heroHeadline:
    "Multimodal Prompt Engineering, AI Video Production, and Video Annotation for AI Training",
  heroIntro:
    "I work with generative AI across text, image and video production, and I annotate and evaluate visual content for AI training. My work combines structured prompting, careful visual review, character consistency and quality control across long-form productions.",
  shortBio:
    "I am a Multimodal Prompt Engineer, AI Video Producer and Video Annotation Specialist based in Abuja, Nigeria. I work with generative AI across text, image and video production, and I annotate and evaluate visual content for AI training, combining structured prompting, careful visual review, character consistency and quality control across long-form productions.",
  longBio:
    "Across AI-assisted film, documentary and annotation work, I plan scenes and visual requirements before generation, keep useful references, review outputs critically and correct inconsistencies before moving forward. This approach has helped me reduce unnecessary retries, maintain stronger continuity and use different generative tools according to the needs of each production stage. My background in content research and digital content review also strengthens how I approach annotation, evaluation and AI-generated work.",
  // Professional photographs: profile-main.jpeg is the official header avatar.
  profileImage: "/images/profile-main.jpeg",
  avatar: "/images/profile-main.jpeg",
  // Premium hero/about showcase slider: exactly five professional photographs.
  gallery: [
    "/images/me_img1.jpeg",
    "/images/me_img2.jpeg",
    "/images/me_img3.jpeg",
    "/images/me_img4.jpeg",
    "/images/me_img5.jpeg",
  ],
  // CV-aligned contact: WhatsApp, X/Twitter, GitHub removed (not in CV).
  whatsapp: null as string | null,
  email: "vincentchimaobi042@gmail.com",
  email2: "sekretv.contact@gmail.com",
  publicEmail: "vincentchimaobi042@gmail.com",
  phone: "09068254110",
  twitter: null as string | null,
  github: null as string | null,
  linkedin: "https://www.linkedin.com/in/vincent-chimaobi042/",
};

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Video Annotation", href: "#multimodal-prompting" },
  { label: "Multimodal Prompting", href: "#prompt-refinement" },
  { label: "CV Annotation", href: "#character-consistency" },
  { label: "Annotation QA", href: "#quality-control" },
  { label: "Experience", href: "#experience" },
  { label: "Selected Work", href: "#generative-ai-work" },
  { label: "Production Approach", href: "#production-approach" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export const selectedHighlights: string[] = [
  "Built and managed AI-powered YouTube channels with 29,000+ subscribers and 13.5 million+ combined views through structured prompting, repeated refinement and careful visual control.",
  "Produced more than 20 complete Nollywood-style AI films: original Nigerian stories carried from script and storyboard through generation, voice production and final assembly.",
  "Annotate short robot-arm task videos for AI training data at Turing, producing four structured deliverables per clip: intent caption, atomic subtask list, final summary and outcome rating.",
  "Applied CVAT Academy's annotation curriculum through structured, project-based exercises: multi-instance bounding boxes, polygons, segmentation masks and video tracking.",
  "Practical experience maintaining character recognisability, clothing, locations, backgrounds and visual cues across long-form generated productions.",
  "Background in investigative research, search quality evaluation and digital content review that strengthens how I plan, evaluate and refine AI-generated work.",
];

/* ---------- About ---------- */
export const about = {
  headline: "Multimodal Prompt Engineering, AI Video Production & Video Annotation",
  intro:
    "I am a Multimodal Prompt Engineer, AI Video Producer and Video Annotation Specialist based in Abuja, Nigeria. I work with generative AI across text, image and video production, and I annotate and evaluate visual content for AI training, combining structured prompting, careful visual review, character consistency and quality control across long-form productions.",
  aboutMe: [
    "My professional path combines AI film and documentary production, video annotation for AI training, computer vision image annotation, and digital content quality review. In practice, these areas share the same foundation: careful planning before generation, useful references, critical review of outputs, and correction of inconsistencies before moving forward. This approach has helped me reduce unnecessary retries, maintain stronger continuity and use different generative tools according to the needs of each production stage.",
    "I have built and managed AI-powered YouTube channels with 29,000+ subscribers and 13.5 million+ combined views, and produced more than 20 complete Nollywood-style AI films. As an LLM Trainer at Turing I annotate robot-arm task videos for AI training data, and I practise computer vision image annotation and video tracking with CVAT. My background in research and digital content review also strengthens how I approach this work: I read requirements carefully, separate evidence from assumption, identify weak reasoning, and communicate findings in a structured and practical way.",
  ],
  howIWork: [
    "My work begins with planning. Before generating any scene, I plan the story, characters, settings, visual cues and overall creative direction. I keep useful references so that each generated scene can be checked against the intended look, tone and continuity rather than accepted on first impression.",
    "From there, I work in stages: research, story development, scriptwriting, scene planning, structured prompting, visual reference preparation, AI generation, continuity review, voice production, sequencing and final assembly. I review outputs critically, identify inconsistencies in character identity, clothing, environments or backgrounds, and correct them before moving forward. The same discipline shapes my annotation work: review in full before writing, document accurately, and grade against clear criteria.",
  ],
  professionalDirection:
    "My long-term direction is to keep building strong, character-consistent, long-form AI content (Nollywood-style films, story-driven video and multimodal productions) while deepening my annotation and evaluation practice for AI training data. I am especially interested in work where visual review, character identity, scene continuity and guideline compliance matter, and where my background in research and quality review strengthens the final output.",
  differentiators: [
    {
      title: "Plan before generation",
      body: "I plan scenes, characters, settings and visual cues before generating, so each output can be checked against the intended look and continuity.",
    },
    {
      title: "Character identity first",
      body: "I maintain recognisability through facial characteristics, clothing, visual references and repeated refinement across multiple generated scenes.",
    },
    {
      title: "Critical review at every stage",
      body: "I review outputs critically and correct inconsistencies in characters, environments, locations or backgrounds before moving forward.",
    },
    {
      title: "Annotation discipline",
      body: "I apply the same care to AI training data: full review before writing, accurate documentation of objects, errors and outcomes, and self-audits against guidelines.",
    },
    {
      title: "Multimodal control",
      body: "I work across text, image and video generation in one production process, selecting outputs from different generative stages according to each production requirement.",
    },
  ],
  brandStatement:
    "I build my work around structured prompting, careful visual review and quality control. I want every visitor to this portfolio to understand not just what I do, but how I think: plan before generation, keep useful references, review outputs critically, correct inconsistencies early, and maintain character identity, scene continuity and visual direction across long-form AI content.",
};

/* ---------- Expertise overview ---------- */
export const expertiseCards = [
  { title: "Video Annotation & Frame-Level Review", icon: "ListChecks", accent: "violet", body: "Structured video annotation with intent captions, atomic subtasks, execution-error documentation and outcome ratings for AI training data.", href: "#multimodal-prompting" },
  { title: "Computer Vision Image Annotation & Instance Segmentation", icon: "Tags", accent: "magenta", body: "Multi-instance annotation using bounding boxes, polygons, segmentation masks and brush-based editing in CVAT.", href: "#character-consistency" },
  { title: "Shot-Level Visual Analysis & Scene Continuity", icon: "Eye", accent: "blue", body: "Frame-level review of character identity, composition, environment, continuity and track alignment across scenes.", href: "#character-consistency" },
  { title: "AI Video Editing & Production", icon: "Clapperboard", accent: "violet", body: "Long-form video production from story development through scripting, generation, sequencing and final assembly.", href: "#prompt-refinement" },
  { title: "Multimodal Prompt Engineering & Video Generation", icon: "Sparkles", accent: "magenta", body: "Structured prompting across text, image and video generation with reusable production templates.", href: "#prompt-refinement" },
  { title: "Annotation Quality Assurance & Guideline Compliance", icon: "ShieldCheck", accent: "blue", body: "Quality checks for missed objects, incorrect classes, merged objects, duplicates and boundary inaccuracies.", href: "#quality-control" },
  { title: "Investigative Documentary Research & Content Evaluation", icon: "ScanSearch", accent: "violet", body: "Research-first production with fact-checked information, multiple firsthand accounts and evidence-supported assessment.", href: "#production-approach" },
];

export const expertiseIntegration =
  "My video annotation work produces structured training data: intent captions, atomic subtasks, error documentation and outcome ratings. My computer vision annotation practice covers bounding boxes, polygons, segmentation masks and brush-based editing in CVAT. My shot-level visual analysis keeps character identity, composition and continuity strong across long-form content. My AI video production turns research and scripts into finished films, and my multimodal prompt engineering drives every generative stage with reusable templates. My annotation quality assurance catches missed objects, wrong classes, merged objects, duplicates and boundary inaccuracies. Together, these areas form a practical professional profile for multimodal prompt engineering, AI video production and video annotation.";

/* ---------- Video Annotation (was AI Evaluation) ----------
 * Export names kept stable so existing component imports keep working.
 * Content covers the Turing robot-arm video annotation workflow.
 */
export const aiEvaluation = {
  headline: "Robot-Arm Video Annotation for AI Training Data",
  intro:
    "As an LLM Trainer – Video Annotation Specialist at Turing, I annotate short robot-arm task videos for AI training data, producing four structured deliverables per clip: intent caption, atomic subtask list, final summary and outcome rating. My approach focuses on full review before writing, accurate documentation and guideline compliance.",
  whatItMeans:
    "Robot-arm video annotation is not watching a clip once and describing it loosely. It is the disciplined process of reviewing each clip in full before writing anything, recording exactly what is present (objects, counts, colours, starting positions, gripper type and final state) and then separating what the robot intended to do from what it actually did. Every missed grasp, slip, drop, retry and pause matters. Every clip is graded against defined outcome criteria and checked against detailed guidelines for word limits, voice, tense and punctuation before submission.",
  workflow: [
    { step: "Review the clip in full", body: "Watch the complete clip before writing anything, so the description reflects the whole task rather than a first impression." },
    { step: "Record the scene accurately", body: "Document objects, counts, colours, starting positions, gripper type and the final state of the task." },
    { step: "Separate intent from execution", body: "Distinguish the robot's intended goal from its actual execution, so training data reflects what really happened." },
    { step: "Document execution errors", body: "Record missed grasps, slips, drops, retries and pauses accurately, without speculation." },
    { step: "Distinguish movement types", body: "Separate camera movement from robot movement so the description never confuses the two." },
    { step: "Grade and self-audit", body: "Grade the outcome as Success, Partial or Fail, apply the guideline checks, complete a self-audit and document ambiguous details in reviewer notes." },
  ],
  lookFor: [
    { label: "Objects and counts", body: "Are all objects present in the clip recorded with correct counts, colours and starting positions?" },
    { label: "Gripper type and final state", body: "Is the gripper type identified and the final state of the task documented precisely?" },
    { label: "Intent versus execution", body: "Is the robot's intended goal clearly separated from what it actually did?" },
    { label: "Execution errors", body: "Are missed grasps, slips, drops, retries and pauses recorded accurately and completely?" },
    { label: "Camera vs robot movement", body: "Is camera movement clearly distinguished from robot movement throughout the description?" },
    { label: "Outcome rating", body: "Is the clip graded as Success, Partial or Fail according to the defined criteria?" },
    { label: "Guideline compliance", body: "Does every deliverable follow the guidelines for word limits, voice, tense and punctuation?" },
    { label: "Reviewer notes", body: "Are ambiguous details documented in reviewer notes instead of guessed at?" },
  ],
  professionalValue:
    "Good robot-arm video annotation produces training data that models can actually learn from. It requires watching carefully, describing exactly what happened, separating intention from execution, and grading consistently against criteria. My value is in bringing that discipline to every clip: reviewing in full before writing, documenting errors precisely, and completing self-audits so that ambiguous details are flagged rather than silently resolved.",
  relatedExperience:
    "I currently work as an LLM Trainer – Video Annotation Specialist at Turing (remote), annotating short robot-arm task videos for AI training data. Each clip produces four structured deliverables: an intent caption, an atomic subtask list, a final summary and an outcome rating. I review each clip in full before writing, record objects, counts, colours, starting positions, gripper type and final state, separate the robot's intended goal from its actual execution, document missed grasps, slips, drops, retries and pauses, distinguish camera movement from robot movement, and complete self-audits with reviewer notes for ambiguous details.",
};

/* Intent captions & atomic subtasks (replaces Data Annotation export shape) */
export const dataAnnotation = {
  headline: "Intent Captions & Atomic Subtask Lists",
  intro:
    "Every robot-arm clip I annotate produces an intent caption and an atomic subtask list. The intent caption states what the robot is trying to achieve; the subtask list breaks the clip down into its smallest meaningful steps. Both deliverables follow strict guidelines for word limits, voice, tense and punctuation.",
  whyItMatters:
    "Training data lives or dies on structure. An intent caption that drifts into storytelling, or a subtask list that merges three steps into one sentence, teaches a model the wrong granularity. That is why each deliverable has its own rules: the caption stays focused on intent, the subtasks stay atomic, and the wording stays within the guideline limits for voice, tense and punctuation. Careful structure at this stage is what makes the final summary and outcome rating trustworthy.",
  approach: [
    "Review the entire clip before writing any deliverable.",
    "Identify the robot's intended goal and express it as a precise intent caption.",
    "Break the clip into its smallest meaningful actions.",
    "Write each action as one atomic subtask with a clear verb and object.",
    "Record objects, counts, colours, starting positions, gripper type and final state where relevant.",
    "Check every deliverable against the guidelines for word limits, voice, tense and punctuation.",
    "Document any ambiguous detail in reviewer notes rather than guessing.",
  ],
  principles: [
    { label: "Full review first", body: "Nothing is written until the whole clip has been watched and understood." },
    { label: "Atomic granularity", body: "Each subtask expresses exactly one action: no merged steps, no skipped steps." },
    { label: "Intent focus", body: "The caption describes what the robot is trying to achieve, not editorial commentary." },
    { label: "Guideline discipline", body: "Word limits, voice, tense and punctuation follow the project guidelines exactly." },
    { label: "Honest ambiguity", body: "Unclear details go into reviewer notes instead of invented descriptions." },
  ],
};

/* Outcome ratings & execution errors (replaces Rubric Evaluation export shape) */
export const rubricEvaluation = {
  headline: "Outcome Ratings & Execution-Error Documentation",
  intro:
    "Every clip ends with a graded outcome and a final summary. My approach focuses on separating what the robot intended from what it executed, recording every execution error precisely, and grading consistently as Success, Partial or Fail.",
  methods: [
    { label: "Success / Partial / Fail grading", body: "Each clip is graded against defined outcome criteria (a clean completion is a Success, a partially achieved goal is Partial, and a failed goal is a Fail), never a gut feeling." },
    { label: "Execution-error documentation", body: "Missed grasps, slips, drops, retries and pauses are recorded accurately. The error record is what turns a video into usable training signal." },
    { label: "Camera vs robot movement", body: "Camera movement is explicitly distinguished from robot movement, so a pan or zoom is never mistaken for the robot acting." },
    { label: "Self-audits and reviewer notes", body: "After writing, I self-audit each deliverable against the guidelines and document ambiguous details in reviewer notes for the reviewer." },
  ],
};

/* CVAT video tracking (replaces Hallucination Detection export shape) */
export const hallucinationDetection = {
  headline: "CVAT Video Tracking: Tracks, Keyframes & Interpolation",
  intro:
    "Through CVAT Academy's curriculum, I completed video-tracking exercises using persistent object tracks, manually adjusted keyframes and interpolation. My approach focuses on track identity, bounding-box alignment and position drift across frames.",
  whyDangerous:
    "A video track that silently switches identity, or a bounding box that drifts off its object between keyframes, corrupts the whole annotation. In crowded scenes (urban intersections, roadside markets, dense pedestrian flow), a single merged or lost track can invalidate a sequence of frames. That is why I check track identity, bounding-box alignment and position drift explicitly, and adjust keyframes manually where interpolation gets it wrong, rather than trusting the interpolated result by default.",
  process: [
    "Set up the annotation task in CVAT with the appropriate label schema.",
    "Create a persistent object track for each target object.",
    "Place and adjust keyframes manually at points of change: appearance, disappearance, occlusion or direction.",
    "Review the interpolated positions between keyframes for alignment and drift.",
    "Check that track identity is preserved: no merged objects, no identity switches.",
    "Verify bounding-box alignment at boundaries and occlusions before completing the task.",
  ],
  techniques: [
    { label: "Persistent object tracks", body: "Each object keeps one track across the sequence, so identity survives motion and occlusion." },
    { label: "Manual keyframe adjustment", body: "Keyframes are placed and corrected by hand where the object changes direction, gets occluded or reappears." },
    { label: "Interpolation review", body: "Interpolated boxes between keyframes are checked for alignment and drift, not accepted by default." },
    { label: "Track identity checks", body: "Identity swaps, merged objects and duplicate tracks are caught before submission." },
    { label: "Boundary accuracy", body: "Boxes are verified at frame edges and partial occlusions, where drift is most common." },
  ],
};

/* ---------- Multimodal Prompting (was Prompt Engineering & Generative AI) ---------- */
export const promptEngineering = {
  headline: "Reusable Multimodal Prompting Workflows",
  intro:
    "My prompt engineering is built on reusable production templates and activation directives for ChatGPT, Gemini and Claude. The same structured workflow carries a production from story development and scriptwriting through scene planning, image and video generation, voice production, sequencing and final assembly.",
  understanding:
    "A prompt is not a one-shot instruction; it is part of a repeatable production system. Over more than 20 Nollywood-style AI films and long-form documentary productions, I have developed reusable production templates and activation directives that keep story development, scriptwriting and scene planning consistent from project to project. Each generative stage (text with ChatGPT, Gemini and Claude; image generation; video generation; voice production) gets structured prompts that define the objective, anchor the references, set constraints and state what a successful output looks like.",
  principles: [
    { label: "Reusable templates", body: "Story development, scriptwriting and scene planning run on templates I refine between productions, so each project starts structured rather than from zero." },
    { label: "Activation directives", body: "For ChatGPT and Claude I use activation directives that set role, constraints and output format before any task-specific prompting begins." },
    { label: "Right tool per stage", body: "ChatGPT, Gemini and Claude each handle the stages they are strongest at, and image and video generation tools are driven with equally structured prompts." },
    { label: "Set constraints clearly", body: "Prompts state what must be included and what should be avoided: drift, distortion, off-brief additions." },
    { label: "Specify output structure", body: "Shot framing, character placement and scene composition are defined explicitly, not left to chance." },
    { label: "Iterate from evidence", body: "Prompt refinement responds to actual output behavior (observed drift, artifact, identity loss or continuity break), not guesswork." },
  ],
  debugWorkflow: [
    "Review the output to identify what failed: character recognisability, clothing, environment, motion, narrative alignment, artifact risk.",
    "Trace the failure back to the prompt: missing context, unclear instruction, weak references, poor output guidance.",
    "Rewrite the prompt or template to correct the specific weakness rather than changing everything blindly.",
    "Run another output and compare whether the revised prompt improved the result.",
    "Fold what worked back into the reusable template so the next production starts stronger.",
  ],
  useCases: [
    "Story development and scriptwriting for long-form AI productions.",
    "Scene planning with reusable production templates.",
    "Structured prompting for image and video generation stages.",
    "Activation directives for ChatGPT and Claude.",
    "Voice production and sequencing prompts for audio-visual alignment.",
    "Refining prompting techniques for realism, consistency and generation-credit efficiency.",
  ],
};

export const generativeAI = {
  headline: "Practical Generative AI Workflows for Long-Form Content & AI Video Production",
  intro:
    "Generative AI is most useful when it is guided by clear creative goals, reviewed carefully, and integrated into a structured multimodal workflow. I use generative AI tools to develop story, characters, scenes, voice and final sequencing while maintaining critical human review at every stage.",
  experience:
    "My generative AI work includes AI-powered YouTube channels with 29,000+ subscribers and 13.5 million+ combined views, more than 20 complete Nollywood-style AI films, AI true-crime reconstruction productions, and long-form 3D-style investigative documentaries. I work across text, image and video generation in one production process, selecting outputs from different generative stages according to the production requirement, with ChatGPT, Gemini and Claude carrying the text stages, and final assembly completed in CapCut.",
  tools: ["ChatGPT", "Gemini", "Claude", "CVAT", "CapCut"],
  workflow: [
    "Define the creative objective: story, characters, setting, tone, visual cues.",
    "Develop the story and write the script using reusable templates.",
    "Plan the production scene by scene with clear visual requirements.",
    "Prepare structured prompts and visual references for each generative stage.",
    "Generate image and video outputs with the appropriate tool.",
    "Review the result for coherence, realism, character identity, environment continuity and narrative alignment.",
    "Refine prompts, assets or direction based on observed weaknesses.",
    "Produce voice, sequence the scenes and complete the final assembly in CapCut.",
  ],
  qualityReview:
    "The important part of my workflow is not simply generating content. It is the review process that comes after generation. I check whether the output is coherent, visually consistent, narratively useful and appropriate for the audience. When an output fails, I identify whether the weakness came from the prompt, the tool limitation, the reference material, or the editing process, and I correct it before moving forward.",
  stats: [
    { value: "29,000+", label: "Subscribers across AI channels" },
    { value: "13.5M+", label: "Combined views" },
    { value: "20+", label: "Nollywood-style AI films" },
  ],
};

export const aiVideo = {
  headline: "AI Video Production: Story, Sequencing and Review",
  intro:
    "AI video production combines story development, scriptwriting, scene planning, structured prompting, image and video generation, voice production, sequencing and final assembly. My work in this area focuses on producing long-form, character-driven content where continuity, realism and narrative alignment matter.",
  creativeDirection:
    "AI video workflows require more than writing a prompt and accepting the first result. The process begins with research and a clear concept: the story, tone, setting, character direction, visual style and intended emotional effect. From there, reusable production templates carry story development, scriptwriting and scene planning; prompts and assets are refined until the output supports the creative goal; and everything is reviewed critically before being accepted into the final sequence. Final assembly is completed in CapCut.",
  qualityFactors: [
    "Narrative coherence and logical scene progression.",
    "Character recognisability and consistency across scenes.",
    "Clothing, styling and visual identity continuity.",
    "Environment, location, background and lighting consistency.",
    "Realism, motion quality and avoidance of obvious AI artifacts.",
    "Voice-to-character fit and audio-visual alignment.",
    "Alignment between prompt, generated output and final editing direction.",
    "Chapter-level compliance checks and final pass/fail audits.",
  ],
};

/* ---------- Computer Vision Image Annotation (was Web Development) ---------- */
export const webDevelopment = {
  headline: "Computer Vision Image Annotation & Instance Segmentation",
  intro:
    "Using CVAT as my central annotation tool, I practise multi-instance image annotation with bounding boxes, polygons, segmentation masks, brush-based masking, polygon-to-mask selection and additive/subtractive region editing, on datasets covering crowded urban intersections, roadside markets, pedestrians, vehicles and complex object interactions.",
  philosophy:
    "Annotation quality is a production discipline, not a drawing exercise. Every label schema, every polygon vertex and every mask boundary feeds a computer vision model, so the difference between a tight boundary and a sloppy one is the difference between usable training data and noise. My approach treats CVAT task configuration, label schema design and instance-level precision as the foundation: plan the schema before annotating, annotate each instance deliberately, and verify boundaries and occlusions before submitting.",
  process: [
    { step: "Configure the task", body: "Set up the CVAT annotation task and custom JSON label schemas that match the dataset's classes and requirements." },
    { step: "Plan instances", body: "Read the frame first: identify every object instance, its class and the interactions before drawing anything." },
    { step: "Annotate multi-instance", body: "Mark each object with the right geometry: bounding boxes for extent, polygons for shape, segmentation masks for precise boundaries." },
    { step: "Refine regions", body: "Use brush-based masking, polygon-to-mask selection and additive/subtractive region editing to correct boundaries and occlusions." },
    { step: "Handle occlusion", body: "Decide deliberately how partially visible objects are marked (truncated, occluded or crowd) according to the schema." },
    { step: "Quality check", body: "Review for omitted objects, incorrect classes, merged objects, duplicate annotations and boundary inaccuracies before completing the task." },
  ],
  priorities: [
    { label: "Schema fidelity", body: "Custom JSON label schemas are configured to match the dataset exactly: no improvised classes." },
    { label: "Instance precision", body: "Every object gets its own annotation: no merged instances, no duplicates." },
    { label: "Boundary accuracy", body: "Boxes, polygons and masks sit on the true object boundary, not an approximation." },
    { label: "Occlusion handling", body: "Partial visibility is handled according to the schema, not ignored." },
    { label: "Complex interactions", body: "Overlapping objects and interactions in crowded scenes are separated deliberately." },
    { label: "Final verification", body: "Each task ends with a check for omitted objects and incorrect classes." },
    { label: "Tool fluency", body: "Bounding boxes, polygons, masks, brush tools and track editing are applied where each fits best." },
    { label: "Consistency across frames", body: "Annotation style stays consistent across the whole task, frame after frame." },
  ],
  serviceAreas: [
    { title: "Bounding Box Annotation", icon: "Tags", body: "Multi-instance bounding boxes for extent and position, checked for alignment and boundary accuracy." },
    { title: "Polygon & Instance Segmentation", icon: "Layers", body: "Polygon annotation and segmentation masks for precise object boundaries, including polygon-to-mask selection." },
    { title: "Brush-Based Masking", icon: "Sparkles", body: "Brush-based masking with additive and subtractive region editing for irregular shapes and fine boundaries." },
    { title: "Label Schema Configuration", icon: "Code2", body: "Custom JSON label schemas configured in CVAT to match dataset classes, attributes and project requirements." },
  ],
};

/* ---------- Annotation Quality Assurance (was Security Research) ---------- */
export const securityResearch = {
  headline: "Annotation Quality Assurance & Guideline Compliance",
  intro:
    "Quality assurance is the discipline behind both my annotation and my production work. My approach focuses on catching missed objects, incorrect classes, merged objects, duplicate annotations and boundary inaccuracies, plus track identity, position drift, camera-versus-subject movement and guideline compliance.",
  philosophy:
    "Quality control is not a final checkbox. It is a discipline that runs through every stage of annotation and production. I review each clip in full before writing, check track identity and bounding-box alignment in video tracking, verify classes and boundaries in image annotation, and audit my own deliverables against the guidelines before submission. My background in digital content review (TELUS Digital, Remotasks) shapes how I approach this work: thousands of items reviewed taught me that consistency comes from applying the same checks every single time.",
  methodology: [
    { step: "Know the guidelines", body: "Word limits, voice, tense, punctuation, class definitions and rating criteria are internalised before any work begins." },
    { step: "Review in full", body: "Nothing is annotated or written until the clip, frame or content item has been reviewed completely." },
    { step: "Check completeness", body: "Look for omitted objects, missed steps, skipped frames and missing deliverables." },
    { step: "Check correctness", body: "Verify classes, labels, track identity and ratings against the defined criteria." },
    { step: "Check for structural errors", body: "Catch merged objects, duplicate annotations, identity switches and boundary inaccuracies." },
    { step: "Check movement and drift", body: "Distinguish camera movement from subject movement, and check position drift between keyframes." },
    { step: "Self-audit", body: "Audit my own work against the guidelines and fix findings before submission." },
    { step: "Document ambiguity", body: "Record ambiguous details in reviewer notes so the reviewer sees exactly what was uncertain." },
  ],
  interestAreas: [
    "Missed-object detection in dense scenes.",
    "Incorrect class labelling.",
    "Merged objects and duplicate annotations.",
    "Boundary inaccuracies in boxes, polygons and masks.",
    "Track identity and identity switches in video tracking.",
    "Position drift between keyframes.",
    "Camera movement versus subject movement.",
    "Guideline compliance and outcome-rating consistency.",
  ],
  reportingStyle:
    "My reporting style focuses on clarity and usefulness: what the issue is, where it appears, why it matters, what evidence supports the finding, and what correction is recommended. In annotation work this shows up as precise reviewer notes; in production work it shows up as chapter-level compliance checks and final pass/fail audits. The goal is always to make the next output stronger, not just to flag the current one as weak.",
  publicNote:
    "I can discuss my general annotation methodology, quality-assurance principles, CVAT practice and review process. I do not expose confidential client content, private productions, internal review data or unpublished assets unless explicitly authorized.",
};

/* ---------- Experience ---------- */
export const experience = [
  {
    role: "Computer Vision Image Annotation & Video Tracking",
    org: "CVAT Academy Curriculum & Independent Practice",
    type: "Remote",
    period: "Nov 2026 – Present",
    badge: "Independent Practice",
    summary:
      "Applied CVAT Academy's annotation curriculum through structured, project-based exercises involving multi-object image datasets, crowded urban intersections, roadside markets, pedestrians, vehicles and complex object interactions. This is independent practice, not employment.",
    points: [
      "Configured CVAT annotation tasks and custom JSON label schemas.",
      "Executed multi-instance annotation using bounding boxes, polygons and segmentation masks.",
      "Applied brush-based masking, polygon-to-mask selection and additive/subtractive region editing.",
      "Completed CVAT video-tracking exercises using persistent object tracks, manually adjusted keyframes and interpolation.",
      "Checked track identity, bounding-box alignment and position drift.",
      "Performed quality checks for omitted objects, incorrect classes, merged objects, duplicate annotations and boundary inaccuracies.",
    ],
    methods: [],
  },
  {
    role: "LLM Trainer – Video Annotation Specialist",
    org: "Turing",
    type: "Remote",
    period: "Oct 2026 – Present",
    summary:
      "Annotate short robot-arm task videos for AI training data, producing four structured deliverables per clip: intent caption, atomic subtask list, final summary and outcome rating.",
    points: [
      "Review each clip in full before writing, recording objects, counts, colours, starting positions, gripper type and final state.",
      "Separate the robot's intended goal from its actual execution.",
      "Record missed grasps, slips, drops, retries and pauses accurately.",
      "Distinguish camera movement from robot movement.",
      "Grade outcomes as Success, Partial or Fail.",
      "Apply detailed guidelines for word limits, voice, tense and punctuation.",
      "Complete self-audits and document ambiguous details in reviewer notes.",
    ],
    methods: [],
  },
  {
    role: "Co-Founder & Creator, AI Nollywood-Style Faceless Film Channels",
    org: "Self-Owned",
    type: "Remote",
    period: "Oct 2023 – Present",
    summary:
      "Created, owned and operated AI-powered YouTube channels with 29,000+ subscribers and 13.5 million+ combined views, producing more than 20 complete Nollywood-style AI films.",
    points: [
      "Developed original Nigerian stories, scripts and storyboards.",
      "Planned films scene by scene using reusable production templates.",
      "Maintained character recognisability through facial characteristics, clothing, settings and visual cues.",
      "Maintained location, background and storyline continuity.",
      "Managed voice production, scene sequencing and final assembly.",
      "Used multiple generative AI tools according to each production stage.",
      "Refined prompting techniques to improve realism, consistency and generation-credit efficiency.",
    ],
    methods: [],
  },
  {
    role: "Search Quality Evaluator",
    org: "OneForma",
    type: "Remote",
    period: "Mar 2026 – Aug 2026",
    summary:
      "Interpreted map-search queries and evaluated search-result relevance using geographic context, location terms, distance and prominence.",
    points: [
      "Distinguished business, category, navigational, address and other query types.",
      "Examined place names, business categories, addresses and map-pin positioning.",
      "Used authoritative sources to verify details and identify discrepancies.",
      "Applied separate relevance and data-accuracy criteria.",
      "Produced guideline-based, evidence-supported assessments.",
    ],
    methods: [],
  },
  {
    role: "AI True-Crime Reconstruction Producer",
    org: "Freelance, Contract Basis",
    type: "Remote",
    period: "Nov 2025 – Aug 2026",
    badge: "NDA",
    note: "Confidential work produced under NDA; case details, scripts and generated assets are not shared publicly.",
    summary:
      "Produced AI-reconstructed true-crime videos for documented cases without usable original footage, under NDA.",
    points: [
      "Researched documented cases before production and established factual chronology.",
      "Converted verified narration into scene-by-scene visual reconstructions.",
      "Recreated appropriate camera perspectives including body-worn views, night-vision CCTV and dashboard-camera perspectives.",
      "Developed reusable production templates and activation directives for ChatGPT and Claude.",
      "Aligned every generated scene with its corresponding script line.",
      "Maintained recurring character, clothing, building and object consistency.",
      "Applied chapter-level compliance checks and final pass/fail audits.",
    ],
    methods: [],
  },
  {
    role: "AI 3D Documentary Video Producer",
    org: "Independent Content Production",
    type: "Remote",
    period: "Jan 2024 – Oct 2025",
    summary:
      "Produced long-form investigative documentary videos from research and reference analysis through final publication-ready assembly.",
    points: [
      "Analysed reference videos to understand production methods, pacing and editorial direction.",
      "Developed research-to-script pipelines using multiple firsthand accounts.",
      "Wrote structured, multi-chapter investigative scripts.",
      "Directed narration production using text-to-speech workflows.",
      "Used still-to-video generation workflows to maintain a consistent 3D CGI documentary style.",
      "Maintained character, clothing and object consistency across multi-chapter productions.",
      "Produced animated chapter title cards, route maps and visual explanations.",
      "Completed final video assembly in CapCut.",
    ],
    methods: [],
  },
  {
    role: "Digital Content Quality & Research Specialist",
    org: "TELUS Digital",
    type: "Remote",
    period: "Jun 2022 – Dec 2023",
    summary:
      "Evaluated thousands of digital content items for relevance, clarity, factual consistency and completeness.",
    points: [
      "Researched unclear information and weighed available evidence.",
      "Identified ambiguous, conflicting, incomplete and unsupported information.",
      "Applied changing project instructions consistently across high-volume workflows.",
      "Documented quality issues clearly.",
    ],
    methods: [],
  },
  {
    role: "Digital Content Review & Quality Operations",
    org: "Remotasks",
    type: "Remote",
    period: "Oct 2020 – Jan 2022",
    summary:
      "Reviewed more than 10,000 individual items across repetitive, high-volume workflows.",
    points: [
      "Checked completed work for errors, inconsistencies and missing information.",
      "Worked independently and adapted to changing project requirements and guidelines.",
    ],
    methods: [],
  },
];

/* ---------- Projects (Selected Work) ---------- */
export const projects = [
  {
    title: "AI Nollywood-Style Faceless Film Channels",
    category: "Generative AI · Film Production",
    status: "Live",
    summary:
      "Created, owned and operated AI-powered YouTube channels with 29,000+ subscribers and 13.5 million+ combined views, producing more than 20 complete Nollywood-style AI films from original Nigerian stories.",
    focus: ["29,000+ subscribers", "13.5M+ combined views", "20+ complete AI films", "Reusable production templates"],
    value:
      "Demonstrates end-to-end AI film production at scale: original story development, scripting, storyboarding, scene planning, structured prompting, voice production, sequencing and final assembly, with character and location continuity held across every film.",
    icon: "Clapperboard",
    accent: "violet",
  },
  {
    title: "AI True-Crime Reconstruction Production",
    category: "Generative AI · True Crime",
    status: "NDA",
    summary:
      "Produced AI-reconstructed true-crime videos for documented cases without usable original footage, converting verified narration into scene-by-scene visual reconstructions under NDA.",
    focus: ["Factual chronology research", "Body-worn & CCTV perspectives", "ChatGPT & Claude directives", "Pass/fail audits"],
    value:
      "Shows research-first reconstruction discipline: every generated scene aligned with its script line, recurring character, clothing, building and object consistency maintained, and chapter-level compliance checks applied before release.",
    icon: "ShieldAlert",
    accent: "magenta",
  },
  {
    title: "AI 3D Documentary Video Production",
    category: "Generative AI · Documentary",
    status: "Completed",
    summary:
      "Produced long-form investigative documentary videos from research and reference analysis through final publication-ready assembly, using multiple firsthand accounts and a consistent 3D CGI documentary style.",
    focus: ["Research-to-script pipelines", "Multi-chapter scripts", "Still-to-video generation", "Final assembly in CapCut"],
    value:
      "Demonstrates long-form investigative production: animated chapter title cards, route maps, visual explanations, and character, clothing and object consistency maintained across multi-chapter productions.",
    icon: "BrainCircuit",
    accent: "blue",
  },
  {
    title: "Robot-Arm Video Annotation (Turing)",
    category: "AI Training Data · Annotation",
    status: "Current",
    summary:
      "Annotate short robot-arm task videos for AI training data as an LLM Trainer at Turing, producing four structured deliverables per clip: intent caption, atomic subtask list, final summary and outcome rating.",
    focus: ["Intent captions", "Atomic subtasks", "Success / Partial / Fail ratings", "Self-audits & reviewer notes"],
    value:
      "Applies structured annotation discipline to real training data: full clip review before writing, precise documentation of objects and execution errors, and consistent grading against defined criteria.",
    icon: "ListChecks",
    accent: "violet",
  },
  {
    title: "CVAT Image Annotation & Video Tracking Practice",
    category: "Computer Vision · Annotation",
    status: "Independent Practice",
    summary:
      "Applied CVAT Academy's annotation curriculum through structured, project-based exercises: multi-object image datasets, crowded urban intersections, roadside markets, pedestrians, vehicles and complex object interactions.",
    focus: ["Bounding boxes & polygons", "Segmentation masks", "Custom JSON label schemas", "Video tracking & keyframes"],
    value:
      "Builds computer vision annotation capability: multi-instance annotation, brush-based masking, polygon-to-mask selection, persistent object tracks, manually adjusted keyframes and interpolation review.",
    icon: "ScanSearch",
    accent: "magenta",
  },
];

/* ---------- Production Approach (was Afrik-Vine Tech LTD) ---------- */
export const afrikVine = {
  name: "Multimodal Production Approach",
  tagline: "Research · Plan · Prompt · Generate · Review · Assemble",
  logo: "/images/profile-main.jpeg",
  headline: "My Multimodal Production Approach for Long-Form AI Content",
  intro:
    "This section describes the production approach I use for long-form AI content: Nollywood-style films, true-crime reconstructions, investigative documentaries and multimodal productions. It is not a separate company or brand; it is the working method behind the work shown in this portfolio.",
  positioning:
    "My production approach runs from investigative research through final assembly. Every production starts with research and story development, moves through scriptwriting and scene-by-scene planning, and only then enters structured prompting, visual reference preparation and AI generation. Character and scene continuity are reviewed as the scenes are produced, voice and sound are layered in during the audio stages, and every production ends with quality review and final assembly. This reduces unnecessary retries, maintains stronger continuity, and lets me use different generative tools according to the needs of each production stage.",
  mission:
    "To turn researched stories into controlled, long-form AI content where character identity, scene continuity, environment consistency and narrative alignment are treated as production discipline, not luck.",
  vision:
    "To keep refining multimodal prompting techniques that produce stronger, more consistent, character-driven AI content across text, image and video.",
  values: [
    { label: "Research before production", body: "Documented facts, firsthand accounts and verified chronology come before any generation begins." },
    { label: "Plan before generation", body: "Scenes, characters, settings, visual cues and creative direction are planned before any generation begins." },
    { label: "Character identity first", body: "Recognisability through facial characteristics, clothing, visual references and repeated refinement is the foundation of long-form content." },
    { label: "Continuity at every stage", body: "Location, background, clothing and storyline continuity are reviewed as scenes are produced, not patched afterwards." },
    { label: "Structured prompting", body: "Reusable production templates and activation directives keep every generative stage consistent." },
    { label: "Quality review before release", body: "Chapter-level compliance checks and final pass/fail audits gate every publication." },
  ],
  serviceAreas: [
    "Story development and scriptwriting for long-form AI productions.",
    "Multimodal prompting across text, image and video generation.",
    "Character identity, clothing and scene continuity.",
    "Voice production, sound design and audio-visual alignment.",
    "Investigative research and evidence-supported content.",
    "Quality review, compliance checks and final assembly in CapCut.",
  ],
  engagementProcess: [
    { step: "Investigative research", body: "Gather documented facts, firsthand accounts and verified chronology before anything is written." },
    { step: "Story development", body: "Shape the material into an original story with characters, tone and intended emotional effect." },
    { step: "Scriptwriting", body: "Write the structured script: chapters, scenes, narration and dialogue." },
    { step: "Scene planning", body: "Plan the production scene by scene with clear visual requirements using reusable templates." },
    { step: "Structured prompting", body: "Prepare prompts and activation directives for each generative stage." },
    { step: "Visual reference preparation", body: "Collect and organise references so every output can be checked against the intended look." },
    { step: "AI generation", body: "Generate image and video outputs with the appropriate tools for each stage." },
    { step: "Character & scene continuity", body: "Review each output for character recognisability, clothing, location and background consistency." },
    { step: "Voice production", body: "Direct narration and character voices that fit the story and the visual identity." },
    { step: "Sound design", body: "Layer sound to support the narrative beat and emotional register." },
    { step: "Sequencing", body: "Order the accepted scenes into a coherent sequence that respects continuity and pacing." },
    { step: "Quality review", body: "Run chapter-level compliance checks and review the full production end-to-end." },
    { step: "Final assembly", body: "Complete the final edit and assembly in CapCut and prepare the production for release." },
  ],
  roadmap:
    "My production approach continues to evolve as I explore new prompting techniques, generative tools and review methods. The direction is consistent: stronger character identity, tighter scene continuity, more reliable long-form storytelling, and a clearer creative direction across every production.",
  cta:
    "If you would like to discuss an AI video production, a multimodal prompt engineering project, a video annotation engagement or a creative direction collaboration, you can reach me through the contact section below.",
};

/* ---------- Articles ---------- */
export const articles = {
  headline: "Articles, Research Notes & Reflections on Multimodal Prompt Engineering",
  intro:
    "This section will become the knowledge hub for multimodal prompt engineering, AI video production, video annotation, character consistency and content quality.",
  comingSoon:
    "I am building a collection of articles and research notes focused on multimodal prompt engineering, AI video production, video annotation, character consistency and content quality. New posts will be added gradually as this portfolio grows.",
  categories: [
    "Multimodal Prompt Engineering",
    "AI Video Production & Sequencing",
    "Video Annotation for AI Training",
    "Computer Vision Annotation & CVAT",
    "Character Identity & Consistency",
    "Scene & Environment Continuity",
    "Annotation Quality Assurance",
    "Content Research & Quality Control",
  ],
  placeholders: [
    { title: "How I Maintain Character Consistency Across Generated Scenes", body: "Will explain the practical techniques I use to keep character recognisability, facial characteristics, clothing, locations, backgrounds and visual cues consistent across multiple separately generated scenes." },
    { title: "Planning a Multimodal AI Film Before Generation", body: "Will explain how I plan story, characters, settings, visual cues and creative direction before any generation begins, and why this stage reduces unnecessary retries later." },
    { title: "Annotating Robot-Arm Videos for AI Training Data", body: "Will explain the structured workflow behind intent captions, atomic subtask lists, outcome ratings and execution-error documentation for robot-arm task videos." },
  ],
};

/* ---------- Contact ---------- */
export const contact = {
  headline: "Let's Connect",
  intro:
    "If my work aligns with an opportunity, project, collaboration or professional discussion, you can reach me through the contact details below. I am open to conversations around multimodal prompt engineering, AI video production, video annotation, computer vision image annotation, research and quality assurance.",
  channels: [
    { label: "Email", value: "vincentchimaobi042@gmail.com", href: "mailto:vincentchimaobi042@gmail.com", icon: "Mail" },
    { label: "Email 2", value: "sekretv.contact@gmail.com", href: "mailto:sekretv.contact@gmail.com", icon: "Mail" },
    { label: "Phone", value: "09068254110", href: "tel:+2349068254110", icon: "Phone" },
    { label: "Location", value: "Abuja, Nigeria", href: null, icon: "MapPin" },
    { label: "LinkedIn", value: "vincent-chimaobi042", href: "https://www.linkedin.com/in/vincent-chimaobi042/", icon: "Linkedin" },
  ],
  whatsapp: {
    url: "",
    qr: "",
    label: "",
    helper: "",
  },
  inquiryGuidance: [
    { type: "Video annotation or AI training data work", body: "Please include the annotation type (video, image or both), expected volume, guidelines availability, tools involved, timeline, and whether quality review is part of the engagement." },
    { type: "AI video production or multimodal prompt engineering", body: "Please include the type of production, target audience, intended length, character or story requirements, references if available, timeline, and whether creative direction is needed." },
    { type: "Content writing, research or quality review", body: "Please include the type of content, expected depth, research requirements, accuracy expectations, volume, and timeline." },
  ],
  inquiryTypes: [
    "Multimodal Prompt Engineering",
    "AI Video Production",
    "Video Annotation",
    "Generative AI Content",
    "Content Writing & Research",
    "Digital Content Quality",
    "General Professional Contact",
  ],
};

export const footer = {
  blurb:
    "Multimodal Prompt Engineering, AI Video Production, Video Annotation and Content Quality.",
  ventureNote: "",
  location:
    "Based in Abuja, Nigeria. Available for remote multimodal prompt engineering, AI video production, video annotation and content quality opportunities.",
  links: navItems,
};

/* ---------- Credentials (CV-aligned seed data) ---------- */
// Used as the fallback for the public Certifications section when the DB is
// empty (static export mode or no admin-managed items). Mirrors the
// PublicCertification shape used by the Certifications component.
export const seedCertifications = [
  {
    id: "seed-cert-1",
    title: "Generative AI Essentials: Prompt Engineering Masterclass",
    issuer: "Udemy",
    year: "March 2025",
    credentialLink: null,
  },
  {
    id: "seed-cert-2",
    title:
      "Mastering AI Leadership: Advanced Certificate in Prompt Engineering and Professional Ethics",
    issuer: "Davidson College | edX",
    year: "June 2026",
    credentialLink: null,
  },
];

/* ---------- Education (CV-aligned) ---------- */
export const education = [
  {
    id: "edu-1",
    qualification: "Bachelor of Science (B.Sc.) in Physics Electronics",
    institution: "University of Port Harcourt",
    period: "2016 – 2021",
  },
];

/* ---------- Languages (CV-aligned) ---------- */
export const languages = [
  { id: "lang-1", name: "English", level: "Conversational" },
  { id: "lang-2", name: "Igbo", level: "Native" },
];
