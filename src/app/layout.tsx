// app/layout.tsx
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/common/navbar";
import "swiper/css/bundle";
import { CartStoreProvider } from "@/store/cartStoreContext";
import CookieBanner from "@/common/cookie-banner";
import ClientLayout from "@/common/client-layout";
import FloatingWhatsApp from "@/common/FloatingWhatsApp";
import ChatbotWidget from "@/common/ChatbotWidget";
import CategoryNavMenu from "@/common/category-nav-menu";
import FacebookPixel from "./common/FacebookPixel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import FloatingChatbot from '@/common/FloatingChatbot';

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-prompt",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="facebook-domain-verification" 
        content="wf5nqoeruiazcn3gw9d26j97gnwgcr" />
         <link rel="icon" href="/assets/images/favIcon.png" type="image/png" />
      </head>
      <body className={`${prompt.variable} w-full bg-pink-100 antialiased`}>
        <CartStoreProvider>
          <FacebookPixel />

          <Navbar />
          <CategoryNavMenu />
          <ClientLayout>{children}</ClientLayout>
          <CookieBanner />
          <ChatbotWidget />
        </CartStoreProvider>
      </body>
    </html>
  );
}
