"use client";

import React, { useActionState } from "react";
import { loginUser } from "./actions";
import Link from "next/link";

import Logo from "@/assets/images/logo.png";

export default function LoginForm() {
  const [data, action, isPending] = useActionState(loginUser, undefined);

  return (
    <div className="flex items-center justify-center p-5 min-h-screen bg-gradient-to-r from-[#ffc759] to-[#ebe9f7]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-evenly">
          <h2 className="text-3xl font-bold text-center text-[#333] mb-6">
            Log In
          </h2>
          <img src={Logo.src} alt="logo" className="h-10 hidden md:block " />
        </div>

        <form action={action} className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
            {/* Email Field */}
            <div className="mb-4 md:col-span-2">
              <label htmlFor="email" className="block text-lg text-[#333] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#ffc759] "
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 md:col-span-2">
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
            </div>
          </div>

          {/* Error Message */}
          {data?.message && (
            <p className="text-red-500 text-sm mb-4">{data?.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            aria-disabled={isPending}
            className="w-full p-3 bg-[#ffc759] text-white text-lg rounded-lg hover:bg-[#f8b03c] transition duration-300"
          >
            {isPending ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[#333]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#ffc759] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
