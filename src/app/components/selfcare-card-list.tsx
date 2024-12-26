import CardList from "@/common/card-list";
import { SelfCareProductsData } from "@/data";
import { ProductType } from "@/types";
import Link from "next/link"; 

type Props = {
	selfcareItems?: ProductType[];
};
const SeftcareCardList = ({ selfcareItems = [] }: Props) => {
	const allSelfcareItems: ProductType[] =
		selfcareItems.length > 0 ? selfcareItems : SelfCareProductsData;
	return (
		<div className="px-2">
			<Link href="/selfcare-products" className="prose lg:prose-xl">
				<h2 className="mb-2 md:mb-3">Self-Care Items</h2>
			</Link>
			<CardList cards={allSelfcareItems} dataType="product" />
		</div>
	);
};

export default SeftcareCardList;
