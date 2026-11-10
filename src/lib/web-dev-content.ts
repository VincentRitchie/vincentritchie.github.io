/**
 * Extended computer-vision annotation content for the CV Annotation section.
 *
 * NOTE: This export is named `webDevExtended` for historical reasons — the
 * section component (web-development.tsx) imports it under that name. The
 * content covers computer vision image annotation and instance segmentation
 * with CVAT as the central tool — bounding boxes, polygons, segmentation
 * masks, brush-based masking, JSON label schemas, occlusion handling and
 * multi-instance annotation.
 */
export const webDevExtended = {
  headline:
    "Computer Vision Image Annotation & Instance Segmentation",
  intro:
    "Using CVAT as my central annotation tool, I practise multi-instance image annotation with bounding boxes, polygons, segmentation masks, brush-based masking, polygon-to-mask selection and additive/subtractive region editing — on datasets covering crowded urban intersections, roadside markets, pedestrians, vehicles and complex object interactions. Every task is configured with custom JSON label schemas and ends with a quality check for omitted objects, incorrect classes, merged objects, duplicates and boundary inaccuracies.",
  philosophy:
    "Annotation quality is a production discipline, not a drawing exercise. Every label schema, every polygon vertex and every mask boundary feeds a computer vision model, so the difference between a tight boundary and a sloppy one is the difference between usable training data and noise. My approach treats CVAT task configuration, label schema design and instance-level precision as the foundation: plan the schema before annotating, annotate each instance deliberately, and verify boundaries and occlusions before submitting.",
  methodology:
    "My methodology is built on disciplined tool use: configure the task correctly, then annotate instance by instance. I begin with the CVAT task setup and the custom JSON label schema, so every class and attribute is defined before the first object is drawn. From there, I read each frame first — identifying every object instance, its class and its interactions — then annotate with the geometry that fits: bounding boxes for extent, polygons for shape, segmentation masks for precise boundaries. Brush-based masking and additive/subtractive region editing refine the regions that polygons alone cannot capture.",
  engineeringWorkflow:
    "I treat annotation as a pipeline, not a single pass. Each task moves through configuration, planning, multi-instance annotation, region refinement, occlusion handling and a final quality check. Every stage feeds the next — a weak schema propagates into every label, and a sloppy boundary propagates into the model — so each stage has its own verification step before the next begins.",
  analyticalApproach:
    "When an annotation is wrong, I do not guess at the cause. I break the problem into parts: is it a schema problem (wrong class defined), an instance problem (merged or duplicated objects), a geometry problem (boundary inaccuracy), or an occlusion problem (partial visibility handled incorrectly)? I compare the annotation against the image, identify which dimension failed, and fix that specific issue rather than redrawing everything blindly.",
  designPhilosophy:
    "Good annotation is invisible to the model. When it works, the model learns from clean, consistent instances and never has to compensate for boundary noise, duplicate boxes or missing objects. My philosophy prioritises precision and consistency over raw speed: the goal is training data a computer vision team can trust, not the fastest possible submission.",
  uxThinking:
    "The real test of annotation quality is what the downstream model — and the dataset reviewer — sees. I plan each frame from the consumer's perspective: which objects must be captured, how should partial visibility be marked, and where could a merged instance or drifted boundary mislead training? Every annotation is then checked against the schema and the scene, not just drawn and left.",
  architectureMindset:
    "I structure label schemas so they scale. A schema defined for one task should reuse cleanly across similar datasets — consistent class names, consistent attribute definitions, consistent occlusion and truncation conventions — so a multi-task annotation campaign does not require re-labelling when the dataset grows.",
  lifecycle: [
    { phase: "Task configuration", body: "Set up the CVAT annotation task and custom JSON label schemas that match the dataset's classes and requirements." },
    { phase: "Frame planning", body: "Read the frame first — identify every object instance, its class and the interactions before drawing anything." },
    { phase: "Multi-instance annotation", body: "Mark each object with the right geometry — bounding boxes for extent, polygons for shape, masks for precise boundaries." },
    { phase: "Region refinement", body: "Apply brush-based masking, polygon-to-mask selection and additive/subtractive region editing to correct boundaries." },
    { phase: "Occlusion handling", body: "Decide deliberately how partially visible objects are marked — truncated, occluded or crowd — according to the schema." },
    { phase: "Consistency check", body: "Verify that annotation style stays consistent across the whole task, frame after frame." },
    { phase: "Quality check", body: "Review for omitted objects, incorrect classes, merged objects, duplicate annotations and boundary inaccuracies." },
  ],
  qualityAssurance:
    "Quality is built into every stage, not added at the end. I check each annotation against the schema while annotating, verify boundaries and occlusions before moving to the next frame, and close every task with a completeness pass for omitted objects and duplicate instances.",
  performanceStrategy:
    "Multi-instance annotation works best when the frame is planned before drawing. By reading the scene first — counting instances, noting interactions and occlusions — I avoid the most common rework: merged objects, duplicates and missed instances discovered only at review time.",
  securityMindset:
    "My annotation practice is built around responsible data handling: I follow the dataset's usage terms, do not expose annotation content outside the authorized environment, and treat every dataset — especially footage involving people — with the confidentiality the task requires.",
  maintainability:
    "An annotation task becomes more valuable when its schema and conventions are documented and reusable. I structure label schemas, attribute definitions and occlusion conventions so they can be reapplied to similar datasets without re-invention.",
  scalability:
    "I annotate for scale. A consistent schema and a consistent style mean a dataset can grow from hundreds to thousands of frames without a quality drop — and without requiring the early frames to be redone.",
  clientConsultation:
    "I begin every annotation engagement with the requirements: What objects and classes matter? How should occlusion and truncation be handled? What level of geometry — boxes, polygons or masks — does the model actually need? Based on those answers, I recommend the most practical schema and annotation approach for the scope and timeline.",
  requirementAnalysis:
    "Good annotation requirements lead to good annotations. I help teams articulate the class taxonomy, the attribute set and the boundary conventions, and distinguish must-have precision from nice-to-have detail so the task stays focused on what the model needs.",
  communication:
    "I explain annotation decisions clearly to non-technical collaborators. I avoid jargon. I document how classes were defined, how occlusions were handled, what was flagged as ambiguous, and how to keep the labelling consistent as the dataset grows.",
  longTermSupport:
    "A label schema is not a one-time deliverable — it is a living convention. I plan for long-term consistency: documented class definitions, attribute conventions and review notes so the dataset stays coherent as new tasks and annotators are added.",
  priorities: [
    { label: "Schema fidelity", body: "Custom JSON label schemas are configured to match the dataset exactly — no improvised classes." },
    { label: "Instance precision", body: "Every object gets its own annotation — no merged instances, no duplicates." },
    { label: "Boundary accuracy", body: "Boxes, polygons and masks sit on the true object boundary, not an approximation." },
    { label: "Occlusion handling", body: "Partial visibility is handled according to the schema, not ignored." },
    { label: "Complex interactions", body: "Overlapping objects and interactions in crowded scenes are separated deliberately." },
    { label: "Tool fluency", body: "Bounding boxes, polygons, masks and brush tools are applied where each fits best." },
    { label: "Final verification", body: "Each task ends with a check for omitted objects and incorrect classes." },
    { label: "Consistency across frames", body: "Annotation style stays consistent across the whole task, frame after frame." },
  ],
  solutions: [
    { title: "Bounding Box Annotation", icon: "Tags", body: "Multi-instance bounding boxes for extent and position, checked for alignment and boundary accuracy." },
    { title: "Polygon & Instance Segmentation", icon: "Layers", body: "Polygon annotation and segmentation masks for precise object boundaries, including polygon-to-mask selection." },
    { title: "Brush-Based Masking", icon: "Sparkles", body: "Brush-based masking with additive and subtractive region editing for irregular shapes and fine boundaries." },
    { title: "Label Schema Configuration", icon: "Code2", body: "Custom JSON label schemas configured in CVAT to match dataset classes, attributes and requirements." },
    { title: "Occlusion & Truncation Handling", icon: "Eye", body: "Partially visible objects marked deliberately — truncated, occluded or crowd — according to the schema." },
    { title: "Crowded-Scene Annotation", icon: "Users", body: "Multi-instance annotation of crowded urban intersections, roadside markets, pedestrians and vehicles." },
    { title: "Quality Checking", icon: "ScanSearch", body: "Task-level review for omitted objects, incorrect classes, merged objects, duplicates and boundary inaccuracies." },
    { title: "Video Track Verification", icon: "ShieldCheck", body: "Persistent object tracks checked for identity, bounding-box alignment and position drift between keyframes." },
  ],
  solutionPhilosophy:
    "I do not force every dataset into the same annotation approach. I evaluate the classes, density, occlusion profile and downstream model requirements, then recommend the most practical schema and geometry — boxes, polygons or masks — for that specific task.",
  serviceAreas: [
    { title: "Bounding Box Annotation", icon: "Tags", body: "Multi-instance bounding boxes for extent and position, checked for alignment and boundary accuracy." },
    { title: "Polygon & Instance Segmentation", icon: "Layers", body: "Polygon annotation and segmentation masks for precise object boundaries, including polygon-to-mask selection." },
    { title: "Brush-Based Masking", icon: "Sparkles", body: "Brush-based masking with additive and subtractive region editing for irregular shapes and fine boundaries." },
    { title: "Label Schema Configuration", icon: "Code2", body: "Custom JSON label schemas configured in CVAT to match dataset classes, attributes and requirements." },
  ],
  toolkit: [
    {
      category: "Core Annotation Tools",
      items: ["CVAT", "Bounding boxes", "Polygons", "Segmentation masks", "Brush-based masking"],
    },
    {
      category: "Region Editing",
      items: ["Polygon-to-mask selection", "Additive region editing", "Subtractive region editing", "Vertex-level refinement"],
    },
    {
      category: "Schema & Configuration",
      items: ["Custom JSON label schemas", "Class & attribute definition", "Occlusion conventions", "Truncation conventions"],
    },
    {
      category: "Quality Review",
      items: ["Omitted-object checks", "Class verification", "Duplicate & merge detection", "Boundary accuracy review"],
    },
    {
      category: "Video Tracking",
      items: ["Persistent object tracks", "Manual keyframes", "Interpolation review", "Position-drift checks"],
    },
  ],
  costNote:
    "Annotation depth scales with the model's need. A detection task can stay lightweight — clean boxes on a clear schema. Segmentation and crowded-scene tasks justify the fuller treatment: masks, brush-based refinement, occlusion conventions and task-level quality checks. The right level of precision is the one the downstream model actually requires.",
  advancedFeatures: [
    "Custom JSON label schemas", "Multi-instance annotation", "Instance segmentation masks",
    "Brush-based masking", "Polygon-to-mask selection", "Additive region editing",
    "Subtractive region editing", "Occlusion & truncation handling", "Crowd region conventions",
    "Crowded urban intersection datasets", "Roadside market scenes", "Pedestrian & vehicle annotation",
    "Complex object interactions", "Persistent object tracks", "Manual keyframe adjustment",
    "Interpolation review", "Track identity checks", "Position-drift detection",
    "Boundary accuracy review", "Duplicate annotation detection", "Merged-object detection",
    "Omitted-object detection", "Task-level quality checks", "Schema documentation",
  ],
  advancedFeaturesNote:
    "Depending on the dataset's density, occlusion profile and downstream model, these annotation techniques can be applied gradually. Simple detection tasks can stay at box level, while dense segmentation and tracking tasks grow into masks, brush-based refinement and keyframe-level review.",
};
