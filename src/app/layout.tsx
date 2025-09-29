// app/layout.tsx
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/common/navbar";
import { CartStoreProvider } from "@/store/cartStoreContext";
import CookieBanner from "@/common/cookie-banner";
import ClientLayout from "@/common/client-layout";
import ChatbotWidget from "@/common/ChatbotWidget";
import CategoryNavMenu from "@/common/category-nav-menu";
import Script from "next/script"; 

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
        <meta
          name="facebook-domain-verification"
          content="wf5nqoeruiazcn3gw9d26j97gnwgcr"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${prompt.variable} w-full bg-pink-100 antialiased`}>
        <CartStoreProvider>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', 'YOUR_PIXEL_ID');
                fbq('track', 'PageView');
              `,
            }}
          />
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
