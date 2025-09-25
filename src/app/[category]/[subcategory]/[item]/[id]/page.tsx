import type { Metadata } from "next";
import { getProductBySlug } from "@/api/product"; // ✅ use slug-based API
import ProductDisplay from "./ProductDisplay";
import { FRONTEND_URL } from "@/api/config"; // use frontend domain for canonical

type PageProps = {
  params: {
    category: string;
    subcategory: string;
    item: string;
    id: string; // this is the SEO-friendly slug
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.id).catch(() => null);

  const canonicalUrl = `${FRONTEND_URL}/${params.category}/${params.subcategory}/${params.item}/${params.id}`;

  return {
    title: product
      ? `Buy ${product.name} Online | Glimmer`
      : "Buy Product Online | Glimmer",
    description: product
      ? `Shop ${product.name} online in Pakistan at Glimmer. Explore Genuine ${product.category?.name} with easy online shopping and fast delivery nationwide.`
      : "Shop products online in Pakistan at Glimmer.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Page({ params }: PageProps) {
  return <ProductDisplay productSlug={params.id} />;
}
