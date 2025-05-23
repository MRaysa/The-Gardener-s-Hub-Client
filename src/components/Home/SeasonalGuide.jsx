import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaLeaf, FaSun, FaSnowflake, FaTree } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SeasonalGuide = () => {
  const [activeSeason, setActiveSeason] = useState("spring");
  const { theme } = useTheme();

  const seasonalPlants = {
    spring: [
      {
        name: "Tomatoes",
        when: "After last frost",
        tip: "Start indoors 6-8 weeks before transplanting",
        icon: "🍅",
      },
      {
        name: "Lettuce",
        when: "Early spring",
        tip: "Can tolerate light frosts",
        icon: "🥬",
      },
      {
        name: "Peas",
        when: "As soon as soil can be worked",
        tip: "Direct sow for best results",
        icon: "🌱",
      },
    ],
    summer: [
      {
        name: "Beans",
        when: "When soil is warm",
        tip: "Bush varieties mature faster",
        icon: "🫘",
      },
      {
        name: "Cucumbers",
        when: "Late spring to early summer",
        tip: "Provide trellis for vertical growth",
        icon: "🥒",
      },
      {
        name: "Zucchini",
        when: "After frost danger passes",
        tip: "Only plant 1-2 plants per household",
        icon: "🎃",
      },
    ],
    fall: [
      {
        name: "Kale",
        when: "6-8 weeks before first frost",
        tip: "Flavor improves after frost",
        icon: "🥬",
      },
      {
        name: "Garlic",
        when: "4-6 weeks before ground freezes",
        tip: "Plant pointy end up",
        icon: "🧄",
      },
      {
        name: "Spinach",
        when: "Late summer to early fall",
        tip: "Harvest leaves when young",
        icon: "🍃",
      },
    ],
    winter: [
      {
        name: "Indoor Herbs",
        when: "Year-round",
        tip: "Use grow lights for best results",
        icon: "🌿",
      },
      {
        name: "Microgreens",
        when: "Year-round",
        tip: "Harvest in 10-14 days",
        icon: "🌱",
      },
      {
        name: "Planning",
        when: "Winter months",
        tip: "Sketch garden layouts for spring",
        icon: "📝",
      },
    ],
  };

  const seasonIcons = {
    spring: <FaLeaf className="text-green-500" />,
    summer: <FaSun className="text-yellow-500" />,
    fall: <FaTree className="text-orange-500" />,
    winter: <FaSnowflake className="text-blue-400" />,
  };

  const themeStyles = {
    light: {
      bg: "bg-gradient-to-b from-green-50 to-white",
      text: "text-gray-800",
      card: "bg-white",
      secondaryText: "text-gray-600",
      buttonActive: "bg-green-600 text-white",
      buttonInactive: "bg-white text-green-800 hover:bg-green-100",
    },
    dark: {
      bg: "bg-gradient-to-b from-gray-800 to-gray-800",
      text: "text-gray-100",
      card: "bg-gray-700",
      secondaryText: "text-gray-300",
      buttonActive: "bg-green-700 text-white",
      buttonInactive: "bg-gray-600 text-green-300 hover:bg-gray-500",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`py-16 px-4  ${currentTheme.bg}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className={`text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-green-400" : "text-green-800"
            }`}
          >
            Seasonal Planting Guide
          </motion.h2>
          <p
            className={`text-lg ${currentTheme.secondaryText} max-w-2xl mx-auto`}
          >
            Discover the perfect plants for each season and expert tips for
            thriving gardens
          </p>
        </div>

        <div className="flex justify-center flex-col md:flex-row gap-2 mb-12 space-x-2">
          {["spring", "summer", "fall", "winter"].map((season) => (
            <motion.button
              key={season}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSeason(season)}
              className={`px-6 py-3 rounded-full capitalize flex items-center space-x-2 transition-all ${
                activeSeason === season
                  ? currentTheme.buttonActive
                  : currentTheme.buttonInactive
              }`}
            >
              <span>{seasonIcons[season]}</span>
              <span>{season}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeSeason}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {seasonalPlants[activeSeason].map((plant, index) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={index}
              className={`${currentTheme.card} p-6 rounded-xl shadow-lg overflow-hidden relative`}
            >
              <div className="absolute top-4 right-4 text-3xl">
                {plant.icon}
              </div>
              <h3
                className={`text-2xl font-semibold mb-3 ${
                  theme === "dark" ? "text-green-300" : "text-green-700"
                }`}
              >
                {plant.name}
              </h3>

              <div className="mb-4">
                <div className="flex items-start space-x-2">
                  <span
                    className={`font-medium ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    When to plant:
                  </span>
                  <p className={currentTheme.secondaryText}>{plant.when}</p>
                </div>
              </div>

              <div
                className="bg-opacity-20 rounded-lg p-4"
                style={{
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(74, 222, 128, 0.1)"
                      : "rgba(22, 163, 74, 0.1)",
                }}
              >
                <p
                  className={`font-medium ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                >
                  🌱 Expert tip:
                </p>
                <p className={currentTheme.secondaryText}>{plant.tip}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className={`mt-12 text-center ${currentTheme.secondaryText}`}>
          <p>
            Remember: These are general guidelines - adjust based on your local
            climate!
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default SeasonalGuide;
