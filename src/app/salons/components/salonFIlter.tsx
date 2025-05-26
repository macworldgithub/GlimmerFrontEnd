"use client";
import React, { useState, useEffect } from "react";
import { IoMdPricetags } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import ServiceNavMenu from "@/common/service-nav-menu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Salonfilter: React.FC = () => {
  const router = useRouter();

  const [price, setPrice] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [serviceTerm, setServiceTerm] = useState<string>("");
  const [nameTerm, setNameTerm] = useState<string>("");

  const [isGenderOpen, setIsGenderOpen] = useState<boolean>(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState<boolean>(false); // 👈 Control ServiceNavMenu dropdown

  const handleSearch = () => {
    const filterParams: Record<string, string> = {};
    if (price) filterParams.price = price;
    if (gender) filterParams.gender = gender;
    if (serviceTerm) filterParams.serviceTerm = serviceTerm;
    if (nameTerm) filterParams.nameTerm = nameTerm;

    const queryString = new URLSearchParams(filterParams).toString();
    router.push(`/salons/search?${queryString}`);
  };

  // 🧠 Auto-close ALL dropdowns on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsGenderOpen(false);
      setIsServiceMenuOpen(false);
    };

    if (isGenderOpen || isServiceMenuOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isGenderOpen, isServiceMenuOpen]);

  return (
    <>
      {/* Mobile View */}
      <div className="flex flex-col p-10 gap-2 rounded-md bg-white lg:hidden">
        <ServiceNavMenu
          className="w-full"
          onSubCategorySelect={setGender}
          onSubSubCategorySelect={setServiceTerm}
          onNameTermChange={setNameTerm}
          //@ts-ignore
          isOpen={isServiceMenuOpen}
          setIsOpen={setIsServiceMenuOpen}
        />

        <SearchInput placeholder="Price" value={price} onChange={setPrice} icon={<IoMdPricetags className="size-5" />} />
        <GenderDropdown gender={gender} setGender={setGender} isOpen={isGenderOpen} setIsOpen={setIsGenderOpen} />

        <button className="btn btn-neutral btn-block" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden items-center px-10 justify-between rounded-full bg-white lg:flex">
        <ServiceNavMenu
          onSubCategorySelect={setGender}
          onSubSubCategorySelect={setServiceTerm}
          onNameTermChange={setNameTerm}
          //@ts-ignore
          isOpen={isServiceMenuOpen}
          setIsOpen={setIsServiceMenuOpen}
        />
        <HorizontalDivider className="hidden lg:block" />
        <HorizontalDivider className="hidden lg:block" />
        <SearchInput placeholder="Price" value={price} onChange={setPrice} icon={<IoMdPricetags className="size-5" />} />
        <HorizontalDivider className="hidden lg:block" />
        <GenderDropdown gender={gender} setGender={setGender} isOpen={isGenderOpen} setIsOpen={setIsGenderOpen} />
        <button className="btn btn-neutral rounded-full w-[150px] h-[70px] mr-[-36px]" onClick={handleSearch}>
          Search
        </button>
      </div>
    </>
  );
};

export default Salonfilter;

// Input remains unchanged
const SearchInput = ({
  placeholder,
  value,
  onChange,
  icon,
}: {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}) => (
  <div className="input input-bordered flex items-center gap-2 w-full lg:w-[20%] h-12 lg:h-14">
    {icon && <div>{icon}</div>}
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none placeholder-black"
    />
  </div>
);


const GenderDropdown = ({
  gender,
  setGender,
  isOpen,
  setIsOpen,
}: {
  gender: string;
  setGender: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => (
  <div className="dropdown w-full lg:w-[20%]">
    <label
      tabIndex={0}
      onClick={() => setIsOpen(!isOpen)}
      className="input input-bordered flex h-12 items-center gap-2 lg:h-14 cursor-pointer"
    >
      <FaPerson className="size-5" />
      <span>{gender || "Select Gender"}</span>
    </label>
    {isOpen && (
      <ul tabIndex={0} className="dropdown-content menu top-16 z-[1] w-full rounded-box border border-base-300 bg-base-100 shadow lg:w-72">
        {["Male", "Female", "Kids"].map((g) => (
          <li key={g}>
            <button
              type="button"
              onClick={() => {
                setGender(g);
                setIsOpen(false);
              }}
            >
              {g}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// Divider remains unchanged
const HorizontalDivider = ({ className }: { className?: string }) => (
  <div className={cn("h-[80%] w-px bg-base-300", className)}></div>
);
