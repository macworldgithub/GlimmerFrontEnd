// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { FaStar } from 'react-icons/fa';
// import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';


// interface Salon {
//   id: number;
//   name: string;
//   rating: number;
//   reviews: number;
//   location: string;
//   category: string;
//   imageUrl: string;
// }


// interface SalonCardProps {
//   salon: Salon;
// }


// const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
//   return (
//     <div className="flex-shrink-0 w-[285px] h-72 bg-white rounded-lg border border-gray-300 overflow-hidden mb-14">
//       {/* Image Section */}
//       <div className="h-[56%] w-full relative">
//         <Image src={salon.imageUrl} alt={salon.name} layout="fill" />
//       </div>

//       {/* Content Section */}
//       <div className="h-[40%] px-4 pt-2 pb-1 flex flex-col justify-between">
//         <h3 className="text-md font-semibold">{salon.name}</h3>
//         <div className="flex items-center">
//           <span className="text-black flex items-center gap-1 text-sm font-semibold">
//             {salon.rating} <FaStar size={12} />
//           </span>
//           <span className="text-gray-500 text-sm ml-1">({salon.reviews})</span>
//         </div>
//         <p className="text-xs text-gray-500 mb-1">{salon.location}</p>
//         <span className="text-xs border border-gray-300 px-2 py-1 rounded-full inline-block self-start">
//           {salon.category}
//         </span>
//       </div>
//     </div>
//   );
// };


// interface SalonCardsProps {
//   salons: Salon[];
// }


// const SalonCards: React.FC<SalonCardsProps> = ({ salons }) => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [showArrows, setShowArrows] = useState(false);

//   useEffect(() => {
//     const updateShowArrows = () => {
//       setShowArrows(window.innerWidth >= 1024);
//     };
//     window.addEventListener('resize', updateShowArrows);
//     updateShowArrows();
//     return () => window.removeEventListener('resize', updateShowArrows);
//   }, []);

//   const nextSlide = () => {
//     containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
//   };

//   const prevSlide = () => {
//     containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
//   };

//   return (
//     <div className="relative w-full max-w-7xl xl:w-full mx-auto">
//       <div
//         ref={containerRef}
//         className="flex overflow-x-auto scroll-smooth gap-7 py-4 px-4 scrollbar-hide"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         {salons.map((salon) => (
//           <SalonCard key={salon.id} salon={salon} />
//         ))}
//       </div>

//       {showArrows && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 border border-gray-300 bg-white p-2 rounded-full"
//           >
//             <FiArrowLeft size={24} />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 border border-gray-300 bg-white p-2 rounded-full"
//           >
//             <FiArrowRight size={24} />
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default SalonCards;





'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from "next/navigation"; 

interface Salon {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  imageUrl: string;
}

interface SalonCardProps {
  salon: Salon;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
   return (
    <div className="w-[320px] h-[320px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Image Section */}
      <div className="h-[60%] w-full relative">
        <Image src={salon.imageUrl} alt={salon.name} layout="fill" objectFit="cover" />
      </div>

      {/* Content Section */}
      <div className="h-[40%] px-4 pt-2 pb-1 flex flex-col justify-between">
        <h3 className="text-md font-semibold self-start">{salon.name}</h3>
        <div className="flex items-center">
          <span className="text-black flex items-center gap-1 text-sm font-semibold">
            {salon.rating} <FaStar size={12} />
          </span>
          <span className="text-gray-500 text-sm ml-1">({salon.reviews})</span>
        </div>
        <p className="text-xs text-gray-500 mb-1 self-start">{salon.location}</p>
        <span className="text-xs border border-gray-300 px-2 py-1 rounded-full inline-block self-start">
          {salon.category}
        </span>
      </div>
    </div>
  );
};

interface SalonCardsProps {
  salons: Salon[];
  title: string;
}

const SalonCards: React.FC<SalonCardsProps> = ({ salons, title }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showArrows, setShowArrows] = useState(true);
  const router = useRouter();

  const getVisibleCount = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) {
      setShowArrows(true);
      return 3;
    }
    setShowArrows(false);
    return 4;
  };

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Circular navigation logic
  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % salons.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + salons.length) % salons.length);
  };

  const visibleSalons = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleSalons.push(salons[(startIndex + i) % salons.length]);
  }


   const handleViewMore = () => {
    router.push("/salons/services");
   }


  return (
    <div className="relative w-full max-w-7xl mx-auto text-center">
      {/* Dynamic Heading */}
      <h2 className="text-3xl font-semibold  mb-4 text-left pl-6" >{title}</h2>

      {/* Cards Display */}
      <div className="flex justify-center gap-5 py-4 px-4">
        {visibleSalons.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>

      {/* Arrows (Only Show on max-lg and Below) */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 border border-gray-300 bg-white p-2 rounded-full shadow-md"
          >
            <FiArrowLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 border border-gray-300 bg-white p-2 rounded-full shadow-md"
          >
            <FiArrowRight size={24} />
          </button>
        </>
      )}

      {/* View More Button */}
      <button className="mt-4 bg-[#583FA8] text-white py-2 px-6 rounded-lg mb-6"
      onClick={handleViewMore}
      >
        View More</button>
    </div>
  );
};

export default SalonCards;
