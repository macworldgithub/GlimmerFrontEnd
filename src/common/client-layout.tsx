// src/common/client-layout.tsx
"use client";

import { useEffect, useState } from "react";
import BoxContainer from "./box-container";
import Footer from "./footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      {mounted && (
        <>
          <BoxContainer />
          <Footer />
        </>
      )}
    </>
  );
}
