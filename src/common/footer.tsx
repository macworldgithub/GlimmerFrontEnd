import React from "react";
import Logo from "@/assets/images/logo.png";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import img1 from "@/assets/partners/partner 1.png";
import img2 from "@/assets/partners/partner 2.png";
import img3 from "@/assets/partners/partner 3.png";
import img4 from "@/assets/partners/partner 4.png";

const Footer = () => {
  return (
    <footer className="w-[99vw] bg-neutral md:p-10 text-neutral-content mt-5">
      <div className="mt-[9rem] container mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo and Description */}
        <aside className="w-full md:w-1/3 text-center md:text-left">
          <img src={Logo.src} alt="logo" className="h-[50px] mx-auto md:mx-0" />
          <p className="max-w-md text-sm md:text-base mt-3">
            Glimmer is a one-stop platform for beauty enthusiasts, offering easy
            salon bookings and a curated selection of self-care products. We
            partner with top beauty brands to bring you quality products and
            services, all in one place. Let your beauty shine with Glimmer!
          </p>
        </aside>

        {/* Social Links */}
        <nav className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="font-bold text-xl md:text-2xl text-white">Find us</h2>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {[
              { icon: FaInstagram, name: "Instagram" },
              { icon: FaTwitter, name: "Twitter" },
              { icon: FaTiktok, name: "Tiktok" },
              { icon: FaFacebook, name: "Facebook" },
              { icon: FaLinkedin, name: "LinkedIn" },
              { icon: FaYoutube, name: "YouTube" },
            ].map(({ icon: Icon, name }, index) => (
              <Link
                key={index}
                href="/"
                title={name}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start opacity-90 transition-all duration-150 hover:opacity-100 hover:text-white"
              >
                <Icon className="mr-2" />
                <p>{name}</p>
              </Link>
            ))}
          </div>

          {/* Contact */}
          <h2 className="mt-6 font-bold text-xl md:text-2xl text-white">
            Contact us
          </h2>
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
              className="flex items-center opacity-90 hover:opacity-100 hover:text-white mt-2"
            >
              <FaEnvelope className="mr-2" />
              <p>info@glimmer.com.pk</p>
            </Link>
          </div>
        </nav>

        {/* Partner Logos */}
        <nav className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="font-bold text-xl md:text-2xl text-white">
            Our partners
          </h2>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {[img1, img2, img3, img4].map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt="partner logo"
                className="h-[60px] mx-auto md:mx-0"
              />
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
