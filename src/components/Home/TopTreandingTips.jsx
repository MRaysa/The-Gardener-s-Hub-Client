import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
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

const TopTreandingTips = () => {
  const [trendingTips, setTrendingTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-3xl mx-auto"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          Top <span className="text-green-600">Trending</span> Gardening Tips
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <FaLeaf className="mr-2" />
                  {tip.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      tip.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : tip.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {tip.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-5 line-clamp-3">
                {tip.description}
              </p>

              {/* Author and Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <FaUser className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {tip.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(tip.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Likes */}
                <div className="flex items-center space-x-1">
                  <FaThumbsUp className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
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

export default TopTreandingTips;
