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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

export default async function Page({ params }: PageProps) {
  const product = await getProductBySlug(params.id).catch(() => null);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Build Product Schema JSON-LD
  const productSchema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${FRONTEND_URL}/${params.category}/${params.subcategory}/${params.item}/${params.id}`,
    name: product.name,
    description: product.description,
    image: [product.image1, product.image2, product.image3].filter(Boolean),
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: product.brand?.name || "Beauty of Joseon",
    },
    category: `${product.category?.name} > ${product.sub_category?.name} > ${product.item?.name}`,
    size: product.size?.[0]?.value
      ? `${product.size[0].value}${product.size[0].unit}`
      : undefined,
    offers: {
      "@type": "Offer",
      url: `${FRONTEND_URL}/${params.category}/${params.subcategory}/${params.item}/${params.id}`,
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
  };

  // Optional: Ratings if API provides
  if (product.average_rating) {
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.average_rating,
      reviewCount: product.total_ratings || 1,
    };
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Product UI */}
      <ProductDisplay productSlug={params.id} />
    </>
  );
}
