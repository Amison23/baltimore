export type ProductCategory = "personal" | "business";

export type ProductAction = {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "outline";
};

export type ProductPageData = {
  id: string;
  slug: string;
  category: ProductCategory;
  title: string;
  eyebrow: string;
  summary: string;
  heroImage: { src: string; alt: string };
  primaryAction: ProductAction;
  selectionList: {
    id: string;
    label: string;
    title: string;
    description: string;
    items?: string[];
  }[];
  sections: (
    | {
        id: string;
        type: "benefits";
        title: string;
        description: string;
        ctaButtons: ProductAction[];
        items: { id: string; title: string; description: string }[];
      }
    | {
        id: string;
        type: "process";
        title: string;
        steps: { id: string; title: string; description: string }[];
      }
  )[];
  relatedProductIds: string[];
};
