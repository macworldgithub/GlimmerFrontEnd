import React from "react";
import Salonfilter from "./salonFIlter";
const Hero = () => {
  return (
    <div
      className="hero mb-8 min-h-[75vh] lg:min-h-[65vh] w-[99vw]"
      style={{
        background:
          "linear-gradient(135deg, #A120FF 2%, #8A2BE2 30%, #FBE8A5 100%)",
        position: "relative",
        zIndex: 10, 
      }}
    >
      <div className="hero-content">
        <div className="px-10">
          <div className="mb-4 text-3xl lg:mb-8 lg:text-6xl font-semibold">
            <h1>Book local beauty and wellness services</h1>
          </div>
          <Salonfilter />
        </div>
      </div>
    </div>
  );
};

export default Hero;
