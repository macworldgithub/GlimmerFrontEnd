"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Swiper styles

const SalonServices = () => {
	const items = [
		"item1",
		"item2",
		"item3",
		"item4",
		"item5",
		"item6",
		"item7",
		"item8",
		"item9",
		"item10",	
		"item11",
		"item12",
		"item13",
		"item14",
		"item15",
		"item16",
		"item17",
		"item18",
		"item19",
		"item20",
	];

	return (
		<>
		<div className="mb-6 w-full md:mb-8 bg-primary p-2">
			<div className="prose lg:prose-xl">
				<h2 className="mb-2 md:mb-3">Services</h2>
			</div>

			<div className="relative">
			<Swiper
    spaceBetween={30}
    slidesPerView="auto"
    loop={false}
    breakpoints={{
        280: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 10,
        },
    }}
>
    {items?.map((item, index) => (
        <SwiperSlide
            key={index}
			className="hover:bg-black hover:text-white transition-all duration-500 ease-in-out p-4 rounded-md text-center"
			>
            <p className="font-bold">{item}</p>
        </SwiperSlide>
    ))}
</Swiper>

</div>

		


<div className="w-full p-4">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Component */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-md p-4 space-y-2">
            <div className="flex flex-row justify-between">
                <div className="text-lg font-semibold text-gray-800">Facial | Basic facial with bleach</div>
                <div className="text-sm text-gray-500">1:30 mins  Female Only</div>
                <div className="text-sm text-gray-500">1000 Rs</div>
            </div>
            <div className="flex justify-end">
                <button className="w-[200px] py-2 text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition duration-200">
                    Book Now
                </button>
            </div>
        </div>

        {/* Second Component */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-md p-4 space-y-2">
            <div className="flex flex-row justify-between">
                <div className="text-lg font-semibold text-gray-800">Facial | Basic facial with bleach</div>
                <div className="text-sm text-gray-500">1:30 mins  Female Only</div>
                <div className="text-sm text-gray-500">1000 Rs</div>
            </div>
            <div className="flex justify-end">
                <button className="w-[200px] py-2 text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition duration-200">
                    Book Now
                </button>
            </div>
        </div>
    </div>
</div>






		</div>
		</>
	);
};

export default SalonServices;
