/**
 * Portfolio content repository for Vincent Chimaobi Obasiochie.
 * Source of truth for public copy.
 *
 * Identity: Multimodal Prompt Engineer · Generative AI Content Creation ·
 * AI Video Production · Creative Direction · Content Quality.
 *
 * NOTE: This file is the single source of truth for public copy. All personal
 * narrative uses first-person voice. The CV is the factual authority — no
 * invented employers, clients, tools, or metrics.
 */

export const profile = {
  // Primary personal identity — displayed in uppercase everywhere it appears as the main identity.
  name: "VINCENT CHIMAOBI OBASIOCHIE",
  // Homepage hero animated name only (rule: large main animated name shows only "VINCENT CHIMAOBI").
  heroName: "VINCENT CHIMAOBI",
  shortName: "VINCENT",
  initials: "VCO",
  role: "Multimodal Prompt Engineer",
  location: "Abuja, Nigeria",
  tagline:
    "Multimodal Prompt Engineering · Generative AI Content · AI Video Production · Creative Direction · Content Quality",
  heroHeadline:
    "Multimodal Prompt Engineering, Generative AI Content, AI Video Production, and Creative Direction",
  heroIntro:
    "I work with generative AI across text, image and video, using structured prompting, repeated refinement and careful visual control to turn creative ideas into long-form content. My work focuses strongly on character identity, facial appearance, environments, scene continuity, visual direction and consistent storytelling across generated scenes.",
  shortBio:
    "I am a Multimodal Prompt Engineer with practical experience working with generative AI across text, image and video production. My work focuses on turning creative ideas into controlled, long-form visual content through structured prompting, repeated refinement and close attention to character identity, facial appearance, clothing, environments, locations, backgrounds and scene continuity.",
  longBio:
    "Across AI-assisted film and content production, I plan scenes and visual requirements before generation, keep useful references, review outputs critically and correct inconsistencies before moving forward. This approach has helped me reduce unnecessary retries, maintain stronger continuity and use different generative tools according to the needs of each production stage. My background in content writing, research and digital content review also strengthens how I approach AI-generated work.",
  // Professional photographs — profile-main.jpeg is the official header avatar.
  profileImage: "/images/profile-main.jpeg",
  avatar: "/images/profile-main.jpeg",
  // Premium hero/about showcase slider — exactly five professional photographs.
  gallery: [
    "/images/me_img1.jpeg",
    "/images/me_img2.jpeg",
    "/images/me_img3.jpeg",
    "/images/me_img4.jpeg",
    "/images/me_img5.jpeg",
  ],
  // CV-aligned contact — WhatsApp, X/Twitter, GitHub removed (not in CV).
  whatsapp: "",
  email: "vincentchimaobi042@gmail.com",
  publicEmail: "vincentchimaobi042@gmail.com",
  phone: "09068254110",
  twitter: "",
  github: "",
  linkedin: "https://www.linkedin.com/in/vincent-chimaobi042/",
};

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Multimodal Prompting", href: "#multimodal-prompting" },
  { label: "Prompt Refinement", href: "#prompt-refinement" },
  { label: "Character Consistency", href: "#character-consistency" },
  { label: "Quality Control", href: "#quality-control" },
  { label: "Experience", href: "#experience" },
  { label: "Generative AI Work", href: "#generative-ai-work" },
  { label: "Production Approach", href: "#production-approach" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export const selectedHighlights: string[] = [
  "Built and managed AI-powered YouTube channels with more than 29,000 subscribers and more than 3.5 million combined views through structured prompting, repeated refinement and careful visual control.",
  "Created more than 20 Nollywood-style AI films using story development, scripting, prompting, image generation, video generation, voice production, sequencing and review.",
  "Practical experience maintaining character recognisability, facial characteristics, clothing, locations, backgrounds and visual cues across multiple generated scenes.",
  "Multimodal workflow spanning text, image and video generation in one production process, selecting outputs from different generative stages according to each production requirement.",
  "Background in content writing, research and digital content quality review (Upwork, TELUS Digital, Remotasks) that strengthens how I plan, evaluate and refine AI-generated work.",
  "Ongoing exploration of prompting techniques for stronger character identity, scene continuity and long-form storytelling.",
];

/* ---------- About ---------- */
export const about = {
  headline: "Multimodal Prompt Engineering for Generative AI Content & AI Video Production",
  intro:
    "I am a Multimodal Prompt Engineer with practical experience working with generative AI across text, image and video production. My work focuses on turning creative ideas into controlled, long-form visual content through structured prompting, repeated refinement and close attention to character identity, facial appearance, clothing, environments, locations, backgrounds and scene continuity.",
  aboutMe: [
    "My professional path combines generative AI content creation, AI video production, content writing, research and digital content quality review. In practice, these areas share the same foundation: careful planning before generation, useful references, critical review of outputs, and correction of inconsistencies before moving forward. This approach has helped me reduce unnecessary retries, maintain stronger continuity and use different generative tools according to the needs of each production stage.",
    "I have built and managed AI-powered YouTube channels with more than 29,000 subscribers and more than 3.5 million combined views, created more than 20 Nollywood-style AI films, and worked on long-form character-driven storytelling. My background in content writing, research and digital content review also strengthens how I approach AI-generated work — I read requirements carefully, separate evidence from assumption, identify weak reasoning, and communicate findings in a structured and practical way.",
  ],
  howIWork: [
    "My work begins with planning. Before generating any scene, I plan the story, characters, settings, visual cues and overall creative direction. I keep useful references so that each generated scene can be checked against the intended look, tone and continuity rather than accepted on first impression.",
    "From there, I work in stages — text-to-image, image-to-video, voice production, sequencing and review. I review outputs critically, identify inconsistencies in character identity, facial appearance, clothing, environments or backgrounds, and correct them before moving forward. This reduces unnecessary retries and helps maintain stronger continuity across long-form content.",
  ],
  professionalDirection:
    "My long-term direction is to keep building strong, character-consistent, long-form AI content — Nollywood-style films, story-driven video and multimodal productions — while refining my prompting techniques across text, image and video. I am especially interested in work where creative direction, character identity and scene continuity matter, and where my background in content writing, research and quality review strengthens the final output.",
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
      title: "Multimodal control",
      body: "I work across text, image and video generation in one production process, selecting outputs from different generative stages according to each production requirement.",
    },
    {
      title: "Story-driven refinement",
      body: "I treat prompting as a story tool — every scene serves the narrative, tone and emotional direction of the long-form content.",
    },
  ],
  brandStatement:
    "I build my work around structured prompting, repeated refinement and careful visual control. I want every visitor to this portfolio to understand not just what I do, but how I think: plan before generation, keep useful references, review outputs critically, correct inconsistencies early, and maintain character identity, scene continuity and visual direction across long-form AI content.",
};

