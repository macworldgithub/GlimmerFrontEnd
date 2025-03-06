import CardList from "@/common/card-list";
import { SalonsData } from "@/data";
import { SalonType } from "@/types";
import Link from "next/link";
import React from "react";

interface SalonsNearbyProps {
	currentSalonAddress?: string;
}

const SalonsNearby = ({ currentSalonAddress }: SalonsNearbyProps) => {
	const allSalons: SalonType[] = SalonsData;

	const nearbySalons = allSalons.filter((salon) => {
		return salon.address === currentSalonAddress; // Filter condition
	});

	return (
		<div className="w-[99vw] p-10 md:mb-8">
			<Link href="/salons" className="prose lg:prose-xl">
				<h2 className="md:mb-3">Nearby Salons</h2>
			</Link>
			{nearbySalons.length > 0 ? (
				<CardList cards={nearbySalons} dataType="salon" shouldAnimate={true} />
			) : (
				<p className="prose lg:prose-xl">No nearby salons found.</p>
			)}
		</div>
	);
};

export default SalonsNearby;
