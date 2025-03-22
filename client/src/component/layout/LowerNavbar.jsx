import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import Dropdown from "../Dropdown";
import { AuthContext } from "../../context/AuthContext";

const LowerNavbar = () => {
  const { cartItems } = useCart();
  const { user, admin } = useContext(AuthContext);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Contact", to: "/contact" },
    { name: "About", to: "/about" },
    { name: "Products", to: "/products" },
  ];

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative border-b border-black bg-white px-6 py-1">
      <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-6">
        <div className="flex h-10 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-[1.4vw] text-black text-2xl font-bold">
              EasyMart
            </Link>
          </div>

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

          <div className="hidden space-x-8 md:flex">
            <Link
              className="rounded-md py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
              to={"/"}>Home</Link>
            <Link
              className="rounded-md py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
              to={"/contact"}>Contact</Link>
            <Link
              className="rounded-md py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
              to={"/about"}>About</Link>
            {admin && <div className="flex gap-7">
              
              <Link
                className="rounded-md py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                to={"/admin"}>Admin</Link> 

            </div>}

          </div>

          <div className="hidden items-center space-x-6 md:flex relative">
            <div className="relative flex h-10 items-center rounded-md border p-3">
              <input
                type="text"
                className="border-none text-sm outline-none placeholder:text-[12px] focus:outline-none"
                placeholder="What are you looking for?"
                aria-label="Search"
              />
              <FiSearch className="size-4" />
            </div>

            <button className="text-gray-500 hover:text-black" aria-label="Favorites">
              <FiHeart className="size-5" />
            </button>

            <div className="relative">
              <Link to="/cart" className="text-gray-500 hover:text-black relative">
                <FiShoppingCart className="size-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>

            {user && <Dropdown username={user.fullname} />}
          </div>
        </div>
      </div>

      {
        isMobileMenuOpen && (
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
        )
      }
    </nav >
  );
};

export default LowerNavbar;
