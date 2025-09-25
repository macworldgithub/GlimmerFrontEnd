import type { Metadata } from "next";
import ServiceList from "./ServiceList";
import { BACKEND_URL } from "@/api/config";

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

export default function Page({ params, searchParams }: PageProps) {
  return <ServiceList />;
}
