import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaClock,
  FaUser,
  FaLeaf,
  FaThumbsUp,
  FaArrowRight,
  FaSeedling,
} from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const TopTrendingTips = () => {
  const [trendingTips, setTrendingTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Theme-based styles
  const themeStyles = {
    light: {
      bg: "bg-gradient-to-b from-green-50 to-white",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      card: "bg-white",
      border: "border-gray-200",
      button: "bg-green-600 hover:bg-green-700 text-white",
      viewButton: "bg-green-100 hover:bg-green-200 text-green-800",
      accent: "text-green-600",
    },
    dark: {
      bg: "bg-gradient-to-b from-gray-900 to-gray-800",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      card: "bg-gray-800",
      border: "border-gray-700",
      button: "bg-green-700 hover:bg-green-600 text-white",
      viewButton: "bg-gray-700 hover:bg-gray-600 text-green-400",
      accent: "text-green-400",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  useEffect(() => {
    const fetchTrendingTips = async () => {
      try {
        const response = await fetch(
          "https://the-gardener-s-hub-server.vercel.app/tip/trend"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch trending tips");
        }

        setTrendingTips(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrendingTips();
  }, []);

  const handleTipClick = (id) => {
    navigate(`/tips/${id}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center ${currentTheme.bg} gap-4`}
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
            className={`text-lg font-medium ${currentTheme.accent}`}
          >
            Discovering trending tips...
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
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${
          theme === "dark" ? "bg-red-900" : "bg-red-100"
        } border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-3xl mx-auto`}
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </motion.div>
    );
  }

  return (
    <div
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 ${currentTheme.bg}`}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-green-500/10 rounded-full"
          />
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 relative z-10 ${
              theme === "dark" ? "text-green-400" : "text-green-800"
            }`}
          >
            Top <span className="text-green-600">Trending</span> Gardening Tips
          </h1>
        </div>
        <p
          className={`text-lg ${currentTheme.secondaryText} max-w-2xl mx-auto`}
        >
          Discover the most popular gardening advice from our community experts
        </p>
      </motion.div>

      {/* Tips Grid - Updated to lg:grid-cols-4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {trendingTips.map((tip, index) => (
          <motion.div
            key={tip._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredCard(tip._id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative ${
              currentTheme.card
            } rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
              theme === "dark" ? "shadow-gray-900" : "shadow-gray-200"
            }`}
          >
            {/* Tip Image */}
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={tip.imageUrl}
                alt={tip.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: hoveredCard === tip._id ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-lg font-bold text-white">{tip.title}</h2>
              </div>
              {/* Floating category tag */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                  theme === "dark"
                    ? "bg-green-900 text-green-300"
                    : "bg-green-100 text-green-800"
                }`}
              >
                <FaLeaf className="mr-1" />
                {tip.category}
              </motion.div>
            </div>

            {/* Tip Content */}
            <div className="p-4">
              {/* Difficulty and Time */}
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      tip.difficulty === "Easy"
                        ? theme === "dark"
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-800"
                        : tip.difficulty === "Medium"
                        ? theme === "dark"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-yellow-100 text-yellow-800"
                        : theme === "dark"
                        ? "bg-red-900 text-red-300"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {tip.difficulty}
                </span>
                <div className="flex items-center text-xs">
                  <FaClock
                    className={`mr-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <span className={currentTheme.secondaryText}>
                    {tip.timeRequired} mins
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                className={`${currentTheme.secondaryText} mb-4 text-sm line-clamp-2`}
              >
                {tip.description}
              </p>

              {/* Author and Metadata */}
              <div
                className={`flex items-center justify-between pt-3 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      theme === "dark" ? "bg-gray-700" : "bg-green-100"
                    } flex items-center justify-center mr-2 overflow-hidden`}
                  >
                    {tip.authorImage ? (
                      <img
                        src={tip.authorImage}
                        alt={tip.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser
                        className={
                          theme === "dark" ? "text-green-400" : "text-green-600"
                        }
                      />
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${currentTheme.text}`}>
                      {tip.name}
                    </p>
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(tip.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Likes */}
                <div className="flex items-center space-x-1">
                  <FaThumbsUp className={`text-xs ${currentTheme.accent}`} />
                  <span className={`text-xs font-medium ${currentTheme.text}`}>
                    {tip.totalLiked}
                  </span>
                </div>
              </div>

              {/* View Details Button - Always visible but more prominent on hover */}
              <motion.div
                className="mt-3"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: hoveredCard === tip._id ? 1 : 0.7 }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTipClick(tip._id);
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`${currentTheme.viewButton} w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm cursor-pointer`}
                >
                  <span>View Details</span>
                  <FaArrowRight className="text-xs" />
                </motion.button>
              </motion.div>
            </div>

            {/* Hover effects */}
            {hoveredCard === tip._id && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                >
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-500 rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-green-500 rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-green-500 rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-500 rounded-br-xl" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-green-500 pointer-events-none"
                />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopTrendingTips;
