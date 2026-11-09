export const TAGS = [
  { id: "personal", label: "Personal" },
  { id: "business", label: "Business" },
  { id: "about-us", label: "About us" },
  { id: "customer-support", label: "Customer Support" },
] as const;

export type TagId = (typeof TAGS)[number]["id"];
export const DEFAULT_TAG: TagId = "personal";

export type NavAction = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type NodeBase = {
  label: string;
  disabled?: boolean;
  feature?: { src: string; alt: string; href?: string };
};

export type MenuNode = NodeBase &
  ({ href: string; children?: MenuNode[] } | { href?: undefined; children: MenuNode[] });

export type TagConfig = {
  menu: MenuNode[];
  actions: [NavAction, ...NavAction[]];
};

const placeholderFeature = {
  src: "/placeholder-feature.svg",
  alt: "Neutral placeholder illustration",
  href: "/business/overview",
};

export const nav: Record<TagId, TagConfig> = {
  personal: {
    menu: [
      {
        label: "Banking",
        children: [
          { label: "Everyday banking", href: "/personal/banking/everyday" },
          { label: "Savings", href: "/personal/banking/savings" },
        ],
      },
      {
        label: "Borrowing",
        children: [
          { label: "Personal loans", href: "/personal/loans" },
          { label: "Home loans", href: "/personal/home-loans" },
        ],
      },
      {
        label: "Planning",
        children: [
          { label: "Investing", href: "/personal/investing" },
          { label: "Retirement", href: "/personal/retirement" },
        ],
      },
    ],
    actions: [
      { label: "Get started", href: "/personal/get-started", variant: "primary" },
      { label: "Contact us", href: "/contact", variant: "outline" },
    ],
  },
  business: {
    menu: [
      {
        label: "Business banking",
        feature: placeholderFeature,
        children: [
          {
            label: "Accounts",
            href: "/business/accounts",
            children: [
              { label: "Business current account", href: "/business/accounts/current" },
              { label: "Business savings", href: "/business/accounts/savings" },
            ],
          },
          {
            label: "Loans",
            children: [
              {
                label: "Equipment financing",
                href: "/business/loans/equipment",
                children: [{ label: "Asset finance", href: "/business/loans/equipment/asset-finance" }],
              },
              { label: "Working capital", href: "/business/loans/working-capital" },
            ],
          },
        ],
      },
      {
        label: "Business growth",
        children: [
          { label: "Advisory", href: "/business/advisory" },
          { label: "Payments", href: "/business/payments" },
        ],
      },
      {
        label: "Industries",
        children: [
          { label: "Agriculture", href: "/business/industries/agriculture" },
          { label: "Trade", href: "/business/industries/trade" },
        ],
      },
    ],
    actions: [
      { label: "Open an account", href: "/business/open-account", variant: "primary" },
      { label: "Talk to us", href: "/contact", variant: "outline" },
    ],
  },
  "about-us": {
    menu: [
      {
        label: "About Baltimore",
        children: [
          { label: "Our story", href: "/about-us/story" },
          { label: "Leadership", href: "/about-us/leadership" },
        ],
      },
      {
        label: "Our impact",
        children: [
          { label: "Community", href: "/about-us/community" },
          { label: "Sustainability", href: "/about-us/sustainability" },
        ],
      },
      {
        label: "Careers",
        href: "/careers",
        children: [{ label: "Open roles", href: "/careers/open-roles" }],
      },
    ],
    actions: [
      { label: "Meet our team", href: "/about-us/leadership", variant: "primary" },
      { label: "Contact us", href: "/contact", variant: "outline" },
    ],
  },
  "customer-support": {
    menu: [
      {
        label: "Help centre",
        children: [
          { label: "Frequently asked questions", href: "/customer-support/faq" },
          { label: "Contact support", href: "/customer-support/contact" },
        ],
      },
      {
        label: "Self service",
        children: [
          { label: "Report an issue", href: "/customer-support/report-issue" },
          { label: "Track a request", href: "/customer-support/track-request" },
        ],
      },
      {
        label: "Resources",
        children: [
          { label: "Guides", href: "/customer-support/guides" },
          { label: "Service updates", href: "/customer-support/updates", disabled: true },
        ],
      },
    ],
    actions: [
      { label: "Get help", href: "/customer-support/contact", variant: "primary" },
      { label: "Call us", href: "/contact", variant: "outline" },
    ],
  },
};

export function isTagId(value: string): value is TagId {
  return TAGS.some((tag) => tag.id === value);
}

export function getTag(tag: TagId): TagConfig {
  return nav[tag];
}

function validateNodes(nodes: MenuNode[], path: string[], level: number): void {
  const labels = new Set<string>();

  for (const node of nodes) {
    const nodePath = [...path, node.label];
    if (labels.has(node.label)) {
      console.warn(`[nav] Duplicate sibling label at ${nodePath.join(" > ")}`);
    }
    labels.add(node.label);

    if (level === 3 && node.children?.length && !node.href) {
      console.warn(`[nav] Level-3 node with children must have an href at ${nodePath.join(" > ")}`);
    }

    if (node.children) validateNodes(node.children, nodePath, level + 1);
  }
}

if (process.env.NODE_ENV !== "production") {
  for (const tag of TAGS) validateNodes(nav[tag.id].menu, [tag.id], 1);
}
