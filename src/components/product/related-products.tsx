import Image from "next/image";
import Link from "next/link";
import { getProductPageById, getProductsByCategory } from "@/lib/data";
import type { ProductCategory, ProductPageData } from "@/lib/types";

export function RelatedProducts({
  currentProduct,
  category,
  productIds,
}: {
  currentProduct?: ProductPageData;
  category?: ProductCategory;
  productIds?: string[];
}) {
  const activeCategory = category ?? currentProduct?.category;

  let products: ProductPageData[] = [];

  if (activeCategory) {
    // Pick other products in the active category (e.g. personal vs business),
    // excluding the product currently being viewed
    products = getProductsByCategory(activeCategory, currentProduct?.id);
  } else if (productIds && productIds.length > 0) {
    // Fallback to explicit list if provided
    products = productIds.flatMap((id) => {
      const match = getProductPageById(id);
      return match ? [match] : [];
    });
  }

  if (products.length === 0) return null;

  const categoryTitle =
    activeCategory === "personal"
      ? "Other Personal Insurance Products"
      : activeCategory === "business"
      ? "Other Business Insurance Products"
      : "Related Products";

  return (
    <section aria-labelledby="related-products-heading" className="pt-4">
      <div className="mb-6">
        <h2
          id="related-products-heading"
          className="text-2xl font-bold text-brand-navy sm:text-3xl"
        >
          {categoryTitle}
        </h2>
        <p className="mt-2 text-sm text-brand-slate">
          {activeCategory === "personal"
            ? "Explore more personal cover options tailored to protect your home, health, and family."
            : activeCategory === "business"
            ? "Explore additional business insurance solutions designed to safeguard your enterprise."
            : "Explore other insurance solutions tailored to your requirements."}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/services/${product.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-border transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none"
          >
            <div className="relative h-44 w-full bg-slate-100">
              <Image
                src={product.heroImage.src}
                alt={product.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                {product.eyebrow}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-brand-navy transition-colors group-hover:text-brand-gold">
                {product.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-brand-slate">
                {product.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
