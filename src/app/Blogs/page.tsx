"use client";

import React from "react";
import Image from "next/image";
import BlogsBanner from "@/assets/images/BlogsBanner.png";
import CatFragrance from "@/assets/images/cat-fragrance.png";
import CatHairCare from "@/assets/images/cat-haircare.png";
import CatSkinCare from "@/assets/images/cat-skincare.png";
import CatMakeup from "@/assets/images/cat-makeup.png";
import CatLenses from "@/assets/images/cat-lenses.png";

const categories = [
  { label: "Fragrance", img: CatFragrance },
  { label: "Hair Care", img: CatHairCare },
  { label: "Skin Care", img: CatSkinCare },
  { label: "Makeup", img: CatMakeup },
  { label: "Lenses", img: CatLenses },
];

const popularPosts = [
  {
    title: "How to Know If You Have Sensitive Skin and What to Do About It",
    img: "/images/post-sensitive-skin.jpg",
  },
  {
    title: "The Science Behind Anti-Aging Moisturizers: Do They Really Work?",
    img: "/images/post-anti-aging.jpg",
  },
  {
    title: "2024 Winter Coloring Sheets",
    img: "/images/post-coloring.jpg",
  },
  {
    title: "How to Help Manage Swelling in Pregnancy: A Mama-To-Be’s Guide",
    img: "/images/post-pregnancy.jpg",
  },
];

const BlogsPage = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={BlogsBanner}
          alt="Blog Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Categories */}
      <section className="pt-6 pb-8">
        <h2 className="text-center text-4xl font-extrabold mb-8 ml-52">
          Explore by Category
        </h2>

        <div className="flex justify-between gap-4 ml-48">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-full max-w-[150px]"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-center">
                {cat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-200 my-8" />

      {/* Most Popular */}
      <section className="pb-12">
        <h2 className="text-center text-3xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12">
          {popularPosts.map((post, idx) => (
            <div key={idx}>
              <div className="w-full h-[220px] relative">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <p className="mt-3 font-medium">{post.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
