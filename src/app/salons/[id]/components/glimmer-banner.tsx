"use client";
import * as React from "react";
import glimmerBannerImg from "@/assets/salon-profile/Glimmer-Banner-img.png";
import AutoSlider from "@/common/auto-slider";
type Props = {
	srcs?: string[];
};
const GlimmerBanner = ({ srcs = [] }: Props) => {
	const _srcs = srcs.length > 0 ? srcs : [glimmerBannerImg.src];
	return (
		<div className="mb-6 md:mb-14">
			<AutoSlider srcs={_srcs} />
		</div>
	);
};

export default GlimmerBanner;
