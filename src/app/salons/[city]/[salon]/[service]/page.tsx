import type { Metadata } from "next";
import ServiceDetails from "./ServiceDetail";

type PageProps = {
  params: {
    city: string;
    salon: string;
    service: string;
  };
  searchParams: {
    serviceId?: string;
    salonName?: string;
  };
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { city, salon, service } = params;

  const cityName = city.replace(/-/g, " ");
  const salonName = salon.replace(/-/g, " ");
  const serviceName = service.replace(/-/g, " ");

  return {
    title: `Book ${serviceName} Online at ${salonName} Salon - ${cityName} | Glimmer`,
    description: `Book your ${serviceName} at ${salonName}, ${cityName} with Glimmer. Enjoy professional care, expert beauticians, and instant online booking for a flawless experience.`,
  };
}

export default function Page({ params, searchParams }: PageProps) {
  return <ServiceDetails />;
}