/* ---------- Expertise overview ---------- */
export const expertiseCards = [
  { title: "Multimodal Prompt Engineering", icon: "Sparkles", accent: "violet", body: "Structured prompting across text, image and video, with close control of requirements, visual direction and generated results.", href: "#multimodal-prompting" },
  { title: "Generative AI Content Creation", icon: "Clapperboard", accent: "magenta", body: "Development of AI-assisted story and visual content from initial concept through final review.", href: "#multimodal-prompting" },
  { title: "AI Video Production", icon: "Clapperboard", accent: "blue", body: "Long-form video production using story development, scripting, image generation, video generation, voice production, sequencing and review.", href: "#prompt-refinement" },
  { title: "AI Creative Direction", icon: "Compass", accent: "violet", body: "Planning characters, settings, scenes, visual cues and overall creative direction before and during generation.", href: "#production-approach" },
  { title: "Character Identity & Facial Consistency", icon: "Users", accent: "magenta", body: "Maintaining recognisability through facial characteristics, clothing, visual references and repeated refinement.", href: "#character-consistency" },
  { title: "Scene & Environment Continuity", icon: "Layers", accent: "blue", body: "Maintaining locations, backgrounds, settings, objects and visual continuity across generated scenes.", href: "#character-consistency" },
  { title: "Story Development & Scriptwriting", icon: "FileText", accent: "violet", body: "Developing story-based content, scripts and narrative direction for long-form AI productions.", href: "#production-approach" },
  { title: "Content Research & Quality Control", icon: "ScanSearch", accent: "magenta", body: "Research, critical reading, organised information gathering and manual review for accuracy, meaning and quality.", href: "#quality-control" },
  { title: "Model Stumping & Prompt Stress Testing", icon: "ShieldAlert", accent: "blue", body: "Testing difficult instructions and model behaviour to identify weaknesses, inconsistency or failure under demanding prompts.", href: "#quality-control" },
  { title: "Prompt Refinement & Production Planning", icon: "Lightbulb", accent: "violet", body: "Improving prompts from observed results and defining scenes or production requirements clearly before generation.", href: "#prompt-refinement" },
];

export const expertiseIntegration =
  "My multimodal prompting work controls how text, image and video outputs are produced. My character consistency practice keeps recognisability strong across long-form content. My scene and environment continuity work holds locations, backgrounds and visual cues together across scenes. My story development and scriptwriting turn ideas into structured narrative direction. My prompt refinement improves outputs from observed results. My content research and quality control background strengthens how I review, evaluate and correct AI-generated work. Together, these areas form a practical professional profile for multimodal prompt engineering, generative AI content and AI video production.";

/* ---------- Multimodal Prompting (was AI Evaluation) ----------
 * Export names kept stable so existing component imports keep working.
 * Content is fully replaced with multimodal-prompting material.
 */
