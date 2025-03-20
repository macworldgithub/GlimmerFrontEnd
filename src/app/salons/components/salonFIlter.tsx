import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import ServiceNavMenu from "@/common/service-nav-menu";

const Salonfilter = () => {
  return (
    <>
      <div className="flex flex-col p-10 gap-2 rounded-md bg-white lg:hidden">
        <ServiceNavMenu />
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
        <button className="btn btn-neutral btn-block">Search</button>
      </div>
      <div className="flex flex-col p-10 gap-2 rounded-md bg-white lg:hidden">
        <ServiceNavMenu />
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
        <button className="btn btn-neutral btn-block">Search</button>
      </div>
      <div className="hidden items-center px-10 justify-between rounded-full bg-white lg:flex">
        <ServiceNavMenu />
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
        <button className="btn btn-neutral rounded-full w-[150px] mr-[-36px]">
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
