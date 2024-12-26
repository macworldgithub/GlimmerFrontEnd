"use client";
import * as React from "react";
import exclusiveOffer from "@/assets/images/exclusive-offer-img.png";
import AutoSlider from "@/common/auto-slider";
type Props = {
	srcs?: string[];
};
const Hero = ({ srcs = [] }: Props) => {
	const _srcs = srcs.length > 0 ? srcs : [exclusiveOffer.src];
	return (
		<div className="mb-6 md:mb-14">
			<AutoSlider srcs={_srcs} />
		</div>
	);
};

export default Hero;
