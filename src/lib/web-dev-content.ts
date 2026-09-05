/**
 * Extended character-consistency content for the Character Consistency section.
 *
 * NOTE: This export is named `webDevExtended` for historical reasons — the
 * section component (web-development.tsx) imports it under that name. The
 * content has been fully repositioned to cover character identity, facial
 * consistency, scene continuity and environment continuity across generated
 * scenes — the hardest problems in long-form AI content production.
 */
export const webDevExtended = {
  headline:
    "Character Identity, Facial Consistency and Scene Continuity Across Generated Scenes",
  intro:
    "Maintaining character recognisability, facial appearance, clothing, environments, locations and backgrounds across multiple generated scenes is one of the hardest problems in long-form AI content. My approach combines structured prompting, useful references, repeated refinement and critical review at every stage — treating character identity as production discipline, not luck.",
  philosophy:
    "Character identity is the foundation of long-form AI storytelling. If a character is not recognisable across scenes, the story breaks — no matter how strong the individual shots are. My approach treats character identity, facial consistency and scene continuity as a discipline: plan the identity before generation, anchor every scene to references, review every output for drift, and correct inconsistencies before they propagate. The goal is to make the audience see the same person in the same world across every scene, even when each scene was generated separately.",
  methodology:
    "My methodology is built on disciplined visual control: establish the identity first, then structure every scene around it. I begin with the character — facial characteristics, clothing, styling, visual cues — and only then move into environment, location, background and lighting. From there, I generate per scene with a prompt anchored to the established references, review each output critically, and refine until the scene holds together.",
  engineeringWorkflow:
    "I treat character consistency as a pipeline, not a single generation. Each scene is one stage in a longer production: identity establishment, reference building, scene generation, drift review, correction and refinement, sequencing, and end-to-end final review. Every stage feeds the next — a weakness at any stage propagates forward, so each stage has its own review checkpoint before the next begins.",
  analyticalApproach:
    "When a character drifts between scenes, I do not guess at the cause. I break the problem into parts: facial characteristics, clothing, styling, lighting, environment, background, motion or artifact. I compare the output against the reference, identify which dimension drifted, trace the cause back to the prompt or reference, and fix that specific issue rather than changing everything blindly.",
  designPhilosophy:
    "Good character consistency is invisible. When it works, the audience does not notice the technical effort — they notice that the same person shows up in every scene, in the same world, with the same identity. My philosophy prioritises recognisability over flashiness: the goal is identity stability, not impressive individual shots that break continuity.",
  uxThinking:
    "Audience perception is the real test of character consistency. I plan the audience journey before generating any scene: who is this character, what do they look like, what should the audience recognise about them, and where could drift break that recognition? Every scene is then checked against the audience's mental model of the character, not just against the prompt.",
  architectureMindset:
    "I structure character identity so it can scale. A character established today should still be recognisable in scene 1, scene 20, scene 100 and across future sequels or series. The reference architecture should not lock the production into a single generation run — it should support continuity across a long-form content library.",
  lifecycle: [
    { phase: "Identity establishment", body: "Define the character — facial characteristics, clothing, styling, visual cues — before any scene generation begins." },
    { phase: "Reference building", body: "Collect useful references for the character, environment, location, background and lighting so each output can be checked against intent." },
    { phase: "Scene generation", body: "Produce each scene with a prompt anchored to the established identity and references." },
    { phase: "Drift review", body: "Check each output for character recognisability, facial appearance, clothing, environment and background continuity." },
    { phase: "Correction", body: "Refine prompts or references and regenerate where drift, distortion or identity loss appears." },
    { phase: "Sequencing", body: "Order accepted scenes into a coherent sequence that respects narrative direction and continuity." },
    { phase: "End-to-end review", body: "Review the full sequence as one production, checking continuity, pacing, tone and emotional effect end-to-end." },
    { phase: "Finalisation", body: "Accept the production only after it meets the intended quality standard and the character reads as one identity across every scene." },
  ],
  qualityAssurance:
    "Quality is built into every stage, not added at the end. I review each scene against the brief before accepting it, check the full sequence end-to-end before finalising, and trace any drift back to its cause so the next scene is stronger.",
  performanceStrategy:
    "Batch scene generation works best when identity is anchored first. By establishing the character and references up front, I reduce unnecessary retries later, keep prompt iterations focused, and avoid regenerating whole scenes for avoidable drift.",
  securityMindset:
    "My character consistency practice is built around responsible use: I do not generate misleading representations of real people, do not replicate identifiable private individuals without authorisation, and keep character use aligned with the intended story, audience and platform.",
  maintainability:
    "A character identity becomes more valuable when it can be reused across scenes, sequels and future productions. I structure references, prompts and review notes so the identity remains stable and recoverable over time, not just for a single generation run.",
  scalability:
    "I build character identity for scale. The reference architecture should support the same character across many scenes, long-form productions, sequels and series — without requiring a complete redesign each time.",
  clientConsultation:
    "I begin every character-driven project with a consultation: What does the character look like? Who is the audience? What is the story? What is the intended emotional effect? Based on those answers, I recommend the most practical character consistency approach for the scope and timeline.",
  requirementAnalysis:
    "Good character requirements lead to consistent characters. I help clients articulate the character's identity, visual cues and narrative role. I distinguish must-have identity features from nice-to-have visual details so the production stays focused on recognisability.",
  communication:
    "I explain character consistency decisions clearly to non-technical collaborators. I avoid jargon. I document what the character looks like, how each scene was generated, what was corrected, and how to keep the identity stable in future productions.",
  longTermSupport:
    "A character identity is not a one-time deliverable — it is a living reference. I plan for long-term support: updated references, prompt refinements, review notes and continuity documentation so the character stays recognisable across future productions.",
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
  solutions: [
    { title: "Character Identity & Facial Consistency", icon: "Users", body: "Maintaining recognisability through facial characteristics, clothing, visual references and repeated refinement across multiple generated scenes." },
    { title: "Scene & Environment Continuity", icon: "Layers", body: "Maintaining locations, backgrounds, settings, objects and visual continuity across scenes — so the world stays coherent end-to-end." },
    { title: "Wardrobe & Styling Coherence", icon: "Sparkles", body: "Keeping clothing, accessories and styling aligned with the character and story across scenes, generations and stages." },
    { title: "Visual Direction & Tone", icon: "Compass", body: "Holding the overall creative direction, lighting, mood and visual cues consistent across the long-form production." },
    { title: "Long-Form Sequencing", icon: "Workflow", body: "Ordering accepted scenes into a coherent sequence that respects narrative direction, pacing and continuity." },
    { title: "Drift Detection & Correction", icon: "ScanSearch", body: "Reviewing each output for character drift, distortion, identity loss or environment break — and correcting before moving forward." },
    { title: "Reference Architecture", icon: "FileText", body: "Building reusable reference sets so character identity stays stable across scenes, sequels and future productions." },
    { title: "End-to-End Final Review", icon: "ShieldCheck", body: "Reviewing the full sequence as one production — continuity, pacing, tone, audio-visual alignment and audience suitability." },
  ],
  solutionPhilosophy:
    "I do not force every production into the same character consistency approach. I evaluate the story, scope, timeline and future growth path, then recommend the most practical reference and review architecture for that specific production.",
  serviceAreas: [
    { title: "Character Identity & Facial Consistency", icon: "Users", body: "Maintaining recognisability through facial characteristics, clothing, visual references and repeated refinement across multiple generated scenes." },
    { title: "Scene & Environment Continuity", icon: "Layers", body: "Maintaining locations, backgrounds, settings, objects and visual continuity across scenes — so the world stays coherent end-to-end." },
    { title: "Wardrobe & Styling Coherence", icon: "Sparkles", body: "Keeping clothing, accessories and styling aligned with the character and story across scenes, generations and stages." },
    { title: "Visual Direction & Tone", icon: "Compass", body: "Holding the overall creative direction, lighting, mood and visual cues consistent across the long-form production." },
  ],
  toolkit: [
    {
      category: "Identity Establishment",
      items: ["Character briefs", "Facial reference sheets", "Clothing & styling boards", "Visual cue definitions", "Identity anchors"],
    },
    {
      category: "Reference & Generation",
      items: ["Text-to-image prompting", "Image-to-video prompting", "Voice direction", "Scene composition", "Reference anchoring"],
    },
    {
      category: "Review & Drift Detection",
      items: ["Facial consistency checks", "Clothing continuity checks", "Environment continuity checks", "Artifact detection", "End-to-end sequence review"],
    },
    {
      category: "Refinement & Correction",
      items: ["Prompt refinement", "Reference revision", "Targeted regeneration", "Continuity correction", "Iterative improvement"],
    },
    {
      category: "Long-Form Production",
      items: ["Sequencing", "Pacing review", "Audio-visual alignment", "Final review", "Continuity documentation"],
    },
  ],
  costNote:
    "Character consistency scales with planning. A small production can stay lightweight — a few references and a clear identity brief. Larger productions benefit from a fuller reference architecture: detailed character sheets, environment references, review checkpoints and continuity documentation. Advanced techniques should be added only when the production scope, timeline and future growth justify them.",
  advancedFeatures: [
    "Character identity sheets", "Facial reference boards", "Clothing & styling continuity guides",
    "Environment reference libraries", "Location continuity checks", "Background consistency review",
    "Multi-scene reference anchoring", "Drift detection workflow", "Targeted regeneration pipeline",
    "End-to-end sequence review", "Continuity documentation", "Character recap & onboarding notes",
    "Cross-production identity reuse", "Sequel & series continuity planning", "Audience recognisability testing",
    "Visual direction & tone guides", "Lighting continuity checks", "Wardrobe change management",
    "Voice-to-character fit review", "Audio-visual alignment review", "Final production review",
    "Continuity audit", "Reference version control", "Long-form pacing review",
  ],
  advancedFeaturesNote:
    "Depending on the production's scope, timeline and long-term goal, these character consistency techniques can be applied gradually. Simple productions can stay lightweight, while larger long-form projects can grow into full reference architectures, drift detection workflows and end-to-end continuity documentation.",
};
