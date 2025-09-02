"use client";

import React, { useEffect, useState } from "react";
import SalonCards from "@/common/salon-cards";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";

const RecommendedSaloons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendedSalons = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/salon-highlights?filter=recommended-salon`);
      setSalons(response.data);
    } catch (error) {
      console.error("Failed to fetch salons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedSalons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-2 w-[99vw]">
      <SalonCards title="Recommended"
        salonsProp={salons} showButton={false}
        titleHref="/salons/all_salons?filter=recommended-salon" 
      />
    </div>

  );
};

export default RecommendedSaloons;
