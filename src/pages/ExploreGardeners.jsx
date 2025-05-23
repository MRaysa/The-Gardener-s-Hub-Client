import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaMapMarkerAlt,
  FaUserFriends,
  FaSeedling,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { toast } from "react-hot-toast";

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
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
    },
    dark: {
      bg: "bg-gradient-to-b from-gray-800 to-gray-800",
      text: "text-gray-100",
      card: "bg-gray-700",
      secondaryText: "text-gray-300",
      button: "bg-green-700 hover:bg-green-800 text-white",
      outlineButton: "border border-green-500 text-green-400 hover:bg-gray-600",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await fetch(
          "https://the-gardener-s-hub-server.vercel.app/gardeners"
        );
        const data = await response.json();
        setGardeners(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gardeners:", error);
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  const filteredGardeners = gardeners.filter((gardener) => {
    const matchesSearch =
      gardener.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gardener.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || gardener.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} py-12 px-4 sm:px-6 lg:px-8 `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl font-bold ${
              theme === "dark" ? "text-green-400" : "text-green-800"
            } mb-4`}
          >
            Meet Our Gardening Experts
          </motion.h1>
          <p
            className={`text-lg ${currentTheme.secondaryText} max-w-2xl mx-auto`}
          >
            Connect with experienced gardeners who can help your plants thrive
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Search by name or specialty..."
                className={`pl-10 pr-4 py-3 w-full border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-800 text-white"
                    : "border-gray-300 bg-white"
                } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  theme === "dark"
                    ? "placeholder-gray-400"
                    : "placeholder-gray-500"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-full flex items-center ${
                  activeFilter === "all"
                    ? "bg-green-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                <FaFilter className="mr-2" /> All
              </button>
              <button
                onClick={() => setActiveFilter("active")}
                className={`px-4 py-2 rounded-full flex items-center ${
                  activeFilter === "active"
                    ? "bg-green-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>{" "}
                Active
              </button>
            </div>
          </div>
        </div>

        {/* Gardeners Grid */}
        {filteredGardeners.length === 0 ? (
          <div className={`text-center py-12 ${currentTheme.text}`}>
            <h3 className="text-xl font-medium">
              No gardeners found matching your criteria
            </h3>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("all");
              }}
              className={`mt-4 ${
                theme === "dark" ? "text-green-400" : "text-green-600"
              } hover:underline`}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGardeners.map((gardener) => (
              <motion.div
                key={gardener._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className={`${
                  currentTheme.card
                } rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  theme === "dark" ? "shadow-gray-800" : "shadow-gray-200"
                }`}
              >
                <div className="relative h-48">
                  <img
                    src={gardener.image}
                    alt={gardener.name}
                    className="w-full h-full object-cover"
                  />
                  {gardener.status === "active" && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                      <div className="w-2 h-2 rounded-full bg-white mr-1 animate-pulse"></div>
                      Active
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
                    <h3 className="text-white text-xl font-bold">
                      {gardener.name}
                    </h3>
                    <p className="text-green-300">{gardener.specialty}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={`flex items-center ${currentTheme.secondaryText}`}
                    >
                      <FaMapMarkerAlt className="mr-1 text-green-600" />
                      <span>{gardener.location}</span>
                    </div>
                    <div
                      className={`flex items-center ${
                        theme === "dark" ? "bg-gray-600" : "bg-green-100"
                      } ${
                        theme === "dark" ? "text-green-400" : "text-green-800"
                      } px-2 py-1 rounded text-sm`}
                    >
                      <FaSeedling className="mr-1" />
                      {gardener.experience}
                    </div>
                  </div>

                  <p
                    className={`${currentTheme.secondaryText} mb-4 line-clamp-2`}
                  >
                    {gardener.bio}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <span
                        className={`${
                          theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                        } ${
                          theme === "dark" ? "text-blue-300" : "text-blue-800"
                        } px-2 py-1 rounded text-xs`}
                      >
                        {gardener.age} yrs
                      </span>
                      <span
                        className={`${
                          theme === "dark" ? "bg-purple-900" : "bg-purple-100"
                        } ${
                          theme === "dark"
                            ? "text-purple-300"
                            : "text-purple-800"
                        } px-2 py-1 rounded text-xs`}
                      >
                        {gardener.gender}
                      </span>
                    </div>
                    <span
                      className={`${
                        theme === "dark" ? "text-green-400" : "text-green-600"
                      } font-bold flex items-center`}
                    >
                      <FaUserFriends className="mr-1" />
                      {gardener.totalSharedTips}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedGardener(gardener)}
                    className={`mt-4 w-full ${
                      theme === "dark" ? "bg-green-700" : "bg-green-600"
                    } hover:${
                      theme === "dark" ? "bg-green-600" : "bg-green-700"
                    } text-white py-2 px-4 rounded-lg transition-colors`}
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
            <div className="relative">
              <img
                src={selectedGardener.image}
                alt={selectedGardener.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedGardener(null)}
                className={`absolute top-4 right-4 ${
                  theme === "dark" ? "bg-gray-600" : "bg-white/80"
                } hover:${
                  theme === "dark" ? "bg-gray-500" : "bg-white"
                } text-gray-800 p-2 rounded-full shadow-md`}
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
                    {selectedGardener.name}
                  </h2>
                  <p
                    className={`${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    } font-medium`}
                  >
                    {selectedGardener.specialty}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm ${currentTheme.secondaryText}`}>
                    4.2
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-3 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>
                    Experience
                  </p>
                  <p className="font-medium">{selectedGardener.experience}</p>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-3 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>
                    Location
                  </p>
                  <p className="font-medium">{selectedGardener.location}</p>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-3 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>Age</p>
                  <p className="font-medium">{selectedGardener.age} years</p>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-600" : "bg-green-50"
                  } p-3 rounded-lg`}
                >
                  <p className={`text-sm ${currentTheme.secondaryText}`}>
                    Tips Shared
                  </p>
                  <p className="font-medium">
                    {selectedGardener.totalSharedTips}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className={`font-bold mb-2 ${currentTheme.text}`}>About</h3>
                <p className={currentTheme.secondaryText}>
                  {selectedGardener.bio}
                </p>
              </div>

              <div className="mb-6">
                <h3 className={`font-bold mb-2 ${currentTheme.text}`}>
                  Specialty Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedGardener.specialty.split(", ").map((item) => (
                    <span
                      key={item}
                      className={`${
                        theme === "dark" ? "bg-gray-600" : "bg-green-100"
                      } ${
                        theme === "dark" ? "text-green-400" : "text-green-800"
                      } px-3 py-1 rounded-full text-sm`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
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

export default ExploreGardeners;
