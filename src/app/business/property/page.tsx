import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { getProductPageById } from "@/lib/data";

export default function BusinessPropertyPage() {
  const product = getProductPageById("business-property");

  if (!product) notFound();

  return <PageShell product={product} />;
}
