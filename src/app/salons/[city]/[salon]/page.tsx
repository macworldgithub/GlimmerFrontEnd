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
  const { city } = params;
  const location = city.replace(/-/g, " ");
  return {
    title: `Book Beauty Salons & Services Online in ${location} | Glimmer`,
    description: `Find the best beauty salons & services in ${location}. Book online with Glimmer for trusted salons, instant appointments, and the best salon experiences.`,
  };
}

export default function Page({ params }: PageProps) {
  return <SalonDetailsPage />;
}
