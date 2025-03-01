import CardList from "@/common/card-list";
import { SalonsData } from "@/data";
import { SalonType } from "@/types";
import Link from "next/link";

const Saloons = () => {
	const allSalons: SalonType[] = SalonsData;
	return (
		<div className="px-4 md:px-16 lg:px-[10rem] w-[99vw]">
			<Link href={"/salons"} className="prose lg:prose-xl">
				<h2 className="mb-2 md:mb-3">Salons</h2>
			</Link>
			<CardList cards={allSalons} dataType="salon" shouldAnimate={true} />
		</div>
	);
};

export default Saloons;
