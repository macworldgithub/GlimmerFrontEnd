import CardList from "@/common/card-list";
import { NewArrivalsData } from "@/data";
import Link from "next/link"; 

const RecommendedProducts = () => {
	return (
		<div className="px-2">
			<Link href="/selfcare-products" className="prose lg:prose-xl ">
				<h2 className="mb-2 md:mb-3 ">Recommended Products</h2>
			</Link>
			<CardList cards={NewArrivalsData} dataType="product" />
		</div>
	);
};

export default RecommendedProducts;
