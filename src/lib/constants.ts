export const SITE = {
  name: "Apex Carpentry Ltd",
  shortName: "Apex Carpentry",
  location: "Auckland, New Zealand",
  tagline: "Design-led builds across Auckland",
  since: "2016",
  credential: "LBP",
  credentialFull: "Licensed Building Practitioner",
};

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export interface Service {
  number: string;
  name: string;
  summary: string;
  detail: string;
  imageId: string;
}

export const SERVICES: Service[] = [
  {
    number: "01",
    name: "New Builds",
    summary: "Full new home construction, from foundations to final handover.",
    detail:
      "Apex Carpentry Ltd manages new residential builds across Auckland, including framing, roofing and structural carpentry, coordinated as a design-led process from the ground up.",
    imageId: "new-builds-twin-cabins-hero",
  },
  {
    number: "02",
    name: "Renovations",
    summary: "Updating existing homes without losing their character.",
    detail:
      "Villa and character home renovations, including changes to roof lines, window openings and interior layouts, carried out with attention to how the existing structure and the new work sit together.",
    imageId: "renovations-villa-dormer-02",
  },
  {
    number: "03",
    name: "Additions",
    summary: "Extending a home's footprint with matching build quality.",
    detail:
      "Additions such as garages, carports and extra living space, built to integrate with the existing property in scale, material and finish.",
    imageId: "additions-garage-fitout-01",
  },
  {
    number: "04",
    name: "Decks",
    summary: "Outdoor timber structures built for Auckland conditions.",
    detail:
      "Deck and staircase construction, including balustrades and outdoor circulation, designed to connect indoor and outdoor living spaces.",
    imageId: "decks-coastal-staircase-01",
  },
  {
    number: "05",
    name: "Landscaping",
    summary: "Landscaping support alongside building projects.",
    detail:
      "General landscaping input as part of wider building and renovation projects, helping tie the finished site together around the completed build.",
    imageId: "new-builds-shed-skillion-01",
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Enquiry & Discussion",
    summary: "Share your project details and talk through scope and direction.",
    detail:
      "Tell Apex Carpentry Ltd about the project, whether it is a new build, renovation, addition, deck or landscaping work, and get a first sense of scope and rough direction.",
  },
  {
    number: "02",
    title: "Site Assessment",
    summary: "A look at the property and existing conditions.",
    detail:
      "Understanding the site, the existing structure where relevant, and what the build practically involves before anything is confirmed.",
  },
  {
    number: "03",
    title: "Planning & Scheduling",
    summary: "Confirming scope and sequencing before work begins.",
    detail:
      "Working through the details required to move the project forward, including sequencing of trades and materials, ahead of the first day on site.",
  },
  {
    number: "04",
    title: "Build & Handover",
    summary: "Construction carried out to completion, then handover.",
    detail:
      "Construction is carried out under Licensed Building Practitioner status, finishing with a handover of the completed work.",
  },
];

export const WHY_APEX = [
  {
    title: "Licensed Building Practitioner",
    detail:
      "Work is carried out under LBP status, a recognised New Zealand trade credential.",
  },
  {
    title: "Building Since 2016",
    detail: "Apex Carpentry Ltd has been building in Auckland since 2016.",
  },
  {
    title: "Design-Led Approach",
    detail:
      "Each project is treated on its own terms, shaped around the site and the brief rather than a standard template.",
  },
  {
    title: "A Real Project Portfolio",
    detail:
      "From framing to final finishes, the work is documented across real Auckland projects, not stock photography.",
  },
];
