"use client";
import { cn } from "@/lib/utils";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

const keyframes = `
  @keyframes moveLeftAndBack {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-50px); }
  }
`;

type Props = {
	children: React.ReactNode;
	shouldAnimate?: boolean;
	className?: string;
};

const CardListWrapper = ({
	children,
	shouldAnimate = false,
	className,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDown, setIsDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [velocity, setVelocity] = useState(0);
	const [lastMoveTime, setLastMoveTime] = useState(Date.now());
	const [hasAnimated, setHasAnimated] = useState(false);
	const [scrolling, setScrolling] = useState(false);
	const SCROLL_SPEED_MULTIPLIER = 1; // Adjust the scroll speed
	const VELOCITY_IN_PIXELS = 20; // pixels per second
	const DECELERATION_FACTOR = 0.95; // Adjust deceleration factor

	const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		setIsDown(true);
		setTimeout(() => {
			setScrolling(true);
		}, 100);
		// setScrolling(true);
		if (containerRef.current) {
			containerRef.current.classList.add("active");
			setStartX(e.pageX - containerRef.current.offsetLeft);
			setScrollLeft(containerRef.current.scrollLeft);
			setVelocity(0);
		}
	};

	const handleMouseLeave = () => {
		setIsDown(false);
		if (containerRef.current) {
			containerRef.current.classList.remove("active");
		}
	};

	const handleMouseUp = () => {
		setIsDown(false);
		if (containerRef.current) {
			containerRef.current.classList.remove("active");
		}
		setTimeout(() => {
			setScrolling(false);
		}, 100); // Adjust the timeout duration as needed
	};

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!isDown) return;
		e.preventDefault();
		if (containerRef.current) {
			const x = e.pageX - containerRef.current.offsetLeft;
			const walk = (x - startX) * SCROLL_SPEED_MULTIPLIER;
			containerRef.current.scrollLeft = scrollLeft - walk;

			// Calculate velocity
			const now = Date.now();
			const deltaTime = now - lastMoveTime;
			setVelocity((walk / deltaTime) * VELOCITY_IN_PIXELS);
			setLastMoveTime(now);
		}
	};

	useEffect(() => {
		if (!isDown && velocity !== 0) {
			const interval = setInterval(() => {
				if (containerRef.current) {
					containerRef.current.scrollLeft -= velocity * 0.016; // 16ms for 60fps
					setVelocity(velocity * DECELERATION_FACTOR);
					if (Math.abs(velocity) < 0.1) {
						clearInterval(interval);
						setScrolling(false);
					}
				}
			}, 16);
			return () => clearInterval(interval);
		}
	}, [isDown, velocity]);

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
		<div
			className={cn(
				"no-scrollbar flex select-none overflow-x-scroll",
				className,
			)}
			ref={containerRef}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
		>
			<div
				style={{
					animation: hasAnimated ? "moveLeftAndBack 0.7s ease-in-out" : "none",
				}}
				className="flex"
			>
				<style>{keyframes}</style>
				{children}
			</div>
		</div>
	);
};

export default CardListWrapper;
