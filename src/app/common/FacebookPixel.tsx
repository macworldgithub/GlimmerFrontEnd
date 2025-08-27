"use client";
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

import { useEffect } from "react";
import Script from "next/script";

const FACEBOOK_PIXEL_ID = "1106459364741867"; // Replace with your ID

export default function FacebookPixel() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window.fbq !== "undefined") {
        window.fbq("track", "PageView");
      }
    }, 500); // small delay to ensure fbq loads

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {/* Pixel Base Code */}
      <Script id="fb-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1106459364741867');
        fbq('track', 'PageView');
        `}
      </Script>

      {/* Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
