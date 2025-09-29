"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RegisterGymModal from "@/common/RegisterGymModal";
import { useState } from "react";
import Image from "next/image";

const ProductFilter = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalSubmit = (values: any) => {
    console.log("Form submitted:", values);
    setModalVisible(false);
  };

  return (
    <>
      <div className="w-full flex justify-center px-2 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 w-full max-w-[1220px] cursor-pointer">
          {[
            {
              title: "Salon Booking",
              price: "Rs: 200",
              image: "/assets/saloonPicture/salon.png",
              link: "/salons",
            },
            {
              title: "Spa Booking",
              price: "Rs: 700",
              image: "/assets/saloonPicture/spa.png",
              link: "/salons",
            },
            {
              title: "Selfcare Items",
              price: "Rs: 120",
              image: "/assets/saloonPicture/clinic.png",
              link: "/products",
            },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.link)}
              className="bg-[#FFF1C8] rounded-[10px] p-4 sm:p-6 flex flex-col justify-between w-full max-w-[700px] min-h-[320px] sm:min-h-[570px] mx-auto transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div>
                <h2 className="text-xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-lg text-gray-700">
                  Starting from
                </p>
                <p className="text-lg sm:text-2xl font-bold text-[#D92C59]">
                  {item.price}
                </p>
              </div>
              <div className="mt-4 w-full h-[200px] sm:h-[358px] overflow-hidden rounded-[10px]">
                <Image
                  src={item.image || "/assets/images/default_image.jpg"}
                  alt={item.title || "Product image"}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}

          <div
            onClick={() => setModalVisible(true)}
            className="bg-[#FFF1C8] rounded-[10px] p-4 sm:p-6 flex flex-col justify-between w-full max-w-[700px] min-h-[420px] sm:min-h-[570px] mx-auto transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div>
              <h2 className="text-xl sm:text-4xl font-bold text-gray-900 mb-1">
                Gym Membership
              </h2>
              <p className="text-sm sm:text-lg text-gray-700">Coming Soon</p>
              <p className="text-lg sm:text-2xl font-bold text-[#D92C59]">
                Sign Up Now
              </p>
            </div>
            <div className="mt-4 w-full h-[200px] sm:h-[342px] overflow-hidden rounded-[10px]">
              <Image
                src="/assets/saloonPicture/gym.png"
                alt="Gym"
                width={600} 
                height={400}
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-full object-cover"
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </div>

      <RegisterGymModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default ProductFilter;
