"use client";

import { getSalonById } from "@/api/salon";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SalonDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 
  const [salonData, setSalonData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSalonData = async () => {
        try {
          const data = await getSalonById(id as string); // Fetch data by id
          setSalonData(data);
        } catch (error) {
          setError("Failed to load salon details");
        } finally {
          setLoading(false);
        }
      };
      fetchSalonData();
    }
  }, [id]); // Run the effect when 'id' changes

  if (loading) return <p>Loading salon details...</p>;
  if (error) return <p>{error}</p>;
  if (!salonData) return <p>No data available for this salon.</p>;

  // Display salon details
  return (
    <div className="salon-details">
      <h1>{salonData.salon_name}</h1>
      <img
        src={salonData.image1}
        alt={salonData.salon_name}
        style={{ maxWidth: "100%" }}
      />
      <div>
        <h2>Owner: {salonData.owner_name}</h2>
        <p>Email: {salonData.email}</p>
        <p>Contact: {salonData.contact_number}</p>
        <p>Address: {salonData.address}</p>
        <p>About: {salonData.about}</p>
        <p>
          Opening Hours: {salonData.openingHour} - {salonData.closingHour}
        </p>
      </div>
      {/* You can add more details or images if needed */}
      {salonData.image2 && <img src={salonData.image2} alt="Salon Image 2" />}
      {salonData.image3 && <img src={salonData.image3} alt="Salon Image 3" />}
      {salonData.image4 && <img src={salonData.image4} alt="Salon Image 4" />}
    </div>
  );
};

export default SalonDetailsPage;
