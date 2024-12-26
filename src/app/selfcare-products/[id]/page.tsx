import { SelfCareProductsData } from "@/data";
import ProductDetail from "./components/product-details";
import Link from "next/link";
import CategoryNavMenu from "@/common/category-nav-menu";

import HotDeals from "./components/Hot-deals";

interface Params {
	id: string;
}
const Page = async ({ params }: { params: Promise<Params> }) => {
	const { id } = await params;
	const [product] = SelfCareProductsData.filter(
		(product) => product._id === id,
	);
	if (!product) {
		return (
			<>
				<CategoryNavMenu />
				<div className="hero min-h-[70vh] bg-base-200">
					<div className="hero-content text-center">
						<div className="max-w-md">
							<h1 className="font-bold text-5xl">Product not found</h1>
							<p className="py-6">this product is not available</p>
							<Link href="/selfcare-products">
								<button className="btn btn-secondary">Continue Shopping</button>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<CategoryNavMenu />
			<ProductDetail product={product} />
		</>
	);
};

export default Page;
