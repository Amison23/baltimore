import type { ProductPageData } from "../types";

export const motorProduct: ProductPageData = {
  id: "motor-insurance",
  slug: "motor-insurance",
  category: "personal",
  title: "Motor Insurance",
  eyebrow: "Personal insurance",
  summary:
    "Cover for your vehicle, with guidance to help you choose protection that fits how you drive.",
  heroImage: {
    src: "/images/insurance-1.jpg",
    alt: "A vehicle on the road",
  },
  primaryAction: {
    id: "motor-contact",
    label: "Talk to an adviser",
    href: "/#contact",
    variant: "primary",
  },
  selectionList: [
    {
      id: "cover-options",
      label: "Cover options",
      title: "Understand the available options",
      description:
        "Ask which levels of cover are available and what each policy includes or excludes.",
      items: [
        "Comprehensive motor cover protecting against accidents, fire, and theft",
        "Third-party, fire, and theft options for balanced protection",
        "Third-party only protection for essential road liabilities",
        "Windscreen, stereo, and passenger liability extensions",
      ],
    },
    {
      id: "vehicle-details",
      label: "Vehicle details",
      title: "Have your vehicle details ready",
      description:
        "Vehicle make, model, year, and intended use can help an adviser guide your enquiry.",
      items: [
        "Vehicle registration number, make, model, and year of manufacture",
        "Estimated current market value and logbook verification",
        "Primary driver information and past claims history",
        "Vehicle use type: private commuter, commercial, or rideshare",
      ],
    },
    {
      id: "policy-terms",
      label: "Policy terms",
      title: "Review the policy terms",
      description:
        "Before choosing cover, review the schedule, limits, exclusions, and any excess that applies.",
      items: [
        "Excess charges applicable in the event of an approved claim",
        "Authorised repairer network and 24/7 towing assistance allowance",
        "Courtesy car eligibility during accident repair periods",
        "Geographical coverage limits and COMESA cross-border extensions",
      ],
    },
  ],
  sections: [
    {
      id: "motor-cover-options",
      type: "benefits",
      title: "Cover shaped around your needs",
      description:
        "Our team can help you understand the available options and choose cover suited to your vehicle and circumstances.",
      ctaButtons: [
        {
          id: "ask-about-cover",
          label: "Ask about cover",
          href: "/#contact",
          variant: "outline",
        },
      ],
      items: [
        {
          id: "third-party-cover",
          title: "Third-party options",
          description:
            "Explore cover for liabilities to other people and their property, subject to the policy terms.",
        },
        {
          id: "vehicle-protection",
          title: "Vehicle protection",
          description:
            "Discuss protection for your own vehicle and the events included in the selected policy.",
        },
        {
          id: "personal-guidance",
          title: "Personal guidance",
          description:
            "Get help understanding your options, exclusions, and the information needed for a quote.",
        },
      ],
    },
    {
      id: "how-to-get-covered",
      type: "process",
      title: "How to get started",
      steps: [
        {
          id: "share-requirements",
          title: "Tell us what you need",
          description:
            "Share basic details about your vehicle, how it is used, and the cover you are considering.",
        },
        {
          id: "review-options",
          title: "Review your options",
          description:
            "An adviser can walk you through suitable options, key terms, and the details needed to proceed.",
        },
        {
          id: "confirm-policy",
          title: "Confirm the policy",
          description:
            "Review the final policy documents and confirm the selected cover before it begins.",
        },
      ],
    },
  ],
  relatedProductIds: ["personal-property", "life-insurance"],
};
