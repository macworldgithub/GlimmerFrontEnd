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
import Breadcrumbs from "@/common/breadcrumb";
import Faq from "./components/Faq";
import Banner from "./components/Banner";
import DynamicBanner from "./components/Banner";

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
        <BestSellers />
        <SaloonPictures />
        <DynamicBanner imageUrl="" title="Shop Now and Unleash Your Inner Glow!" />
        <Faq/>
      </Suspense>
    </>
  );
}
