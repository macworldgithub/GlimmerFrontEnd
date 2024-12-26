import CardList from "@/common/card-list";
import Link from "next/link";
import React from "react";

import { BestSellersData } from "@/data";

const HotDeals = () => {
  return (
    <div className="px-2">
      <Link href="/selfcare-products" className="prose lg:prose-xl ">
        <h2 className="mb-2 md:mb-3 ">Hot Deals</h2>
      </Link>
      <CardList
        cards={BestSellersData}
        dataType="product"
        shouldAnimate={true}
      />
    </div>
  );
};

export default HotDeals;
