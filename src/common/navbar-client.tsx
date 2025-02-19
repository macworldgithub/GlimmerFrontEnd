"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShowUser from "./ShowUser";
import ProductSearchBar from "./PrductSearchBar";
import Logo from "@/assets/images/logo.png";
import SideMenu from "./side-menu";
import CartNavbar from "./cart-navbar";

const NavbarClient = ({ session, handleLogout }: { session: any; handleLogout: () => void }) => {
    const pathname = usePathname();
    const isProductsPage = pathname === "/selfcare-products";

    return (
        <>
            <div className="navbar bg-base-100 w-[99vw]">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href="/">
                        <img src={Logo.src} alt="logo" className="h-10" />
                    </Link>
                    <div className={cn("flex w-full", { "justify-end pr-10": isProductsPage })}>
                        <ProductSearchBar className="max-md:hidden" />
                    </div>
                </div>

                <div className="flex-none">
                    <ShowUser />
                    <CartNavbar />
                    <SideMenu isLoggedIn={!!session?.userId} handleLogout={handleLogout} />
                </div>
            </div>
            <div className="flex justify-center mb-5">
                <ProductSearchBar className="md:hidden" />
            </div>
        </>
    );
};

export default NavbarClient;
