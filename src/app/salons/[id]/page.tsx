import React from "react";
import AboutSalon from "./components/about-salon";
import RecommendedProducts from "./components/recommended-products";
import GlimmerBanner from "./components/glimmer-banner";
import SalonsNearby from "./components/salons-nearby";
import Hero from "./components/hero";
import SalonServices from "./components/salon-services";
 
interface Params {
  id: string;
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  console.log("[salons] id: ", id);

  return (
    <>
      <Hero />
      <SalonServices />
      <AboutSalon />
      <RecommendedProducts />
      <SalonsNearby currentSalonAddress="Address 1" />
      <GlimmerBanner />
    </>
  );
};

export default Page;
