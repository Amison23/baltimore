import type { ProductCategory, ProductPageData } from "./types";
import { motorProduct } from "./data/motor";
import { personalPropertyProduct } from "./data/personal-property";
import { businessPropertyProduct } from "./data/business-property";
import { lifeProduct } from "./data/life";
import { businessLiabilityProduct } from "./data/business-liability";

// Export individual products for direct script access
export {
  motorProduct,
  personalPropertyProduct,
  businessPropertyProduct,
  lifeProduct,
  businessLiabilityProduct,
};

/**
 * Aggregated catalog of all product pages.
 */
export const productPages: ProductPageData[] = [
  motorProduct,
  personalPropertyProduct,
  lifeProduct,
  businessPropertyProduct,
  businessLiabilityProduct,
];

export function getProductPageBySlug(slug: string) {
  return productPages.find((product) => product.slug === slug);
}

export function getProductPageById(id: string) {
  return productPages.find((product) => product.id === id);
}

/**
 * Retrieve products filtered by category (e.g. "personal" or "business"),
 * optionally excluding the product currently being viewed.
 */
export function getProductsByCategory(
  category: ProductCategory,
  excludeId?: string
) {
  return productPages.filter(
    (product) => product.category === category && product.id !== excludeId
  );
}

/**
 * Find related products for a given product.
 * Automatically picks other products under the same category tab
 * (e.g., personal vs. business), falling back to relatedProductIds if specified.
 */
export function getRelatedProducts(product: ProductPageData) {
  const categoryMatches = getProductsByCategory(product.category, product.id);

  if (categoryMatches.length > 0) {
    return categoryMatches;
  }

  if (product.relatedProductIds && product.relatedProductIds.length > 0) {
    return product.relatedProductIds.flatMap((id) => {
      const match = getProductPageById(id);
      return match ? [match] : [];
    });
  }

  return [];
}
