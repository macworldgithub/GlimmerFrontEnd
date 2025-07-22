import React from "react";
import { Puff } from "react-loader-spinner";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex justify-center items-center">
      <Puff height={80} width={80} color="#7c3aed" ariaLabel="Loading..." />
    </div>
  );
};

export default FullScreenLoader;
