"use client";
import { useState, useEffect } from "react";
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
import axios from "axios";

// New interface for payment params
interface PaymentParams {
  [key: string]: string;
}

export default function Checkout() {
  const credentials = useSelector((state: RootState) => state.login);
  console.log(credentials);
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    paymentMethod: "Cash on Delivery",
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

      const paymentMethodSelected = formData.paymentMethod;
      if (paymentMethodSelected === "JazzCash") {
        await handleJazzCashPayment();
        return;
      } else if (paymentMethodSelected === "Bank Alfalah") {
        await handleBankAlfalahPayment();
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
            type: productItem.product.type
              .filter((t) => t.value && t.value !== "-")
              .map((t) => ({
                id: t.id || "",
                value: t.value || "DefaultType",
              })),
            size: productItem.product.size.map((s) => ({
              id: s.id || "",
              value: s.value || "DefaultSize",
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
        paymentMethod: paymentMethodSelected || "COD",
        ShippingInfo: formData,
      };

      // const response = await createOrder(orderData);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order Error:", error);
    }
  };

  const handleJazzCashPayment = async () => {
    try {
      setLoading(true);

      const validProductList = cart.ProductList.map((productItem) => {
        const validTypes = productItem.product.type
          .filter((t) => t.value && t.value !== "-")
          .map((t) => ({
            id: t.id || "",
            value: t.value || "DefaultType",
          }));

        return {
          storeId: productItem.product.store,
          quantity: productItem.quantity,
          total_price:
            productItem.quantity * productItem.product.discounted_price,
          product: {
            _id: productItem.product._id,
            name: productItem.product.name,
            base_price: productItem.product.base_price,
            discounted_price: productItem.product.discounted_price,
            status: productItem.product.status,
            type:
              validTypes.length > 0
                ? validTypes
                : [{ id: "", value: "DefaultType" }],
            size: productItem.product.size.map((s) => ({
              id: s.id || "",
              value: s.value || "DefaultSize",
              unit: s.unit || "-",
            })),
          },
        };
      });

      if (validProductList.some((item) => item.product.type.length === 0)) {
        toast.error(
          "Some products have invalid types. Please check your cart."
        );
        setLoading(false);
        return;
      }

      const orderDto = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        total: cart.total,
        discountedTotal: cart.discountedTotal,
        payment: {
          status: "Pending",
          gateway: "JazzCash",
          transactionId: `JAZZ-${Date.now()}`,
        },
        productList: validProductList,
        ShippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          address: formData.address,
          shippingMethod: formData.shippingMethod,
        },
        customerPhone: formData.phone,
        customerCNIC: "4250156667561",
      };

      const { data } = await axios.post(
        "https://www.api.glimmer.com.pk/jazzcash/initiate-payment",
        orderDto
      );

      if (!data.paymentParams || !data.redirectUrl) {
        throw new Error("Invalid payment response");
      }

      // Create and submit the payment form to redirect to JazzCash Method
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.redirectUrl;
      form.target = "_blank";

      Object.entries(data.paymentParams).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      setLoading(false);
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("Payment initiation failed. Please try again.");
      setLoading(false);
    }
  };

  const handleBankAlfalahPayment = async () => {
    try {
      setLoading(true);

      const validProductList = cart.ProductList.map((productItem) => {
        const validTypes = productItem.product.type
          .filter((t) => t.value && t.value !== "-")
          .map((t) => ({
            id: t.id || "",
            value: t.value || "DefaultType",
          }));

        return {
          storeId: productItem.product.store,
          quantity: productItem.quantity,
          total_price:
            productItem.quantity * productItem.product.discounted_price,
          product: {
            _id: productItem.product._id,
            name: productItem.product.name,
            base_price: productItem.product.base_price,
            discounted_price: productItem.product.discounted_price,
            status: productItem.product.status,
            type:
              validTypes.length > 0
                ? validTypes
                : [{ id: "", value: "DefaultType" }],
            size: productItem.product.size.map((s) => ({
              id: s.id || "",
              value: s.value || "DefaultSize",
              unit: s.unit || "-",
            })),
          },
        };
      });

      if (validProductList.some((item) => item.product.type.length === 0)) {
        toast.error(
          "Some products have invalid types. Please check your cart accordingly."
        );
        setLoading(false);
        return;
      }

      const orderDto = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        total: cart.total,
        discountedTotal: cart.discountedTotal,
        ShippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          address: formData.address,
          shippingMethod: formData.shippingMethod,
        },
        productList: validProductList,
        customerPhone: formData.phone,
        customerCNIC: "4250156667561",
      };

      const response = await fetch(
        "https://www.api.glimmer.com.pk/alfalah/initiate-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDto),
        }
      );

      const data = await response.json();

      if (response.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl; // 🔁 redirect to Alfalah
      } else {
        toast.error(data.message || "Something went wrong during payment.");
      }
    } catch (err) {
      console.error("Alfalah payment failed:", err);
      toast.error("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
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
                <Select
                  value={"Pakistan"}
                  defaultValue={"Pakistan"}
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
                <div className="mt-6">
                  <label className="block font-semibold mb-2">
                    Payment Method
                  </label>
                  <div className="flex gap-4 flex-wrap">
                    <label
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all
                        ${
                          formData.paymentMethod === "Cash on Delivery"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={formData.paymentMethod === "Cash on Delivery"}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span>💵</span>
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                    <label
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all
                        ${
                          formData.paymentMethod === "JazzCash"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                        }`}
                      onClick={() => {
                        setFormData({ ...formData, paymentMethod: "JazzCash" });
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="JazzCash"
                        checked={formData.paymentMethod === "JazzCash"}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span>💳</span>
                      <span className="font-medium">JazzCash</span>
                    </label>
                    <label
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all
                        ${
                          formData.paymentMethod === "Bank Alfalah"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                        }`}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          paymentMethod: "Bank Alfalah",
                        });
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Bank Alfalah"
                        checked={formData.paymentMethod === "Bank Alfalah"}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span>🏦</span>
                      <span className="font-medium">Bank Alfalah</span>
                    </label>
                  </div>
                </div>
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
                disabled={loading}
              >
                {loading ? "Processing..." : "Order Now"}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center justify-center items-center bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="font-medium">Please Add Some Products in Cart</p>
          </div>
        )}
      </div>
    </>
  );
}
