


"use client";

import { getAllServices, getAllServicesById } from "@/api/salon";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import { useState, useEffect } from "react";

interface Service {
  _id: string;
  category: string;
}

interface Subservices {
  [key: string]: { [subKey: string]: string[] }; // Proper structure: { "Service1": { "Sub1": ["Product1", "Product2"] } }
}

const ServiceNavMenu = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [subServices, setSubservices] = useState<Subservices>({});
  const [productItems, setProductItems] = useState<{ [key: string]: string[] }>({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSubservice, setSelectedSubservice] = useState<string | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedServices, setExpandedServices] = useState<{ [key: string]: boolean }>({});
  const [expandedSubservices, setExpandedSubservices] = useState<{ [key: string]: boolean }>({});

  // Fetch Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
        setFilteredServices(data);
      } catch (error) {
        message.error("Failed to fetch services");
      }
    };

    fetchServices();
  }, []);

  // Fetch Subservices & Products
  const fetchSubservicesAndProducts = async (categoryId: string) => {
    if (!categoryId) return;
    try {
      const data = await getAllServicesById(categoryId);

      let formattedSubservices: { [key: string]: string[] } = {};
      let formattedProducts: string[] = [];

      if (data.services && typeof data.services === "object") {
        Object.entries(data.services).forEach(([key, value]) => {
          if (typeof value === "object" && !Array.isArray(value)) {
            // Ensure the key is a valid name, not an index like "0", "1"
            formattedSubservices[key] = Object.keys(value); // Extract subservice names
          } else if (Array.isArray(value)) {
            formattedProducts = value; // Store as products
          }
        });

        setSubservices((prev) => ({ ...prev, [categoryId]: formattedSubservices }));
        setProductItems((prev) => ({ ...prev, [categoryId]: formattedProducts }));
      }
    } catch (error) {
      message.error("Failed to fetch subservices and products");
    }
  };

  // Handle Service Click
  const handleServiceClick = (service: Service) => {
    setSelectedService(service._id);
    setSelectedSubservice(null);
    setSearchTerm(service.category);
    setExpandedServices((prev) => ({ ...prev, [service._id]: !prev[service._id] }));

    if (!subServices[service._id]) {
      fetchSubservicesAndProducts(service._id);
    }
  };

  // Handle Subservice Click
  const handleSubserviceClick = (serviceId: string, subservice: string) => {
    setSelectedSubservice(subservice);
    setSearchTerm(`${services.find((s) => s._id === serviceId)?.category} > ${subservice}`);
    setExpandedSubservices((prev) => ({ ...prev, [subservice]: !prev[subservice] }));
  };

  // Handle Search Input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);

    if (value.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <div className="relative w-80">
      {/* Search Input & Toggle */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search or select service"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setIsDropdownOpen(true)}
        />
        <button
          className="absolute right-3 top-2 text-blue-500 hover:text-blue-700 transition-all"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} />
        </button>
      </div>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="absolute z-10 bg-white rounded-lg mt-2 w-full max-h-60 overflow-y-auto shadow-lg">
          {/* Services */}
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service._id}>
                <div
                  className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-all flex justify-between items-center"
                  onClick={() => handleServiceClick(service)}
                >
                  {service.category}
                  <FontAwesomeIcon
                    icon={expandedServices[service._id] ? faChevronUp : faChevronDown}
                    className="text-gray-500"
                  />
                </div>

                {/* Subservices */}
                {expandedServices[service._id] &&
                  subServices[service._id] &&
                  Object.keys(subServices[service._id]).map((subservice) => (
                    <div key={subservice} className="ml-4">
                      <div
                        className="p-2 cursor-pointer hover:bg-gray-200 rounded-md transition-all flex justify-between items-center"
                        onClick={() => handleSubserviceClick(service._id, subservice)}
                      >
                        {subservice}
                        <FontAwesomeIcon
                          icon={expandedSubservices[subservice] ? faChevronUp : faChevronDown}
                          className="text-gray-500"
                        />
                      </div>

                      {/* Products */}
                      {expandedSubservices[subservice] &&
                        subServices[service._id][subservice] &&
                        subServices[service._id][subservice].map((product) => (
                          <div key={product} className="ml-8 p-2 text-gray-700">
                            {product}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No matching services</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceNavMenu;
