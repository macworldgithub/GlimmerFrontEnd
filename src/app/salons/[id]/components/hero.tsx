"use client";
import * as React from "react";
import salonImg1 from "@/assets/salon-profile/salon-profile -img1.png";
import salonImg2 from "@/assets/salon-profile/salon-profile -img2.png";
import salonImg3 from "@/assets/salon-profile/salon-profile -img3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineIosShare } from "react-icons/md";
import { BsFillCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
type Props = {
	srcs?: string[];
	SalonName?: string;
	reviews?: number;
	openingHours?: {
		open: string;
		close: string;
		days: string;
	};
	location?: {
		address: string;
		city: string;
		area: string;
	};
};

const SalonProfileHero = ({
	srcs = [],
	SalonName,
	reviews,
	openingHours,
	location,
}: Props) => {
	const _srcs =
		srcs.length > 0 ? srcs : [salonImg1.src, salonImg2.src, salonImg3.src]; // Ensure each array has multiple elements
	const locationUrl = location
		? `https://www.google.com/maps/search/${encodeURIComponent(location.area)}`
		: "https://www.google.com/maps/search/Karachi,+Pakistan";
	return (
		<div className=" mb-6 w-full md:mb-8 ">
			<div className="flex flex-col  mt-4">
				<div className="flex justify-between items-center">
					<div className=" prose lg:prose-">
						<h2> {SalonName || "Glimmer's Saloon"}</h2>
					</div>
					<div>
						<MdOutlineIosShare size={30} />
					</div>
				</div>

				<div className="flex flex-row  items-center mb-3">
					<p className="mr-1 ">{reviews || "5.0"}</p>
					<div className="flex flex-row mr-1">
						{Array.from({ length: reviews || 5 }, (_, index) => (
							<FaStar key={index} className="p-0 m-0" />
						))}
					</div>
					<BsFillCircleFill className="mx-3 " size={10} />
					<p className="mr-1  ">{openingHours?.days || "Mon-Fri"}</p>
					<p className="mr-1  ">{openingHours?.open || "(10:00 am"}</p>
					<p className="mr-1  ">{openingHours?.close || "10:00 pm)"}</p>
					<BsFillCircleFill className="mx-3 " size={10} />
					<Link
						href={locationUrl}
						className="text-secondary"
						target="_blank"
						rel="noopener noreferrer"
					>
						Get Directions
					</Link>
				</div>
			</div>

			<div className="md:hidden">
				<Swiper spaceBetween={30} loop={true} cssMode={true}>
					{_srcs.map((src, index) => (
						<SwiperSlide key={index}>
							<img
								src={src}
								className="w-full h-auto object-cover"
								alt={`img${index + 1}`}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="hidden md:grid grid-cols-8 gap-4">
				<div className="col-span-5">
					<img
						src={_srcs[0]}
						className="w-full h-auto md:h-full object-cover rounded-none"
						alt="Main img"
					/>
				</div>
				<div className="col-span-3 grid grid-rows-2 gap-2">
					{_srcs.slice(1).map((src, index) => (
						<img
							key={index}
							src={src}
							className="w-full h-[175px] md:h-full object-cover rounded-none"
							alt={`small img${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SalonProfileHero;
