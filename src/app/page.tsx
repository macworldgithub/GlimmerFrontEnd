import BottomSlider from "./components/bottom-slider";
import GymBanner from "./components/gym-banner";
import Hero from "./components/hero";
import SalonCardList from "./components/salon-card-list";
import SeftcareCardList from "./components/selfcare-card-list";
import FakeReviewList from "./components/fake-review-list";
 
export default async function Home() {
  return (
    <>
      <Hero />
      <SalonCardList />
      <SeftcareCardList />
      <BottomSlider />
      <GymBanner />
      <FakeReviewList />
    </>
  );
}
