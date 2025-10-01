import type { Metadata } from "next";
import ServiceDetails from "./ServiceDetail";
import { BACKEND_URL } from "@/api/config";
import { getSalonServiceBySlug } from "@/api/salon";

type PageProps = {
  params: {
    city: string;
    salon: string;
    service: string;
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
  const { city, salon, service } = params;

  const cityName = city.replace(/-/g, " ");
  const salonName = salon.replace(/-/g, " ");
  const serviceName = service.replace(/-/g, " ");

  const canonicalUrl = `${BACKEND_URL}/salons/${params.city}/${params.salon}/${params.service}`;

  return {
    title: `Book ${serviceName} Online at ${salonName} Salon - ${cityName} | Glimmer`,
    description: `Book your ${serviceName} at ${salonName}, ${cityName} with Glimmer. Enjoy professional care, expert beauticians, and instant online booking for a flawless experience.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const serviceData = await getSalonServiceBySlug(params.service);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BACKEND_URL}/salons/${params.city}/${params.salon}/${params.service}`,
    name: serviceData?.name,
    description: serviceData?.description,
    provider: {
      "@type": "Organization",
      name: params.salon.replace(/-/g, " "),
      url: `${BACKEND_URL}/salons/${params.city}/${params.salon}`,
    },
    areaServed: {
      "@type": "City",
      name: params.city.replace(/-/g, " "),
    },
    image: serviceData?.image1
      ? [serviceData.image1]
      : [`${BACKEND_URL}/default-service.jpg`],
    offers: {
      "@type": "Offer",
      url: `${BACKEND_URL}/salons/${params.city}/${params.salon}/${params.service}`,
      priceCurrency: "PKR",
      price: serviceData?.adminSetPrice ?? 0,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ServiceDetails />
    </>
  );
}