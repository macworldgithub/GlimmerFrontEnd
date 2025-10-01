import type { Metadata } from "next";
import { FRONTEND_URL } from "@/api/config";
import { fetchAllSalons } from "@/api/salon"; 
import SalonsList from "./SalonList";

export const metadata: Metadata = {
  title: "Find Salons Near You | Glimmer Salons",
  description:
    "Discover and book the best salons near you. Explore Glimmer's curated collection of top-rated salons offering beauty, hair, and spa services.",
  alternates: {
    canonical: `${FRONTEND_URL}/salons`,
  },
  openGraph: {
    title: "Best Salons Near You | Glimmer Salons",
    description:
      "Browse and book salons offering haircuts, facials, makeup, and more. Find trusted salons in your city with Glimmer.",
    url: `${FRONTEND_URL}/salons`,
    images: [`${FRONTEND_URL}/assets/images/banner.png`],
  },
};

export default async function Page() {
  const salonsResponse = await fetchAllSalons(1);
  const salons = salonsResponse?.salons || [];

  const salonsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Salon List",
    description: "Browse salons available for booking on Glimmer.",
    numberOfItems: salons.length,
    itemListElement: salons.map((salon: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${FRONTEND_URL}/salons/${salon.address
        ?.split(",")
        .pop()
        ?.trim()
        .toLowerCase()
        .replace(/\s+/g, "-")}/${salon.slug}`,
      item: {
        "@type": "HairSalon",
        "@id": `${FRONTEND_URL}/salons/${salon.slug}`,
        name: salon.salon_name,
        description: salon.about,
        image: [salon.image1, salon.image2, salon.image3, salon.image4].filter(
          Boolean
        ),
        telephone: salon.contact_number,
        address: {
          "@type": "PostalAddress",
          streetAddress: salon.address,
          addressLocality: salon.address
            ?.split(",")
            .pop()
            ?.replace(/[.]/g, "")
            .trim(),
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
            opens: salon.openingHour || "10:00",
            closes: salon.closingHour || "22:00",
          },
        ],
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(salonsSchema) }}
      />

      <SalonsList />
    </>
  );
}
