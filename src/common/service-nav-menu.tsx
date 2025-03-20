"use client";

import { getAllServices, getAllServicesById } from "@/api/salon";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import { useState, useEffect } from "react";

interface ServiceNavMenuProps {
  className?: string;
}

const ServiceNavMenu = ({ className }: ServiceNavMenuProps) => {
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedServices, setExpandedServices] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSubservices, setExpandedSubservices] = useState<{
    [key: string]: boolean;
  }>({});

  // Fetch Categories
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
    if (!categoryId) {
      console.warn("No category ID provided for fetching subservices.");
      return;
    }
    try {
      const data = await getAllServicesById(categoryId);
      if (Array.isArray(data.services)) {
        // Direct products (no subservices)
        setSubservices({});
        setProductItems(data.services);
      } else if (data.services && typeof data.services === "object") {
        // Subservices with nested products
        setSubservices(data.services);
        setProductItems([]);
      } else {
        // Fallback
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
    setSelectedSubservice(null); // Reset subservice when a new service is selected
    // Toggle the expanded state of the service
    setExpandedServices((prev) => ({
      ...prev,
      [service._id]: !prev[service._id],
    }));
  };

  const handleSubserviceClick = (subservice: string) => {
    setSelectedSubservice(subservice);
    // Toggle the expanded state of the subservice
    setExpandedSubservices((prev) => ({
      ...prev,
      [subservice]: !prev[subservice],
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`relative w-80 ${className}`}>
      {/* Dropdown Trigger */}
      <div
        className="flex justify-between items-center p-3 cursor-pointer bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 transition-all ease-in-out duration-300"
        onClick={toggleDropdown}
      >
        <span className="text-gray-700 font-medium">
          {selectedService
            ? selectedSubservice
              ? `${selectedService.category} > ${selectedSubservice}`
              : selectedService.category
            : "Select Service"}
        </span>
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
        <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-2 w-full max-h-60 overflow-y-auto shadow-lg transition-all ease-in-out duration-300">
          {/* Services */}
          {services.map((service) => (
            <div key={service._id}>
              <div
                className="p-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center rounded-md transition-all ease-in-out duration-200"
                onClick={() => handleServiceClick(service)}
              >
                <span className="text-gray-800 font-semibold">
                  {service.category}
                </span>
                <button className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                  {expandedServices[service._id] ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </button>
              </div>

              {/* Subservices or Direct Products */}
              {selectedService?._id === service._id &&
                expandedServices[service._id] && (
                  <div className="pl-4">
                    {Object.keys(subServices).length > 0
                      ? // Render subservices if they exist
                        Object.keys(subServices).map((subservice) => (
                          <div key={subservice}>
                            <div
                              className="p-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center rounded-md transition-all ease-in-out duration-200"
                              onClick={() => handleSubserviceClick(subservice)}
                            >
                              <span className="text-gray-700">
                                {subservice}
                              </span>
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
                              Array.isArray(subServices[subservice]) && (
                                <div className="pl-4">
                                  {subServices[subservice].map(
                                    (product, index) => (
                                      <div
                                        key={`${subservice}-${index}`}
                                        className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-all ease-in-out duration-200"
                                      >
                                        {product}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))
                      : // Render direct products if no subservices exist
                        productItems.map((product, index) => (
                          <div
                            key={`${service._id}-${index}`}
                            className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-all ease-in-out duration-200"
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
