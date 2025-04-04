import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/common/navbar";
import Footer from "@/common/footer";
import "swiper/css/bundle";
import { CartStoreProvider } from "@/store/cartStoreContext";
import CookieBanner from "@/common/cookie-banner";
import ToastComponent from "./components/toast-component";
import { Provider } from "react-redux";
import store from "@/store/reduxStore";
import BoxContainer from "@/common/box-container";
const prompt = Prompt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Make an online salon appointment at The Best Prices Online Cosmetics Store in Pakistan by visiting glimmer.com.pk.",
  description: "Make an online salon appointment at The Best Prices Online Cosmetics Store in Pakistan by visiting glimmer.com.pk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${prompt.variable} container bg-base-100 antialiased`}>
        <CartStoreProvider>
          <Navbar />
          
          {children}
          <BoxContainer />
          <Footer />  
          <CookieBanner />
        </CartStoreProvider>
      </body>
    </html>
  );
}
