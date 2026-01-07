import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              className="w-20 h-20 object-contain transition-transform group-hover:scale-110"
              src="/logo.png"
              alt="KarLink Logo"
            />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Kar<span className="text-orange-600">Link</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-800 hover:text-orange-600 font-medium transition-colors duration-200 text-sm lg:text-base relative group"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200"></div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200"
                aria-label="Toggle Theme"
              >
                <Sun size={20} />
              </button>

              <Link
                to="/login"
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transform hover:-translate-y-0.5"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
              aria-label="Toggle Theme"
            >
              <Sun size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-orange-600 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out ${isOpen
          ? "max-h-96 opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 w-full bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md active:scale-95 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={20} />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
