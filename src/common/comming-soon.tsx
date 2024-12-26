"use client";
import React from "react";
import { useState, useEffect } from "react";

const ComingSoon: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const countdownDate = new Date("2024-12-31T23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft("Launched!");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center p-10 bg-opacity-50 bg-black rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Coming Soon!
        </h1>
        <p className="text-2xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
          We're working hard to bring you something amazing.
        </p>
        <div className="text-3xl font-semibold animate__animated animate__fadeIn animate__delay-3s">
          <span>{timeLeft}</span>
        </div>
        <div className="mt-6">
          <a
            href="mailto:contact@yourdomain.com"
            className="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out"
          >
            Stay Updated
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
