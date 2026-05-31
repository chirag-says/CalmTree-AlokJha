/**
 * SEO — JSON-LD structured data generators.
 *
 * These produce schema.org markup that Google uses for rich search results.
 * Each function returns a <script type="application/ld+json"> string
 * that can be injected into the page head.
 */

import { SITE } from "@/data/constants";

/** Organization schema — appears on homepage */
export function organizationSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logoPath}`,
    description: SITE.description,
    email: SITE.email,
    foundingLocation: {
      "@type": "Place",
      name: SITE.location,
    },
    sameAs: [
      // TODO: add real YouTube and Instagram URLs
    ],
  });
}

/** Person schema for founder — appears on about page */
export function founderSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.founder,
    jobTitle: "Psychology Educator & Founder",
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
    },
    description: `${SITE.founder} is the founder of ${SITE.name}. MBA and Master's in Psychology.`,
    url: `${SITE.url}/about`,
  });
}

/** Course schema — for each course on academy page */
export function courseSchema(course: {
  name: string;
  description: string;
  duration: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    timeRequired: course.duration,
    isAccessibleForFree: false,
    inLanguage: "en",
  });
}

/** WebSite schema with SearchAction — helps Google understand the site */
export function websiteSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
  });
}
