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
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HG69Q30FKD"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HG69Q30FKD');
        `,
          }}
        />
      </Head>

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
