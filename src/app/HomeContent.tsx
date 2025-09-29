"use client";

import BottomSlider from "./components/bottom-slider";
import Hero from "./components/hero";
import SalonCardList from "./components/salon-card-list";
import SeftcareCardList from "./components/selfcare-card-list";
import FakeReviewList from "./components/fake-review-list";
import BoxContainer from "@/common/box-container";
import Footer from "@/common/footer";
import ProductFilter from "@/common/ProductFilter";
import dynamic from "next/dynamic";

const GymBanner = dynamic(() => import("./components/gym-banner"), { ssr: false });
const HairBanner = dynamic(() => import("./components/hair-banner"), { ssr: false });

export default function HomeContent() {
  return (
    <>
      <div className="w-[99vw]">
        <Hero />
        <SeftcareCardList />
        <SalonCardList />
        <BottomSlider />
        <GymBanner />
        <ProductFilter />
        <HairBanner />
        {/* <FakeReviewList /> */}
      </div>
    </>
  );
}
