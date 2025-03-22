import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../Assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Hire Pro", href: "/hirepro" },
    { name: "AI Assistant", href: "/ai" },
    { name: "Get in touch", href: "/contact" },
    { name: "Our story", href: "/about" },
    { name: "Add Video", href: "/addVideoForm" },
  ];

  return (
    <nav className="bg-[#F8FAFC] shadow-md shadow-[#FFA725]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-30 w-40 pt-2" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#FFA725] focus:outline-none">
              {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 text-lg font-medium text-[#FFA725] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile and Login Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 border border-[#FFA725] rounded-md text-[#FFA725] transition duration-300">
              Login
            </Link>
            <Link to="/profile">
              <User className="h-8 w-8 text-[#FFA725] cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 bg-white py-4 px-6 rounded-lg shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 text-lg font-medium text-[#FFA725] transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="w-full text-center py-2 text-lg font-medium text-white bg-[#FFA725] rounded-md shadow-md transition hover:bg-[#e6951b]"
            >
              Login
            </Link>

            <Link to="/profile" className="flex items-center space-x-2 text-[#FFA725] ml-13">
              <User className="h-8 w-8" />
              <span className="text-lg font-medium">Profile</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
