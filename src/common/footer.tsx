import React, { useState } from "react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaEnvelope,
  FaGoogle,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import RegisterGymModal from "./RegisterGymModal";

const Footer = () => {
  const [showGymModal, setShowGymModal] = useState(false);

  return (
    <>
      <footer className="relative w-[99vw] bg-neutral text-neutral-content mt-5 p-3">
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10 lg:mt-[8rem] md:mt-[3rem]">
          <footer className="relative w-[99vw] bg-neutral text-neutral-content mt-5 p-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* Section 1 */}
              <div>
                <h3 className="font-bold mb-2 text-white">MY ACCOUNT</h3>
                <ul className="space-y-1">
                  <li>
                    <a className="hover:text-white" href="signup">
                      SignIn/Register
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="/cart">
                      New Bag
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="Track_My_Order">
                      Track My Order
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
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
                    <a className="hover:text-white" href="DelieveryInfo">
                      Delivery Information & FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="font-bold mb-2 text-white">CUSTOMER SERVICES</h3>
                <ul className="space-y-1">
                  <li>
                    <a className="hover:text-white" href="Shipping_and_Returns">
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
                    <a className="hover:text-white" href="Payment_Methods">
                      Payment Methods
                    </a>
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="font-bold mb-2 text-white">Salon Services</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/salons" className="hover:text-white">
                      Book a Salon Service
                    </Link>
                  </li>
                  <li>
                    <a className="hover:text-white" href="Booking_Work_Policy">
                      Booking Works & Policy
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
                    <a
                      className="hover:text-white"
                      href="/Booking_Cancellation_policy"
                    >
                      Cancellation Window
                    </a>
                  </li>
                </ul>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="font-bold mb-2 text-white">Partner With Us</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/salons/business" className="hover:text-white">
                      Register your Salon
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowGymModal(true);
                      }}
                      className="hover:text-white cursor-pointer"
                    >
                      Register your Gym
                    </a>
                  </li>
                </ul>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="font-bold mb-3 text-white">CONTACT US</h3>
                <div className="flex flex-col items-center md:items-start mt-3">
                  <Link
                    href="https://wa.me/+923312062376"
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
              <div className="space-x-3">{/* <span>|</span>  */}</div>

              {/* <div className="text-center md:text-right">
                A-125 Gulshan-e-iqbal, Block 1, Karachi.{" "}
                 <span>|</span> 
              </div>
              <div className="text-center md:text-right">
                Business Hours: Mon–Sat | 10:00 AM – 6:00 PM
              </div> */}
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

      {/* ✅ Correct Modal Implementation */}
      <RegisterGymModal
        visible={showGymModal}
        onCancel={() => setShowGymModal(false)}
        //@ts-ignore
        onSubmit={(values) => {
          console.log("Gym submitted:", values);
          setShowGymModal(false);
        }}
      />
    </>
  );
};

export default Footer;
