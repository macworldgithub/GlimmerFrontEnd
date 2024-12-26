import React from "react";
import CardList from "@/common/card-list";
import { areasData } from "@/data";

const BrowseByAreaList = () => {
	return (
		<div className="">
			<h2 className="mt-4 mb-6 text-left font-bold text-3xl ">
				Browse By Area
			</h2>
			<CardList dataType="area" cards={areasData} />
		</div>
	);
};

export default BrowseByAreaList;
