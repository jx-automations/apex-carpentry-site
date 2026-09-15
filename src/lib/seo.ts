import { SITE } from "./constants";

// Placeholder production URL: this concept is deployed to Vercel, not yet
// on a purchased Apex Carpentry domain. Update this once a real domain
// exists so canonical/OG/JSON-LD all point to the live production address.
export const SITE_URL = "https://apexcarpentrysite.vercel.app";

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE.name,
    image: `${SITE_URL}/images/brand/logo.jpg`,
    areaServed: "Auckland, New Zealand",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Auckland",
      addressRegion: "Auckland",
      addressCountry: "NZ",
    },
    foundingDate: SITE.since,
    url: SITE_URL,
    description:
      "Apex Carpentry Ltd is an Auckland based residential building company offering new builds, renovations, additions, decks and landscaping.",
  };
}
