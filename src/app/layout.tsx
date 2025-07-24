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
import Script from "next/script";  // <-- import Script here

const prompt = Prompt({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  display: "swap",
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "www.glimmer.com.pk",
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
        {/* Google Analytics Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HG69Q30FKD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HG69Q30FKD');
          `}
        </Script>

        <CartStoreProvider>
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
          <CookieBanner />
          <ChatbotWidget />
        </CartStoreProvider>
      </body>
    </html>
  );
}
