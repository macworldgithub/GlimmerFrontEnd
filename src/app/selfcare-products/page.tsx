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
import { Suspense } from "react";
import BoxContainer from "@/common/box-container";
import Breadcrumbs from "@/common/breadcrumb";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryNavMenu className="mb-4" />
        <Breadcrumbs />
        <Hero />
        <Assurity />
        <OfferPictures />
        <TrendingProducts />
        <VideoTutorial />
        <MustItems />
        <SaloonPictures />
        {/* <BoxContainer className="lg:pb-[22rem] md:pb-[12rem] justify-center" text="Shop Now and Unleash Your Inner Glow!" showInput={false} textAligned={true} animateGlow={true} /> */}
      </Suspense>
    </>
  );
}
