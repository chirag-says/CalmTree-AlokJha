/**
 * b2b-assessment-catalog.ts — derived from the live assessment registry.
 *
 * The org dashboard needs a list of assessments for the campaign picker.
 * Instead of hardcoding, we derive from the same ASSESSMENT_LIST the client
 * app uses — single source of truth, no drift.
 *
 * When this is extracted to a standalone org app, replace with a static
 * snapshot or an API call.
 */

import { ASSESSMENT_LIST } from "@/data/assessments";

export const B2B_CATALOG = ASSESSMENT_LIST.map((a) => ({
  slug: a.slug,
  title: a.meta.title,
  category: a.category,
}));
