import type { Metadata } from "next";
import { getAllProducts } from "@/api/product";
import Temp from "../selfcare-products/components/Products";
import { FRONTEND_URL } from "@/api/config";

type PageProps = {
  params: Promise<{ slugs?: string[] }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugs = resolvedParams.slugs || [];

  const categorySlug = slugs[0] || "selfcare-products";
  const canonicalUrl = `${FRONTEND_URL}/${slugs.join("/")}`;

  return {
    title: `Buy ${categorySlug.replace(/-/g, " ")} Online | Glimmer`,
    description: `Explore ${categorySlug.replace(
      /-/g,
      " "
    )} at Glimmer. Shop authentic products with fast nationwide delivery in Pakistan.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProductsSlugPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const slugs = resolvedParams.slugs || [];

  const res = await getAllProducts(
    slugs[0] || "",
    slugs[1] || "",
    slugs[2] || "",
    (searchParams?.name as string) || "",
    searchParams?.minPrice ? Number(searchParams.minPrice) : 0,
    searchParams?.maxPrice ? Number(searchParams.maxPrice) : 0,
    Number(searchParams?.page) || 1,
    undefined,
    "desc",
    20
  ).catch(() => ({ products: [] }));

  const products = res?.products || [];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${FRONTEND_URL}/${product.category?.slug}/${product.sub_category?.slug}/${product.item?.slug}/${product.slug}`,
      item: {
        "@type": "Product",
        "@id": `${FRONTEND_URL}/${product.category?.slug}/${product.sub_category?.slug}/${product.item?.slug}/${product.slug}`,
        name: product.name,
        description: product.description,
        image: [product.image1, product.image2, product.image3].filter(Boolean),
        sku: product._id,
        brand: {
          "@type": "Brand",
          name: product.brand?.name || "Unknown",
        },
        category: `${product.category?.name} > ${product.sub_category?.name} > ${product.item?.name}`,
        offers: {
          "@type": "Offer",
          url: `${FRONTEND_URL}/${product.category?.slug}/${product.sub_category?.slug}/${product.item?.slug}/${product.slug}`,
          priceCurrency: "PKR",
          price:
            product.discounted_price?.toFixed(2) || product.base_price?.toFixed(2),
          availability:
            product.quantity > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "Glimmer",
          },
        },
      },
    })),
  };

  return (
    <>
      {products.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <Temp slugs={slugs} />
    </>
  );
}
