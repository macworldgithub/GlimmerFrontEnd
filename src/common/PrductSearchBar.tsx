"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface ProductSearchBarProps {
  className?: string;
}

export default function ProductSearchBar({ className }: ProductSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("page", "1");

    if (searchTerm.trim()) {
      params.set("name", searchTerm.trim());
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <input
        type="text"
        placeholder="Search products..."
        className="input input-bordered w-full h-12 pl-5 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:outline-none transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-primary transition"
        size={20}
        onClick={handleSearch}
      />
    </div>
  );
}
