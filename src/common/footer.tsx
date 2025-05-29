import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { FaGoogle, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-[99vw] bg-neutral text-neutral-content mt-5 p-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10 lg:mt-[8rem] md:mt-[3rem]">
        <footer className="relative w-[99vw] bg-neutral text-neutral-content mt-5 p-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {/* Section 1 */}
            <div>
              <h3 className="font-bold mb-2 text-white">MY ACCOUNT</h3>
              <ul className="space-y-1">
                <li>
                  <a className="hover:text-white" href="/signup">
                    Sign in
                  </a>
                </li>

                <li>
                  <a className="hover:text-white" href="/cart">
                    New Bag
                  </a>
                </li>

                <li>
                  <a className="hover:text-white" href="/cart">
                    Track My Order
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="">
                    Appointments
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="font-bold mb-2 text-white">INFORMATION</h3>
              <ul className="space-y-1">
                <li>
                  <a className="hover:text-white" href="#">
                    Delivery Information
                  </a>
                </li>
                {/* <li><a className="hover:text-white" href="#">Blog</a></li> */}
                <li>
                  <a className="hover:text-white" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="font-bold mb-2 text-white">CUSTOMER SERVICES</h3>
              <ul className="space-y-1">
                <li>
                  <a className="hover:text-white" href="#">
                    Shipping and Returns
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="font-bold mb-2 text-white">
                PAYMENT AND SHIPPING
              </h3>
              <ul className="space-y-1">
                <li>
                  <a className="hover:text-white" href="#">
                    Terms of Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Payment Methods
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Shipping Guide
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Locations We Ship To
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Estimated Delivery Time
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 5*/}
            <div>
              <h3 className="font-bold mb-2 text-white">Salon Services</h3>
              <ul className="space-y-1">
                <li>
                  <a className="hover:text-white" href="#">
                    Book a Salon Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    How Booking Works
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Salon Booking Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="font-bold mb-2 text-white">
                Booking Cancellation Policy
              </h3>
              <ul className="space-y-1">
                <li>
                  <a className="hover:text-white" href="#">
                    Cancellation Window
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    How to cancel
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Late Cancellations
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="font-bold mb-2 text-white">Partner With Us</h3>
              <ul className="space-y-1">
                <li>
                  <a className="hover:text-white" href="#">
                    Register your Salon
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#">
                    Register your Gym
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 8*/}
            <div>
              <h3 className="font-bold mb-3 text-white">CONTACT US</h3>
              <div className="flex flex-col items-center md:items-start mt-3">
                <Link
                  href="https://wa.me/0331-2062376"
                  target="_blank"
                  className="flex items-center opacity-90 hover:opacity-100 hover:text-white"
                >
                  <FaWhatsapp className="mr-2" />
                  <p>0331-2062376</p>
                </Link>
                <Link
                  href="mailto:info@glimmer.com.pk"
                  target="_blank"
                  className="flex items-center opacity-90 hover:opacity-100 hover:text-white"
                >
                  <FaEnvelope className="mr-2" />
                  <p>info@glimmer.com.pk</p>
                </Link>
              </div>
            </div>
          </div>
          <hr className="my-6 border-t border-[#FBE8A5]" />
          <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-3">
            {/* Left: Links */}
            <div className="space-x-3">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="/terms-and-conditions" className="hover:underline">
                Terms and Conditions
              </a>
            </div>

            {/* Right: Copyright */}
            <div className="text-center md:text-right">
              Copyright © 2025 Glimmer. All Rights Reserved.
            </div>

            {/* Social Icons Row */}
            <div className="flex gap-4 mt-4 md:mt-0 md:ml-auto">
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaGoogle size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
