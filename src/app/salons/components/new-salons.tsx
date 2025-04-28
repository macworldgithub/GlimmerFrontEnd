"use client";

import React, { useEffect, useState } from "react";
import SalonCards from "@/common/salon-cards";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";

const NewSaloons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewToGlimmerSalons = async () => {
	try {
	  const response = await axios.get(`${BACKEND_URL}/admin/salon-highlights?filter=new-to-glimmer`);
	  setSalons(response.data); 
	} catch (error) {
	  console.error("Failed to fetch salons:", error);
	} finally {
	  setLoading(false);
	}
  };

  useEffect(() => {
	fetchNewToGlimmerSalons();
  }, []);

  if (loading) {
	return <div>Loading...</div>; 
  }

  return (
	<div className="px-2 w-[99vw]">
	  <SalonCards title="New to Glimmer" salonsProp={salons} showButton={false} />
	</div>
  );
};

export default NewSaloons;
