import { getProductPageById } from "@/lib/data";

export const TAGS = [
  { id: "services", label: "Services" },
  { id: "about-us", label: "About us" },
] as const;

export type TagId = (typeof TAGS)[number]["id"];
export const DEFAULT_TAG: TagId = "services";

export type NavAction = {
  label?: string;
  href: string;
  variant?: "primary" | "outline";
};

type NodeBase = {
  label: string;
  disabled?: boolean;
  feature?: { src: string; alt: string; href?: string };
};

export type MenuNode = NodeBase &
  (
    | { href: string; productId?: never; children?: MenuNode[] }
    | { productId: string; href?: never; children?: never }
    | { href?: undefined; productId?: undefined; children: MenuNode[] }
  );

export function getMenuNodeHref(node: MenuNode): string | undefined {
  if (node.productId) {
    const product = getProductPageById(node.productId);
    return product ? `/services/${product.slug}` : undefined;
  }

  return node.href;
}

export type TagConfig = {
  categories: MenuNode[];
  actions?: [NavAction, ...NavAction[]];
};

const placeholderFeature = {
  src: "/placeholder-feature.svg",
  alt: "Neutral placeholder illustration",
  href: "/business/overview",
};

export const nav: Record<TagId, TagConfig> = {
  services: {
    categories: [
      {
        label: "Personal",
        children: [
          {
            label: "Property",
            children: [
              { label: "Motor Insurance", productId: "motor-insurance" },
              { label: "Home Insurance", href: "#" },
              { label: "Golf Insurance", href: "#" },
              { label: "Pet Insurance", href: "#" },
              { label: "Mortgage protection Assurance", href: "#" },
            ]
          },
          {
            label: "Life",
            children: [
              {label: "Education Insurance", href:"#"},
              {label: "Life Insurance", href:"#"},
              {label: "Endowment Insurance with profits", href:"#"},
              {label: "Value added term assurance", href:"#"},
              {label: "Pet Insurance", href:"#"},
            ]
          },
          {
            label: "Family",
            children: [
              {label: "Secure Life and Assets", href:"#"},
              {label: "Grow your money", href:"#"},
              {label: "Retire with ease", href:"#"},
              {label: "Preserve your legacy", href:"#"},
            ]
          },
          {
            label: "Unit trusts",
            children: [
              {label: "Money Market fund(MMF)", href:"#"},
              {label: "Equity fund", href:"#"},
              {label: "Balance fund", href:"#"},
              {label: "Fixed Income fund", href:"#"},
            ]
          },
        ]
      },
      {
        label: "Business",
        children: [
          {
            label: "Property",
            children: [
              { label: "Commercial property", href: "/business/property" },
              { label: "Fire and perils", href: "/business/property" },
              { label: "Burglary", href: "/business/property" },
              { label: "Business all risks", href: "/business/property" },
              { label: "Business interruption", href: "/business/property" },
              { label: "Money", href: "#", disabled: true },
              { label: "Goods in transit", href: "#", disabled: true },
            ],
          },
          {
            label: "Liability",
            children: [
              { label: "Public liability", href: "#", disabled: true },
              { label: "Employers liability", href: "#", disabled: true },
              { label: "Professional indemnity", href: "#", disabled: true },
              { label: "Directors and officers", href: "#", disabled: true },
            ],
          },
          {
            label: "Motor and fleet",
            children: [
              { label: "Commercial motor", href: "#", disabled: true },
              { label: "Motor fleet", href: "#", disabled: true },
            ],
          },
          {
            label: "Marine and transit",
            children: [
              { label: "Marine cargo", href: "#", disabled: true },
              { label: "Goods in transit", href: "#", disabled: true },
            ],
          },
          {
            label: "Employee cover",
            children: [
              { label: "Work injury benefit (WIBA)", href: "#", disabled: true },
              { label: "Group medical", href: "#", disabled: true },
              { label: "Group life", href: "#", disabled: true },
            ],
          },
          {
            label: "Engineering",
            children: [
              { label: "Machinery breakdown", href: "#", disabled: true },
              { label: "Electronic equipment", href: "#", disabled: true },
              { label: "Contractors all risks", href: "#", disabled: true },
            ],
          },
        ],
      },
      {
        label: "Property",
        children: [
          { label: "Investing", href: "/business/investing" },
          { label: "Retirement", href: "/business/retirement" },
        ],
      },
      {
        label: "Preserve your Legacy",
        children: [
          { label: "Investing", href: "/business/investing" },
          { label: "Retirement", href: "/business/retirement" },
        ],
      },
    ],
    actions: [
      { label: "Get started", href: "/business/get-started", variant: "primary" },
      { label: "Contact us", href: "/contact", variant: "outline" },
    ],
  },

  "about-us": {
    // TODO: Replace these placeholder about-us categories with approved copy.
    categories: [
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
    ],
    actions: [
      { label: "Meet our team", href: "/about-us/leadership", variant: "primary" },
      { label: "Contact us", href: "/contact", variant: "outline" },
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

    if (level === 3 && node.children?.length && !getMenuNodeHref(node)) {
      console.warn(`[nav] Level-3 node with children must have an href at ${nodePath.join(" > ")}`);
    }

    if (Array.isArray(node.children)) validateNodes(node.children, nodePath, level + 1);
  }
}

if (process.env.NODE_ENV !== "production") {
  for (const tag of TAGS) validateNodes(nav[tag.id].categories, [tag.id], 1);
}
