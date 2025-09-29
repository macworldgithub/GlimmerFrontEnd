"use client";
import * as React from "react";
import exclusiveOffer from "@/assets/images/exclusive-offer-img.png";
import AutoSlider from "@/common/auto-slider";
import { StaticImageData } from "next/image";
type Props = {
  srcs?: StaticImageData[];
};
const Hero = ({ srcs = [] }: Props) => {
	const _srcs = srcs.length > 0 ? srcs : [exclusiveOffer];
	return (
		<div className="mb-6 md:mb-14">
			<AutoSlider srcs={_srcs} />
		</div>
	);
};

export default Hero;
