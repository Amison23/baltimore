import type { ProductPageData } from "../types";

export const personalPropertyProduct: ProductPageData = {
  id: "personal-property",
  slug: "personal-property",
  category: "personal",
  title: "Personal Property Insurance",
  eyebrow: "Personal insurance",
  summary:
    "Explore cover for your home and personal belongings, with guidance based on your property and needs.",
  heroImage: {
    src: "/assets/homes.png",
    alt: "A home",
  },
  primaryAction: {
    id: "personal-property-contact",
    label: "Talk to an adviser",
    href: "/#contact",
    variant: "primary",
  },
  selectionList: [
    {
      id: "home-buildings",
      label: "Buildings",
      title: "Cover for your home",
      description:
        "Discuss cover for the home itself and the property details that affect your needs.",
      items: [
        "Full structural protection against fire, lightning, storms, and floods",
        "Permanent fixtures and fittings including fitted kitchens and bathrooms",
        "Outbuildings, boundary walls, gates, and driveways inclusion",
        "Alternative accommodation cover if your home becomes uninhabitable",
      ],
    },
    {
      id: "home-contents",
      label: "Contents",
      title: "Protect personal belongings",
      description:
        "Review the belongings you want to protect and the limits and exclusions that may apply.",
      items: [
        "Furniture, electronic appliances, clothing, and everyday household items",
        "High-value items including jewelry, artwork, and collectibles",
        "Accidental damage cover for televisions and audio equipment",
        "Worldwide extension for portable belongings taken outside the home",
      ],
    },
    {
      id: "personal-property-terms",
      label: "Policy terms",
      title: "Understand your policy",
      description:
        "Check the schedule, limits, excess, and exclusions before selecting cover.",
      items: [
        "Standard excess payable during a claim event",
        "Security requirements: door locks, alarm systems, and window grilles",
        "Unoccupied property terms and notification timelines",
        "Wear and tear exclusions and maintenance obligations",
      ],
    },
  ],
  sections: [
    {
      id: "personal-property-cover",
      type: "benefits",
      title: "Cover for your home and belongings",
      description:
        "A personal property policy can be discussed around the home you live in and the belongings you keep there.",
      ctaButtons: [
        {
          id: "personal-property-enquiry",
          label: "Ask about home cover",
          href: "/#contact",
          variant: "outline",
        },
      ],
      items: [
        {
          id: "home-structure",
          title: "Home structure",
          description:
            "Discuss the property itself, its construction, and the cover options available.",
        },
        {
          id: "personal-contents",
          title: "Personal contents",
          description:
            "Consider the household items and personal possessions you want to include.",
        },
        {
          id: "home-policy-guidance",
          title: "Personal guidance",
          description:
            "Get help reviewing the information and policy terms relevant to your home.",
        },
      ],
    },
  ],
  relatedProductIds: ["motor-insurance", "life-insurance"],
};

