import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaClock,
  FaSeedling,
  FaStar,
  FaRegStar,
  FaUserFriends,
  FaChevronRight,
} from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { toast } from "react-hot-toast";

const ActiveGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGardener, setSelectedGardener] = useState(null);
  const { theme } = useTheme();

  // Theme-based styles
  const themeStyles = {
    light: {
      bg: "bg-gradient-to-b from-green-50 to-white",
      text: "text-gray-800",
      card: "bg-white",
      secondaryText: "text-gray-600",
      button: "bg-green-600 hover:bg-green-700 text-white",
      outlineButton: "border border-green-600 text-green-600 hover:bg-green-50",
      seeMoreButton: "bg-green-100 hover:bg-green-200 text-green-700",
    },
    dark: {
      bg: "bg-gradient-to-b from-gray-800 to-gray-800",
      text: "text-gray-100",
      card: "bg-gray-700",
      secondaryText: "text-gray-300",
      button: "bg-green-700 hover:bg-green-800 text-white",
      outlineButton: "border border-green-500 text-green-400 hover:bg-gray-600",
      seeMoreButton: "bg-gray-600 hover:bg-gray-500 text-green-300",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  useEffect(() => {
    const fetchActiveGardeners = async () => {
      try {
        const response = await fetch(
          "https://the-gardener-s-hub-server.vercel.app/gardeners/active"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGardeners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveGardeners();
  }, []);

  const handleFollow = () => {
    toast.success(`You're now following ${selectedGardener.name}!`, {
      position: "top-right",
      style: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fff" : "#1f2937",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: theme === "dark" ? "#1f2937" : "#fff",
      },
    });
  };

  const handleMessage = () => {
    toast.success(`Message sent to ${selectedGardener.name}!`, {
      position: "top-right",
      style: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fff" : "#1f2937",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: theme === "dark" ? "#1f2937" : "#fff",
      },
    });
  };

  if (loading) {
    return (
      <div
        className={`flex flex-col justify-center items-center h-screen ${currentTheme.bg} gap-4`}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            },
            scale: {
              repeat: Infinity,
              duration: 1.5,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          className={`relative h-16 w-16 rounded-full border-4 ${
            theme === "dark" ? "border-green-400/30" : "border-green-600/30"
          }`}
        >
          <motion.div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full ${
              theme === "dark" ? "bg-green-400" : "bg-green-600"
            }`}
            animate={{
              y: [0, 40, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className={`text-lg font-medium ${
            theme === "dark" ? "text-green-300" : "text-green-700"
          }`}
        >
          Finding active gardeners...
        </motion.div>

        <motion.div
          className="flex gap-1"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`h-2 w-2 rounded-full ${
                theme === "dark" ? "bg-green-400" : "bg-green-600"
              }`}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (error)
    return (
      <div
        className={`${
          theme === "dark" ? "bg-red-900" : "bg-red-100"
        } border border-red-400 text-red-700 px-4 py-3 rounded relative`}
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} py-16 px-4 sm:px-6 lg:px-8 `}
    >
      <div className="max-w-8xl mx-auto">
        {/* Header with animated text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold ${
              theme === "dark" ? "text-green-400" : "text-green-800"
            } mb-3`}
          >
            Our <span className="text-green-600">Active</span> Gardeners
          </h1>
          <p
            className={`text-lg ${currentTheme.secondaryText} max-w-2xl mx-auto`}
          >
            Connect with passionate gardening experts ready to share their
            knowledge
          </p>
        </motion.div>

        {/* Gardeners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {gardeners.map((gardener) => (
            <motion.div
              key={gardener._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className={`${
                currentTheme.card
              } rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                theme === "dark" ? "shadow-gray-800" : "shadow-gray-200"
              }`}
            >
              <div className="relative h-64">
                <img
                  src={
                    gardener.image ||
                    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
                  }
                  alt={gardener.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                    Active
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {gardener.name}
                  </h3>
                  <p className="text-green-200">{gardener.specialty}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div
                    className={`flex items-center ${currentTheme.secondaryText}`}
                  >
                    <FaMapMarkerAlt className="text-green-500 mr-2" />
                    <span>{gardener.location}</span>
                  </div>
                  <div
                    className={`flex items-center ${currentTheme.secondaryText}`}
                  >
                    <FaClock className="text-green-500 mr-2" />
                    <span>{gardener.experience}</span>
                  </div>
                </div>

                <p
                  className={`${currentTheme.secondaryText} mb-4 line-clamp-2`}
                >
                  {gardener.bio}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) =>
                      i < (gardener.rating || 4) ? (
                        <FaStar key={i} className="text-yellow-400" />
                      ) : (
                        <FaRegStar key={i} className="text-gray-300" />
                      )
                    )}
                  </div>
                  <div
                    className={`flex items-center ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    } font-medium`}
                  >
                    <FaUserFriends className="mr-2" />
                    <span>{gardener.totalSharedTips || 0} tips</span>
                  </div>
                </div>

                {/* See More Button */}
                <motion.button
                  onClick={() => setSelectedGardener(gardener)}
                  className={`w-full ${currentTheme.seeMoreButton} cursor-pointer py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>See More</span>
                  <FaChevronRight className="text-sm" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gardener Detail Modal */}
      {selectedGardener && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${
              currentTheme.card
            } rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
              theme === "dark" ? "shadow-gray-800" : "shadow-gray-200"
            }`}
          >
            <div className="relative h-64">
              <img
                src={
                  selectedGardener.image ||
                  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
                }
                alt={selectedGardener.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedGardener(null)}
                className={`absolute top-4 right-4 ${
                  theme === "dark"
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-white/80 hover:bg-white"
                } text-gray-800 p-2 rounded-full shadow-md`}
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className={`text-3xl font-bold ${currentTheme.text}`}>
                    {selectedGardener.name}
                  </h2>
                  <p
                    className={`${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    } font-medium text-lg`}
                  >
                    {selectedGardener.specialty}
                  </p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) =>
                    i < (selectedGardener.rating || 4) ? (
                      <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300 w-5 h-5" />
                    )
                  )}
                  <span className={`ml-2 ${currentTheme.secondaryText}`}>
                    4.2
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-4 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>
                    Location
                  </p>
                  <p className="font-medium flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-green-500" />
                    {selectedGardener.location}
                  </p>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-4 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>
                    Experience
                  </p>
                  <p className="font-medium flex items-center">
                    <FaClock className="mr-2 text-green-500" />
                    {selectedGardener.experience}
                  </p>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-4 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>
                    Specialty
                  </p>
                  <p className="font-medium flex items-center">
                    <FaSeedling className="mr-2 text-green-500" />
                    {selectedGardener.specialty}
                  </p>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-4 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>
                    Tips Shared
                  </p>
                  <p className="font-medium flex items-center">
                    <FaUserFriends className="mr-2 text-green-500" />
                    {selectedGardener.totalSharedTips || 0}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3
                  className={`text-xl font-semibold ${currentTheme.text} mb-3`}
                >
                  About
                </h3>
                <p className={currentTheme.secondaryText}>
                  {selectedGardener.bio}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleMessage}
                  className={`flex-1 ${currentTheme.button} py-3 px-4 rounded-lg flex items-center justify-center gap-2`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Message
                </button>
                <button
                  onClick={handleFollow}
                  className={`flex-1 ${currentTheme.outlineButton} py-3 px-4 rounded-lg flex items-center justify-center gap-2`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Follow
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ActiveGardeners;
