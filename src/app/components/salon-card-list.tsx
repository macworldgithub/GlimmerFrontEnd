import CardList from "@/common/card-list";
import { SalonType } from "@/types";
import Link from "next/link";
import { SalonsData } from "@/data";

type Props = {
	salons?: SalonType[];
};
const SalonCardList = ({ salons = [] }: Props) => {
	const allSalons: SalonType[] = salons.length > 0 ? salons : SalonsData;
	return (
		<div className="px-2">
			<Link href={"/salons"} className="prose lg:prose-xl">
				<h2 className="mb-2 md:mb-3">Salons</h2>
			</Link>
			<CardList cards={allSalons} dataType="salon" shouldAnimate={true} />
		</div>
	);
};

export default SalonCardList;
