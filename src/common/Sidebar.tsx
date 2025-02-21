import { useState } from "react";
import { motion } from "framer-motion";

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

const Sidebar = ({
  selections,
  onFilterChange,
}: {
  selections: CategorySelection[];
  onFilterChange: (filters: any) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>("");
  const [selectedItem, setSelectedItem] = useState<string | undefined>("");
  const [itemName, setItemName] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showAllSubCategories, setShowAllSubCategories] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");
    setSelectedItem("");
    onFilterChange({ category: categoryId, sub_category: "", item: "", name: itemName, min_price: minPrice, max_price: maxPrice });
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
    setSelectedItem("");
    onFilterChange({ category: selectedCategory, sub_category: subCategoryId, item: "", name: itemName, min_price: minPrice, max_price: maxPrice });
  };

  const handleItemChange = (itemId: string) => {
    setSelectedItem(itemId);
    onFilterChange({ category: selectedCategory, sub_category: selectedSubCategory, item: itemId, name: itemName, min_price: minPrice, max_price: maxPrice });
  };

  const selectedCategoryData = selections.find(category => category.category_id === selectedCategory);
  const filteredSubCategories = selectedCategoryData ? selectedCategoryData.sub_categories : [];
  const displayedSubCategories = showAllSubCategories ? filteredSubCategories : filteredSubCategories.slice(0, 5);

  const selectedSubCategoryData = filteredSubCategories.find(subCategory => subCategory.sub_category_id === selectedSubCategory);
  const filteredItems = selectedSubCategoryData ? selectedSubCategoryData.items : [];
  const displayedItems = showAllItems ? filteredItems : filteredItems.slice(0, 5);

  const handlePriceChange = () => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;

    onFilterChange({
      category: selectedCategory,
      sub_category: selectedSubCategory,
      item: selectedItem,
      name: itemName,
      min_price: min,
      max_price: max,
    });
  };

  const sortedCategories = selections.sort((a, b) => a.category_name.localeCompare(b.category_name));

  return (
    <div className="p-6 border-r bg-[#FDF3D2] shadow-md hidden md:block">
      <h2 className="font-bold text-2xl text-gray-800">Filters</h2>

      {/* Category Selection */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-700">Categories</h3>
        {sortedCategories.map((category) => (
          <label
            key={category.category_id}
            className={`flex items-center cursor-pointer p-2 rounded-lg transition ${selectedCategory === category.category_id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category.category_id}
              onChange={() => handleCategoryChange(category.category_id)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${selectedCategory === category.category_id ? "border-purple-700" : "border-gray-400"
                }`}
            >
              {selectedCategory === category.category_id && (
                <motion.div className="w-3 h-3 bg-purple-500 rounded-full" layoutId="categorySelection" />
              )}
            </span>
            {category.category_name}
          </label>
        ))}
      </div>

      {/* Subcategory Selection */}
      {selectedCategory && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-700">Sub Categories</h3>
          {displayedSubCategories.sort((a, b) => a.name.localeCompare(b.name)).map((subCategory) => (
            <label
              key={subCategory.sub_category_id}
              className={`flex items-center cursor-pointer p-2 rounded-lg transition ${selectedSubCategory === subCategory.sub_category_id ? "bg-blue-100" : "hover:bg-gray-100"}`}
            >
              <input
                type="radio"
                name="subCategory"
                checked={selectedSubCategory === subCategory.sub_category_id}
                onChange={() => handleSubCategoryChange(subCategory.sub_category_id)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${selectedSubCategory === subCategory.sub_category_id ? "border-purple-700" : "border-gray-400"}`}
              >
                {selectedSubCategory === subCategory.sub_category_id && (
                  <motion.div className="w-3 h-3 bg-purple-500 rounded-full" layoutId="subCategorySelection" />
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
          {displayedItems.sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
            <label
              key={item.item_id}
              className={`flex items-center cursor-pointer p-2 rounded-lg transition ${selectedItem === item.item_id ? "bg-blue-100" : "hover:bg-gray-100"}`}
            >
              <input
                type="radio"
                name="item"
                checked={selectedItem === item.item_id}
                onChange={() => handleItemChange(item.item_id)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${selectedItem === item.item_id ? "border-purple-700" : "border-gray-400"}`}
              >
                {selectedItem === item.item_id && (
                  <motion.div className="w-3 h-3 bg-purple-500 rounded-full" layoutId="itemSelection" />
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
