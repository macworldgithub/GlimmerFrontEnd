import React from "react";
import Image from "next/image";

interface Assurance {
  text: string;
  picture: string;
}

const Assurity = () => {
  const assurances: Assurance[] = [
    { text: "Quality Assurance ", picture: "/assets/assurity/vector.png" },
      { text: "Customer Satisfaction", picture: "/assets/assurity/Vector1.png" },
    { text: "Trust & Reliability", picture: "/assets/assurity/vector2.png" },
    { text: "Personalization", picture: "/assets/assurity/vector3.png" },
    { text: "Continous Improvement", picture: "/assets/assurity/vector4.png" },
  ];

  function ResponsiveSeparator() {
    return (
      <div className="bg-gray-300 w-px h-10 max-md:w-[100px] max-md:my-3 max-md:h-px mx-10"></div>
    );
  }
  return (
  <div className="hidden md:flex w-[99vw] px-[8rem] py-6 justify-center items-center flex-col md:flex-row h-max">

      {assurances.map((assurance, index) => (
        <div key={index} className="flex gap-2 items-center max-md:flex-col">
          <Image
            src={assurance.picture}
            alt={assurance.text}
            width={50}
            height={50}
          />
          <p className="font-normal">{assurance.text}</p>
          {index !== assurances.length - 1 && <ResponsiveSeparator />}
        </div>
      ))}
    </div>
  );
};

export default Assurity;
