import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  FaHome,
  FaUsers,
  FaPlusCircle,
  FaLeaf,
  FaUser,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiGreenhouse } from "react-icons/gi";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dashboardNavItems = [
    { path: "", name: "Garden Overview", icon: <FaHome size={18} /> },
    {
      path: "all-gardeners",
      name: "Community Gardeners",
      icon: <FaUsers size={18} />,
    },
    {
      path: "add-tips",
      name: "Plant New Wisdom",
      icon: <FaPlusCircle size={18} />,
    },
    {
      path: "my-garden-tips",
      name: "My Blooming Tips",
      icon: <FaLeaf size={18} />,
    },
    { path: "profile", name: "My Green Profile", icon: <FaUser size={18} /> },
  ];

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOutUser();
      navigate("/");
      setSidebarOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
      setIsSigningOut(false);
    }
  };

  const sidebarVariants = {
    open: { width: 280 },
    closed: { width: 80 },
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Animated Sidebar */}
      <motion.div
        initial="open"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-xl flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          {/* Logo/Brand */}
          <div className="p-4 flex items-center justify-between">
            {sidebarOpen ? (
              <Link to="/dashboard" className="flex items-center">
                <GiGreenhouse className="text-green-500 text-2xl mr-2" />
                <h1
                  className={`text-xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  GardenHub
                </h1>
              </Link>
            ) : (
              <Link to="/dashboard">
                <GiGreenhouse className="text-green-500 text-2xl mx-auto" />
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-full ${
                theme === "dark"
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              } transition-colors`}
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>

          {/* User Profile */}
          <div
            className={`p-4 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={user?.photoURL || "https://i.pravatar.cc/150?img=3"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
              {sidebarOpen && (
                <div>
                  <p
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {user?.displayName || "Green Gardener"}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {user?.email || "gardener@example.com"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-2">
            <ul className="space-y-1 px-2">
              {dashboardNavItems.map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/dashboard/${item.path}`}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      location.pathname.includes(item.path)
                        ? theme === "dark"
                          ? "bg-green-700 text-white"
                          : "bg-green-100 text-green-800"
                        : theme === "dark"
                        ? "hover:bg-gray-700 text-gray-200"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom buttons */}
        <div className="p-4 space-y-3">
          {/* Theme toggle - synchronized with navbar */}
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg flex items-center justify-center w-full ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } transition-colors`}
          >
            {theme === "dark" ? (
              <FaSun className="mr-2" />
            ) : (
              <FaMoon className="mr-2" />
            )}
            {sidebarOpen && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button>

          {/* Sign Out button */}
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={`p-3 rounded-lg flex items-center justify-center w-full ${
              theme === "dark"
                ? "bg-red-800 hover:bg-red-700 text-white"
                : "bg-red-100 hover:bg-red-200 text-red-700"
            } transition-colors ${
              isSigningOut ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <FaSignOutAlt
              className={`mr-2 ${isSigningOut ? "animate-pulse" : ""}`}
            />
            {sidebarOpen && (
              <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
            )}
          </button>

          {/* Home button */}
          <Link
            to="/"
            className={`p-3 rounded-lg flex items-center justify-center w-full ${
              theme === "dark"
                ? "bg-blue-800 hover:bg-blue-700 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
            } transition-colors`}
          >
            <FaHome className="mr-2" />
            {sidebarOpen && <span>Home</span>}
          </Link>
        </div>
      </motion.div>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DashboardLayout;
