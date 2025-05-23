import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaLeaf, FaFilter } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Difficulty options for the filter
  const difficultyOptions = ["All", "Easy", "Medium", "Hard"];

  // Theme styles
  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      card: "bg-white",
      tableHeader: "bg-green-50",
      tableRowHover: "hover:bg-green-50",
      button: "text-green-600 hover:text-green-800",
      emptyStateBg: "bg-white",
      border: "border-gray-200",
      selectBg: "bg-white",
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      card: "bg-gray-800",
      tableHeader: "bg-gray-700",
      tableRowHover: "hover:bg-gray-700",
      button: "text-green-400 hover:text-green-300",
      emptyStateBg: "bg-gray-800",
      border: "border-gray-600",
      selectBg: "bg-gray-700",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  useEffect(() => {
    const fetchPublicTips = async () => {
      try {
        const response = await fetch(
          "https://the-gardener-s-hub-server.vercel.app/tips/public"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tips");
        }
        const data = await response.json();
        setTips(data.data);
        setFilteredTips(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPublicTips();
  }, []);

  // Apply filter when difficultyFilter changes
  useEffect(() => {
    if (difficultyFilter === "All") {
      setFilteredTips(tips);
    } else {
      const filtered = tips.filter(
        (tip) => tip.difficulty === difficultyFilter
      );
      setFilteredTips(filtered);
    }
  }, [difficultyFilter, tips]);

  const handleViewDetails = (tipId) => {
    navigate(`/tips/${tipId}`);
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
          Gathering gardening wisdom...
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
      <div
        className={`${
          theme === "dark" ? "bg-red-900" : "bg-red-100"
        } border-l-4 border-red-500 text-red-700 p-4 rounded max-w-3xl mx-auto`}
      >
        <p className="font-bold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen md:py-12 md:px-8  lg:px-16  ${currentTheme.bg}   px-4 py-8 `}
    >
      <div
        className={`container mx-auto px-4 m-4 rounded-2xl ${currentTheme.bg}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1
            className={`text-2xl md:text-3xl font-bold flex items-center ${
              theme === "dark" ? "text-green-400" : "text-green-800"
            }`}
          >
            <FaLeaf className="mr-2" /> Browse Gardening Tips
          </h1>

          {/* Difficulty Filter */}
          <div className="flex items-center">
            <FaFilter
              className={`mr-2 ${
                theme === "dark" ? "text-green-400" : "text-green-600"
              }`}
            />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className={`border ${currentTheme.border} rounded-md px-3 py-2 ${
                currentTheme.selectBg
              } ${currentTheme.text} focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "focus:ring-green-400"
                  : "focus:ring-green-500"
              }`}
            >
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredTips.length === 0 ? (
          <div
            className={`text-center py-12 rounded-lg ${currentTheme.emptyStateBg} shadow`}
          >
            <p className={`text-lg ${currentTheme.secondaryText} mb-4`}>
              {difficultyFilter === "All"
                ? "No gardening tips available yet."
                : `No ${difficultyFilter} difficulty tips found.`}
            </p>
            <p className={currentTheme.secondaryText}>
              {difficultyFilter !== "All" && (
                <button
                  onClick={() => setDifficultyFilter("All")}
                  className={`${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  } hover:underline`}
                >
                  Show all tips instead
                </button>
              )}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={currentTheme.tableHeader}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={currentTheme.secondaryText}>Image</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={currentTheme.secondaryText}>Title</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
                    <span className={currentTheme.secondaryText}>
                      Plant Type
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">
                    <span className={currentTheme.secondaryText}>Category</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
                    <span className={currentTheme.secondaryText}>
                      Difficulty
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={currentTheme.secondaryText}>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y divide-gray-200 ${currentTheme.card}`}
              >
                {filteredTips.map((tip) => (
                  <tr
                    key={tip._id}
                    className={`${currentTheme.tableRowHover} transition-colors`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      {tip.imageUrl ? (
                        <img
                          src={tip.imageUrl}
                          alt={tip.title}
                          className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded"
                        />
                      ) : (
                        <div
                          className={`h-12 w-12 sm:h-16 sm:w-16 ${
                            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                          } rounded flex items-center justify-center`}
                        >
                          <span className={currentTheme.secondaryText}>
                            No Image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`font-medium ${currentTheme.text}`}>
                        {tip.title}
                      </div>
                      <div className="text-sm sm:hidden">
                        <span className={currentTheme.secondaryText}>
                          {tip.plantType}
                        </span>
                        <span className={`mx-2 ${currentTheme.secondaryText}`}>
                          •
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            tip.difficulty === "Easy"
                              ? theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                              : tip.difficulty === "Medium"
                              ? theme === "dark"
                                ? "text-yellow-400"
                                : "text-yellow-600"
                              : theme === "dark"
                              ? "text-red-400"
                              : "text-red-600"
                          }`}
                        >
                          {tip.difficulty}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                      <span className={currentTheme.secondaryText}>
                        {tip.plantType}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                      <span className={currentTheme.secondaryText}>
                        {tip.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
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
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(tip._id)}
                        className={`flex items-center cursor-pointer ${currentTheme.button}`}
                      >
                        <FaEye className="mr-1" />
                        <span className="hidden sm:inline">View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTips;
