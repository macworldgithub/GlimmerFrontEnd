"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AlfalahCheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/error?reason=sessionId-missing");
      return;
    }

    // Dynamically inject the Mastercard script
    const script = document.createElement("script");
    // script.src = "https://test-bankalfalah.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.src =
      "https://test-bankalfalah.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.setAttribute("data-error", "errorCallback");
    script.setAttribute("data-cancel", "cancelCallback");
    script.setAttribute("data-complete", "completeCallback");
    script.async = true;

    script.onload = () => {
      const Checkout = (window as any).Checkout;

      if (!Checkout) {
        alert("❌ Checkout script failed to load.");
        return;
      }

      Checkout.configure({
        session: {
          id: sessionId,
        },
      });

      Checkout.showPaymentPage();
    };

    document.body.appendChild(script);

    // Add the callback functions to window (as in static HTML)
    (window as any).errorCallback = function (error: any) {
      alert("❌ Payment Error:\n" + JSON.stringify(error));
    };

    (window as any).cancelCallback = function () {
      alert("⚠️ Payment was canceled.");
    };

    (window as any).completeCallback = function (
      resultIndicator: string,
      sessionVersion: string
    ) {
      console.log("✅ Payment completed with result:", {
        resultIndicator,
        sessionVersion,
      });
      alert("✅ Payment Completed!\nResult Indicator: " + resultIndicator);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [sessionId, router]);

  return (
    <html lang="en">
      <head>
        <title>Glimmer Store Auto Checkout</title>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <h1 style={{ textAlign: "center", padding: "2rem" }}>
          Redirecting to Payment Page...
        </h1>
      </body>
    </html>
  );
}
