import type { Metadata } from "next";
import ServiceDetails from "./ServiceDetail";
import { BACKEND_URL } from "@/api/config";

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

export default function Page({ params, searchParams }: PageProps) {
  return <ServiceDetails />;
}
