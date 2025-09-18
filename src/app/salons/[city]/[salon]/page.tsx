import type { Metadata } from "next";
import SalonDetailsPage from "./SalonDetail";

type PageProps = {
  params: {
    city: string;
    salon: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
   const { city, salon } = params;

  const cityName = city.replace(/-/g, " "); 
  const salonName = salon.replace(/-/g, " "); 

  return {
    title: `Book ${salonName} Online - ${cityName} | Glimmer Salons`,
    description: `Book ${salonName} in ${cityName}. Find expert Salon services near you, and book online with Glimmer. Convenient, reliable, and affordable.`,
  };
}


export default function Page({ params }: PageProps) {
  return <SalonDetailsPage />;
}
