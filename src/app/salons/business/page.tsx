"use client";

import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import NewSaloons from "../components/new-salons";
import TrendingSaloons from "../components/trending-saloons";
import Assurity from "@/app/selfcare-products/components/Assurity";
import BrowseByAreaList from "../components/browse-by-area-list";
import GlimmerAchieves from "../components/glimmer-achieves";
import GlimmerForBusiness from "../components/glimmer-for-business";
import Services from "../components/services";
import Faq from "@/app/selfcare-products/components/Faq";
import { Button, Form, Input, Modal } from "antd";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    console.log("Form Values: ", values);
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="w-[99vw] flex flex-col items-center justify-center pt-[6rem] text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          The #1 software for Salons and Spas
        </h1>
        <p className="mt-2 text-base sm:text-lg md:text-xl">
          Simple, flexible and powerful booking software for your business.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            onClick={showModal}
            className="px-6 py-3 text-white bg-black rounded-3xl transform transition-all duration-300 hover:translate-y-1 w-full sm:w-auto"
          >
            Get started now
          </button>
          <button
            onClick={openModal}
            className="px-6 py-3 border border-black rounded-3xl transform transition-all duration-300 hover:translate-y-1 w-full sm:w-auto"
          >
            Watch an overview
          </button>

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
              <button
                className="absolute top-4 right-4 text-white bg-black rounded-full w-12 h-12 focus:outline-none z-20 transition-transform transform hover:scale-105 hover:bg-gray-800 active:bg-gray-700"
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
              </button>
              <div className="relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg overflow-hidden">
                <div className="relative p-0 z-10">
                  <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm z-0"></div>
                  <iframe
                    className="relative z-10"
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <img
            className="w-[99vw] pt-[6rem]"
            src="/assets/images/banner.png"
            alt=""
          />
        </div>
        <div className="w-[99vw] flex flex-col items-center justify-center pt-[6rem] text-center px-4 sm:px-12 md:px-[10rem]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            One platform, infinite possibilities
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-[600px]">
            Everything you need to grow and thrive. Glimmer is packed with tools
            to boost sales, provide services, and retain clients, so you can
            focus on what you do best.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={showModal}
              className="px-6 py-3 text-white bg-black rounded-3xl transform transition-all duration-300 hover:translate-y-1 w-full sm:w-auto flex items-center justify-center space-x-2"
            >
              <span>Get started now</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal for Form */}
        <Modal
          title="Register your Salon"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={500}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Salon Name"
              name="salonName"
              rules={[
                { required: true, message: "Please enter your salon name" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Email (Optional)" name="email">
              <Input />
            </Form.Item>

            <p className="text-center text-sm">
              Our team will contact you soon!
            </p>

            <div className="text-center mt-4">
              <Button type="primary" htmlType="submit" className="w-full">
                Send Request
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
      <div className="pt-[6rem] margin-bottom-unset">
        <NewSaloons />
      </div>
      <div className="px-4 md:px-16 lg:px-[10rem] w-[99vw] bg-[#FBE8A5] py-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Everything you need to run your business
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl">
            Glimmer offers innovative features that bring convenience,
            efficiency, and an improved experience for both your team members
            and clients.
          </p>
        </div>

        {/* Grid for Manage, Grow, and Get Paid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-4 bg-gray-100 rounded-lg shadow-lg  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
            <h3 className="text-2xl font-semibold mb-4">Manage</h3>
            <p className="text-lg">
              Manage bookings, sales, clients, locations, team members. Analyse
              your business with advanced reporting and analytics.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg shadow-lg  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
            <h3 className="text-2xl font-semibold mb-4">Grow</h3>
            <p className="text-lg">
              Win new clients on the world's largest beauty and wellness
              marketplace. Keep them coming back with marketing features.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg shadow-lg  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
            <h3 className="text-2xl font-semibold mb-4">Get paid</h3>
            <p className="text-lg">
              Get paid fast with seamless payment processing. Reduce no-shows
              with upfront payments and simplify checkout.
            </p>
          </div>
        </div>
      </div>
      <div className="pt-[6rem]">
        <Assurity />
      </div>
      <div className="pt-[6rem]">
        <Services />
      </div>
      <div className="pt-[6rem]">
        <Faq />
      </div>

      <div className="pt-[6rem]">
        <GlimmerAchieves />
      </div>
    </>
  );
};

export default Page;
