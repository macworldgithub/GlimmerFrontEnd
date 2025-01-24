// pages/index.js
"use client"
import { useState } from 'react';
import selfcare_1 from "../../assets/selfcare-items/selfcare-item-1.png"
import selfcare_2 from "../../assets/selfcare-items/selfcare-item-2.png"
import Select from 'react-select';
import countryList from 'react-select-country-list';

import Image from 'next/image';
export default function Checkout() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        deliveryMethod: 'Delivery',
        agree: false,
    });

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'DuoComfort Sofa Premium', price: 20 , image: selfcare_1,},
        { id: 2, name: 'IronOne Desk', price: 25, image: selfcare_2,   },
    ]);
    const [country, setCountry] = useState(null);
    const countries = countryList().getData();

    const handleCountryChange = (selectedOption: any) => {
        setCountry(selectedOption);
    };  
    
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(10);

    const handleInputChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    

    const total = cartItems.reduce((sum, item) => sum + item.price, 0) - discount;

    return (
        <div className=" p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div>
                <h1 className='text-4xl font-bold mb-4'>Checkout</h1>
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    <form className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="deliveryMethod"
                                    value="Delivery"
                                    checked={formData.deliveryMethod === 'Delivery'}
                                    onChange={handleInputChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Delivery</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="deliveryMethod"
                                    value="Pick up"
                                    checked={formData.deliveryMethod === 'Pick up'}
                                    onChange={handleInputChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Pick up</span>
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
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded"
                        />
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
                            options={countries}
                            value={country}
                            onChange={handleCountryChange}
                            className="mt-1"
                            placeholder="Select a country"
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
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
                            <input
                                type="text"
                                name="zip"
                                placeholder="ZIP Code"
                                value={formData.zip}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded"
                            />
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
                    </form>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-6">Review your cart</h2>
                    <div className="space-y-4">
                        {cartItems.map((item) => (

                            <div key={item.id} className="flex justify-between">
                                <div className='flex gap-2'>
                                <Image
                                //@ts-ignore
                                    src={item.image}
                                    alt='self_care'
                                    width={50}
                                    height={22}                                                                       
                                    className="h-16 w-16 rounded-md object-cover"
                                />   
                                                             
                                <span>{item.name}</span>
                                

                                
                                </div>
                                <span>${item.price.toFixed(2)}</span>
                                
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
                            onClick={() => alert('Apply discount logic here')}
                            className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
                        >
                            Apply
                        </button>
                    </div>
                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${total + discount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
}
