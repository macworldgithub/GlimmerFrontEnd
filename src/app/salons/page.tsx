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
import SalonFaq from "./components/Salon-Faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Beauty Salons & Services Online in Pakistan | Glimmer",
  description:
    "Discover and book top beauty salons and services across Pakistan with Glimmer. Find hair, makeup, spa, nail salons, and more near you",
};

export default async function Page() {
  return (
    <>
      <Hero />
      <RecommendedSaloons />
      <TrendingSaloons />
      <NewSaloons />
      <Saloons />
      <QrCodeSection />
      {/* <GlimmerAchieves /> */}
      <GlimmerForBusiness />
      <SalonFaq />
      {/* <BrowseByAreaList /> */}
    </>
  );
}
