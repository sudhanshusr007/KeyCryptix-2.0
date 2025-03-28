import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Optionally, redirect the user to the login page after logout
    navigate("/");
  };

  return (
    <nav className="bg-black text-gray-500 sticky top-0 w-full flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <div className="logo font-extrabold text-white text-xl sm:text-2xl md:text-2xl">
        <Link to="/">KeyCryptix</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden" onClick={toggleMenu}>
        <button className="text-white">
          <i className="fas fa-bars"></i>{" "}
          {/* Using FontAwesome for hamburger */}
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <ul
        className={`sm:flex list-none m-0 p-0 ${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:block`}
      >
        <li className="mx-4 my-2 hover:text-white">
          <Link to="/dashboard">Home</Link>
        </li>
        <li className="mx-4 my-2 hover:text-white">
          <Link to="/about">About Us</Link>
        </li>
        <li className="mx-4 my-2 hover:text-white">
          <Link to="/contact">Contact Us</Link>
        </li>
        <li className="mx-4 my-2">
          <Link
            to="/generate-password"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Generate Password
          </Link>
        </li>
        <li className="mx-4 my-2">
          <Link
            to="/"
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
