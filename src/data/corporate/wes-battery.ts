/**
 * WES Battery — the six-assessment Workplace Effectiveness Score battery.
 *
 * These corporate assessments live in their OWN registry, deliberately separate
 * from the B2C `ASSESSMENT_LIST`, so they never leak into the consumer catalog or
 * the existing `b2b-assessment-catalog`. The scoring engine (`scoreAssessment`)
 * is generic and scores any `AssessmentConfig` — registry membership is only
 * about discovery/listing, not scoring.
 *
 * WES model:
 *   • Each assessment maps to exactly ONE org dimension.
 *   • Each assessment's headline `percentage` (0–100, higher = better) is that
 *     dimension's score for a participant.
 *   • Participant WES  = mean of their six assessment percentages.
 *   • Org WES per wave = mean of the six dimension averages (equal weights v1).
 *
 * The three programmes share this one battery in Phase 1; `focusDimensions` is
 * what a programme spotlights (framing only — every dimension is still measured).
 */

import type { AssessmentConfig } from "@/data/assessments/types";
import { workplaceClarity } from "./workplace-clarity";
// NOTE: the remaining five are authored to the workplace-clarity pattern.
// import { workplaceProductivity } from "./workplace-productivity";
// import { workplaceManagement } from "./workplace-management";
// import { workplaceCollaboration } from "./workplace-collaboration";
// import { workplaceAccountability } from "./workplace-accountability";
// import { workplaceSustainability } from "./workplace-sustainability";

// ─── The six WES dimensions (fixed framework) ───────────────────────

export type WesDimensionId =
  | "clarity"
  | "productivity"
  | "management"
  | "collaboration"
  | "accountability"
  | "sustainability";

export interface WesDimension {
  id: WesDimensionId;
  /** The assessment slug that measures this dimension. */
  slug: string;
  label: string;
  /** What the org-level dimension score means. */
  measures: string;
  /** Relative weight in the composite WES. Equal in v1; tunable without code. */
  weight: number;
}

export const WES_DIMENSIONS: WesDimension[] = [
  {
    id: "clarity",
    slug: "workplace-clarity",
    label: "Clarity",
    measures: "Understanding of priorities and responsibilities",
    weight: 1,
  },
  {
    id: "productivity",
    slug: "workplace-productivity",
    label: "Productivity",
    measures: "Focus, resources and ability to execute",
    weight: 1,
  },
  {
    id: "management",
    slug: "workplace-management",
    label: "Management",
    measures: "Direction, support and feedback from managers",
    weight: 1,
  },
  {
    id: "collaboration",
    slug: "workplace-collaboration",
    label: "Collaboration",
    measures: "Communication and teamwork",
    weight: 1,
  },
  {
    id: "accountability",
    slug: "workplace-accountability",
    label: "Accountability",
    measures: "Ownership and follow-through",
    weight: 1,
  },
  {
    id: "sustainability",
    slug: "workplace-sustainability",
    label: "Sustainability",
    measures: "Workload, energy and adaptability",
    weight: 1,
  },
];

/** Slug → dimension lookup (used when composing a participant's WES). */
export const SLUG_TO_DIMENSION: Record<string, WesDimension> = Object.fromEntries(
  WES_DIMENSIONS.map((d) => [d.slug, d]),
);

// ─── Authored assessment configs, keyed by slug ─────────────────────
// Only workplace-clarity ships in this commit; the rest fill in as they are
// authored. `getBatteryAssessment` returns undefined until then, and
// `isBatteryComplete` gates launching a program on all six being present.

export const WES_BATTERY: Record<string, AssessmentConfig> = {
  [workplaceClarity.slug]: workplaceClarity,
  // [workplaceProductivity.slug]: workplaceProductivity,
  // [workplaceManagement.slug]: workplaceManagement,
  // [workplaceCollaboration.slug]: workplaceCollaboration,
  // [workplaceAccountability.slug]: workplaceAccountability,
  // [workplaceSustainability.slug]: workplaceSustainability,
};

/** All slugs the battery expects, in canonical order. */
export const WES_BATTERY_SLUGS: string[] = WES_DIMENSIONS.map((d) => d.slug);

/** True if a slug belongs to the WES battery framework. */
export function isBatterySlug(slug: string): boolean {
  return slug in SLUG_TO_DIMENSION;
}

/** The authored config for a battery slug, or undefined if not yet authored. */
export function getBatteryAssessment(slug: string): AssessmentConfig | undefined {
  return WES_BATTERY[slug];
}

/** True once all six assessments are authored — a program cannot launch until then. */
export function isBatteryComplete(): boolean {
  return WES_BATTERY_SLUGS.every((slug) => slug in WES_BATTERY);
}

// ─── Programmes (Phase 1: shared battery, differ by focus + framing) ─

export type ProgrammeType = "productivity" | "manager" | "teams";

export interface Programme {
  type: ProgrammeType;
  name: string;
  blurb: string;
  /** Dimensions this programme spotlights. Every dimension is still measured. */
  focusDimensions: WesDimensionId[];
}

export const PROGRAMMES: Record<ProgrammeType, Programme> = {
  productivity: {
    type: "productivity",
    name: "Productivity Accelerator",
    blurb: "Focus, prioritisation, time management and distraction control.",
    focusDimensions: ["clarity", "productivity", "sustainability"],
  },
  manager: {
    type: "manager",
    name: "Manager Effectiveness",
    blurb: "Communication, delegation, feedback, clarity and team trust.",
    focusDimensions: ["management", "clarity", "collaboration"],
  },
  teams: {
    type: "teams",
    name: "Better Teams",
    blurb: "Collaboration, conflict management, accountability and execution.",
    focusDimensions: ["collaboration", "accountability", "management"],
  },
};

// ─── WES composition helpers (pure) ─────────────────────────────────

/** Composite WES from per-dimension percentages (weighted mean, rounded). */
export function composeWes(dimensionPercentages: Partial<Record<WesDimensionId, number>>): number | null {
  let weighted = 0;
  let weightSum = 0;
  for (const dim of WES_DIMENSIONS) {
    const pct = dimensionPercentages[dim.id];
    if (pct == null) continue;
    weighted += pct * dim.weight;
    weightSum += dim.weight;
  }
  if (weightSum === 0) return null;
  return Math.round(weighted / weightSum);
}

export type WesBand = "needs-attention" | "developing" | "healthy" | "thriving";

/** Composite band for the employer headline (tunable cutoffs). */
export function wesBand(wes: number): WesBand {
  if (wes < 40) return "needs-attention";
  if (wes < 60) return "developing";
  if (wes < 75) return "healthy";
  return "thriving";
}

export const WES_BAND_LABEL: Record<WesBand, string> = {
  "needs-attention": "Needs Attention",
  developing: "Developing",
  healthy: "Healthy",
  thriving: "Thriving",
};
