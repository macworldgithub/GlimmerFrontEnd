import Temp from "../page";

export default function ProductsSlugPage({ params }: any) {
  return <Temp slugs={params.slugs ?? []} />;
}