export const aiEvaluation = {
  headline: "Multimodal Prompt Engineering Across Text, Image and Video",
  intro:
    "Multimodal prompt engineering is the structured practice of guiding generative AI across text, image and video in one production process. My approach focuses on clear objectives, careful context, repeated refinement and close control of visual direction, character identity and scene continuity.",
  whatItMeans:
    "Multimodal prompting is not writing a single instruction and accepting the first result. It is the disciplined process of defining the creative objective, preparing references and constraints, generating the first output with the appropriate tool, reviewing the result critically, and refining prompts, assets or direction until the output meets the intended standard. A polished output can still miss the brief, break character identity, drift in environment or fail continuity — my role is to catch and correct those issues before they become final content.",
  workflow: [
    { step: "Clarify the creative objective", body: "Identify the story, tone, characters, setting, visual cues and the intended emotional effect before any generation begins." },
    { step: "Prepare references and constraints", body: "Collect useful references for character identity, clothing, environments, locations and backgrounds so each output can be checked against intent." },
    { step: "Generate the first output", body: "Use the appropriate generative stage — text-to-image, image-to-video, voice production — with a prompt aligned to the objective." },
    { step: "Review critically", body: "Check coherence, realism, character recognisability, facial appearance, clothing, environment continuity, narrative alignment and audience suitability." },
    { step: "Refine and correct", body: "Adjust prompts, references or direction to address weaknesses, inconsistencies or failures identified during review." },
    { step: "Finalise only when ready", body: "Accept the output only after it meets the intended quality standard and supports the long-form story direction." },
  ],
  lookFor: [
    { label: "Character recognisability", body: "Does the generated character remain identifiable across scenes through facial characteristics, clothing and visual cues?" },
    { label: "Facial appearance", body: "Is the face consistent with the intended identity, without unintended drift between scenes?" },
    { label: "Clothing and styling", body: "Does the wardrobe, accessories and styling remain coherent with the story and the character?" },
    { label: "Environment continuity", body: "Are locations, backgrounds, settings, objects and lighting consistent with the established scene?" },
    { label: "Narrative alignment", body: "Does the output serve the story, tone and intended emotional effect?" },
    { label: "Realism and artifacts", body: "Is the output free of obvious AI artifacts, distortion, morphing or implausible motion?" },
    { label: "Audience suitability", body: "Is the content appropriate for the intended audience and platform?" },
    { label: "Production fit", body: "Does the output integrate cleanly into the longer sequence, voice track and final edit?" },
  ],
  professionalValue:
    "Good multimodal prompting improves the reliability of long-form AI content. It helps reduce unnecessary retries, keeps character identity stable, holds environments and backgrounds together, and produces scenes that fit the story. My value is in bringing careful planning, critical review and structured refinement to that process — not just generating outputs, but explaining why an output works, where it fails, and what needs to change.",
  relatedExperience:
    "My multimodal prompting experience includes building and managing AI-powered YouTube channels with more than 29,000 subscribers and more than 3.5 million combined views, and creating more than 20 Nollywood-style AI films using story development, scripting, prompting, image generation, video generation, voice production, sequencing and review. I work across text, image and video generation in one production process, selecting outputs from different generative stages according to the production requirement.",
};

/* Text-to-image focus (replaces Data Annotation export shape) */
export const dataAnnotation = {
  headline: "Text-to-Image Generation with Character and Visual Control",
  intro:
    "Text-to-image generation is where the visual identity of a production is first established. My approach focuses on defining characters, settings, clothing, lighting and visual cues clearly before generation, and reviewing each generated image against the intended look before it is accepted.",
  whyItMatters:
    "Every later stage — image-to-video, sequencing, voice production — depends on the visual identity established at the text-to-image stage. If character identity, facial appearance, clothing, environment or background drift here, the inconsistency propagates through the whole production. That is why careful prompt design, useful references and critical review at this stage reduce unnecessary retries later and protect continuity across long-form content.",
  approach: [
    "Define the character identity, facial characteristics, clothing and styling before generation.",
    "Establish the setting, environment, location, background and lighting in the prompt and references.",
    "Specify the visual cues, mood, tone and intended emotional effect.",
    "Generate the first image with a prompt aligned to the objective.",
    "Review the output for character recognisability, environment continuity and artifact risk.",
    "Refine the prompt or references and regenerate until the output meets the intended standard.",
  ],
  principles: [
    { label: "Identity first", body: "Character recognisability is established and protected before any environment or motion work begins." },
    { label: "Reference discipline", body: "Useful references keep the generated output anchored to the intended look rather than drifting." },
    { label: "Critical review", body: "Each image is reviewed against the brief — not accepted on first impression." },
    { label: "Iterative refinement", body: "Prompts and references are revised based on observed output, not guesswork." },
    { label: "Continuity awareness", body: "Every accepted image is checked against the longer sequence it will belong to." },
  ],
};

/* Image-to-video focus (replaces Rubric Evaluation export shape) */
export const rubricEvaluation = {
  headline: "Image-to-Video Generation Guided by Story and Continuity",
  intro:
    "Image-to-video generation turns a static visual into motion. My approach focuses on motion quality, narrative alignment, character consistency and continuity with the surrounding scenes — not just accepting the first motion output.",
  methods: [
    { label: "Motion purpose", body: "Before generating motion, I identify the narrative purpose of the shot — what the audience needs to see, feel or understand — so the motion supports the story rather than distracting from it." },
    { label: "Character stability", body: "I check that facial characteristics, clothing and posture remain consistent with the source image, without unintended morphing, distortion or identity drift during motion." },
    { label: "Environment consistency", body: "I review the location, background, lighting and objects across the motion to ensure the scene holds together visually and matches the established environment." },
  ],
};

