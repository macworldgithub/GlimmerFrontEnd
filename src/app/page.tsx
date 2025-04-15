'use client';

import BottomSlider from "./components/bottom-slider";
import GymBanner from "./components/gym-banner";
import Hero from "./components/hero";
import SalonCardList from "./components/salon-card-list";
import SeftcareCardList from "./components/selfcare-card-list";
import FakeReviewList from "./components/fake-review-list";
import BoxContainer from "@/common/box-container";
import Footer from "@/common/footer";
import ProductFilter from "@/common/ProductFilter";

export default function Home() {
  return (
    <>
      <div className="w-[99vw]">
        <Hero />
        <SalonCardList />
        <SeftcareCardList />
        <BottomSlider />
        <GymBanner />
        <ProductFilter />
        <FakeReviewList />
        </div>
       
    </>
  );
}
