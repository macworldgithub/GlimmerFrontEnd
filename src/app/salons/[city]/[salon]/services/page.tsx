import type { Metadata } from "next";
import ServiceList from "./ServiceList";
import { BACKEND_URL } from "@/api/config";
import { getAllActiveServices, getSalonById } from "@/api/salon";

type PageProps = {
  params: {
    city: string;
    salon: string;
  };
  searchParams: {
    serviceId?: string;
    salonId?: string;
    openingHour?: string;
    closingHour?: string;
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city, salon } = params;

  const cityName = city.replace(/-/g, " ");
  const salonName = salon.replace(/-/g, " ");

  const canonicalUrl = `${BACKEND_URL}/salons/${params.city}/${params.salon}/services`;

  return {
    title: `Book the Best Beauty Salon Services at ${salonName}, ${cityName} | Glimmer`,
    description: `Explore expert beauty salon services at ${salonName}, ${cityName}. Book online via Glimmer for professional care, relaxation, and glowing results.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const salonId = searchParams?.salonId as string;

  let services: any[] = [];
  try {
    await getAllActiveServices({
      page_no: 1,
      salonId,
      limit: 20,
    } as any);
  } catch (err) {
    console.error("Schema fetch services failed:", err);
  }

  let salonData: any = null;
  try {
    if (salonId) {
      salonData = await getSalonById(salonId);
    }
  } catch (err) {
    console.error("Schema fetch salon failed:", err);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.name,
      description: service.description || undefined,
      image: service.image1 ? [service.image1] : undefined,
      provider: {
        "@type": "Organization",
        name: salonData?.name || params.salon.replace(/-/g, " "),
        url: `${BACKEND_URL}/salons/${params.city}/${params.salon}`,
      },
      areaServed: {
        "@type": "City",
        name: params.city.replace(/-/g, " "),
      },
      offers: {
        "@type": "Offer",
        url: `${BACKEND_URL}/salons/${params.city}/${params.salon}/services/${service.slug}`,
        priceCurrency: "PKR",
        price: service.adminSetPrice,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ServiceList />
    </>
  );
}
