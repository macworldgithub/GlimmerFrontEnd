import type { Metadata } from "next";
import ServiceList from "./ServiceList";

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
    title: `Book the Best Beauty Salon Services at ${salonName}, ${cityName} | Glimmer`,
    description: `Explore expert beauty salon services at ${salonName}, ${cityName}. Book online via Glimmer for professional care, relaxation, and glowing results.`,
  };
}

export default function Page({ params }: PageProps) {
    return <ServiceList />;
}
