import CardList from "@/common/card-list";
import { BudgetFriendlyData } from "@/data";
import Link from "next/link"; 

const BudgetFriendly = () => {
	return (
		<div className="px-2">
			<Link href="/selfcare-products" className="prose lg:prose-xl ">
				<h2 className="mb-2 md:mb-3 ">Budget Friendly</h2>
			</Link>
			<CardList cards={BudgetFriendlyData} dataType="product" />
		</div>
	);
};
2;
export default BudgetFriendly;
