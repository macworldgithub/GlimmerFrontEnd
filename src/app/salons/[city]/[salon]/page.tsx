import type { Metadata } from "next";
import SalonDetailsPage from "./SalonDetail";
import { BACKEND_URL } from "@/api/config";

type PageProps = {
  params: {
    city: string;
    salon: string;
  };
  searchParams: {
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

  const canonicalUrl = `${BACKEND_URL}/salons/${params.city}/${params.salon}`;

  return {
    title: `Book ${salonName} Online - ${cityName} | Glimmer Salons`,
    description: `Book ${salonName} in ${cityName}. Find expert Salon services near you, and book online with Glimmer. Convenient, reliable, and affordable.`,
    alternates: {
      canonical: canonicalUrl, 
    },
  };
}

export default function Page({ params, searchParams }: PageProps) {
  return <SalonDetailsPage />;
}
