"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const OfferPictures = () => {
  return (
    <div className="w-[99vw] h-max flex justify-center items-center  px-5 gap-2 my-8 max-md:flex-col  ">
      <div className="w-[50%] max-md:w-[100%] h-[350px] ">
        <Image
          src={"/assets/placeholder/image.png"}
          width={0}
          height={0}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt={"Offers"}
        />
      </div>
      <div className="w-[50%] max-md:w-[99%] h-[350px]">
        <Image
          src={"/assets/placeholder/image.png"}
          width={0}
          height={0}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt="offers"
        />
      </div>
    </div>
  );
};

export default OfferPictures;
