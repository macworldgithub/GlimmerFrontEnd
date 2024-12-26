"use client";
import React, { useState, useEffect } from "react";

const CookieBanner = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Check localStorage on component mount
	useEffect(() => {
		const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
		if (!hasAcceptedCookies) {
			setIsVisible(true);
		}
	}, []);

	// Function to handle acceptance
	const handleAccept = () => {
		localStorage.setItem("cookiesAccepted", "true");
		setIsVisible(false);
	};

	// Function to handle decline
	const handleDecline = () => {
		localStorage.setItem("cookiesAccepted", "true");
		setIsVisible(false);
	};

	// Render the banner only if it's visible
	if (!isVisible) return null;

	return (
		<div className="fixed inset-x-0 bottom-0 z-50 mx-auto flex flex-col items-center justify-center border border-neutral bg-base-300 p-4 text-neutral sm:p-6 lg:p-8">
			<p className="mb-4 text-center text-lg md:text-xl">
				We use cookies and other tracking technologies to improve your browsing
				experience on our website, to show you personalized content and targeted
				ads, to analyze our website traffic, and to understand where our
				visitors are coming from.
			</p>
			<div className="flex flex-col gap-2 md:flex-row">
				<button
					onClick={handleAccept}
					className="btn btn-secondary mb-2 min-w-[200px] rounded-lg font-semibold text-sm md:mb-0 md:text-base"
				>
					I Agree
				</button>
				<button
					onClick={handleDecline}
					className="btn btn-outline min-w-[200px] rounded-lg font-semibold text-sm md:text-base"
				>
					I Decline
				</button>
			</div>
			{/* <button className="mt-2 text-sm text-gray-300 underline">
				Change my preferences
			</button> */}
		</div>
	);
};

export default CookieBanner;
