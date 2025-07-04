// app/layout.tsx
import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/common/navbar";
import "swiper/css/bundle";
import { CartStoreProvider } from "@/store/cartStoreContext";
import CookieBanner from "@/common/cookie-banner";
import ClientLayout from "@/common/client-layout";
import FloatingWhatsApp from "@/common/FloatingWhatsApp"; 
import ChatbotWidget from "@/common/ChatbotWidget";
// import FloatingChatbot from '@/common/FloatingChatbot'; 

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700","800","900"],
  display: "swap",
  variable: "--font-prompt",
});


export const metadata: Metadata = {
  title:
    "Make an online salon appointment at The Best Prices Online Cosmetics Store in Pakistan by visiting glimmer.com.pk.",
  description:
    "Make an online salon appointment at The Best Prices Online Cosmetics Store in Pakistan by visiting glimmer.com.pk.",
    
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${prompt.variable} container bg-base-100 antialiased`}>
        <CartStoreProvider>
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
          <CookieBanner />
          <FloatingWhatsApp /> 
          <ChatbotWidget/>
        </CartStoreProvider>
      
      </body>
    </html>
  );
}
