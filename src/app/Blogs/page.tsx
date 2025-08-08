'use client';

import React from 'react';
import Image from 'next/image';

const categories = [
  { label: 'Fragrance', img: '/images/cat-fragrance.jpg' },
  { label: 'Hair Care', img: '/images/cat-haircare.jpg' },
  { label: 'Skin Care', img: '/images/cat-skincare.jpg' },
  { label: 'Makeup', img: '/images/cat-makeup.jpg' },
  { label: 'Lenses', img: '/images/cat-lenses.jpg' },
];


const popularPosts = [
  {
    title: 'How to Know If You Have Sensitive Skin and What to Do About It',
    img: '/images/post-sensitive-skin.jpg',
  },
  {
    title: 'The Science Behind Anti-Aging Moisturizers: Do They Really Work?',
    img: '/images/post-anti-aging.jpg',
  },
  {
    title: '2024 Winter Coloring Sheets',
    img: '/images/post-coloring.jpg',
  },
  {
    title: 'How to Help Manage Swelling in Pregnancy: A Mama-To-Be’s Guide',
    img: '/images/post-pregnancy.jpg',
  },
];

const BlogsPage = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative mt-4">
        <Image
          src="/images/blog-banner.jpg"
          alt="Blog Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Categories */}
      <section className="py-10">
        <h2 className="text-center text-3xl font-bold mb-6">Explore by Category</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center w-[90px]">
              <Image
                src={cat.img}
                alt={cat.label}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <p className="text-sm font-medium mt-2 text-center">{cat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-200 my-8" />

      {/* Most Popular */}
      <section className="pb-12">
        <h2 className="text-center text-3xl font-bold mb-6">Most Popular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12">
          {popularPosts.map((post, idx) => (
            <div key={idx}>
              <div className="w-full h-[220px] relative">
                <Image
                  src={post.img}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
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
