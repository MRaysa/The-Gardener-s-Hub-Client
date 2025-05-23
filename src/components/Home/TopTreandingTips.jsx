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
} from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const TopTrendingTips = () => {
  const [trendingTips, setTrendingTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Theme-based styles
  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      card: "bg-white",
      border: "border-gray-200",
      button: "bg-green-600 hover:bg-green-700 text-white",
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      card: "bg-gray-800",
      border: "border-gray-700",
      button: "bg-green-700 hover:bg-green-600 text-white",
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
          Cultivating trending tips...
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
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8  ${currentTheme.bg}`}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === "dark" ? "text-green-400" : "text-green-800"
          }`}
        >
          Top <span className="text-green-600">Trending</span> Gardening Tips
        </h1>
        <p
          className={`text-lg ${currentTheme.secondaryText} max-w-2xl mx-auto`}
        >
          Discover the most popular gardening advice from our community experts
        </p>
      </motion.div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingTips.map((tip, index) => (
          <motion.div
            key={tip._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            onClick={() => handleTipClick(tip._id)}
            className={`${
              currentTheme.card
            } rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
              theme === "dark" ? "shadow-gray-900" : "shadow-gray-200"
            }`}
          >
            {/* Tip Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={tip.imageUrl}
                alt={tip.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">{tip.title}</h2>
              </div>
            </div>

            {/* Tip Content */}
            <div className="p-6">
              {/* Category and Difficulty */}
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    theme === "dark"
                      ? "bg-green-900 text-green-300"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <FaLeaf className="mr-2" />
                  {tip.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
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
              </div>

              {/* Description */}
              <p className={`${currentTheme.secondaryText} mb-5 line-clamp-3`}>
                {tip.description}
              </p>

              {/* Author and Metadata */}
              <div
                className={`flex items-center justify-between pt-4 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full ${
                      theme === "dark" ? "bg-gray-700" : "bg-green-100"
                    } flex items-center justify-center mr-3`}
                  >
                    <FaUser
                      className={
                        theme === "dark" ? "text-green-400" : "text-green-600"
                      }
                    />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${currentTheme.text}`}>
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
                  <FaThumbsUp
                    className={
                      theme === "dark" ? "text-green-400" : "text-green-500"
                    }
                  />
                  <span className={`text-sm font-medium ${currentTheme.text}`}>
                    {tip.totalLiked}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopTrendingTips;