/* Voice production focus (replaces Hallucination Detection export shape) */
export const hallucinationDetection = {
  headline: "Voice Production, Sequencing and Review for Long-Form AI Content",
  intro:
    "Voice production and sequencing close the loop on AI-assisted film and long-form content. My approach focuses on voice suitability, narrative pacing, audio-visual alignment and final review before a production is considered complete.",
  whyDangerous:
    "A weak voice, mistimed line or disconnected audio track can break an otherwise strong visual production. Voice is not just an addition — it carries character, tone and emotion. If voice production is rushed, mistimed or inconsistent with the visual identity, the audience feels the disconnect even when they cannot name it. That is why voice production, sequencing and review are treated as a serious production stage, not an afterthought.",
  process: [
    "Identify the voice direction — character, tone, accent, pacing and emotional register — that fits the story.",
    "Produce or select voice outputs aligned to the characters and the scene.",
    "Sequence voice against the visual track, checking alignment, pacing and emotional beat.",
    "Review the audio-visual combination for coherence, realism and narrative alignment.",
    "Refine voice, pacing or sequencing where the combination feels off.",
    "Finalise only when the audio-visual production meets the intended quality standard.",
  ],
  techniques: [
    { label: "Voice-to-character fit", body: "Each voice should match the character identity established in the visual stage." },
    { label: "Pacing control", body: "Pacing should serve the narrative beat — not the default speed of the generator." },
    { label: "Audio-visual alignment", body: "Voice and motion should feel connected, with natural timing and emotional register." },
    { label: "Final review", body: "The combined output is reviewed as a single production, not as separate audio and visual pieces." },
    { label: "Continuity across scenes", body: "Voice direction should remain consistent across scenes that share a character or setting." },
  ],
};

/* ---------- Prompt Refinement (was Prompt Engineering & Generative AI) ---------- */
export const promptEngineering = {
  headline: "Prompt Refinement: Improving Outputs from Observed Results",
  intro:
    "Prompt refinement is the process of improving prompts based on what a generative tool actually produces. My approach focuses on observing outputs critically, tracing weaknesses back to the prompt, and revising instructions to address the specific issue rather than changing everything blindly.",
  understanding:
    "A prompt is not a one-shot instruction — it is a working document that evolves with the production. A weak prompt may leave too much room for interpretation, causing the model to drift in character identity, environment, tone or continuity. A refined prompt defines the objective, anchors the references, sets boundaries, and explains what a successful output should look like — and it improves with each generation cycle.",
  principles: [
    { label: "Define the objective", body: "The prompt should state the exact creative goal — story beat, character action, environment, tone and intended emotional effect." },
    { label: "Anchor references", body: "Useful references keep the output aligned to the intended character identity, clothing, environment and visual cues." },
    { label: "Set constraints clearly", body: "The prompt should explain what must be included and what should be avoided — drift, distortion, unwanted style, off-brief additions." },
    { label: "Specify output structure", body: "Where the output is structured — shot framing, character placement, scene composition — the prompt should define it explicitly." },
    { label: "Add success criteria", body: "The prompt should make it possible to judge whether the output succeeded against the brief." },
    { label: "Iterate from evidence", body: "Prompt refinement should respond to actual output behavior — observed drift, artifact, identity loss or continuity break — not guesswork." },
  ],
  debugWorkflow: [
    "Review the output to identify what failed: character recognisability, facial appearance, clothing, environment, motion, narrative alignment, artifact risk.",
    "Trace the failure back to the prompt: missing context, unclear instruction, weak references, poor output guidance.",
    "Rewrite the prompt to correct the specific weakness rather than changing everything blindly.",
    "Run another output and compare whether the revised prompt improved the result.",
    "Continue refinement until the prompt reliably produces the intended quality standard.",
  ],
  useCases: [
    "Multimodal prompting across text, image and video for long-form AI productions.",
    "Character identity and facial consistency prompts for repeated scenes.",
    "Environment, location and background continuity prompts across scenes.",
    "Story development and scriptwriting prompts for narrative direction.",
    "Voice production and sequencing prompts for audio-visual alignment.",
    "Prompt stress testing and model stumping to surface weaknesses under demanding instructions.",
  ],
};

