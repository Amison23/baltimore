import type { ProductPageData } from "../types";

export const businessLiabilityProduct: ProductPageData = {
  id: "business-liability",
  slug: "business-liability",
  category: "business",
  title: "Public Liability Insurance",
  eyebrow: "Business insurance",
  summary:
    "Defend your enterprise against third-party injury, property damage, and legal liabilities arising from operations.",
  heroImage: {
    src: "/assets/homes.png",
    alt: "Corporate offices and business enterprise",
  },
  primaryAction: {
    id: "liability-contact",
    label: "Consult an expert",
    href: "/#contact",
    variant: "primary",
  },
  selectionList: [
    {
      id: "public-liability",
      label: "Public liability",
      title: "Third-party risk protection",
      description:
        "Protect against compensation claims and legal fees if a member of the public is harmed.",
      items: [
        "Injury to clients, suppliers, or visitors on your commercial premises",
        "Accidental damage to third-party property caused by business operations",
        "Legal defense expenses and representation costs covered in full",
        "Customizable indemnity limits tailored to contractual requirements",
      ],
    },
    {
      id: "product-liability",
      label: "Product liability",
      title: "Manufacturer and retailer safeguard",
      description:
        "Cover liabilities caused by products manufactured, sold, or distributed by your firm.",
      items: [
        "Claims arising from defective products, design flaws, or contamination",
        "Safety warnings and failure-to-warn defense coverage",
        "Product recall expense add-on coverage",
        "Protection extending to import/export supply chain partnerships",
      ],
    },
    {
      id: "liability-compliance",
      label: "Compliance",
      title: "Meet statutory and tender requirements",
      description:
        "Ensure commercial tenders, leases, and regulatory guidelines are satisfied.",
      items: [
        "Immediate certificate generation for vendor onboarding and public tenders",
        "Endorsements for landlord and principal co-indemnity clauses",
        "Workplace safety compliance audit support",
        "Cross-liability provisions for multi-entity corporate structures",
      ],
    },
  ],
  sections: [
    {
      id: "liability-cover-benefits",
      type: "benefits",
      title: "Comprehensive liability shield",
      description:
        "Protect your balance sheet, corporate brand, and leadership reputation with tailored liability lines.",
      ctaButtons: [
        {
          id: "liability-quote",
          label: "Request liability consultation",
          href: "/#contact",
          variant: "outline",
        },
      ],
      items: [
        {
          id: "legal-costs",
          title: "Legal defense",
          description:
            "Cover high-stake litigation and attorney fees without denting working capital.",
        },
        {
          id: "tender-readiness",
          title: "Tender qualification",
          description:
            "Win public and corporate tenders demanding high-value liability coverage.",
        },
        {
          id: "reputation-protection",
          title: "Reputation safeguard",
          description:
            "Handle customer settlements professionally with dedicated claim handlers.",
        },
      ],
    },
  ],
  relatedProductIds: ["business-property"],
};

