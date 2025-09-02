"use client";

import React, { useEffect, useState } from "react";
import SalonCards from "@/common/salon-cards";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";

const TrendingSaloons = () => {
	const [salons, setSalons] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchTrendingSalons = async () => {
		try {
			const response = await axios.get(`${BACKEND_URL}/admin/salon-highlights?filter=trending-salon`);
			setSalons(response.data);
		} catch (error) {
			console.error("Failed to fetch salons:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTrendingSalons();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="px-2 w-[99vw]">
			<SalonCards title="Trending"
				salonsProp={salons} showButton={false}
				titleHref="/salons/all_salons?filter=trending-salon" 
			/>
		</div>
	);
};

export default TrendingSaloons;