export const generativeAI = {
  headline: "Practical Generative AI Workflows for Long-Form Content & AI Video Production",
  intro:
    "Generative AI is most useful when it is guided by clear creative goals, reviewed carefully, and integrated into a structured multimodal workflow. I use generative AI tools to develop story, characters, scenes, voice and final sequencing while maintaining critical human review at every stage.",
  experience:
    "My generative AI work includes AI-powered YouTube channels with more than 29,000 subscribers and more than 3.5 million combined views, more than 20 Nollywood-style AI films, long-form character-driven storytelling, image generation, video generation, voice production, sequencing and review. I work across text, image and video generation in one production process, selecting outputs from different generative stages according to the production requirement.",
  tools: ["Text-to-Image", "Image-to-Video", "Voice Production", "Sequencing", "Critical Review"],
  workflow: [
    "Define the creative objective — story, characters, setting, tone, visual cues.",
    "Identify the target audience and intended output format.",
    "Prepare the prompt, references, constraints and success criteria.",
    "Generate the first output using the appropriate generative stage.",
    "Review the result for coherence, realism, character identity, environment continuity and narrative alignment.",
    "Refine prompts, assets or direction based on observed weaknesses.",
    "Finalize only after the output meets the intended standard.",
  ],
  qualityReview:
    "The important part of my workflow is not simply generating content. It is the review process that comes after generation. I check whether the output is coherent, visually consistent, narratively useful and appropriate for the audience. When an output fails, I identify whether the weakness came from the prompt, the tool limitation, the reference material, or the editing process — and I correct it before moving forward.",
  stats: [
    { value: "29,000+", label: "Subscribers across AI YouTube channels" },
    { value: "3.5M+", label: "Combined views" },
    { value: "20+", label: "Nollywood-style AI films" },
  ],
};

export const aiVideo = {
  headline: "AI Video Production: Story, Sequencing and Review",
  intro:
    "AI video production combines story development, scripting, image generation, video generation, voice production, sequencing and review. My work in this area focuses on producing long-form, character-driven content where continuity, realism and narrative alignment matter.",
  creativeDirection:
    "AI video workflows require more than writing a prompt and accepting the first result. The process begins with a clear concept: the story, tone, setting, character direction, visual style and intended emotional effect. From there, prompts and assets are refined until the output supports the creative goal — and reviewed critically at every stage before being accepted into the final sequence.",
  qualityFactors: [
    "Narrative coherence and logical scene progression.",
    "Character recognisability and facial consistency across scenes.",
    "Clothing, styling and visual identity continuity.",
    "Environment, location, background and lighting consistency.",
    "Realism, motion quality and avoidance of obvious AI artifacts.",
    "Voice-to-character fit and audio-visual alignment.",
    "Audience clarity and emotional impact.",
    "Alignment between prompt, generated output and final editing direction.",
  ],
};

/* ---------- Character Consistency (was Web Development) ---------- */
export const webDevelopment = {
  headline: "Character Identity, Facial Consistency and Scene Continuity Across Generated Scenes",
  intro:
    "Maintaining character recognisability, facial appearance, clothing, environments, locations and backgrounds across multiple generated scenes is one of the hardest problems in long-form AI content. My approach combines structured prompting, useful references, repeated refinement and critical review at every stage.",
  philosophy:
    "Character identity is the foundation of long-form AI storytelling. If a character is not recognisable across scenes, the story breaks — no matter how strong the individual shots are. My approach treats character identity, facial consistency and scene continuity as production discipline, not luck. The goal is to make the audience see the same person in the same world across every scene, even when each scene was generated separately.",
  process: [
    { step: "Establish identity", body: "Define the character identity, facial characteristics, clothing, styling and visual cues before any scene generation begins." },
    { step: "Build references", body: "Collect useful references for the character, environment, location, background and lighting so each output can be checked against intent." },
    { step: "Generate per scene", body: "Produce each scene with a prompt anchored to the established identity and references." },
    { step: "Review for drift", body: "Check each output for character recognisability, facial appearance, clothing, environment and background continuity." },
    { step: "Correct inconsistencies", body: "Refine prompts or references and regenerate where drift, distortion or identity loss appears." },
    { step: "Sequence", body: "Order the accepted scenes into a coherent sequence that respects narrative direction and continuity." },
    { step: "Final review", body: "Review the full sequence as one production, checking continuity, pacing, tone and emotional effect end-to-end." },
  ],
  priorities: [
    { label: "Character recognisability", body: "The audience should see the same person across every scene." },
    { label: "Facial consistency", body: "Facial characteristics should not drift, morph or break identity between scenes." },
    { label: "Clothing continuity", body: "Wardrobe, accessories and styling should remain coherent with the story." },
    { label: "Environment continuity", body: "Locations, backgrounds, settings and objects should remain consistent across scenes." },
    { label: "Narrative alignment", body: "Each scene should serve the story, tone and intended emotional effect." },
    { label: "Critical review", body: "Every output is reviewed against the brief — not accepted on first impression." },
    { label: "Iterative refinement", body: "Prompts and references are revised based on observed drift, not guesswork." },
    { label: "End-to-end continuity", body: "The full sequence is reviewed as one production, not as isolated shots." },
  ],
  serviceAreas: [
    { title: "Character Identity & Facial Consistency", icon: "Users", body: "Maintaining recognisability through facial characteristics, clothing, visual references and repeated refinement across multiple generated scenes." },
    { title: "Scene & Environment Continuity", icon: "Layers", body: "Maintaining locations, backgrounds, settings, objects and visual continuity across scenes — so the world stays coherent end-to-end." },
    { title: "Wardrobe & Styling Coherence", icon: "Sparkles", body: "Keeping clothing, accessories and styling aligned with the character and story across scenes, generations and stages." },
    { title: "Visual Direction & Tone", icon: "Compass", body: "Holding the overall creative direction, lighting, mood and visual cues consistent across the long-form production." },
  ],
};

