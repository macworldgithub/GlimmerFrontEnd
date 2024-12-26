"use client";
import * as React from "react";
import brandProduct1 from "@/assets/images/brand-product-img1.png";
import brandProduct2 from "@/assets/images/brand-product-img2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

type Props = {
	srcs?: string[];
	type?:
		| "slide"
		| "fade"
		| "cube"
		| "coverflow"
		| "flip"
		| "creative"
		| "cards";
	delay?: number | null;
};

const BrandProductImages = ({
	srcs = [],
	type = "slide",
	delay = 3000,
}: Props) => {
	const _srcs = srcs.length > 0 ? srcs : [brandProduct1.src, brandProduct2.src];
	const modules = [];
	if (delay) modules.push(Autoplay);
	if (type === "fade") modules.push(EffectFade);

	return (
		<Swiper
			modules={modules}
			spaceBetween={50}
			slidesPerView={1} // Default to 1 slide on mobile
			effect={type}
			autoplay={{ delay: delay as number }}
			onError={(e) => console.log("[hero swiper] error: ", e)}
			className="mb-6 w-full md:mb-8"
			breakpoints={{
				768: {
					slidesPerView: 2, // Show 2 slides on medium screens and above
				},
			}}
			cssMode={true}
		>
			{_srcs.map((s) => (
				<SwiperSlide key={s}>
					<div className="w-full overflow-hidden">
						<img
							src={s}
							className="w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
							alt="Swiper Carousel component"
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default BrandProductImages;
