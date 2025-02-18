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
    onFilterChange
}: {
    selections: CategorySelection[];
    onFilterChange: (filters: any) => void;
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>("");
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>("");
    const [selectedItem, setSelectedItem] = useState<string | undefined>("");
    const [itemName, setItemName] = useState<string>("");


    const [showAllSubCategories, setShowAllSubCategories] = useState(false);
    const [showAllItems, setShowAllItems] = useState(false);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setSelectedSubCategory("");
        setSelectedItem("");
        onFilterChange({ category: categoryId, sub_category: "", item: "", name: itemName });
    };

    const handleSubCategoryChange = (subCategoryId: string) => {
        setSelectedSubCategory(subCategoryId);
        setSelectedItem("");
        onFilterChange({ category: selectedCategory, sub_category: subCategoryId, item: "", name: itemName });
    };

    const handleItemChange = (itemId: string) => {
        setSelectedItem(itemId);
        onFilterChange({ category: selectedCategory, sub_category: selectedSubCategory, item: itemId, name: itemName });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
        onFilterChange({ category: selectedCategory, sub_category: selectedSubCategory, item: selectedItem, name: e.target.value });
    };

    const subCategories = selections.flatMap(category => category.sub_categories);
    const displayedSubCategories = showAllSubCategories ? subCategories : subCategories.slice(0, 5);

    const items = selections.flatMap(category => category.sub_categories)
        .flatMap(subCategory => subCategory.items);
    const displayedItems = showAllItems ? items : items.slice(0, 5);

    return (
        <div className="p-6 border-r bg-[#FDF3D2] shadow-md hidden md:block">
            <h2 className="font-bold text-2xl text-gray-800">Filters</h2>

            {/* Category Selection */}
            <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-700">Categories</h3>
                {selections.map((category) => (
                    <label
                        key={category.category_id}
                        className={`flex items-center cursor-pointer p-2 rounded-lg transition ${selectedCategory === category.category_id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                    >
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category.category_id}
                            onChange={() => handleCategoryChange(category.category_id)}
                            className="hidden"
                        />
                        <span
                            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${selectedCategory === category.category_id ? "border-purple-700" : "border-gray-400"}`}
                        >
                            {selectedCategory === category.category_id && (
                                <motion.div
                                    className="w-3 h-3 bg-purple-500 rounded-full"
                                    layoutId="categorySelection"
                                />
                            )}
                        </span>
                        {category.category_name}
                    </label>
                ))}
            </div>

            {/* Subcategory Selection */}
            <div className="mt-6">
                <h3 className="font-semibold text-lg text-gray-700">Sub Categories</h3>
                {displayedSubCategories.map(subCategory => (
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
                                <motion.div
                                    className="w-3 h-3 bg-purple-500 rounded-full"
                                    layoutId="subCategorySelection"
                                />
                            )}
                        </span>
                        {subCategory.name}
                    </label>
                ))}
                {subCategories.length > 5 && (
                    <button
                        onClick={() => setShowAllSubCategories(!showAllSubCategories)}
                        className="mt-2 text-purple-800 hover:underline transition"
                    >
                        {showAllSubCategories ? "Show Less" : "View All"}
                    </button>
                )}
            </div>

            {/* Item Selection */}
            <div className="mt-6">
                <h3 className="font-semibold text-lg text-gray-700">Item</h3>
                {displayedItems.map(item => (
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
                                <motion.div
                                    className="w-3 h-3 bg-purple-500 rounded-full"
                                    layoutId="itemSelection"
                                />
                            )}
                        </span>
                        {item.name}
                    </label>
                ))}
                {items.length > 5 && (
                    <button
                        onClick={() => setShowAllItems(!showAllItems)}
                        className="mt-2 text-purple-800 hover:underline transition"
                    >
                        {showAllItems ? "Show Less" : "View All"}
                    </button>
                )}
            </div>

            {/* Search Filter
            <div className="mt-6">
                <h3 className="font-semibold text-lg text-gray-700">Name</h3>
                <input
                    type="text"
                    value={itemName}
                    onChange={handleSearchChange}
                    className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
                    placeholder="Type item name"
                />
            </div> */}
        </div>
    );
};

export default Sidebar;
