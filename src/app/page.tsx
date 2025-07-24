"use client";

import BottomSlider from "./components/bottom-slider";
import GymBanner from "./components/gym-banner";
import Hero from "./components/hero";
import SalonCardList from "./components/salon-card-list";
import SeftcareCardList from "./components/selfcare-card-list";
import FakeReviewList from "./components/fake-review-list";
import BoxContainer from "@/common/box-container";
import Footer from "@/common/footer";
import ProductFilter from "@/common/ProductFilter";
import HairBanner from "./components/hair-banner";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HG69Q30FKD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HG69Q30FKD');
          `}
        </Script>
      </head>

      <div className="w-[99vw]">
        <Hero />
        <SeftcareCardList />
        <SalonCardList />
        <BottomSlider />
        <GymBanner />
        <ProductFilter />
        <HairBanner />
      </div>
    </>
  );
}
