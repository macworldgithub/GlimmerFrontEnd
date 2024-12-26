"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import DefaultAvatar from "@/assets/images/default-avatar.png";

const SideMenu = ({
	isLoggedIn,
	handleLogout,
}: { isLoggedIn: boolean; handleLogout: () => void }) => {
	const [isOpen, setIsOpen] = useState(false);

	const Menu = ({ className }: { className?: string }) => {
		return (
			<ul tabIndex={0} className={cn("", className)}>
				<li>
					<Link className="text-base" href="/" onClick={() => setIsOpen(false)}>
						<FaArrowRight className="size-4" /> Home
					</Link>
				</li>
				<li>
					<Link
						className="text-base"
						href="/salons"
						onClick={() => setIsOpen(false)}
					>
						<FaArrowRight className="size-4" /> Salons
					</Link>
				</li>
				<li>
					<Link
						className="text-base"
						href="/selfcare-products"
						onClick={() => setIsOpen(false)}
					>
						<FaArrowRight className="size-4" /> Products
					</Link>
				</li>
				<li>
					<Link
						className="text-base"
						href="/signup"
						onClick={() => setIsOpen(false)}
					>
						<FaArrowRight className="size-4" /> Register your salon
					</Link>
				</li>
				<li>
					<Link
						className="text-base"
						href="/coming-soon"
						onClick={() => setIsOpen(false)}
					>
						<FaArrowRight className="size-4" /> Register your gym
					</Link>
				</li>
				<li>
					{isLoggedIn ? (
						<div
							onClick={() => {
								handleLogout();
								setIsOpen(false);
							}}
							className="text-base cursor-pointer"
						>
							<div className="w-7 rounded-full mr-2">
								<img
									alt="Tailwind CSS Navbar component"
									src={DefaultAvatar.src}
								/>
							</div>
							Logout
						</div>
					) : (
						<Link
							className="text-base"
							href="/login"
							onClick={() => setIsOpen(false)}
						>
							<div className="w-7 rounded-full mr-2">
								<img
									alt="Tailwind CSS Navbar component"
									src={DefaultAvatar.src}
								/>
							</div>
							Login
						</Link>
					)}
				</li>
			</ul>
		);
	};
	return (
		<>
			{/* desktop */}
			<div className="dropdown dropdown-end hidden md:block">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle avatar"
				>
					<GiHamburgerMenu className="size-5" />
				</div>
				<Menu className="menu dropdown-content z-[2] mt-3 w-64 rounded-box bg-base-100 p-2 shadow" />
			</div>

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
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-2"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<Menu className="menu bg-base-200 text-base-content min-h-full w-80 p-4" />
				</div>
			</div>
		</>
	);
};

export default SideMenu;
