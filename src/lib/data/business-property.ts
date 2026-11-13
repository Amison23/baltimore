import type { ProductPageData } from "../types";

export const businessPropertyProduct: ProductPageData = {
  id: "business-property",
  slug: "business-property",
  category: "business",
  title: "Business Property Insurance",
  eyebrow: "Business insurance",
  summary:
    "Explore cover for business premises, equipment, and other property used in your operations.",
  heroImage: {
    src: "/assets/homes.png",
    alt: "A property",
  },
  primaryAction: {
    id: "business-property-contact",
    label: "Discuss business cover",
    href: "/#contact",
    variant: "primary",
  },
  selectionList: [
    {
      id: "business-premises",
      label: "Premises",
      title: "Cover for business premises",
      description:
        "Share details about the premises, how they are used, and the property cover you need.",
      items: [
        "Commercial buildings, warehouses, offices, and retail spaces protection",
        "Loss or damage caused by fire, explosion, perils, and natural hazards",
        "Tenant improvements, partitions, and specialized shop fittings",
        "Rent loss coverage when operations are temporarily suspended",
      ],
    },
    {
      id: "business-equipment",
      label: "Equipment",
      title: "Protect business equipment",
      description:
        "Review the equipment and business contents that may need protection under a policy.",
      items: [
        "Machinery, plant, computers, and mission-critical electronics",
        "Raw materials, work-in-progress, and finished goods inventory",
        "Debris removal and site clearance expense allowances",
        "Reinstatement value clauses ensuring adequate replacement funds",
      ],
    },
    {
      id: "business-property-terms",
      label: "Policy terms",
      title: "Review business policy terms",
      description:
        "Check the insured property, limits, excess, exclusions, and conditions for your operations.",
      items: [
        "Co-insurance and average clause conditions based on declared values",
        "Fire safety, sprinkler warranties, and night-guard requirements",
        "Claims procedure and documentary proof guidelines",
        "Deductible schedule across standard and high-risk perils",
      ],
    },
  ],
  sections: [
    {
      id: "business-property-cover",
      type: "benefits",
      title: "Cover for the property your business uses",
      description:
        "A business property policy can be discussed around your premises, equipment, and operational requirements.",
      ctaButtons: [
        {
          id: "business-property-enquiry",
          label: "Ask about business cover",
          href: "/#contact",
          variant: "outline",
        },
      ],
      items: [
        {
          id: "business-buildings",
          title: "Business premises",
          description:
            "Discuss the buildings or premises used by your business and the cover options available.",
        },
        {
          id: "business-contents",
          title: "Equipment and contents",
          description:
            "Consider machinery, stock, furniture, and other business property you rely on.",
        },
        {
          id: "business-policy-guidance",
          title: "Operational guidance",
          description:
            "Review how your business uses its property and the terms relevant to that use.",
        },
      ],
    },
  ],
  relatedProductIds: ["business-liability"],
};

