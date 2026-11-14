/**
 * CVAT annotation structure: sanitized, read-only summary of the actual
 * CVAT for video 1.1 XML export behind the "CVAT Robotic Manipulation |
 * Packaging and Pick-and-Place Annotation" practice.
 *
 * Every figure below was recomputed from the exported annotations.xml
 * during development (labels, attributes, track elements, box records and
 * keyframe counts). The raw XML itself, bounding-box coordinates, task
 * URLs, owner details and full track arrays are deliberately NOT
 * published; only this limited structural summary is shown to visitors.
 *
 * PUNCTUATION: website-authored text in this file must not contain em
 * dashes (U+2014). scripts/check-punctuation.py enforces this at build
 * time; use commas, colons, semicolons or parentheses instead.
 */

export type CvatAttributeSummary = {
  name: string;
  /** Number of configured values for the attribute. */
  valueCount: number;
  /** Example values, at most three, purely illustrative. */
  exampleValues: string[];
  /** Whether the attribute value is fixed per track (immutable) or changes over time. */
  mutable: boolean;
};

export type CvatLabelSummary = {
  name: string;
  /** CVAT shape type: rectangle boxes or point-in-time tags. */
  type: "rectangle" | "tag";
  attributes: CvatAttributeSummary[];
  /** Number of exported track elements carrying this label. */
  exportedTracks: number;
  /** True when the label is configured in the schema but has no exported track. */
  configuredWithoutTrack: boolean;
  /** One-line role description of the label in the ontology. */
  role: string;
};

export const cvatStructure = {
  /** Reader/modal heading. */
  title: "Annotation Structure",
  subtitle: "CVAT for video 1.1 XML export · sanitized read-only summary",
  /** Sequence facts verified from the export meta block. */
  overview: [
    { label: "Export format", value: "CVAT for video 1.1 XML" },
    { label: "Sequence", value: "576 frames · 24 seconds at 24 FPS" },
    { label: "Mode", value: "Interpolation" },
    { label: "Configured labels", value: "7" },
    { label: "Exported tracks", value: "9" },
    { label: "Box records", value: "3,034 (284 keyframe boxes plus interpolated states)" },
  ],
  labels: [
    {
      name: "robot_arm",
      type: "rectangle",
      role: "Moving articulated mechanism; one persistent track for the whole arm.",
      exportedTracks: 0,
      configuredWithoutTrack: true,
      attributes: [
        {
          name: "motion_phase",
          valueCount: 11,
          exampleValues: ["home", "approach", "grasp", "transfer", "recovery"],
          mutable: true,
        },
      ],
    },
    {
      name: "gripper",
      type: "rectangle",
      role: "Tool at the robot wrist, tracked separately so tool state is not lost.",
      exportedTracks: 1,
      configuredWithoutTrack: false,
      attributes: [
        {
          name: "grip_state",
          valueCount: 6,
          exampleValues: ["open", "closing", "holding", "releasing"],
          mutable: true,
        },
      ],
    },
    {
      name: "workpiece",
      type: "rectangle",
      role: "Individually identified handled package with a stable part_id.",
      exportedTracks: 4,
      configuredWithoutTrack: false,
      attributes: [
        {
          name: "part_id",
          valueCount: 3,
          exampleValues: ["A01", "B02", "C03"],
          mutable: false,
        },
        {
          name: "location_state",
          valueCount: 5,
          exampleValues: ["on_conveyor", "held", "inside_carton_visible"],
          mutable: true,
        },
        {
          name: "grasp_attempt",
          valueCount: 6,
          exampleValues: ["not_attempted", "first_attempt", "completed"],
          mutable: true,
        },
        {
          name: "placement_evidence",
          valueCount: 4,
          exampleValues: ["not_applicable", "visible", "occluded_unverified"],
          mutable: true,
        },
      ],
    },
    {
      name: "background_package",
      type: "rectangle",
      role: "Inventory not assigned a handled part_id.",
      exportedTracks: 2,
      configuredWithoutTrack: false,
      attributes: [
        {
          name: "inventory_role",
          valueCount: 3,
          exampleValues: ["unhandled", "queued", "uncertain"],
          mutable: true,
        },
      ],
    },
    {
      name: "conveyor",
      type: "rectangle",
      role: "Stationary transport equipment; one rectangle track, no attributes.",
      exportedTracks: 1,
      configuredWithoutTrack: false,
      attributes: [],
    },
    {
      name: "shipping_carton",
      type: "rectangle",
      role: "Receiving container; one rectangle track, no attributes.",
      exportedTracks: 1,
      configuredWithoutTrack: false,
      attributes: [],
    },
    {
      name: "manipulation_event",
      type: "tag",
      role: "Optional point-in-time event tag with event type and certainty.",
      exportedTracks: 0,
      configuredWithoutTrack: true,
      attributes: [
        {
          name: "event_type",
          valueCount: 12,
          exampleValues: ["approach", "successful_grasp", "failed_pickup", "release"],
          mutable: false,
        },
        {
          name: "certainty",
          valueCount: 3,
          exampleValues: ["high", "medium", "low"],
          mutable: false,
        },
      ],
    },
  ] as CvatLabelSummary[],
  /** Exported track distribution by label. */
  trackDistribution: [
    { label: "gripper", tracks: 1 },
    { label: "workpiece", tracks: 4 },
    { label: "background_package", tracks: 2 },
    { label: "shipping_carton", tracks: 1 },
    { label: "conveyor", tracks: 1 },
  ],
  /** Honest open QA items, stated rather than hidden. */
  qaNotes: [
    "Box records include interpolated states between keyframes; 3,034 is not the number of individually drawn boxes. 284 keyframe boxes were placed manually.",
    "Two workpiece tracks share the part_id C03 across overlapping frame ranges; identity continuity review is still open.",
    "robot_arm and manipulation_event are configured in the label schema but have no exported track in this export.",
    "This export is a self-directed practice dataset on synthetic footage, not a validated or client-reviewed training deliverable.",
  ],
  /** Shown at the bottom of the structure view. */
  sanitizationNote:
    "Sanitized summary derived from the actual export. Raw bounding-box coordinates, track arrays, task URLs, owner details and the full XML are not published.",
};
