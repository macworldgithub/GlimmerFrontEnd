"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import DefaultAvatar from "@/assets/images/default-avatar.png";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { logout } from "@/reduxSlices/loginSlice";
import { RootState } from "@/store/reduxStore";
import { usePathname } from "next/navigation";
import RegisterGymModal from "./RegisterGymModal";
import CategoryNavMenu from "./category-nav-menu";

const SideMenu = ({
  isLoggedIn,
  handleLogout,
}: {
  isLoggedIn: boolean;
  handleLogout: () => void;
}) => {
  const credentials = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showGymModal, setShowGymModal] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleGymSubmit = (values: any) => {
    console.log("Gym Registration Data:", values);
    setShowGymModal(false);
  };

  const Menu = ({ className }: { className?: string }) => {
    return (
      <div className={cn("space-y-3", className)}>
        {/* FLASH SALE section */}
        {/* <div className="border-b pb-2 mb-2">
          <h2 className="text-[14px] font-bold text-red-600">
            FLASH SUMMER SALE
          </h2>
          <p className="text-[12px] text-gray-500">UPTO 15% OFF</p>
        </div> */}

        {/* Show Category Menu */}
        <CategoryNavMenu forceMobileStyle={true} />

        {/* Optional: Login / Logout */}
        <div className="pt-4 border-t">
          {credentials.token ? (
            <div
              onClick={() => {
                dispatch(logout());
              }}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition mt-3"
            >
              <img
                className="w-7 h-7 rounded-full"
                alt="avatar"
                src={DefaultAvatar.src}
              />
              Logout
            </div>
          ) : (
            <Link
              className="flex items-center gap-2 hover:text-primary transition mt-3"
              href="/login"
              onClick={() => setIsOpen(false)}
            >
              <img
                className="w-7 h-7 rounded-full"
                alt="avatar"
                src={DefaultAvatar.src}
              />
              Login
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* desktop */}
      {/* <div className="dropdown menu-dropdown-show hidden md:block relative z-50">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <GiHamburgerMenu className="size-5" />
        </div>
        <Menu
          className="menu dropdown-content z-[9999] mt-3 w-96 rounded-xl bg-base-100 p-4 shadow-xl border border-gray-200"
          isMobile={true}
        />
      </div> */}

      {/* mobile */}
      <div className="drawer z-50 md:hidden">
        {/* <div className="drawer lg:drawer-open"> */}
        <input
          id="my-drawer-2"
          type="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar drawer-button"
          >
            <GiHamburgerMenu className="size-5" />
          </label>
        </div>
        <div className="drawer-side transition-transform duration-500 ease-in-out">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="bg-purple-100 text-base-content min-h-full w-80 p-6 shadow-2xl rounded-tr-xl rounded-br-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-700 hover:text-black transition"
            >
              ✕
            </button>

            <div className="mt-12">
              <Menu />
            </div>
          </div>
        </div>

        <RegisterGymModal
          visible={showGymModal}
          onCancel={() => setShowGymModal(false)}
          onSubmit={handleGymSubmit}
        />
      </div>
    </>
  );
};

export default SideMenu;
