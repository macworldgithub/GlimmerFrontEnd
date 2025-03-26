"use client";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import ServiceNavMenu from "@/common/service-nav-menu";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getAllActiveServices } from "@/api/salon";
import { AppDispatch } from "@/store/reduxStore";

const Salonfilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [subCategoryName, setSubCategoryName] = useState<string | null>(null);
  const [subSubCategoryName, setSubSubCategoryName] = useState<string | null>(null);
  // Update query params dynamically when selection changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (subCategoryName) params.set("subCategoryName", subCategoryName);
    if (subSubCategoryName) params.set("subSubCategoryName", subSubCategoryName);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [subCategoryName, subSubCategoryName, router]);

  // Handle search button click
  const handleSearch = () => {
    // Only dispatch API if the filters change
    dispatch(
      getAllActiveServices({
        page_no: 1,
        subCategoryName: subCategoryName || undefined,
        subSubCategoryName: subSubCategoryName || undefined,
      })
    );

    // Update the URL
    const filterParams: Record<string, string> = {};
    if (subCategoryName) filterParams.subCategoryName = subCategoryName;
    if (subSubCategoryName) filterParams.subSubCategoryName = subSubCategoryName;

    const queryParams = new URLSearchParams(filterParams).toString();
    router.push(`/salons/services?${queryParams}`, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col p-10 gap-2 rounded-md bg-white lg:hidden">
        <ServiceNavMenu className="w-full"
        onSubCategorySelect={setSubCategoryName}
        onSubSubCategorySelect={setSubSubCategoryName}
        />
        <SearchFilterSection
          placeholder="Location"
          icon={<IoLocationSharp className="size-5" />}
        />
        <div className="flex gap-2">
          <SearchFilterSection
            placeholder="Price"
            icon={<IoMdPricetags className="size-5" />}
          />
          <SearchFilterSection
            placeholder="Gender"
            icon={<FaPerson className="size-5" />}
          />
        </div>
        <button className="btn btn-neutral btn-block"
        onClick={handleSearch}
        >
        Search
        </button>
      </div>
      <div className="hidden items-center px-10 justify-between rounded-full bg-white lg:flex">
        <ServiceNavMenu 
        onSubCategorySelect={setSubCategoryName}
        onSubSubCategorySelect={setSubSubCategoryName}
        />
        <HorizontalDivider className="hidden lg:block" />
        <SearchFilterSection
          placeholder="Location"
          icon={<IoLocationSharp className="size-5" />}
        />
        <HorizontalDivider className="hidden lg:block" />

        <SearchFilterSection
          placeholder="Price"
          icon={<IoMdPricetags className="size-5" />}
        />
        <HorizontalDivider className="hidden lg:block" />
        <SearchFilterSection
          placeholder="Gender"
          icon={<FaPerson className="size-5" />}
        />
        <button className="btn btn-neutral rounded-full w-[150px] mr-[-36px]"
        onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Salonfilter;

const HorizontalDivider = ({ className }: { className?: string }) => (
  <div className={cn("h-[80%] bg-base-300", className)}></div>
);
const SearchFilterSection = ({
  icon,
  placeholder = "Products / Salons",
  position = 0,
}: {
  icon: React.ReactNode;
  placeholder: string;
  position?: 1 | 2 | 3 | 4 | 0;
}) => {
  return (
      <div className="dropdown w-full lg:w-[20%]">
          <label
              className={cn(
                  "input max-lg:input-bordered flex h-12 items-center gap-2 lg:h-14",
                  position === 1 && "lg:rounded-l-full",
                  position === 4 && "lg:rounded-r-full",
              )}
              tabIndex={0}
          >
              <div className="">{icon}</div>
              <input type="text" className="w-full bg-transparent outline-none placeholder-black" placeholder={placeholder} />
          </label>
          <ul
              tabIndex={0}
              className="dropdown-content menu top-16 z-[1] w-full rounded-box border border-base-300 bg-base-100 shadow lg:w-72"
          >
              <li>
                  <p>Item 1</p>
              </li>
              <li>
                  <p>Item 2</p>
              </li>
          </ul>
      </div>
  );
};
