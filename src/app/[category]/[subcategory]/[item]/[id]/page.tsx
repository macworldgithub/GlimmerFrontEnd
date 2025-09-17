import type { Metadata } from "next";
import { getProductById } from "@/api/product";
import ProductDisplay from "./ProductDisplay";

type PageProps = {
  params: {
    category: string;
    subcategory: string;
    item: string;
    id: string;
  };
  searchParams: {
    id?: string;
    storeId?: string;
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const productId = searchParams.id || params.id;

  const product = await getProductById(productId).catch(() => null);
  return {
    title: product
      ? `Buy ${product.name} Online | Glimmer`
      : "Buy Product Online | Glimmer",
    description: product
      ? `Shop ${product.name} online in Pakistan at Glimmer. Explore Genuine ${product.category.name} with easy online shopping and fast delivery nationwide.`
      : "Shop products online in Pakistan at Glimmer.",
  };
}

export default function Page({ searchParams }: PageProps) {
  return <ProductDisplay productId={searchParams.id as string} />;
}
