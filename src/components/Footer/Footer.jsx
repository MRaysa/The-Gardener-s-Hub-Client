import React from "react";
import { Link } from "react-router";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaLeaf,
} from "react-icons/fa";
import { MdEmail, MdLocalPhone, MdLocationOn } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext"; // Assuming you have a ThemeContext

const Footer = () => {
  const { theme } = useTheme();

  // Theme-based styles
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-green-800";
  const textColor = theme === "dark" ? "text-gray-300" : "text-white";
  const hoverText =
    theme === "dark" ? "hover:text-green-400" : "hover:text-green-300";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-green-600";
  const newsletterBg = theme === "dark" ? "bg-gray-800" : "bg-green-700";
  const inputBg =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800";

  return (
    <footer
      className={`${bgColor} ${textColor} pt-12 pb-6 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <FaLeaf
                className={`text-3xl ${
                  theme === "dark" ? "text-green-400" : "text-green-300"
                } mr-2`}
              />
              <span className="text-2xl font-bold">The Gardener's Hub</span>
            </Link>
            <p
              className={theme === "dark" ? "text-gray-400" : "text-green-100"}
            >
              Cultivating a community of passionate gardeners. Share, learn, and
              grow together.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-green-400"
                    : "text-green-200 hover:text-white"
                } transition`}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-green-400"
                    : "text-green-200 hover:text-white"
                } transition`}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-green-400"
                    : "text-green-200 hover:text-white"
                } transition`}
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-green-400"
                    : "text-green-200 hover:text-white"
                } transition`}
              >
                <FaPinterest size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-xl font-semibold mb-4 border-b-2 ${borderColor} pb-2`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`${hoverText} transition`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-tips" className={`${hoverText} transition`}>
                  Browse Tips
                </Link>
              </li>
              <li>
                <Link to="/gardeners" className={`${hoverText} transition`}>
                  Find Gardeners
                </Link>
              </li>
              <li>
                <Link to="/events" className={`${hoverText} transition`}>
                  Gardening Events
                </Link>
              </li>
              <li>
                <Link to="/share-tip" className={`${hoverText} transition`}>
                  Submit a Tip
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3
              className={`text-xl font-semibold mb-4 border-b-2 ${borderColor} pb-2`}
            >
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/composting"
                  className={`${hoverText} transition`}
                >
                  Composting
                </Link>
              </li>
              <li>
                <Link
                  to="/category/plant-care"
                  className={`${hoverText} transition`}
                >
                  Plant Care
                </Link>
              </li>
              <li>
                <Link
                  to="/category/hydroponics"
                  className={`${hoverText} transition`}
                >
                  Hydroponics
                </Link>
              </li>
              <li>
                <Link
                  to="/category/balcony-gardens"
                  className={`${hoverText} transition`}
                >
                  Balcony Gardens
                </Link>
              </li>
              <li>
                <Link
                  to="/category/urban-farming"
                  className={`${hoverText} transition`}
                >
                  Urban Farming
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className={`text-xl font-semibold mb-4 border-b-2 ${borderColor} pb-2`}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdLocationOn
                  className={`${
                    theme === "dark" ? "text-green-400" : "text-green-300"
                  } mt-1 mr-2`}
                  size={20}
                />
                <span>123 Garden Lane, Greenville, GT 12345</span>
              </li>
              <li className="flex items-center">
                <MdEmail
                  className={`${
                    theme === "dark" ? "text-green-400" : "text-green-300"
                  } mr-2`}
                  size={20}
                />
                <a
                  href="mailto:hello@gardenershub.com"
                  className={`${hoverText} transition`}
                >
                  hello@gardenershub.com
                </a>
              </li>
              <li className="flex items-center">
                <MdLocalPhone
                  className={`${
                    theme === "dark" ? "text-green-400" : "text-green-300"
                  } mr-2`}
                  size={20}
                />
                <a
                  href="tel:+11234567890"
                  className={`${hoverText} transition`}
                >
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div
          className={`${newsletterBg} rounded-lg p-6 mb-8 transition-colors duration-300`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">
              Get Gardening Tips Directly
            </h3>
            <p
              className={theme === "dark" ? "text-gray-400" : "text-green-100"}
            >
              Subscribe to our monthly newsletter for exclusive content
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className={`flex-grow px-4 py-2 rounded ${inputBg} focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "focus:ring-green-500"
                    : "focus:ring-green-600"
                }`}
              />
              <button
                className={`${
                  theme === "dark"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                } text-white font-medium px-6 py-2 rounded transition`}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {
          /* Copyright and Legal */
          <div
            className={`border-t ${
              theme === "dark" ? "border-gray-800" : "border-green-700"
            } pt-6 flex flex-col md:flex-row justify-between items-center transition-colors duration-300`}
          >
            <p
              className={`${
                theme === "dark" ? "text-gray-500" : "text-green-200"
              } text-sm mb-2 md:mb-0`}
            >
              &copy; {new Date().getFullYear()} The Gardener's Hub. All rights
              reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/privacy" className={`${hoverText} transition`}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={`${hoverText} transition`}>
                Terms of Service
              </Link>
              <Link to="/cookies" className={`${hoverText} transition`}>
                Cookie Policy
              </Link>
            </div>
          </div>
        }
      </div>
    </footer>
  );
};

export default Footer;
