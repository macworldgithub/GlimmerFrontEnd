"use client";
import * as React from "react";
import QrcodeImg from "@/assets/images/Glimmer-Qrcode-section-img.png";
import QrCode from "@/assets/images/QrCode.png";
import Image from "next/image";

const QrCodeSection = () => {
  return (
    <div className="mb-6 md:mb-8 w-[99vw] p-6 md:p-[8rem]">
      <div className="relative w-full">
        {/* Background Image */}
        <Image
          src={QrcodeImg}
          alt="QR Code Background"
          className="w-full h-auto object-cover"
          priority
        />

        {/* Text + QR Image in right section center */}
        <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 flex flex-col items-center text-gray-500 space-y-4">
          {/* Text */}
          <div className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg text-center">
            <p>Scan the QR Code to</p>
            <p>explore our website</p>
          </div>

          {/* QR Code Image */}
          <Image
            src={QrCode}
            alt="QR Code Icon"
            className="w-36 md:w-40 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default QrCodeSection;
