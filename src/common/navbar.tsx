import React from "react";
import Logo from "@/assets/images/logo.png";
import DefaultAvatar from "@/assets/images/default-avatar.png";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import CartNavbar from "./cart-navbar";
import { decrypt, handleLogout } from "@/lib/session";
import { cookies } from "next/headers";
import { IoMdCall } from "react-icons/io";
import PhoneBtn from "./phone-btn";
import SideMenu from "./side-menu";
import ProductSearchBar from "./PrductSearchBar";
import { FaCircleUser } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Navbar = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  return (
    <div className="navbar bg-base-100 w-[99vw]">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          <img src={Logo.src} alt="logo" className="h-10" />
        </Link>

        <ProductSearchBar />
      </div>

      <div className="flex-none">
        {/* <IoMdCall className="size-4" /> */}
        {/* <PhoneBtn /> */}

        <div className="flex justify-center items-center gap-1 font-sans text-[16px] max-md:hidden">
          <Image src={"/user.svg"} width={25} height={25} alt="user" />
          <Link href={"/login"}>
            <p className=" hover:font-semibold">Login</p>
          </Link>
          <p>/</p>
          <Link href={"/signup"}>
            <p className=" hover:font-semibold">SignUp</p>
          </Link>
        </div>

        <CartNavbar />

        <SideMenu isLoggedIn={!!session?.userId} handleLogout={handleLogout} />
        {/* <div className="dropdown dropdown-end hidden md:block">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-7 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src={DefaultAvatar.src}
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content z-[2] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
					>
					 
						<li>
							{session?.userId ? (
								<button onClick={handleLogout} className="btn btn-ghost">
									Logout
								</button>
							) : (
								<Link href="/login" className="btn btn-ghost">
									Login
								</Link>
							)}
						</li>
					</ul>
				</div> */}
      </div>
    </div>
  );
};

export default Navbar;
