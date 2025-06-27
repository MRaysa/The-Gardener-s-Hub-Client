import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import MyTips from "../../pages/MyTips";
import { FaLeaf } from "react-icons/fa";

const DashboardMyTips = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-lg overflow-hidden`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center">
          <FaLeaf className="mr-2 text-green-500" />
          My Gardening Tips
        </h2>
        <p
          className={`text-sm mt-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Manage and view all your shared gardening tips
        </p>
      </div>

      <div className="p-6">
        <MyTips dashboardView={true} />
      </div>
    </motion.div>
  );
};

export default DashboardMyTips;
