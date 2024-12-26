"use client";
import * as React from "react";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import AutoSlider from "@/common/auto-slider";
type Props = {
	srcs?: string[];
};
const Hero = ({ srcs = [] }: Props) => {
	const _srcs = srcs.length > 0 ? srcs : [HeroImg1.src, HeroImg2.src];
	return (
		<div className="mb-6 md:mb-14">
			<AutoSlider srcs={_srcs} />
		</div>
	);
};

export default Hero;
