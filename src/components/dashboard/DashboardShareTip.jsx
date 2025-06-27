import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import ShareAGardenTip from "../../pages/ShareAGardenTip";
import { FaSeedling, FaPenAlt } from "react-icons/fa";

const DashboardShareTip = () => {
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
      {/* Header Section */}
      <div
        className={`p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <FaPenAlt className="mr-2 text-green-500" />
              Share Your Gardening Wisdom
            </h2>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Contribute to our community by sharing your plant care tips
            </p>
          </div>
          <div
            className={`p-2 rounded-full ${
              theme === "dark" ? "bg-green-900" : "bg-green-100"
            }`}
          >
            <FaSeedling className="text-green-500" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <ShareAGardenTip dashboardView={true} />
      </div>

      {/* Footer Section */}
      <div
        className={`p-4 border-t ${
          theme === "dark"
            ? "border-gray-700 bg-gray-900"
            : "border-gray-200 bg-gray-50"
        } text-center`}
      >
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your tips help our gardening community grow!
        </p>
      </div>
    </motion.div>
  );
};

export default DashboardShareTip;
