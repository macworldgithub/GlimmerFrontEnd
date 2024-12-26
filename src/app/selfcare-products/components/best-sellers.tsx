import CardList from "@/common/card-list";
import { BestSellersData } from "@/data";
import Link from "next/link"; 

const BestSellers = () => {
	return (
		<div className="px-2">
			<Link href="/selfcare-products" className="prose lg:prose-xl ">
				<h2 className="mb-2 md:mb-3 ">Best Sellers</h2>
			</Link>
			<CardList
				cards={BestSellersData}
				dataType="product"
				shouldAnimate={true}
			/>
		</div>
	);
};

export default BestSellers;
