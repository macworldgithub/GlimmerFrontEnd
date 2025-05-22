"use client";

import { getAllServices, getAllServicesById } from "@/api/salon";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import { useState, useEffect } from "react";

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
  const [services, setServices] = useState<{ _id: string; category: string }[]>([]);
  const [subServices, setSubservices] = useState<{ [key: string]: string[] }>({});
  const [productItems, setProductItems] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<{ _id: string; category: string } | null>(null);
  const [selectedSubservice, setSelectedSubservice] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedServices, setExpandedServices] = useState<{ [key: string]: boolean }>({});
  const [expandedSubservices, setExpandedSubservices] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Auto-close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => setIsDropdownOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Fetch Subservices and Products based on selected service
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
    "https://drive.google.com/file/d/1-OBBTinng-qPWrXl4IuGT6qDQqPyINK8/view?usp=sharing";

  return (
    <div className={`relative w-80 ${className}`}>
      {/* Dropdown Trigger */}
      <div
        className="flex justify-between items-center p-3 cursor-pointer transition-all ease-in-out duration-300"
        onClick={toggleDropdown}
      >
        <div className="p-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            type="text"
            placeholder={selectedLabel}
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            className="w-full p-2 border-none outline-none"
          />
        </div>
        <button className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
          {isDropdownOpen ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
      </div>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="absolute z-10 bg-white rounded-lg mt-2 w-full max-h-80 overflow-y-auto shadow-lg transition-all ease-in-out duration-300">
          {filteredServices.map((service) => (
            <div key={service._id}>
              <div
                className="p-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center rounded-md transition-all ease-in-out duration-200"
                onClick={() => handleServiceClick(service)}
              >
                <span className="text-gray-800 font-semibold">{service.category}</span>
                <button className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                  {expandedServices[service._id] ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </button>
              </div>

              {/* Subservices or Direct Products */}
              {selectedService?._id === service._id && expandedServices[service._id] && (
                <div className="pl-4">
                  {Object.keys(subServices).length > 0
                    ? Object.keys(subServices)
                        .filter((subservice) =>
                          subservice.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((subservice) => (
                          <div key={subservice}>
                            <div
                              className="p-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center rounded-md transition-all ease-in-out duration-200"
                              onClick={() => handleSubserviceClick(subservice)}
                            >
                              <span className="text-gray-700">{subservice}</span>
                              <button className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                                {expandedSubservices[subservice] ? (
                                  <FontAwesomeIcon icon={faChevronUp} />
                                ) : (
                                  <FontAwesomeIcon icon={faChevronDown} />
                                )}
                              </button>
                            </div>

                            {/* Products under subservice */}
                            {selectedSubservice === subservice &&
                              expandedSubservices[subservice] &&
                              subServices[subservice].map((product, index) => (
                                <div
                                  key={`${subservice}-${index}`}
                                  className="p-3 cursor-pointer"
                                  onClick={() => handleProductClick(product)}
                                >
                                  {product}
                                </div>
                              ))}
                          </div>
                        ))
                    : productItems
                        .filter((product) =>
                          product.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((product, index) => (
                          <div
                            key={`${service._id}-${index}`}
                            className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-all ease-in-out duration-200"
                            onClick={() => handleProductClick(product)}
                          >
                            {product}
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
