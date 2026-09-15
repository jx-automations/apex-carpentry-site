// Single source of truth for every processed photo used on the site.
// Populated from a manually verified pass over the source Instagram photography
// (see scripts/process-images.mjs for the raw-to-processed mapping).

export type ImageCategory =
  | "new-builds"
  | "renovations"
  | "additions"
  | "decks"
  | "interiors";

export interface ApexImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: ImageCategory;
  feature?: boolean;
}

// Native pixel dimensions after processing (portrait phone photos, longest side
// capped at 2600px for the hero and 2200px elsewhere by the sharp pipeline).
export const IMAGES: ApexImage[] = [
  // New builds
  {
    id: "new-builds-twin-cabins-hero",
    src: "/images/new-builds/new-builds-twin-cabins-hero.jpg",
    alt: "Two black corrugated steel gabled cabins with full height glazing, an Apex Carpentry new build in Auckland.",
    width: 2600,
    height: 3466,
    category: "new-builds",
    feature: true,
  },
  {
    id: "new-builds-twin-cabins-02",
    src: "/images/new-builds/new-builds-twin-cabins-02.jpg",
    alt: "Front view of the finished black steel gabled cabins with large sliding glass doors.",
    width: 1440,
    height: 1721,
    category: "new-builds",
    feature: true,
  },
  {
    id: "new-builds-framing-trusses-01",
    src: "/images/new-builds/new-builds-framing-trusses-01.jpg",
    alt: "Timber framing and roof trusses under construction on a new Auckland home build.",
    width: 1440,
    height: 1712,
    category: "new-builds",
  },
  {
    id: "new-builds-framing-gable-02",
    src: "/images/new-builds/new-builds-framing-gable-02.jpg",
    alt: "Gable end timber framing on a new build subfloor, blue sky behind.",
    width: 1440,
    height: 1721,
    category: "new-builds",
  },
  {
    id: "new-builds-subfloor-frame-01",
    src: "/images/new-builds/new-builds-subfloor-frame-01.jpg",
    alt: "Timber subfloor frame on piles ready for decking, on a cleared new build site.",
    width: 1440,
    height: 1712,
    category: "new-builds",
  },
  {
    id: "new-builds-foundation-panel-01",
    src: "/images/new-builds/new-builds-foundation-panel-01.jpg",
    alt: "Insulated subfloor panel foundation raised on timber piles.",
    width: 1440,
    height: 1712,
    category: "new-builds",
  },
  {
    id: "new-builds-foundation-trench-01",
    src: "/images/new-builds/new-builds-foundation-trench-01.jpg",
    alt: "Freshly poured concrete foundation trench alongside an existing home.",
    width: 2200,
    height: 2933,
    category: "new-builds",
  },
  {
    id: "new-builds-foundation-slab-mesh-01",
    src: "/images/new-builds/new-builds-foundation-slab-mesh-01.jpg",
    alt: "Reinforced concrete slab foundation with steel mesh, ready to pour.",
    width: 1440,
    height: 1721,
    category: "new-builds",
  },
  {
    id: "new-builds-weathertight-wrap-01",
    src: "/images/new-builds/new-builds-weathertight-wrap-01.jpg",
    alt: "Twin gabled framing wrapped in weathertight building paper during construction.",
    width: 1440,
    height: 1713,
    category: "new-builds",
  },
  {
    id: "new-builds-sheathing-wall-01",
    src: "/images/new-builds/new-builds-sheathing-wall-01.jpg",
    alt: "Plywood wall sheathing on a gable end, scaffold alongside.",
    width: 1440,
    height: 1721,
    category: "new-builds",
  },
  {
    id: "new-builds-shed-exterior-01",
    src: "/images/new-builds/new-builds-shed-exterior-01.jpg",
    alt: "Standalone outbuilding under weathertight wrap, dark cladding to follow.",
    width: 2200,
    height: 2933,
    category: "new-builds",
  },
  {
    id: "new-builds-shed-exterior-02",
    src: "/images/new-builds/new-builds-shed-exterior-02.jpg",
    alt: "Finished standalone outbuilding with dark corrugated cladding and roller door.",
    width: 2200,
    height: 2933,
    category: "new-builds",
  },
  {
    id: "new-builds-shed-skillion-01",
    src: "/images/new-builds/new-builds-shed-skillion-01.jpg",
    alt: "Finished outbuilding with a skillion roof and dark cladding set among trees.",
    width: 2200,
    height: 2933,
    category: "new-builds",
    feature: true,
  },
  {
    id: "new-builds-gable-interior-01",
    src: "/images/new-builds/new-builds-gable-interior-01.jpg",
    alt: "Interior view of exposed gable framing with a large window looking out to the section.",
    width: 1440,
    height: 1721,
    category: "new-builds",
  },

  // Renovations
  {
    id: "renovations-villa-dormer-01",
    src: "/images/renovations/renovations-villa-dormer-01.jpg",
    alt: "Weatherboard villa with new dormer windows, garage addition under construction.",
    width: 2200,
    height: 2933,
    category: "renovations",
  },
  {
    id: "renovations-villa-dormer-02",
    src: "/images/renovations/renovations-villa-dormer-02.jpg",
    alt: "Full view of a renovated villa with matching dormer windows and new garage.",
    width: 2200,
    height: 2933,
    category: "renovations",
    feature: true,
  },
  {
    id: "renovations-villa-dormer-03",
    src: "/images/renovations/renovations-villa-dormer-03.jpg",
    alt: "Close exterior view of a villa renovation with dormer windows and driveway.",
    width: 2200,
    height: 2915,
    category: "renovations",
  },
  {
    id: "renovations-villa-dormer-04",
    src: "/images/renovations/renovations-villa-dormer-04.jpg",
    alt: "Completed villa dormer addition with new garage door and gable roof.",
    width: 2200,
    height: 2933,
    category: "renovations",
  },

  // Additions
  {
    id: "additions-garage-construction-01",
    src: "/images/additions/additions-garage-construction-01.jpg",
    alt: "Weatherboard home with a new garage addition under construction alongside it.",
    width: 2049,
    height: 2732,
    category: "additions",
  },
  {
    id: "additions-garage-fitout-01",
    src: "/images/additions/additions-garage-fitout-01.jpg",
    alt: "Garage addition mid fitout with block wainscot wall and window.",
    width: 2200,
    height: 2933,
    category: "additions",
  },
  {
    id: "additions-lean-to-roof-01",
    src: "/images/additions/additions-lean-to-roof-01.jpg",
    alt: "Elevated view of a lean-to roof addition under construction against an existing roofline.",
    width: 2200,
    height: 2933,
    category: "additions",
  },
  {
    id: "additions-interior-framing-01",
    src: "/images/additions/additions-interior-framing-01.jpg",
    alt: "Framed addition interior with insulation batts and two new window openings.",
    width: 2200,
    height: 2933,
    category: "additions",
  },
  {
    id: "additions-carport-lining-01",
    src: "/images/additions/additions-carport-lining-01.jpg",
    alt: "Covered carport addition at the wall lining stage, ready for finishing.",
    width: 2200,
    height: 2933,
    category: "additions",
  },
  {
    id: "additions-retaining-trench-01",
    src: "/images/additions/additions-retaining-trench-01.jpg",
    alt: "Retaining wall and foundation trench work alongside an existing home.",
    width: 2200,
    height: 2933,
    category: "additions",
  },

  // Decks
  {
    id: "decks-coastal-staircase-01",
    src: "/images/decks/decks-coastal-staircase-01.jpg",
    alt: "Timber deck staircase with balustrades leading down through native planting.",
    width: 2200,
    height: 2933,
    category: "decks",
    feature: true,
  },
  {
    id: "decks-balustrade-detail-01",
    src: "/images/decks/decks-balustrade-detail-01.jpg",
    alt: "Close detail of a newly built timber deck balustrade and handrail joinery.",
    width: 2200,
    height: 2929,
    category: "decks",
  },
  {
    id: "decks-staircase-02",
    src: "/images/decks/decks-staircase-02.jpg",
    alt: "Timber deck stairs descending toward garden greenery.",
    width: 2200,
    height: 2929,
    category: "decks",
  },

  // Interiors (shown within renovation and addition storytelling)
  {
    id: "interiors-bathroom-arched-mirror-01",
    src: "/images/interiors/interiors-bathroom-arched-mirror-01.jpg",
    alt: "Bathroom renovation with an arched brass framed mirror above a vessel sink.",
    width: 1440,
    height: 1080,
    category: "interiors",
    feature: true,
  },
  {
    id: "interiors-bathroom-arched-mirror-02",
    src: "/images/interiors/interiors-bathroom-arched-mirror-02.jpg",
    alt: "Bathroom with arched brass mirror, herringbone tile and a woven pendant light.",
    width: 1440,
    height: 1920,
    category: "interiors",
  },
  {
    id: "interiors-bathroom-double-vanity-01",
    src: "/images/interiors/interiors-bathroom-double-vanity-01.jpg",
    alt: "Double vanity bathroom with oval vessel sinks and brushed brass tapware.",
    width: 1440,
    height: 1920,
    category: "interiors",
  },
  {
    id: "interiors-bathroom-freestanding-tub-01",
    src: "/images/interiors/interiors-bathroom-freestanding-tub-01.jpg",
    alt: "Bathroom with a freestanding tub, timber shelf and heated towel rail.",
    width: 1440,
    height: 1920,
    category: "interiors",
  },
  {
    id: "interiors-stairwell-landing-01",
    src: "/images/interiors/interiors-stairwell-landing-01.jpg",
    alt: "Upstairs landing with a woven pendant light, oak handrail and large window.",
    width: 1440,
    height: 1920,
    category: "interiors",
  },
  {
    id: "interiors-stairwell-pendant-01",
    src: "/images/interiors/interiors-stairwell-pendant-01.jpg",
    alt: "Stairwell corner finished with an oak handrail and woven pendant light.",
    width: 1440,
    height: 1920,
    category: "interiors",
  },
];

export function getImagesByCategory(category: ImageCategory): ApexImage[] {
  return IMAGES.filter((img) => img.category === category);
}

export function getFeaturedImages(): ApexImage[] {
  return IMAGES.filter((img) => img.feature);
}

export function getImageById(id: string): ApexImage | undefined {
  return IMAGES.find((img) => img.id === id);
}