/* ---------- Quality Control (was Security Research) ---------- */
export const securityResearch = {
  headline: "Quality Control, Model Stumping and Content Review for Generative AI",
  intro:
    "Quality control for generative AI combines content research, critical review, model stumping and prompt stress testing. My approach focuses on identifying weaknesses, inconsistencies and failures in AI outputs — and correcting them before they reach a final production or audience.",
  philosophy:
    "Quality control is not a final checkbox. It is a discipline that runs through every stage of a generative AI production. I plan before generation, keep useful references, review outputs critically, identify where a model fails under demanding prompts, and correct inconsistencies before moving forward. My background in content writing, research and digital content quality review (Upwork, TELUS Digital, Remotasks) shapes how I approach this work.",
  methodology: [
    { step: "Define the standard", body: "Clarify what a successful output looks like — character identity, environment, narrative alignment, realism, audience suitability — before any review." },
    { step: "Review critically", body: "Inspect each output against the standard: character recognisability, facial appearance, clothing, environment, background, motion, narrative alignment, artifact risk." },
    { step: "Identify weaknesses", body: "Look for drift, distortion, identity loss, environment breaks, unsupported claims, weak reasoning, ambiguity, overconfidence or inconsistency." },
    { step: "Stress-test prompts", body: "Probe the model with difficult, ambiguous or demanding instructions to surface where it fails, hallucinates or produces inconsistent behaviour." },
    { step: "Trace the cause", body: "Identify whether the weakness came from the prompt, the reference, the tool limitation or the editing process." },
    { step: "Correct and refine", body: "Revise the prompt, references or direction to address the specific weakness rather than changing everything blindly." },
    { step: "Final review", body: "Review the corrected output against the standard and the longer sequence it belongs to." },
    { step: "Document learnings", body: "Capture what failed and what worked so future productions benefit from the refinement." },
  ],
  interestAreas: [
    "Character identity drift across scenes.",
    "Facial appearance and morphing artifacts.",
    "Environment, location and background inconsistency.",
    "Hallucinated or unsupported claims in text generation.",
    "Model behaviour under ambiguous, conflicting or demanding instructions.",
    "Continuity breaks across long-form sequences.",
    "Voice-to-character fit and audio-visual alignment.",
    "Audience suitability, accuracy and quality of final outputs.",
  ],
  reportingStyle:
    "My reporting style focuses on clarity and usefulness: what the weakness is, where it appears, why it matters, what evidence supports the finding, how it can be reproduced, and what correction or refinement is recommended. The goal is always to make the next output stronger, not just to flag the current one as weak.",
  publicNote:
    "I can discuss my general methodology, quality-control principles, model stumping approach, prompt stress testing, and review process. I do not expose confidential client content, private productions, internal review data or unpublished assets unless explicitly authorized.",
};

/* ---------- Experience ---------- */
export const experience = [
  {
    role: "Generative AI Content Creator & AI Video Producer",
    org: "Independent Content Production",
    type: "Remote",
    period: "Oct 2023 — Present",
    summary:
      "Built and managed AI-powered YouTube channels with more than 29,000 subscribers and more than 3.5 million combined views. Created more than 20 Nollywood-style AI films using story development, scripting, prompting, image generation, video generation, voice production, sequencing and review.",
    points: [
      "AI-powered YouTube channels with 29,000+ subscribers and 3.5M+ combined views.",
      "20+ Nollywood-style AI films using story development, scripting, prompting, image generation, video generation, voice production, sequencing and review.",
      "Character recognisability, facial characteristics, clothing, settings, visual cues maintained across long story-based productions.",
      "Scene consistency, creative refinement and ongoing exploration of prompting techniques.",
    ],
    methods: [],
  },
  {
    role: "Content Writer & Research Assistant",
    org: "Upwork",
    type: "Remote",
    period: "Dec 2020 — Present",
    summary:
      "Supported more than 20 clients with writing, research, editing and digital content development. Applied generative-AI-assisted drafting and editing alongside manual accuracy and quality review.",
    points: [
      "20+ clients supported with writing, research, editing and digital content development.",
      "Generative-AI-assisted drafting and editing integrated into content workflows.",
      "Manual accuracy and quality review applied to every delivered piece.",
    ],
    methods: [],
  },
  {
    role: "Digital Content Quality & Research Work",
    org: "TELUS Digital",
    type: "Remote",
    period: "Mar 2022 — Dec 2023",
    summary:
      "Worked on large-scale digital content assignments involving thousands of content items. Applied research, detailed instructions and consistent judgement, including detection of ambiguity, conflicting information and unsupported information.",
    points: [
      "Large-scale digital content assignments involving thousands of content items.",
      "Research, detailed instructions and consistent judgement applied across assignments.",
      "Detection of ambiguity, conflicting information and unsupported information.",
      "Quality control across a high volume of reviewed content.",
    ],
    methods: [],
  },
  {
    role: "Digital Content Review & Quality Operations",
    org: "Remotasks",
    type: "Remote",
    period: "Oct 2020 — Jan 2022",
    summary:
      "Reviewed more than 10,000 individual items across content review, classification and quality review tasks. Built foundational content-review skills including error detection and inconsistency detection.",
    points: [
      "10,000+ individual items reviewed across content review, classification and quality review tasks.",
      "Error detection and inconsistency detection at scale.",
      "Foundational content-review skills that strengthened later generative AI quality work.",
    ],
    methods: [],
  },
];

