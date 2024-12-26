"use client";
import { screenBreakpoints } from "@/hooks";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const keyframes = `
  @keyframes moveLeftAndBack {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-50px); }
  }
`;

type Props = {
	cards: JSX.Element[];
	shouldAnimate?: boolean;
	className?: string;
};

const CardListWrapper = ({
	cards,
	shouldAnimate = false,
	className,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (!shouldAnimate) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setHasAnimated(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.8 },
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [hasAnimated, shouldAnimate]);

	return (
		<>
			<style>{keyframes}</style>
			<div className="relative hidden lg:block">
				<Swiper
					modules={[Scrollbar]}
					spaceBetween={30}
					breakpoints={{
						[screenBreakpoints.sm]: { slidesPerView: 1 },
						[screenBreakpoints.md]: { slidesPerView: 2 },
						[screenBreakpoints.lg]: { slidesPerView: 3 },
						[screenBreakpoints.xl]: { slidesPerView: 4 },
						[screenBreakpoints["2xl"]]: { slidesPerView: 5 },
					}}
					onSlideChange={() => console.log("slide change")}
					onSwiper={(swiper) => console.log(swiper)}
					className="my-2 w-full md:my-8 "
				>
					{cards.map((c, i) => (
						<SwiperSlide key={i} className="">
							{c}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div
				className={cn(
					"no-scrollbar flex select-none overflow-x-scroll lg:hidden",
					className,
				)}
				ref={containerRef}
			>
				<div
					style={{
						animation: hasAnimated
							? "moveLeftAndBack 0.7s ease-in-out"
							: "none",
					}}
					className="flex"
				>
					{...cards}
				</div>
			</div>
		</>
	);
};

export default CardListWrapper;
