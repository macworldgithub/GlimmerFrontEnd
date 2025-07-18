"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { getAllProducts } from "@/api/product";

interface Product {
  _id: string;
  name: string;
  image1?: string;
  category?: string;
  sub_category?: string;
  item?: string;
}

interface ProductSearchBarProps {
  className?: string;
}

export default function ProductSearchBar({ className }: ProductSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await getAllProducts("", "", "", query.trim());
      setSuggestions(res.products.slice(0, 5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (searchTerm.trim()) {
      params.set("name", searchTerm.trim());
    }
    router.push(`/products?${params.toString()}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cn("relative w-full max-w-md", className)}
      ref={dropdownRef}
    >
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-full h-12 pl-5 pr-12 rounded-md border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onKeyDown={handleKeyDown}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm("")}
          aria-label="Clear input"
          className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 aspect-square text-gray-500 hover:text-red-500 bg-white rounded-full shadow-sm border border-gray-300 transition-all duration-200 hover:scale-110"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-primary transition"
        size={20}
        onClick={handleSearch}
      />
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-[91vw] lg:w-[450px] bg-white border rounded-md shadow-lg max-h-64 overflow-auto">
          {suggestions.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push(
                  `/${product.category}/${product.sub_category}/${product.item}/${product._id}`
                );
                setShowDropdown(false);
                setSearchTerm("");
              }}
            >
              {product.image1 && (
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-8 h-8 object-cover rounded"
                />
              )}
              <span className="text-sm">{product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
