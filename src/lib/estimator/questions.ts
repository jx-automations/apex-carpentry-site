import { EstimatorQuestion } from "./types";

export const ESTIMATOR_QUESTIONS: EstimatorQuestion[] = [
  {
    id: "projectType",
    question: "What are you planning?",
    type: "select",
    options: [
      { label: "New build", value: "New build" },
      { label: "Renovation", value: "Renovation" },
      { label: "Addition", value: "Addition" },
      { label: "Deck", value: "Deck" },
      { label: "Landscaping", value: "Landscaping" },
      { label: "Not sure yet", value: "Not sure" },
    ],
  },
  {
    id: "propertyType",
    question: "What type of property is it?",
    type: "select",
    options: [
      { label: "Residential", value: "Residential" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    id: "location",
    question: "Where is the project?",
    type: "text",
  },
  {
    id: "stage",
    question: "What stage are you at?",
    type: "select",
    options: [
      { label: "Just planning", value: "Planning" },
      { label: "Ready to discuss", value: "Ready to discuss" },
      { label: "Already have plans", value: "Already have plans" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  {
    id: "timeline",
    question: "When are you looking to start?",
    type: "select",
    options: [
      { label: "As soon as possible", value: "As soon as possible" },
      { label: "1 to 3 months", value: "1 to 3 months" },
      { label: "3 to 6 months", value: "3 to 6 months" },
      { label: "Just researching", value: "Just researching" },
    ],
  },
];
