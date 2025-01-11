"use client";
import React from "react";
import { useRouter } from "next/router";
import { useSearchParams, usePathname } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";

import Card from "@/common/Card";

interface CardItem {
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  base_price: number;
  discounted_price: number;
}

const sampleProducts: CardItem[] = [
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "City Skyline",
    description: "Experience the bustling city life and iconic skyline views.",
    image1:
      "https://images.unsplash.com/photo-1495106245170-21eae1e611b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNpdHl8ZW58MHx8fHwxNjg5MTk3MzIx&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1545156515-5f114d6685f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNpdHl8ZW58MHx8fHwxNjg5MTk3MzU3&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506377215391-5d4a33e271b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGNpdHl8ZW58MHx8fHwxNjg5MTk3Mzg1&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 200,
    discounted_price: 180,
  },
  {
    name: "Beach Paradise",
    description: "Relax by the tranquil waves and golden sands of the beach.",
    image1:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJlYWNofGVufDB8fHx8MTY4OTE5NzQyNQ&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJlYWNofGVufDB8fHx8MTY4OTE5NzQ0Mw&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1533050487298-09f6c5a2c05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGJlYWNofGVufDB8fHx8MTY4OTE5NzQ2Mg&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 250,
    discounted_price: 220,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
  {
    name: "Forest Adventure",
    description:
      "Explore the lush greenery and serene landscapes of the forest.",
    image1:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
    image2:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
    image3:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
    base_price: 150,
    discounted_price: 120,
  },
];

const Temp = () => {
  const searchParams = useSearchParams();

  const path = usePathname();

  const category = searchParams.get("subcategory");
  const subcategory = searchParams.get("item");

  return (
    <div>
      <CategoryNavMenu />
      {/* <h2>{category}</h2>
      <h2>{subcategory}</h2>
      <h2>{path}</h2> */}
      <div className="w-[100%] h-max flex flex-wrap justify-between gap-2 p-2 ">
        {sampleProducts.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default Temp;
