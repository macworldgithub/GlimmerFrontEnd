import React from "react";
import clsx from "clsx";

interface BoxContainerProps {
    text?: string;
    showInput?: boolean;
    className?: string;
    textAligned?: boolean;
    animateGlow?: boolean;
}

const BoxContainer: React.FC<BoxContainerProps> = ({
    text = "Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and beauty tips.",
    showInput = true,
    className = "",
    textAligned = false,
    animateGlow = false
}) => {
    return (
        <div
            className={clsx(
                "flex flex-row items-center justify-center px-5 sm:px-6 md:px-10 opacity-0 animate-fadeInUp",
                className
            )}
        >
            <div
                style={{ backgroundImage: "url('/assets/addtoBag/boxContainer.png')" }}
                className={clsx(
                    "bg-black bg-opacity-60 p-10 md:p-[5%] rounded-2xl text-white max-w-5xl min-w-min shadow-lg backdrop-blur-md",
                    { "animate-pulse": animateGlow }
                )}
            >
                <p
                    className={clsx(
                        "text-base sm:text-lg md:text-2xl lg:text-4xl text-gray-800 mb-6 sm:mb-6 font-bold animate-slideInLeft",
                        { "w-1/2 text-left": textAligned }
                    )}
                >
                    {text}
                </p>

                {showInput && (
                    <div className="flex sm:flex-row max-sm:w-[16rem] items-center bg-white rounded-full overflow-hidden shadow-md max-w-xs sm:max-w-md mx-auto animate-popIn">
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            className="flex-grow px-5 py-3 sm:py-4 text-gray-800 outline-none text-sm sm:text-base max-sm:w-[9rem]"
                        />
                        <button className="bg-purple-800 text-white px-6 py-3 sm:py-4 text-sm sm:text-lg font-medium rounded-full transition-all duration-300 hover:bg-purple-900 w-full sm:w-auto">
                            Subscribe
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoxContainer;
