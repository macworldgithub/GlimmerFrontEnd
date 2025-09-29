"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import { ThreeDots } from "react-loader-spinner"; // Import the spinner

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reduxStore";
import {
  resetStatus,
  updateEmail,
  updatePassword,
} from "@/reduxSlices/loginSlice";

import { useRouter } from "next/navigation";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import Router from "next/router";

import { LoginApi } from "@/api/auth";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();

  const token = useSelector((state: RootState) => state.login.token);

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, []);

  const dispatch = useDispatch();
  const { loading, success, failed, email, password } = useSelector(
    (state: RootState) => state.login
  );

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //@ts-ignore
    dispatch(LoginApi());
  };

  useEffect(() => {
    if (success) {
      dispatch(resetStatus());
      toast.success("Sign In Successfully!");
      router.replace("/");
    }
    if (failed) {
      dispatch(resetStatus());
      toast.error("An error occurred. Please try again.");
    }
  }, [success, failed]);

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center p-5 min-h-screen bg-gradient-to-r from-[#ffc759] to-[#ebe9f7] w-[99vw]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex justify-evenly">
            <h2 className="text-3xl font-bold text-center text-[#333] mb-6">
              Log In
            </h2>
            <Image
              src={Logo}
              alt="Company logo"
              width={120} 
              height={40}
              priority
              className="h-10 hidden md:block"
            />
          </div>

          <form className="p-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
              {/* Email Field */}
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-lg text-[#333] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border-2 border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc759]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => dispatch(updateEmail(e.target.value))}
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
                  value={password}
                  onChange={(e) => dispatch(updatePassword(e.target.value))}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-[#ffc759] text-white text-lg rounded-lg hover:bg-[#f8b03c] transition duration-300"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  {/* Spinner Component */}
                  <ThreeDots
                    height="30"
                    width="30"
                    radius="9"
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                "Sign In"
              )}
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
    </>
  );
}
