"use client";

import { getAllServices, getAllServicesById } from "@/api/salon";
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import { useState, useEffect, useRef } from "react";

interface ServiceNavMenuProps {
  className?: string;
  onSubCategorySelect?: (subCategory: string) => void;
  onSubSubCategorySelect?: (subSubCategory: string) => void;
  onNameTermChange?: (serviceTerm: string) => void;
}

const ServiceNavMenu = ({
  className,
  onSubCategorySelect,
  onSubSubCategorySelect,
  onNameTermChange,
}: ServiceNavMenuProps) => {
  const [services, setServices] = useState<{ _id: string; category: string }[]>(
    []
  );
  const [subServices, setSubservices] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [productItems, setProductItems] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<{
    _id: string;
    category: string;
  } | null>(null);
  const [selectedSubservice, setSelectedSubservice] = useState<string | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedServices, setExpandedServices] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSubservices, setExpandedSubservices] = useState<{
    [key: string]: boolean;
  }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => setIsDropdownOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch Services
  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      message.error("Failed to fetch services");
    }
  };

  const fetchSubservicesAndProducts = async (categoryId: string) => {
    if (!categoryId) return;
    try {
      const data = await getAllServicesById(categoryId);
      if (Array.isArray(data.services)) {
        setSubservices({});
        setProductItems(data.services);
      } else if (data.services && typeof data.services === "object") {
        setSubservices(data.services);
        setProductItems([]);
      } else {
        setSubservices({});
        setProductItems([]);
      }
    } catch (error) {
      message.error("Failed to fetch subservices and products");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedService?._id) {
      fetchSubservicesAndProducts(selectedService._id);
    }
  }, [selectedService?._id]);

  const handleServiceClick = (service: { _id: string; category: string }) => {
    setSelectedService(service);
    setSelectedSubservice(null);
    setSelectedProduct(null);
    setExpandedServices((prev) => ({
      ...prev,
      [service._id]: !prev[service._id],
    }));
  };

  const handleSubserviceClick = (subservice: string) => {
    setSelectedSubservice(subservice);
    setSelectedProduct(null);
    if (onSubCategorySelect) onSubCategorySelect(subservice);
    setExpandedSubservices((prev) => ({
      ...prev,
      [subservice]: !prev[subservice],
    }));
  };

  const handleProductClick = (product: string) => {
    setSelectedProduct(product);
    if (onSubSubCategorySelect) onSubSubCategorySelect(product);
    setIsDropdownOpen(false);
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    if (onNameTermChange) onNameTermChange(value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const filteredServices = services.filter((service) =>
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel =
    selectedProduct ||
    selectedSubservice ||
    selectedService?.category ||
    "Search Services";

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Trigger Bar */}
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-100 to-white shadow-inner border border-indigo-200 rounded-xl cursor-pointer active:scale-[0.98] transition-all duration-300"
      >
        <div className="flex items-center gap-3 w-full">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-indigo-500 text-lg"
          />
          <input
            type="text"
            placeholder={selectedLabel}
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-indigo-400 text-sm"
          />
        </div>
        <FontAwesomeIcon
          icon={isDropdownOpen ? faChevronUp : faChevronDown}
          className="text-indigo-500"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          className="absolute z-10 w-full max-h-80 overflow-y-auto 
      rounded-xl bg-white/90 backdrop-blur-lg shadow-xl
      transition-all duration-300 animate-fadeInDown"
        >
          {filteredServices.map((service) => (
            <div key={service._id}>
              <div
                className="p-3 cursor-pointer hover:bg-indigo-50 flex justify-between items-center 
    rounded-md transition duration-200 ease-in-out"
                onClick={() => handleServiceClick(service)}
              >
                <span className="text-gray-800 font-medium text-sm">
                  {service.category}
                </span>
                <FontAwesomeIcon
                  icon={
                    expandedServices[service._id] ? faChevronUp : faChevronDown
                  }
                  className="text-indigo-400"
                />
              </div>

              {/* Subservices */}
              {selectedService?._id === service._id &&
                expandedServices[service._id] && (
                  <div className="bg-indigo-50/60">
                    {Object.keys(subServices).length > 0
                      ? Object.keys(subServices)
                          .filter((sub) =>
                            sub.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((sub) => (
                            <div key={sub} className="pl-4">
                              <div
                                className="p-3 cursor-pointer hover:bg-indigo-50 flex justify-between items-center 
    rounded-md transition duration-200"
                                onClick={() => handleSubserviceClick(sub)}
                              >
                                <span className="text-indigo-800 text-sm">
                                  {sub}
                                </span>
                                <FontAwesomeIcon
                                  icon={
                                    expandedSubservices[sub]
                                      ? faChevronUp
                                      : faChevronDown
                                  }
                                  className="text-indigo-400"
                                />
                              </div>

                              {/* Products */}
                              {selectedSubservice === sub &&
                                expandedSubservices[sub] &&
                                subServices[sub].map((product, i) => (
                                  <div
                                    key={`${sub}-${i}`}
                                    className="pl-8 py-1 text-sm text-gray-700 hover:text-indigo-600 cursor-pointer transition-all"
                                    onClick={() => handleProductClick(product)}
                                  >
                                    • {product}
                                  </div>
                                ))}
                            </div>
                          ))
                      : productItems
                          .filter((product) =>
                            product
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((product, i) => (
                            <div
                              key={`${service._id}-${i}`}
                              className="pl-6 py-2 text-sm text-gray-700 hover:text-indigo-600 cursor-pointer transition-all"
                              onClick={() => handleProductClick(product)}
                            >
                              • {product}
                            </div>
                          ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceNavMenu;
