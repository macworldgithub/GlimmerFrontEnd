import CardList from "@/common/card-list";
import SalonCards from "@/common/salon-cards";
import { SalonsData } from "@/data";
import { SalonType } from "@/types";
import Link from "next/link";
import React from "react";


const data = [
	{
        id: 1,
        name: 'Beautypest Inc.',
        rating: 4.9,
        reviews: 8959,
        location: 'V. kerület, Budapest',
        category: 'Beauty Salon',
        imageUrl: '/assets/saloonPicture/salon1.avif',
    },
    {
        id: 2,
        name: 'Canton Barber Quarry Bay',
        rating: 4.9,
        reviews: 4059,
        location: 'Quarry Bay, Hong Kong Island',
        category: 'Barbershop',
        imageUrl: '/assets/saloonPicture/salon2.avif',
    },
    {
        id: 3,
        name: 'Ida Spa Dorobanti',
        rating: 5.0,
        reviews: 3579,
        location: 'Sector 1, București',
        category: 'Spa',
        imageUrl: '/assets/saloonPicture/salon3.avif',
    },
    {
        id: 4,
        name: 'Beauty Loft Salon Fz Lcc',
        rating: 4.9,
        reviews: 429,
        location: 'Science Park Mont Rose Tower A',
        category: 'Beauty Salon',
        imageUrl: '/assets/saloonPicture/salon4.avif',
    },
    {
        id: 4,
        name: 'Beauty Loft Salon Fz Lcc',
        rating: 4.9,
        reviews: 429,
        location: 'Science Park Mont Rose Tower A',
        category: 'Beauty Salon',
        imageUrl: '/assets/saloonPicture/salon4.avif',
    },
    {
        id: 4,
        name: 'Beauty Loft Salon Fz Lcc',
        rating: 4.9,
        reviews: 429,
        location: 'Science Park Mont Rose Tower A',
        category: 'Beauty Salon',
        imageUrl: '/assets/saloonPicture/salon4.avif',
    },
    {
        id: 4,
        name: 'Beauty Loft Salon Fz Lcc',
        rating: 4.9,
        reviews: 429,
        location: 'Science Park Mont Rose Tower A',
        category: 'Beauty Salon',
        imageUrl: '/assets/saloonPicture/salon4.avif',
    },
	
  ];
const RecommendedSaloons = () => {
	const allSalons: SalonType[] = SalonsData;
	return (
		<div className="px-2 w-[99vw]">
			{/* <Link href={"/salons"} className="text-3xl font-semibold">
				<h2 className="mb-2 md:mb-3 pl-6">Recommended</h2>
			</Link> */}
            
			<SalonCards title="Recommended" salon={data} showButton={true}/>
			{/* <CardList cards={allSalons} dataType="salon" shouldAnimate={true} /> */}
		</div>
	);
};

export default RecommendedSaloons;
