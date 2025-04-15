import CardList from "@/common/card-list";
import SalonCards from "@/common/salon-cards";
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
		<div className="">
            <SalonCards title="Nearby Salons" showButton={true} className="lg:!mx-10 xl:!mx-10" />
		</div>
	);
};

export default SalonsNearby;
