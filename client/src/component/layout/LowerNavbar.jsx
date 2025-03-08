import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import Dropdown from "../Dropdown";

const LowerNavbar = () => {
  const { isAuthenticated,user } = useAuth0();
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Contact", to: "/contact" },
    { name: "About", to: "/about" },
  
  ];

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-black bg-white p-1">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-[1.4vw]text-black text-2xl font-bold">
              Exclusive
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="size-6" />
              ) : (
                <FiMenu className="size-6" />
              )}
            </button>
          </div>

          {/* Navigation Links for larger screens */}
          <div className="hidden space-x-8 md:flex">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="rounded-md py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search and Icons Section */}
          <div className="hidden items-center space-x-6 md:flex">
            {/* Search Bar */}
            <div className="relative flex h-10 items-center rounded-md border p-3">
              <input
                type="text"
                className="border-none text-sm outline-none placeholder:text-[12px] focus:outline-none"
                placeholder="What are you looking for?"
                aria-label="Search"
              />
              <FiSearch className="size-4" />
            </div>

            {/* Icons */}
            <button
              className="text-gray-500 hover:text-black"
              aria-label="Favorites"
            >
              <FiHeart className="size-5" />
            </button>
            <button
              className="text-gray-500 hover:text-black"
              aria-label="Cart"
            >
              <FiShoppingCart className="size-5" />
            </button>
            {isAuthenticated &&(<Dropdown username={user.nickname} imageUrl={user.picture} />) }
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="space-y-1 px-2 pb-3 pt-2 md:hidden">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default LowerNavbar;
