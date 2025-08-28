"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Item = {
  _id: string;
  name: string;
  slug: string;
};

type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  product_category: string;
  items: Item[];
};

type Category = {
  _id: string;
  sub_categories: SubCategory[];
  product_category: {
    _id: string;
    name: string;
    slug: string;
  };
};

const Sidebar = ({
  selections,
  onFilterChange,
  activeCategory,
  activeSubCategory,
  activeItem,
}: {
  selections: Category[];
  onFilterChange: (filters: {
    category: string;
    sub_category: string;
    item: string;
    name: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
  activeCategory?: string;
  activeSubCategory?: string;
  activeItem?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");

  const [itemName, setItemName] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [showAllSubCategories, setShowAllSubCategories] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    if (activeCategory) setSelectedCategory(activeCategory);
    if (activeSubCategory) setSelectedSubCategory(activeSubCategory);
    if (activeItem) setSelectedItem(activeItem);
  }, [activeCategory, activeSubCategory, activeItem]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedSubCategory("");
    setSelectedItem("");
    onFilterChange({
      category: categorySlug,
      sub_category: "",
      item: "",
      name: itemName,
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleSubCategoryChange = (subCategorySlug: string) => {
    setSelectedSubCategory(subCategorySlug);
    setSelectedItem("");
    onFilterChange({
      category: selectedCategory,
      sub_category: subCategorySlug,
      item: "",
      name: itemName,
      minPrice,
      maxPrice,
    });
  };

  const handleItemChange = (itemSlug: string) => {
    setSelectedItem(itemSlug);
    onFilterChange({
      category: selectedCategory,
      sub_category: selectedSubCategory,
      item: itemSlug,
      name: itemName,
      minPrice,
      maxPrice,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      category: selectedCategory,
      sub_category: selectedSubCategory,
      item: selectedItem,
      name: itemName,
      minPrice,
      maxPrice,
    });
  };

  const selectedCategoryData = selections.find(
    (category) => category.product_category.slug === selectedCategory
  );
  const filteredSubCategories = selectedCategoryData
    ? selectedCategoryData.sub_categories
    : [];
  const displayedSubCategories = showAllSubCategories
    ? filteredSubCategories
    : filteredSubCategories.slice(0, 5);

  const selectedSubCategoryData = filteredSubCategories.find(
    (subCategory) => subCategory.slug === selectedSubCategory
  );
  const filteredItems = selectedSubCategoryData ? selectedSubCategoryData.items : [];
  const displayedItems = showAllItems ? filteredItems : filteredItems.slice(0, 5);

  const sortedCategories = selections.sort((a, b) =>
    a.product_category.name.localeCompare(b.product_category.name)
  );

  return (
    <div className="p-6 border-r bg-[#FDF3D2] shadow-md hidden md:block">
      <h2 className="font-bold text-2xl text-gray-800">Filters</h2>

      {/* Category Selection */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-700">Categories</h3>
        {sortedCategories.map((category) => (
          <label
            key={category._id}
            className={`flex items-center cursor-pointer p-2 rounded-lg transition ${
              selectedCategory === category.product_category.slug
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category.product_category.slug}
              onChange={() => handleCategoryChange(category.product_category.slug)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                selectedCategory === category.product_category.slug
                  ? "border-purple-700"
                  : "border-gray-400"
              }`}
            >
              {selectedCategory === category.product_category.slug && (
                <motion.div
                  className="w-3 h-3 bg-purple-500 rounded-full"
                  layoutId="categorySelection"
                />
              )}
            </span>
            {category.product_category.name}
          </label>
        ))}
      </div>

      {/* Subcategory Selection */}
      {selectedCategory && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-700">Sub Categories</h3>
          {displayedSubCategories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((subCategory) => (
              <label
                key={subCategory._id}
                className={`flex items-center cursor-pointer p-2 rounded-lg transition ${
                  selectedSubCategory === subCategory.slug
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="subCategory"
                  checked={selectedSubCategory === subCategory.slug}
                  onChange={() => handleSubCategoryChange(subCategory.slug)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                    selectedSubCategory === subCategory.slug
                      ? "border-purple-700"
                      : "border-gray-400"
                  }`}
                >
                  {selectedSubCategory === subCategory.slug && (
                    <motion.div
                      className="w-3 h-3 bg-purple-500 rounded-full"
                      layoutId="subCategorySelection"
                    />
                  )}
                </span>
                {subCategory.name}
              </label>
            ))}
          {filteredSubCategories.length > 5 && (
            <button
              onClick={() => setShowAllSubCategories(!showAllSubCategories)}
              className="mt-2 text-purple-800 hover:underline transition"
            >
              {showAllSubCategories ? "Show Less" : "View All"}
            </button>
          )}
        </div>
      )}

      {/* Item Selection */}
      {selectedSubCategory && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-700">Items</h3>
          {displayedItems
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <label
                key={item._id}
                className={`flex items-center cursor-pointer p-2 rounded-lg transition ${
                  selectedItem === item.slug ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="item"
                  checked={selectedItem === item.slug}
                  onChange={() => handleItemChange(item.slug)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                    selectedItem === item.slug
                      ? "border-purple-700"
                      : "border-gray-400"
                  }`}
                >
                  {selectedItem === item.slug && (
                    <motion.div
                      className="w-3 h-3 bg-purple-500 rounded-full"
                      layoutId="itemSelection"
                    />
                  )}
                </span>
                {item.name}
              </label>
            ))}
          {filteredItems.length > 5 && (
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className="mt-2 text-purple-800 hover:underline transition"
            >
              {showAllItems ? "Show Less" : "View All"}
            </button>
          )}
        </div>
      )}

      {/* Price Filter */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-700">Price Range</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 p-2 border border-purple-800 bg-transparent rounded-md focus:outline-none focus:border-purple-800"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 p-2 border border-purple-800 bg-transparent rounded-md focus:outline-none focus:border-purple-800"
          />
        </div>
        <button
          onClick={handlePriceChange}
          className="w-full mt-2 bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900"
        >
          Apply
        </button>
      </div>
    </div>
  );
};


export default Sidebar;