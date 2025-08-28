import Temp from "../page";


export default function ProductsSlugPage({ params }: { params: { slugs?: string[] } }) {
  return <Temp slugs={params.slugs || []} />;
}