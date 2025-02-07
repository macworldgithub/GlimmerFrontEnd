import Image from "next/image";
import React from "react";

const BoxContainer = () => {
    return (
        <div
            className="flex items-center justify-center px-5">
            <div style={{ backgroundImage: "url('/assets/addtoBag/boxContainer.png')" }} className="bg-black bg-opacity-60 p-10 md:p-20 rounded-2xl text-center text-white max-w-5xl min-w-min shadow-lg backdrop-blur-md">
                <p className="text-lg md:text-4xl text-gray-800 mb-6 font-bold">
                    Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and beauty tips.
                </p>

                {/* Input and Button */}
                <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address..."
                        className="flex-grow px-5 py-3 text-gray-800 outline-none text-base"
                    />
                    <button className="bg-purple-800 text-white px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 hover:bg-purple-900">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoxContainer;
