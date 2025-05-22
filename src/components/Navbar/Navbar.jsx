import React, { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaSun,
  FaMoon,
  FaUsers,
  FaSearch,
  FaLeaf,
  FaPenAlt,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
      setMobileMenuOpen(false);
      setProfileDropdownOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  // Theme-based styles
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-green-800";
  const textColor = theme === "dark" ? "text-gray-300" : "text-white";
  const hoverText =
    theme === "dark" ? "hover:text-green-400" : "hover:text-green-300";

  // Navigation items
  const navItems = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome className="mr-1" />,
    },
    {
      path: "/explore-gardeners",
      name: "Explore Gardeners",
      icon: <FaUsers className="mr-1" />,
    },

    {
      path: "/share-tip",
      name: "Share a Garden Tip",
      icon: <FaPenAlt className="mr-1" />,
    },
    {
      path: "/my-tips",
      name: "My Tips",
      icon: <FaLeaf className="mr-1" />,
    },
    {
      path: "/browse-tips",
      name: "Browse Tips",
      icon: <FaSearch className="mr-1" />,
    },
  ];

  return (
    <nav
      className={`${bgColor} ${textColor} p-4 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-2"
              >
                {/* <span className="text-indigo-600 font-bold text-xl">G</span> */}
                <img src="/public/logo.png" alt="" />
              </motion.div>
              <span className="text-white font-bold text-xl hidden sm:inline">
                The Gardener's Hub
              </span>
            </Link>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${hoverText} transition duration-300 flex items-center`}
                >
                  {item.icon} {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right-aligned items (theme toggle and auth) */}
          <div className="flex items-center">
            {/* User Profile */}
            {user ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-300 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-white text-green-600 flex items-center justify-center">
                      <FaUser />
                    </div>
                  )}
                </button>

                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                      <p className="font-medium">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      <FaSignOutAlt className="mr-2 text-red-500" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${hoverText} dark:hover:bg-gray-700 flex items-center`}
                >
                  <FaSignInAlt className="mr-1" /> Sign In
                </NavLink>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="/signup"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${hoverText} dark:hover:bg-gray-700 flex items-center`}
                  >
                    <FaUserPlus className="mr-1" /> Sign Up
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${hoverText} transition duration-300`}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-indigo-700 dark:bg-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 dark:hover:bg-gray-700 flex items-center"
              >
                {item.icon} {item.name}
              </NavLink>
            ))}

            {user ? (
              <>
                <div className="px-3 py-2 flex items-center">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover mr-2"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-white text-indigo-600 flex items-center justify-center mr-2">
                      <FaUser />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-indigo-100 dark:text-gray-300">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 dark:hover:bg-gray-700 text-left"
                >
                  <FaSignOutAlt className="mr-2" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${hoverText} dark:hover:bg-gray-700 flex items-center`}
                >
                  <FaSignInAlt className="mr-2" /> Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${hoverText} dark:hover:bg-gray-700 flex items-center`}
                >
                  <FaUserPlus className="mr-2" /> Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
