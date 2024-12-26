import CardList from "@/common/card-list";
import { SalonsData } from "@/data";
import { SalonType } from "@/types";
import Link from "next/link";
import React from "react";

const NewSaloons = () => {
	const allSalons: SalonType[] = SalonsData;
	return (
		<div className="px-2">
			<Link href={"/salons"} className="prose lg:prose-xl">
				<h2 className="mb-2 md:mb-3">New Salons</h2>
			</Link>
			<CardList cards={allSalons} dataType="salon" shouldAnimate={true} />
		</div>
	);
};

export default NewSaloons;