/* ---------- Projects (Generative AI Work) ---------- */
export const projects = [
  {
    title: "AI-Powered YouTube Content",
    category: "Generative AI · Audience",
    status: "Live",
    summary:
      "Created and managed AI-powered YouTube channels with more than 29,000 subscribers and more than 3.5 million combined views through structured prompting, repeated refinement and careful visual control.",
    focus: ["AI YouTube channels", "29,000+ subscribers", "3.5M+ combined views", "Long-form content"],
    value:
      "Demonstrates practical experience producing AI-generated content at scale — building an audience through consistent, character-driven, story-based productions rather than isolated outputs.",
    icon: "Clapperboard",
    accent: "violet",
  },
  {
    title: "20+ Nollywood-Style AI Films",
    category: "Generative AI · Film",
    status: "Completed",
    summary:
      "Created more than 20 AI-assisted Nollywood-style films using story development, scripting, prompting, image generation, video generation, voice production, sequencing and review.",
    focus: ["Story development", "Scripting", "Image generation", "Video generation", "Voice production", "Sequencing"],
    value:
      "Shows end-to-end AI film production capability — from story concept through final sequence — using a multimodal workflow across text, image and video.",
    icon: "Sparkles",
    accent: "magenta",
  },
  {
    title: "Long-Form Character Consistency",
    category: "Generative AI · Consistency",
    status: "Ongoing",
    summary:
      "Developed practical techniques for maintaining character recognisability, facial characteristics, clothing, locations, backgrounds and visual cues across multiple generated scenes.",
    focus: ["Character recognisability", "Facial characteristics", "Clothing continuity", "Locations", "Backgrounds", "Visual cues"],
    value:
      "Addresses one of the hardest problems in long-form AI content — keeping the same character recognisable across separately generated scenes — through references, refinement and review.",
    icon: "Users",
    accent: "blue",
  },
  {
    title: "Multimodal AI Video Production",
    category: "Generative AI · Multimodal",
    status: "Ongoing",
    summary:
      "Worked across text, image and video generation in one production process, selecting outputs from different generative stages according to the production requirement.",
    focus: ["Text generation", "Image generation", "Video generation", "Stage selection", "Production planning"],
    value:
      "Demonstrates multimodal control — choosing the right generative stage for each part of the production rather than relying on a single tool for every task.",
    icon: "Clapperboard",
    accent: "violet",
  },
  {
    title: "Content Research & Quality Review",
    category: "Research · Quality",
    status: "Completed",
    summary:
      "Built practical research and review experience through Upwork, TELUS Digital and Remotasks, with careful attention to requirements, evidence, ambiguity, accuracy and consistency.",
    focus: ["Research", "Accuracy review", "Ambiguity detection", "Consistency checks", "Quality control"],
    value:
      "Foundational experience that strengthens how I plan, evaluate and refine AI-generated work today — quality control is treated as production discipline, not afterthought.",
    icon: "ScanSearch",
    accent: "blue",
  },
];

