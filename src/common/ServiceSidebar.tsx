import { useEffect, useState } from "react";
import { message } from "antd";
import { getAllServices, getAllServicesById } from "@/api/salon";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ServiceSidebar = () => {
  const router = useRouter();
  const [services, setServices] = useState<{ _id: string; category: string }[]>(
    []
  );
  const [subServices, setSubservices] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [productItems, setProductItems] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSubservice, setSelectedSubservice] = useState<string | null>(
    null
  );
  const [subCategoryName, setSubCategoryName] = useState<string | null>(null);
  const [subSubCategoryName, setSubSubCategoryName] = useState<string | null>(null);

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

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedSubservice(null); // Reset subservice when a new service is selected
    fetchSubservicesAndProducts(serviceId);
  };

  const handleSubserviceChange = (subservice: string) => {
    setSelectedSubservice(subservice);

    setSubCategoryName(subservice);
  };

  const handleProductClick = (product: string) => {
    setSubSubCategoryName(product); // Update subSubCategoryName filter with product selection
    updateUrlWithFilters(subCategoryName, product);
  };
  
  const updateUrlWithFilters = (subCategory: string | null, subSubCategory: string | null) => {
    const params = new URLSearchParams();
    if (subCategory) params.set('subCategoryName', subCategory);
    if (subSubCategory) params.set('subSubCategoryName', subSubCategory);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (subCategoryName) params.set('subCategoryName', subCategoryName);
    if (subSubCategoryName) params.set('subSubCategoryName', subSubCategoryName);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [subCategoryName, subSubCategoryName, router]);


  return (
    <div className="p-6 border-r bg-[#FDF3D2] shadow-md hidden md:block w-72">
      <h2 className="font-bold text-2xl text-gray-800">Filters</h2>

      {/* Services Radio Buttons */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-700">Service</h3>
        {services.map((service) => (
          <div key={service._id} className="p-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="service"
                checked={selectedService === service._id}
                onChange={() => handleServiceChange(service._id)}
                className="mr-2 hidden" // This hides the default radio button
              />
              <span
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                  selectedService === service._id ? 'border-purple-700' : 'border-gray-400'
                }`}
              >
                {selectedService === service._id && (
                  <motion.div
                    className="w-3 h-3 bg-purple-500 rounded-full"
                    layoutId="categorySelection"
                  />
                )}
              </span>
              {service.category}
            </label>

            {/* Show subservices and products when a service is selected */}
            {selectedService === service._id && (
              <div className="pl-4 mt-2">
                {Object.keys(subServices).length > 0
                  ? Object.keys(subServices).map((sub) => (
                      <div key={sub} className="p-2">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="subservice"
                            checked={selectedSubservice === sub}
                            onChange={() => handleSubserviceChange(sub)}
                            className="mr-2 hidden"
                          />
                          <span
                            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                              selectedSubservice === sub ? 'border-purple-700' : 'border-gray-400'
                            }`}
                          >
                            {selectedSubservice === sub && (
                              <motion.div
                                className="w-3 h-3 bg-purple-500 rounded-full"
                                layoutId="categorySelection"
                              />
                            )}
                          </span>
                          {sub}
                        </label>

                        {/* Show products when subservice is selected */}
                        {selectedSubservice === sub && (
                          <div className="pl-4 mt-2">
                            {subServices[sub].map((product, index) => (
                              <div
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleProductClick(product)}
                              >
                                {product}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  : productItems.map((product, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {product}
                      </div>
                    ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price Filter */}
      {/* <div className="mt-6"> */}
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
      <div className="mt-6">
        <button className="w-full mt-2 bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900">
          Apply
        </button>
      </div>
    </div>
  );
};

export default ServiceSidebar;
