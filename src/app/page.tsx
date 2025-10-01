import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Glimmer: Pakistan’s Online Salons Booking & Beauty Products Store",
  description:
    "Glimmer, Pakistan’s top platform for beauty salons & beauty products. Book salons, shop premium cosmetics, skincare, haircare & self‑care products.",
};

export default function Home() {
  return <HomeContent />;
}
