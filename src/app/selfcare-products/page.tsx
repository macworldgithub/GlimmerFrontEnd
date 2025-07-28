"use client";
import CategoryNavMenu from "@/common/category-nav-menu";
import BestSellers from "./components/best-sellers";
import BrandProductImages from "./components/brand-product-images";
import BudgetFriendly from "./components/budget-friendly";
import ExclusiveOffer from "./components/exclusive-offer-image";
import Hero from "./components/hero";
import NewArrivals from "./components/new-arrivals";
import AutoSliderShopBrand from "./components/shop-brand";
import Assurity from "./components/Assurity";
import OfferPictures from "./components/OfferPictures";
import TrendingProducts from "./components/TrendingProducts";
import VideoTutorial from "./components/VideoTutorial";
import MustItems from "./components/MustItems";
import SaloonPictures from "@/common/SaloonPictures";
import { Suspense, useState } from "react";
import Breadcrumbs from "@/common/breadcrumb";
import Faq from "./components/Faq";

import Banner from "./components/Banner";
import DynamicBanner from "./components/Banner";
import ProductFilter from "@/common/ProductFilter";
import ProductCards from "@/common/ProductCard";
import AllProducts from "./components/AllProducts";
import FullScreenLoader from "@/common/loader";

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
      <VideoTutorial />
      <DynamicBanner
        imageUrl=""
        title="Shop Now and Unleash Your Inner Glow!"
      />
      <Faq />
    </>
  );
}
