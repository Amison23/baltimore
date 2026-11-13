import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { getProductPageBySlug, productPages } from "@/lib/data";

export function generateStaticParams() {
  return productPages.map(({ slug }) => ({ slug }));
}

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProductPageBySlug(slug);

  if (!product) notFound();

  return <PageShell product={product} />;
}
