import { TabsMenu } from "@/components/product/product-info-tabs";
import { MoreInfoCard } from "@/components/product/more-info-card";
import { RelatedProducts } from "@/components/product/related-products";
import type { ProductPageData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import ProductForm from "../product/product-form";

export default function PageShell({ product }: { product: ProductPageData }) {
  let prodForm = true;
  return (
    <main className="bg-brand-surface">
      <section className="relative isolate min-h-[28rem] overflow-hidden bg-brand-navy">
        <Image
          src={product.heroImage.src}
          alt={product.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="relative mx-auto flex min-h-[28rem] max-w-[1300px] flex-col items-start justify-center px-5 py-16 sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            {product.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            {product.summary}
          </p>
          <Link
            href={product.primaryAction.href}
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-brand-gold px-6 font-semibold text-brand-navy transition hover:bg-white motion-reduce:transition-none"
          >
            {product.primaryAction.label}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-[1300px] space-y-16 px-5 py-16 sm:px-8 lg:px-10">
        {product.selectionList.length > 0 && (
          <div className="w-full rounded-2xl sm:rounded-3xl border border-blue-400 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div
              className={`flex flex-col ${
                prodForm
                  ? "lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-12"
                  : ""
              }`}
            >
              <div className="w-full min-w-0 flex-1">
                <TabsMenu selections={product.selectionList} />
              </div>
              {prodForm && (
                <div className="mt-8 w-full shrink-0 lg:mt-0 lg:w-[380px] xl:w-[420px]">
                  <ProductForm />
                </div>
              )}
            </div>
          </div>
        )}

        {product.sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2
              id={`${section.id}-heading`}
              className="text-3xl font-bold text-brand-navy sm:text-4xl"
            >
              {section.title}
            </h2>
            {section.type === "benefits" ? (
              <>
                <p className="mt-4 max-w-3xl leading-7 text-brand-slate">
                  {section.description}
                </p>
                {section.ctaButtons.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {section.ctaButtons.map((action) => (
                      <Link
                        key={action.id}
                        href={action.href}
                        className="inline-flex min-h-11 items-center rounded-full border border-brand-navy px-5 font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white motion-reduce:transition-none"
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-border"
                    >
                      <h3 className="text-lg font-semibold text-brand-navy">
                        {item.title}
                      </h3>
                      <p className="mt-3 leading-7 text-brand-slate">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.steps.map((step, index) => (
                  <li
                    key={step.id}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-border"
                  >
                    <p className="text-sm font-semibold text-brand-gold">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-brand-slate">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}

        <MoreInfoCard />

        <RelatedProducts
          currentProduct={product}
          productIds={product.relatedProductIds}
        />
      </div>
    </main>
  );
}
