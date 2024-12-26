import React from "react";
import Hero from "./components/hero";
import Saloons from "./components/salons";
import RecommendedSaloons from "./components/recommended-salons";
import NewSaloons from "./components/new-salons";
import TrendingSaloons from "./components/trending-saloons";
import QrCodeSection from "./components/qr-code-section-img";
import BrowseByAreaList from "./components/browse-by-area-list";
import GlimmerAchieves from "./components/glimmer-achieves";
import GlimmerForBusiness from "./components/glimmer-for-business";
 
export default async function Page() {
  return (
    <>
      <Hero />
      <Saloons />
      <RecommendedSaloons />
      <NewSaloons />
      <TrendingSaloons />
      <QrCodeSection />
      <GlimmerAchieves />
      <GlimmerForBusiness />
      <BrowseByAreaList />
    </>
  );
}
