// GymBanner.tsx
"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import GymBanner1 from "@/assets/images/gym-banner.webp";
import RegisterGymModal from "@/common/RegisterGymModal";

const AutoSlider = dynamic(() => import("@/common/auto-slider"), { ssr: false });

const GymBanner = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 md:mb-14 w-[99vw]">
      <AutoSlider srcs={[GymBanner1]} delay={null} onBannerClick={handleOpen} />
      <RegisterGymModal visible={visible} onCancel={handleClose} onSubmit={() => {}} />
    </div>
  );
};

export default GymBanner;