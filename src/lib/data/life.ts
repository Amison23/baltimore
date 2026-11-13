import type { ProductPageData } from "../types";

export const lifeProduct: ProductPageData = {
  id: "life-insurance",
  slug: "life-insurance",
  category: "personal",
  title: "Life Insurance",
  eyebrow: "Personal insurance",
  summary:
    "Provide enduring financial protection and peace of mind for your loved ones against life's uncertainties.",
  heroImage: {
    src: "/assets/homes.png",
    alt: "A family together",
  },
  primaryAction: {
    id: "life-contact",
    label: "Speak with an adviser",
    href: "/#contact",
    variant: "primary",
  },
  selectionList: [
    {
      id: "term-vs-whole",
      label: "Plan types",
      title: "Explore flexible life plans",
      description:
        "Choose between term assurance, whole-of-life coverage, and endowment with profits.",
      items: [
        "Term assurance offering high financial cover during critical family years",
        "Whole life policies that combine lifelong protection with cash value growth",
        "Education assurance funds designed to secure your child's schooling",
        "Critical illness and permanent disability benefit add-ons",
      ],
    },
    {
      id: "life-benefits",
      label: "Key benefits",
      title: "Protect your family's future",
      description:
        "Ensure your dependents can maintain their lifestyle and cover future liabilities.",
      items: [
        "Lump sum death benefit paid tax-free to designated beneficiaries",
        "Mortgage and loan protection clearing debts automatically",
        "Accidental death double-indemnity booster clauses",
        "Optional premium waiver upon severe illness diagnosis",
      ],
    },
    {
      id: "life-requirements",
      label: "Requirements",
      title: "Simple underwriting process",
      description:
        "Understand health declarations, medical underwriting, and age guidelines.",
      items: [
        "Straightforward digital health questionnaire for most sum assured tiers",
        "Medical check-up arrangements at convenient accredited clinics",
        "Flexible premium payment frequencies: monthly, quarterly, or annually",
        "Designation of primary and contingent beneficiaries",
      ],
    },
  ],
  sections: [
    {
      id: "life-benefits-section",
      type: "benefits",
      title: "Security and stability for your family",
      description:
        "A customized life policy guarantees financial security regardless of what tomorrow holds.",
      ctaButtons: [
        {
          id: "life-enquiry",
          label: "Request a life quote",
          href: "/#contact",
          variant: "outline",
        },
      ],
      items: [
        {
          id: "income-replacement",
          title: "Income replacement",
          description:
            "Safeguard your family's day-to-day living standards and ongoing expenses.",
        },
        {
          id: "estate-planning",
          title: "Estate planning",
          description:
            "Pass wealth onto the next generation smoothly with designated payouts.",
        },
        {
          id: "debt-clearance",
          title: "Debt clearance",
          description:
            "Prevent mortgages, loans, and personal debts from passing onto loved ones.",
        },
      ],
    },
  ],
  relatedProductIds: ["motor-insurance", "personal-property"],
};

