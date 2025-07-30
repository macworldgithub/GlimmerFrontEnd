"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShowUser from "./ShowUser";
import ProductSearchBar from "./PrductSearchBar";
import Logo from "@/assets/images/logo.png";
import SideMenu from "./side-menu";
import CartNavbar from "./cart-navbar";
import { useEffect, useState } from "react";
import { getAllProductItem, getAllProducts } from "@/api/product";
import { Calendar } from "lucide-react";

interface CategorySelection {
  category_id: string;
  category_name: string;
  sub_categories: {
    sub_category_id: string;
    name: string;
    items: {
      item_id: string;
      name: string;
    }[];
  }[];
}

const NavbarClient = ({
  session,
  handleLogout,
}: {
  session: any;
  handleLogout: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const isProductsPage =
    pathname === "/selfcare-products" || pathname === "/products";
  const isSalonPage = pathname.startsWith("/salons");

  const [selections, setSelections] = useState<CategorySelection[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const productItemsRes = await getAllProductItem();
        setSelections(transformData(productItemsRes));
      } catch (error) {
        console.error("Error fetching selections:", error);
      }
    };
    fetchSelections();
  }, []);

  function transformData(data: any[]): CategorySelection[] {
    return data.map((category) => ({
      category_id: category.product_category._id,
      category_name: category.product_category.name,
      sub_categories: category.sub_categories.map((subCategory: any) => ({
        sub_category_id: subCategory._id,
        name: subCategory.name,
        items: subCategory.items.map((item: any) => ({
          item_id: item._id,
          name: item.name,
        })),
      })),
      created_at: category.product_category.created_at,
    }));
  }

  const fetchData = async () => {
    try {
      const categoryFilter = searchParams.get("category") ?? "";
      const subCategoryFilter = searchParams.get("sub_category") ?? "";
      const itemFilter = searchParams.get("item") ?? "";
      const nameFilter = searchParams.get("name") ?? "";
      const page = Number(searchParams.get("page")) || 1;

      const res = await getAllProducts(
        categoryFilter,
        subCategoryFilter,
        itemFilter,
        nameFilter,
        page
      );
      setProducts(res.products || products);
      setTotal(res.total || res.products.length || total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleBookAppointment = () => router.push("/salons");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={cn(
          "navbar bg-base-100 w-[99vw] sticky top-0 z-50 transition-transform duration-300 ease-in-out",
          {
            "-translate-y-full": !showNavbar,
          }
        )}
      >
        <div className="flex flex-1 ml-10 md:ml-0">
          <SideMenu
            isLoggedIn={!!session?.userId}
            handleLogout={handleLogout}
          />
          <Link
            href="/"
            className="btn btn-ghost text-xl flex justify-center items-center h-16 w-full md:w-auto"
          >
            <img src={Logo.src} alt="logo" className="h-12 md:h-16 mx-auto" />
          </Link>

          {!isSalonPage && (
            <div
              className={cn("flex flex-col w-full", {
                "justify-end pr-10": isProductsPage,
              })}
            >
              <ProductSearchBar className="max-md:hidden" />
            </div>
          )}
        </div>

        <div className="flex-none">
          <ShowUser />
          <CartNavbar />
        </div>
      </div>

      {/* Mobile Book Appointment + Search */}
      <div
        className={cn(
          "flex justify-center mb-5 p-2 gap-2 bg-purple-100 md:bg-transparent transition-transform duration-300 ease-in-out md:translate-y-0",
          {
            "translate-y-full": !showNavbar, // hide when scrolling down
          }
        )}
      >
        <div className="w-1/2">
          <ProductSearchBar className="md:hidden w-full" />
        </div>

        <button
          className="w-1/2 h-12 p-4 rounded-md border hover:brightness-90 transition cursor-pointer bg-purple-800 text-white text-sm flex items-center justify-center gap-2 md:hidden"
          onClick={handleBookAppointment}
        >
          <Calendar className="w-5 h-5" />
          BOOK APPOINTMENT
        </button>
      </div>
    </>
  );
};

export default NavbarClient;
