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
  const pathname = usePathname();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const isProductsPage =
    pathname === "/selfcare-products" || pathname === "/products";
  const isSalonPage = pathname.startsWith("/salons");

  const [selections, setSelections] = useState<CategorySelection[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

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

  return (
    <>
      <div className="navbar bg-base-100 w-[99vw] sticky top-0 z-50">
        <div className="flex justify-between flex-1">
          <SideMenu
            isLoggedIn={!!session?.userId}
            handleLogout={handleLogout}
          />

          <Link className="btn btn-ghost text-xl h-16" href="/">
            <img src={Logo.src} alt="logo" className="h-16" />
          </Link>
          {!isSalonPage && (
            <div
              className={cn("flex flex-col w-full", {
                "justify-end pr-10": isProductsPage,
              })}
            >
              <ProductSearchBar className="max-md:hidden" />

              {/* Desktop-only navigation links below the search bar
              <div className="hidden md:flex justify-center gap-8 mt-2  ml-24 mr-auto">
                <Link
                  href="/"
                  className="text-center font-bold text-gray-700 hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/salons"
                  className="text-center font-bold text-gray-700 hover:text-primary"
                >
                  Salons
                </Link>
                <Link
                  href="/selfcare-products"
                  className="text-center font-bold text-gray-700 hover:text-primary"
                >
                  Products
                </Link>
              </div> */}
            </div>
          )}
        </div>

        <div className="flex-none">
          <ShowUser />
          <CartNavbar />
          {/* <SideMenu
            isLoggedIn={!!session?.userId}
            handleLogout={handleLogout}
          /> */}
        </div>
      </div>

      <div className="flex justify-center mb-5">
        <ProductSearchBar className="md:hidden" />
      </div>
    </>
  );
};

export default NavbarClient;

