import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa"; // Right arrow icon from react-icons

const servicesData = [
  { name: "Haircut", image: "https://images.icedistrict.com/wp-content/uploads/2024/01/20093619/parlour-barba-1-819x1024.jpeg" },
  { name: "Hair Style", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-jF4lalKrWiVxX5PHlDipLIhulQ_IVSmkldX3aV6Si1ZAUfW8rtvKIV5i6R1VxgCBjg&usqp=CAU" },
  { name: "Beard", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwXvi6eeTB3gheP6FR_l4QfNSn5P10dVQS81aJlrA7JNh2tKzijVYxLtfcK33XZIo8jV8&usqp=CAU" },
  { name: "Hair Dyes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOYjVYLM7LzOshWOVU4v0M_f2FweW1AWBQQ&s" },
  { name: "Hair Treatment", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFD4llcguPR3gpW0hb3QgLlLusm80Cc5woaQ&s" },
  { name: "Face", image: "https://images.squarespace-cdn.com/content/v1/5c4f6ba1e2ccd1ee6075495d/83bfd75e-3e51-4f26-afa7-30db2a532f68/woman-sheet-face-mask.jpg" },
  { name: "Skin Treatment", image: "https://d3b3by4navws1f.cloudfront.net/shutterstock_352907537.jpg" },
  { name: "Manicure and Pedicure", image: "https://static.wixstatic.com/media/28d39c_39fee459703c4ddcb33b511055322794~mv2.jpg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/28d39c_39fee459703c4ddcb33b511055322794~mv2.jpg" },
  { name: "Body Massage", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFDGLuKutHbPXTt1UsgyJlOmULhQzs8Es4w&s" },
  { name: "Scrubbing and Extension", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0Zx3rtPZit2ydHv7A6d8HgeFUvyMT7ca4KOp5Xxss3-4ZHSWG8Vl9q9sfjctGuYUojY&usqp=CAU" },
  { name: "Polishing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qUoidMkBZlsxAcutRgJECW01CdcZ0R4vCw&s" },
  { name: "Nails", image: "https://cdn.shopify.com/s/files/1/0422/7999/3512/files/1_e76c7739-84a3-41d1-bae2-db2d946accfe_480x480.jpg?v=1713070903" },
  { name: "Wax", image: "https://5.imimg.com/data5/XB/XM/MY-54802893/ladies-hots-waxing-services.jpg" },
  { name: "Threading", image: "https://www.royalthreadings.com/uploads/16964600968.jpg" },
  { name: "Makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqqJvkZZN7aS5Dhrc_dlu0bQQVhKs583ghTXQR3NZJpO5qNAvTeN_e7jI-W-pLNG9XbY&usqp=CAU" },
  { name: "Eyes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSf_l331J2pxmhOViuhAukwqtTUR5iK_5GoA&s" },
];

const Services = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleServices = () => {
    router.push('/salons/services');
  }
  return (
    <div className="px-4 md:px-16 lg:px-[10rem] w-[99vw] mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Our Services
        </h2>
      </div>

      {!showAll && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.slice(0, 9).map((service, index) => (
            <div
              key={index}
              className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer"
              onClick={handleServices}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-44"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>
              </div>
              {/* Arrow Icon */}
              <div className="absolute bottom-4 right-4 p-2 bg-black text-white rounded-full">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scrollable Container for All Services when showAll is true */}
      {showAll && (
        <div className="mt-8 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer"
                onClick={handleServices}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                </div>
                {/* Arrow Icon */}
                <div className="absolute bottom-4 right-4 p-2 bg-black text-white rounded-full">
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

 
      <div className="text-center mt-8">
        <button
          onClick={handleToggle}
          className="px-6 py-3 bg-black text-white rounded-full transform transition-all duration-300 hover:scale-105"
        >
          {showAll ? "View Less" : "View More"}
        </button>
      </div>
    </div>
  );
};

export default Services;
