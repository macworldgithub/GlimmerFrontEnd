// Home.tsx
"use client";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import CategoryNavMenu from "@/common/category-nav-menu";
import Hero from "./components/hero";
import Breadcrumbs from "@/common/breadcrumb";
import FullScreenLoader from "@/common/loader";

// Dynamically import below-the-fold components
const Assurity = dynamic(() => import("./components/Assurity"), { ssr: false });
const OfferPictures = dynamic(() => import("./components/OfferPictures"), { ssr: false });
const AllProducts = dynamic(() => import("./components/AllProducts"), { ssr: false });
const TrendingProducts = dynamic(() => import("./components/TrendingProducts"), { ssr: false });
const MustItems = dynamic(() => import("./components/MustItems"), { ssr: false });
const BestSellers = dynamic(() => import("./components/best-sellers"), { ssr: false });
const DynamicBanner = dynamic(() => import("./components/Banner"), { ssr: false });
const Faq = dynamic(() => import("./components/Faq"), { ssr: false });

export default function Home() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  const handleChildLoaded = () => {
    setIsAppLoading(false);
  };

  return (
    <>
      {isAppLoading && <FullScreenLoader />}
      <Suspense fallback={null}>
        <Breadcrumbs />
        <Hero />
      </Suspense>
      <Assurity />
      <OfferPictures />
      <AllProducts onLoaded={handleChildLoaded} />
      <TrendingProducts onLoaded={handleChildLoaded} />
      <MustItems />
      <BestSellers />
      <DynamicBanner
        imageUrl=""
        title="Shop Now and Unleash Your Inner Glow!"
      />
      <Faq />
    </>
  );
}