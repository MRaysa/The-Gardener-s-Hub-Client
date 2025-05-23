import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
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
import { Tooltip } from "react-tooltip";

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
  const textColor = theme === "dark" ? "text-gray-200" : "text-white";
  const hoverText =
    theme === "dark" ? "hover:text-green-400" : "hover:text-green-200";
  const mobileMenuBg = theme === "dark" ? "bg-gray-800" : "bg-green-700";
  const dropdownBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const dropdownText = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const dropdownHover =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-green-50";
  const activeLinkBg = theme === "dark" ? "bg-gray-700" : "bg-green-700";
  const activeLinkText = theme === "dark" ? "text-white" : "text-white";

  // Navigation items
  const navItems = [
    { path: "/", name: "Home", icon: <FaHome className="mr-1" /> },
    {
      path: "/explore-gardeners",
      name: "Explore Gardeners",
      icon: <FaUsers className="mr-1" />,
    },
    {
      path: "/share-tip",
      name: "Share a Tip",
      icon: <FaPenAlt className="mr-1" />,
    },
    { path: "/my-tips", name: "My Tips", icon: <FaLeaf className="mr-1" /> },
    {
      path: "/browse-tips",
      name: "Browse Tips",
      icon: <FaSearch className="mr-1" />,
    },
  ];

  // NavLink active class styling
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? `${activeLinkBg} ${activeLinkText} rounded-md`
      : `${hoverText} rounded-md`;
  };

  return (
    <nav
      className={`${bgColor} ${textColor} shadow-lg transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-2"
              >
                <img src="/public/logo.png" alt="" />
              </motion.div>
              <span className="font-bold text-xl hidden sm:inline">
                The Gardener's Hub
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation - Now only shows on lg screens and up */}
          <div className="hidden lg:flex flex-1 justify-center mx-4">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium transition duration-300 flex items-center ${getNavLinkClass(
                      { isActive }
                    )}`
                  }
                >
                  {item.icon}
                  <span className="ml-1">{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right-aligned items */}
          <div className="flex items-center space-x-2 md:space-x-4">
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

            {/* User Profile -  visible on all devices */}
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-tooltip"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-1 focus:outline-none cursor-pointer"
                  data-tooltip-content={user.displayName || "User"}
                  data-tooltip-place="bottom"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-white hover:opacity-90 transition-opacity"
                      onError={handleImageError}
                    />
                  ) : (
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        theme === "dark"
                          ? "bg-gray-700 text-green-400"
                          : "bg-green-700 text-white"
                      } hover:opacity-90 transition-opacity cursor-pointer`}
                    >
                      <FaUser />
                    </div>
                  )}
                </button>

                {/* React Tooltip */}
                <Tooltip
                  anchorId="user-profile-tooltip"
                  className="z-50"
                  classNameArrow="!bottom-[-4px]"
                  style={{
                    backgroundColor: theme === "dark" ? "#374151" : "#047857",
                    color: theme === "dark" ? "#f3f4f6" : "#ffffff",
                    borderRadius: "0.375rem",
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                  }}
                />

                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute right-0 mt-2 w-48 ${dropdownBg} rounded-md shadow-lg py-1 z-50 border ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 text-sm ${dropdownText} border-b ${
                        theme === "dark" ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <p className="font-medium truncate">
                        {user.displayName || "User"}
                      </p>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        } truncate`}
                      >
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${dropdownText} ${dropdownHover}`}
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
                  className={({ isActive }) =>
                    `hidden lg:flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                      isActive ? activeLinkBg + " " + activeLinkText : hoverText
                    }`
                  }
                >
                  <FaSignInAlt className="mr-1" />
                  <span>Sign In</span>
                </NavLink>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden lg:block"
                >
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                        isActive
                          ? "bg-green-800 text-white"
                          : theme === "dark"
                          ? "bg-green-700 hover:bg-green-600"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white`
                    }
                  >
                    <FaUserPlus className="mr-1" />
                    <span>Sign Up</span>
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* Mobile menu button - Shows on md and smaller screens */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md ${hoverText} focus:outline-none cursor-pointer`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Shows on md and smaller screens */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={`lg:hidden ${mobileMenuBg}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                    isActive ? `${activeLinkBg} ${activeLinkText}` : hoverText
                  }`
                }
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </NavLink>
            ))}

            <div className="border-t border-gray-600 pt-2">
              {user ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover mr-3 cursor-pointer"
                        onError={handleImageError}
                      />
                    ) : (
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                          theme === "dark"
                            ? "bg-gray-700 text-green-400"
                            : "bg-green-600 text-white"
                        } cursor-pointer`}
                      >
                        <FaUser />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {user.displayName || "User"}
                      </p>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-green-200"
                        }`}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${hoverText} cursor-pointer`}
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? `${activeLinkBg} ${activeLinkText}`
                          : hoverText
                      } cursor-pointer`
                    }
                  >
                    <FaSignInAlt className="mr-2" />
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? "bg-green-800 text-white"
                          : theme === "dark"
                          ? "bg-green-700 hover:bg-green-600"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white cursor-pointer`
                    }
                  >
                    <FaUserPlus className="mr-2" />
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