/* ---------- Production Approach (was Afrik-Vine Tech LTD) ---------- */
export const afrikVine = {
  name: "Multimodal Production Approach",
  tagline: "Plan · Refine · Review · Sequence",
  logo: "/images/profile-main.jpeg",
  headline: "My Multimodal Production Approach for Long-Form AI Content",
  intro:
    "This section describes the production approach I use for long-form AI content — Nollywood-style films, story-driven video and multimodal productions. It is not a separate company or brand; it is the working method behind the work shown in this portfolio.",
  positioning:
    "My production approach is built around structured prompting, repeated refinement and careful visual control. I plan scenes and visual requirements before generation, keep useful references, review outputs critically, and correct inconsistencies before moving forward. This reduces unnecessary retries, maintains stronger continuity, and lets me use different generative tools according to the needs of each production stage.",
  mission:
    "To turn creative ideas into controlled, long-form AI content — where character identity, scene continuity, environment consistency and narrative alignment are treated as production discipline, not luck.",
  vision:
    "To keep refining multimodal prompting techniques that produce stronger, more consistent, character-driven AI content across text, image and video.",
  values: [
    { label: "Plan before generation", body: "I plan scenes, characters, settings, visual cues and creative direction before any generation begins." },
    { label: "Character identity first", body: "Recognisability through facial characteristics, clothing, visual references and repeated refinement is the foundation of long-form content." },
    { label: "Critical review", body: "Every output is reviewed against the brief — coherence, realism, continuity, narrative alignment — before being accepted." },
    { label: "Iterative refinement", body: "Prompts and references are revised based on observed output, not guesswork." },
    { label: "Multimodal control", body: "I work across text, image and video in one production process, selecting the right stage for each requirement." },
    { label: "Story-driven", body: "Every scene serves the narrative, tone and intended emotional effect of the long-form content." },
  ],
  serviceAreas: [
    "Story development and scriptwriting for long-form AI productions.",
    "Multimodal prompting across text, image and video.",
    "Character identity, facial consistency and clothing continuity.",
    "Scene, environment, location and background continuity.",
    "Voice production, sequencing and audio-visual alignment.",
    "Critical review, prompt refinement and quality control.",
  ],
  engagementProcess: [
    { step: "Discovery", body: "Understand the story, characters, setting, tone, audience and intended emotional effect." },
    { step: "Planning", body: "Define scenes, visual cues, character identity, references and success criteria before generation." },
    { step: "Generation", body: "Produce each scene with the appropriate generative stage — text-to-image, image-to-video, voice production." },
    { step: "Review", body: "Review each output critically against the brief, references and longer sequence." },
    { step: "Refinement", body: "Correct inconsistencies in character, environment or narrative alignment through prompt and reference revision." },
    { step: "Sequencing", body: "Order accepted scenes into a coherent sequence that respects continuity and narrative direction." },
    { step: "Final review", body: "Review the full production end-to-end — continuity, pacing, tone, audio-visual alignment and audience suitability." },
  ],
  roadmap:
    "My production approach continues to evolve as I explore new prompting techniques, generative tools and review methods. The direction is consistent: stronger character identity, tighter scene continuity, more reliable long-form storytelling, and a clearer creative direction across every production.",
  cta:
    "If you would like to discuss a generative AI content project, an AI video production, a multimodal workflow or a creative direction collaboration, you can reach me through the contact section below.",
};

/* ---------- Articles ---------- */
export const articles = {
  headline: "Articles, Research Notes & Reflections on Multimodal Prompt Engineering",
  intro:
    "This section will become the knowledge hub for multimodal prompt engineering, generative AI content, AI video production, character consistency, prompt refinement and content quality.",
  comingSoon:
    "I am building a collection of articles and research notes focused on multimodal prompt engineering, generative AI content, AI video production, character consistency, prompt refinement and content quality. New posts will be added gradually as this portfolio grows.",
  categories: [
    "Multimodal Prompt Engineering",
    "Generative AI Content & Story Development",
    "AI Video Production & Sequencing",
    "Character Identity & Facial Consistency",
    "Scene & Environment Continuity",
    "Prompt Refinement & Stress Testing",
    "Content Research & Quality Control",
    "Creative Direction for Long-Form AI",
  ],
  placeholders: [
    { title: "How I Maintain Character Consistency Across Generated Scenes", body: "Will explain the practical techniques I use to keep character recognisability, facial characteristics, clothing, locations, backgrounds and visual cues consistent across multiple separately generated scenes." },
    { title: "Planning a Multimodal AI Film Before Generation", body: "Will explain how I plan story, characters, settings, visual cues and creative direction before any generation begins — and why this stage reduces unnecessary retries later." },
    { title: "Prompt Refinement from Observed Results", body: "Will explain how I review generated outputs critically, trace weaknesses back to the prompt, and revise instructions to address the specific issue rather than changing everything blindly." },
  ],
};

/* ---------- Contact ---------- */
export const contact = {
  headline: "Let's Connect",
  intro:
    "If my work aligns with an opportunity, project, collaboration or professional discussion, you can reach me through the contact details below. I am open to conversations around multimodal prompt engineering, generative AI content, AI video production, creative direction, content research and quality control.",
  channels: [
    { label: "Email", value: "vincentchimaobi042@gmail.com", href: "mailto:vincentchimaobi042@gmail.com", icon: "Mail" },
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
    { type: "Multimodal prompt engineering or AI video production", body: "Please include the type of production, target audience, intended length, character or story requirements, references if available, timeline, and whether creative direction is needed." },
    { type: "Generative AI content collaboration", body: "Please include the scope, intended platform, audience, tone, content volume, timeline, and whether review and refinement are part of the engagement." },
    { type: "Content writing, research or quality review", body: "Please include the type of content, expected depth, research requirements, accuracy expectations, volume, and timeline." },
  ],
  inquiryTypes: [
    "Multimodal Prompt Engineering",
    "AI Video Production",
    "Generative AI Content",
    "Creative AI Workflow",
    "Content Writing & Research",
    "Digital Content Quality",
    "General Professional Contact",
  ],
};

export const footer = {
  blurb:
    "Multimodal Prompt Engineering, Generative AI Content, AI Video Production, Creative Direction and Content Quality.",
  ventureNote: "",
  location:
    "Based in Abuja, Nigeria. Available for remote multimodal prompt engineering, generative AI content, AI video production, creative direction and content quality opportunities.",
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
    period: "2016 — 2021",
  },
];

/* ---------- Languages (CV-aligned) ---------- */
export const languages = [
  { id: "lang-1", name: "English", level: "Conversational" },
  { id: "lang-2", name: "Igbo", level: "Native" },
];
