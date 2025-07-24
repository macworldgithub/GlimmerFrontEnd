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

        {/* Text + QR Image block — right center (fixed position) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-end text-gray-500 space-y-5 text-right w-[90%] max-w-[350px]">
          <p className="text-xs md:text-base lg:text-3xl xl:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Scan the QR Code to
            <br /> explore our website
          </p>

          <Image
            src={QrCode}
            alt="QR Code Icon"
            className="w-20 md:w-24 lg:w-32 xl:w-48 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default QrCodeSection;
