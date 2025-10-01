import type { Metadata } from "next";
import SalonDetailsPage from "./SalonDetail";
import { BACKEND_URL, FRONTEND_URL } from "@/api/config";
import { getSalonBySlug } from "@/api/salon";

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, salon } = params;

  const cityName = city.replace(/-/g, " ");
  const salonName = salon.replace(/-/g, " ");

  const salonData = await getSalonBySlug(salon).catch(() => null);

  const canonicalUrl = `${FRONTEND_URL}/salons/${params.city}/${params.salon}`;

  return {
    title: salonData
      ? `${salonData.salon_name} in ${cityName} | Book Online | Glimmer Salons`
      : `Book ${salonName} in ${cityName} | Glimmer Salons`,
    description: salonData?.about
      ? salonData.about
      : `Book ${salonName} in ${cityName}. Find expert salon services near you with Glimmer.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: salonData?.salon_name || salonName,
      description: salonData?.about || "",
      url: canonicalUrl,
      images: [salonData?.image1, salonData?.image2, salonData?.image3].filter(Boolean),
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { salon, city } = params;
  const salonData = await getSalonBySlug(salon).catch(() => null);

  if (!salonData) {
    return <div>Salon not found</div>;
  }

  const salonSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon / Spa",
    "@id": `${FRONTEND_URL}/salons/${city}/${salonData.slug}`,
    name: salonData.salon_name,
    description: salonData.about,
    image: [salonData.image1, salonData.image2, salonData.image3].filter(Boolean),
    telephone: salonData.contact_number,
    address: {
      "@type": "PostalAddress",
      streetAddress: salonData.address,
      addressLocality: city.replace(/-/g, " "),
      addressCountry: "PK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: salonData.openingHour || "10:00",
        closes: salonData.closingHour || "22:00",
      },
    ],
    url: `${FRONTEND_URL}/salons/${city}/${salonData.slug}`,
    brand: {
      "@type": "Organization",
      name: "Glimmer",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(salonSchema) }}
      />
      <SalonDetailsPage />
    </>
  );
}
