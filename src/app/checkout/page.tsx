"use client";
import { useState } from "react";
import selfcare_1 from "../../assets/selfcare-items/selfcare-item-1.png";
import selfcare_2 from "../../assets/selfcare-items/selfcare-item-2.png";
import Select from "react-select";
import countryList from "react-select-country-list";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reduxStore";
import { createOrder } from "@/api/order";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "@/reduxSlices/cartSlice";

import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/api/config";

export default function Checkout() {
  const credentials = useSelector((state: RootState) => state.login);
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Pakistan",
    city: "",
    state: "",
    zip: "",
    address: "",
    deliveryMethod: "COD",
    shippingMethod: "Delivery",
    agree: false,
  });
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "DuoComfort Sofa Premium", price: 20, image: selfcare_1 },
    { id: 2, name: "IronOne Desk", price: 25, image: selfcare_2 },
  ]);
  const [country, setCountry] = useState(null);
  const countries = countryList().getData();
  const handleCountryChange = (selectedOption: any) => {
    setCountry(selectedOption);
  };

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(10);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    agree: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const total = cart.total;

  const validateForm = () => {
    let formErrors: any = {};
    let valid = true;

    if (!formData.fullName) {
      formErrors.fullName = "Full name is required.";
      valid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email is required.";
      valid = false;
    }

    if (!formData.phone) {
      formErrors.phone = "Phone number is required.";
      valid = false;
    }

    if (!formData.city) {
      formErrors.city = "City is required.";
      valid = false;
    }

    if (!formData.state) {
      formErrors.state = "State is required.";
      valid = false;
    }

    if (!formData.zip) {
      formErrors.zip = "ZIP code is required.";
      valid = false;
    }

    if (!formData.address) {
      formErrors.address = "Address is required.";
      valid = false;
    }

    if (!formData.agree) {
      formErrors.agree = "You must agree to the terms and conditions.";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleOrder = async () => {
    try {
      if (!validateForm()) {
        return;
      }
  
      const orderData = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        productList: cart.ProductList.map((productItem) => ({
          product: {
            _id: productItem.product._id,
            name: productItem.product.name,
            base_price: productItem.product.base_price,
            discounted_price: productItem.product.discounted_price,
            description: productItem.product.description,
            image1: productItem.product.image1,
            image2: productItem.product.image2 || "",
            image3: productItem.product.image3 || "",
            status: productItem.product.status,
            type: productItem.product.type.map((t) => ({
              id: t.id || "",
              value: t.value || "-",
            })),
            size: productItem.product.size.map((s) => ({
              id: s.id || "",
              value: s.value || "-",
              unit: s.unit || "-",
            })),
            rate_of_salon: productItem.product.rate_of_salon,
            ref_of_salon: productItem.product.ref_of_salon,
          },
          storeId: productItem.product.store,
          quantity: productItem.quantity,
          total_price:
            productItem.quantity * productItem.product.discounted_price,
        })),
        total: cart.total,
        discountedTotal: cart.discountedTotal,
        paymentMethod: "COD",
        ShippingInfo: formData,
      };
  
      const res = await createOrder(orderData, credentials.token);
  
      if (res?.order) {
        const emailPayload = {
          to: formData.email,
          viewModel: {
            customer: {
              name: formData.fullName,
              email: formData.email,
            },
            order: {
              id: res.order._id, 
              date: new Date().toLocaleDateString(), 
              items: res.order.productList.map((productItem: any) => ({
                productId: productItem.product._id,
                storeId: productItem.product.store,
                name: productItem.product.name,
                image: productItem.product.image1,
                quantity: productItem.quantity,
                price: productItem.product.discounted_price,
              })),
              subtotal: res.order.total, 
              shipping: 5, 
              total: res.order.discountedTotal,
            },
          },
        };
  
        await fetch(`${BACKEND_URL}/admin/send-order-confirmation-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.token}`, 
          },
          body: JSON.stringify(emailPayload),
        });
  
        toast.success(
          "Order has been confirmed! You will receive an email shortly."
        );

        dispatch(clearCart());
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order Error:", error);
    }
  };
  
  return (
    <>
      <Toaster />
      <div className="w-[99vw] p-8 max-sm:h-max">
        {cart.ProductList.length > 0 ? (
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Checkout</h1>
              <h2 className="text-xl font-semibold mb-6">
                Shipping Information
              </h2>
              <form className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="Delivery"
                      checked={true}
                      readOnly
                      onChange={handleInputChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Delivery</span>
                  </label>
                  {/* <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="Pick Up"
                      checked={formData.deliveryMethod === "Pick Up"}
                      onChange={handleInputChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Pick up</span>
                  </label> */}
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
                 {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                {/* <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded"
                        >
                            <option value="">Select country</option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                        </select> */}
                <Select
                  value={"Pakistan"}
                  defaultValue={"Pakistan"}
                  // onChange={() => {}}
                  className="mt-1"
                  placeholder="Pakistan"
                  isDisabled
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                  />
                   {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm">{errors.zip}</p>
                  )}
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <span>I have read and agree to the Terms and Conditions</span>
                </label>
                {errors.agree && (
                  <p className="text-red-500 text-sm">{errors.agree}</p>
                )}
              </form>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-6">Review your cart</h2>
              <div className="max-h-48 overflow-y-auto space-y-4">
                {cart.ProductList.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div className="flex gap-2">
                      <img
                        //@ts-ignore
                        src={item.product.image1}
                        alt="self_care"
                        width={50}
                        height={22}
                        className="h-16 w-16 rounded-md object-cover"
                      />

                      <span>{item.product.name}</span>
                    </div>
                    <span>
                      PKR{" "}
                      {item.product.discounted_price
                        ? item.product.discounted_price
                        : item.product.base_price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="w-full p-3 border rounded"
                />
                <button
                  onClick={() => alert("Apply discount logic here")}
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
                >
                  Apply
                </button>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>{cart.total} PKR</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-{cart.total - cart.discountedTotal} PKR</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>{100} PKR</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>SubTotal</span>
                  <span>{cart.discountedTotal + 100} PKR</span>
                </div>
              </div>
              <button
                onClick={handleOrder}
                className="mt-6 w-full bg-blue-500 text-white py-3 rounded"
              >
                Order Now
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center  justify-center items-center bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <p className="font-medium">Please Add Some Products in Cart</p>
          </div>
        )}
      </div>
    </>
  );
}
