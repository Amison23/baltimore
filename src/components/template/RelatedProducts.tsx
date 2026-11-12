import Image from "next/image";
import Link from "next/link";
import { getProductPageById } from "@/lib/data";

export function RelatedProducts({ productIds }: { productIds: string[] }) {
  const products = productIds.flatMap((id) => {
    const product = getProductPageById(id);
    return product ? [product] : [];
  });

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading">
      <div className="mb-6">
        <h2 id="related-products-heading" className="text-2xl font-bold text-brand-navy sm:text-3xl">
          Related products
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/services/${product.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-border transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none"
          >
            <div className="relative h-44">
              <Image
                src={product.heroImage.src}
                alt={product.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-brand-navy group-hover:text-brand-gold">{product.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-slate">{product.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
