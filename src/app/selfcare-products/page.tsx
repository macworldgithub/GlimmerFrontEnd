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

export default async function Home() {
  return (
    <>
      <CategoryNavMenu className="mb-4" />
      <Hero />
      <Assurity />
      <OfferPictures />
      <TrendingProducts />
    </>
  );
}
