import { SITE } from "./constants";

export const SITE_URL = "https://apexcarpentry.co.nz";

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
