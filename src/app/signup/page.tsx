"use client";

import React from "react";
import { createUser } from "./actions";
import { useActionState } from "react";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";

export default function SignUpForm() {
  const [data, action, isPending] = useActionState(createUser, undefined);

  return (
    <div className="flex items-center justify-center p-5 min-h-screen bg-gradient-to-r from-[#ffc759] to-[#ebe9f7]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-evenly">
          <h2 className="text-3xl font-bold text-center text-[#333] mb-6">
            Sign up
          </h2>
          <img src={Logo.src} alt="logo" className="h-10 hidden md:block " />
        </div>

        <form action={action} method="POST">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg text-[#333] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                placeholder="Enter your full name"
                required
              />
              {data?.errors?.name && (
                <p className="text-red-500 text-sm">{data?.errors?.name}</p>
              )}{" "}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg text-[#333] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                placeholder="Enter your email"
                required
              />
              {data?.errors?.email && (
                <p className="text-red-500 text-sm">{data?.errors?.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-lg text-[#333] mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                placeholder="Enter your password"
                required
              />
              {data?.errors?.password && (
                <p className="text-red-500 text-sm">{data?.errors?.password}</p>
              )}
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-lg text-[#333] mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {data?.errors?.gender && (
                <p className="text-red-500 text-sm">{data?.errors?.gender}</p>
              )}
            </div>

            {/* Age Field */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-lg text-[#333] mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                placeholder="Enter your age"
                required
              />
              {data?.errors?.age && (
                <p className="text-red-500 text-sm">{data?.errors?.age}</p>
              )}
            </div>

            {/* Location Fields */}
            <div className="mb-4">
              <label htmlFor="city" className="block text-lg text-[#333] mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                placeholder="Enter your city"
                required
              />
              {data?.errors?.city && (
                <p className="text-red-500 text-sm">{data?.errors?.city}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="area" className="block text-lg text-[#333] mb-2">
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                placeholder="Enter your area"
                required
              />
              {data?.errors?.area && (
                <p className="text-red-500 text-sm">{data?.errors?.area}</p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {data?.message && (
            <p className="text-green-500 text-sm mb-4">{data?.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 bg-[#ffc759] text-white text-lg rounded-lg hover:bg-[#f8b03c] transition duration-300"
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[#333]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#ffc759] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
