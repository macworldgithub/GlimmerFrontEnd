import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllServices, getAllServicesById } from "@/api/salon";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ServiceSidebar = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [services, setServices] = useState<{ _id: string; category: string }[]>(
    []
  );
  const [subServices, setSubservices] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [productItems, setProductItems] = useState<string[]>([]);
  const [expandedServices, setExpandedServices] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSubservices, setExpandedSubservices] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (error) {
        message.error("Failed to fetch services");
      }
    };
    fetchServices();
  }, []);

  const fetchSubservicesAndProducts = async (categoryId: string) => {
    if (!categoryId) return;
    try {
      const data = await getAllServicesById(categoryId);
      if (Array.isArray(data.services)) {
        setSubservices({});
        setProductItems(data.services);
      } else {
        setSubservices(data.services);
        setProductItems([]);
      }
    } catch (error) {
      message.error("Failed to fetch subservices and products");
    }
  };

  const toggleService = (service: any) => {
    setExpandedServices((prev) => {
      const newExpanded = { ...prev, [service._id]: !prev[service._id] };
      if (!prev[service._id]) fetchSubservicesAndProducts(service._id);
      return newExpanded;
    });
  };

  const toggleSubservice = (subservice: string) => {
    setExpandedSubservices((prev) => ({
      ...prev,
      [subservice]: !prev[subservice],
    }));
  };

  return (
    <div className="p-6 border-r bg-[#FDF3D2] shadow-md hidden md:block w-72">
      <h2 className="font-bold text-2xl text-gray-800">Filters</h2>

      {/* Services Dropdown */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-700">Service</h3>
        {services.map((service) => (
          <div key={service._id}>
            <div
              className="p-2 cursor-pointer flex justify-between items-center hover:bg-gray-100"
              onClick={() => toggleService(service)}
            >
              <span>{service.category}</span>
              <FontAwesomeIcon icon={expandedServices[service._id] ? faChevronUp : faChevronDown} />
            </div>
            {expandedServices[service._id] && (
              <div className="pl-4">
                {Object.keys(subServices).length > 0
                  ? Object.keys(subServices).map((sub) => (
                      <div key={sub}>
                        <div
                          className="p-2 cursor-pointer flex justify-between items-center hover:bg-gray-100"
                          onClick={() => toggleSubservice(sub)}
                        >
                          <span>{sub}</span>
                          <FontAwesomeIcon icon={expandedSubservices[sub] ? faChevronUp : faChevronDown} />
                        </div>
                        {expandedSubservices[sub] && (
                          <div className="pl-4">
                            {subServices[sub].map((product, index) => (
                              <div key={index} className="p-2 cursor-pointer hover:bg-gray-100">
                                {product}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  : productItems.map((product, index) => (
                      <div key={index} className="p-2 cursor-pointer hover:bg-gray-100">
                        {product}
                      </div>
                    ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mt-6">
        {/* <h3 className="font-semibold text-lg text-gray-700">Price Range</h3>
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
        </div> */}
        <button
          className="w-full mt-2 bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ServiceSidebar;
