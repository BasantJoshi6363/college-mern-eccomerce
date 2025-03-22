import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";

import { Link } from "react-router-dom";

const Footer = () => {
  const socialMediaLinks = [
    { icon: <FaFacebookF />, url: "https://www.facebook.com" },
    { icon: <FaTwitter />, url: "https://www.x.com" },
    { icon: <FaInstagram />, url: "https://www.instagram.com" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com" },
  ];

  return (
    <footer className="bg-black px-3 py-6 text-white flex items-center justify-center ">
      <div className="container px-6 grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-5">
        {/* Subscribe Section */}
        <div>
          <h2 className="mb-2 text-base font-bold">EasyMart</h2>
          <p className="mb-2 text-xs">Get 10% off your first order</p>
          <div className="flex items-center overflow-hidden rounded-md border p-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-none bg-transparent text-xs text-white outline-none focus:outline-none"
            />
            <IoSend size={18} />
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="mb-2 text-base font-bold">Support</h3>
          <p className="text-xs">
            111 Khagendra Dhami, KTM, Nepal.
          </p>
          <p className="text-xs">khagenbdrdhami@gmail.com</p>
          <p className="text-xs">+9779860657575</p>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="mb-2 text-base font-bold">Account</h3>
          <ul className="space-y-1 text-xs">
            <li>
              <Link to="/profile">My Account</Link>
            </li>
            <li>
              <Link to="/login">Login / Register</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="mb-2 text-base font-bold">Quick Link</h3>
          <ul className="space-y-1 text-xs">
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-use">Terms Of Use</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="mb-2 text-base font-bold">Our Social Handle</h3>
          <div className="flex space-x-3">
            {socialMediaLinks.map((item, index) => (
              <Link to={item.url} key={index} className="text-base text-white">
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
