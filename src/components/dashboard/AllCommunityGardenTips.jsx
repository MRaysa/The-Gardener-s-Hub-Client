import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import ExploreGardeners from "../../pages/ExploreGardeners";
import { FaUsers } from "react-icons/fa";

const AllCommunityGardenTips = () => {
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
              <FaUsers className="mr-2 text-blue-500" />
              Community Gardeners
            </h2>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Connect with fellow gardening enthusiasts in our community
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              theme === "dark"
                ? "bg-blue-900 text-blue-200"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {theme === "dark" ? "64 Active" : "64 Gardeners Online"}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <ExploreGardeners dashboardView={true} />
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
          Found someone interesting? Send them a gardening tip!
        </p>
      </div>
    </motion.div>
  );
};

export default AllCommunityGardenTips;
