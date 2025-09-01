import Temp from "../selfcare-products/components/Products";

export default async function ProductsSlugPage({ params }: { params: Promise<{ slugs?: string[] }> }) {
  const resolvedParams = await params;
  return <Temp slugs={resolvedParams.slugs ?? []} />;
}