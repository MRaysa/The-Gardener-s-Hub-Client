import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import {
  FaUser,
  FaEdit,
  FaSeedling,
  FaLeaf,
  FaWater,
  FaChartLine,
  FaTree,
  FaBug,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { GiPlantWatering, GiPlantSeed } from "react-icons/gi";
import { IoMdColorPalette } from "react-icons/io";

const Profile = () => {
  const { theme } = useTheme();
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
  });
  const [photoURL, setPhotoURL] = useState("https://i.pravatar.cc/150?img=3");

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "Aysa Siddika Meem",
        bio:
          localStorage.getItem(`${user.uid}_bio`) ||
          "Passionate about organic gardening and sustainable practices. Currently growing tomatoes, basil, and mint in my balcony garden.",
      });
      setPhotoURL(user.photoURL || "https://i.pravatar.cc/150?img=3");
    }
  }, [user]);

  const colors = {
    light: {
      bg: "bg-amber-50",
      card: "bg-white",
      text: "text-green-900",
      secondaryText: "text-green-700",
      accentText: "text-amber-800",
      border: "border-green-200",
      accent: "bg-amber-100",
    },
    dark: {
      bg: "bg-gray-900",
      card: "bg-gray-800",
      text: "text-amber-50",
      secondaryText: "text-green-300",
      accentText: "text-amber-300",
      border: "border-gray-700",
      accent: "bg-amber-900",
    },
  };

  const stats = [
    {
      label: "Tips Shared",
      value: 42,
      icon: <FaLeaf className="text-green-500 dark:text-green-400" />,
    },
    {
      label: "Plants Growing",
      value: 8,
      icon: <GiPlantSeed className="text-amber-500 dark:text-amber-400" />,
    },
    {
      label: "Watering Schedule",
      value: 3,
      icon: <GiPlantWatering className="text-blue-500 dark:text-blue-400" />,
    },
    {
      label: "Community Rank",
      value: "#42",
      icon: <FaChartLine className="text-purple-500 dark:text-purple-400" />,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoURL(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      // Update profile in authentication service
      await updateUserProfile({
        displayName: formData.displayName,
        photoURL: photoURL,
      });

      // Save bio to localStorage
      if (user?.uid) {
        localStorage.setItem(`${user.uid}_bio`, formData.bio);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl ${
        theme === "dark" ? colors.dark.bg : colors.light.bg
      }`}
    >
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-green-500 dark:border-amber-500 shadow-lg"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <FaEdit className="text-white text-xl" />
                </label>
              </div>
            )}
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 bg-amber-500 dark:bg-amber-600 text-white p-2 rounded-full shadow-md"
              >
                <FaEdit size={14} />
              </motion.button>
            )}
          </motion.div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className={`text-3xl font-bold w-full p-2 rounded ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900"
                  }`}
                />
              ) : (
                <h1
                  className={`text-3xl font-bold ${
                    theme === "dark" ? colors.dark.text : colors.light.text
                  }`}
                >
                  {formData.displayName}
                </h1>
              )}
              <p
                className={`${
                  theme === "dark" ? "text-amber-300" : "text-amber-700"
                } mb-2`}
              >
                {user?.email || "aysasiddikameem3141@gmail.com"}
              </p>
              <p className="mt-2 text-sm flex items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === "dark"
                      ? "bg-amber-800 text-amber-100"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <FaTree className="inline mr-2" /> Master Gardener
                </span>
              </p>
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="p-2 bg-green-500 text-white rounded-full shadow-md"
                >
                  <FaSave size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-red-500 text-white rounded-full shadow-md"
                >
                  <FaTimes size={16} />
                </motion.button>
              </div>
            )}
          </div>

          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className={`mt-4 w-full p-2 rounded ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
              }`}
              rows="3"
            />
          ) : (
            <p
              className={`mt-4 ${
                theme === "dark" ? "text-green-300" : "text-green-700"
              }`}
            >
              {formData.bio}
            </p>
          )}
        </div>
      </div>

      {/* Rest of your component remains the same */}
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-4 rounded-xl ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            } border ${
              theme === "dark" ? "border-gray-600" : "border-green-100"
            } shadow-md flex items-center`}
          >
            <div className="mr-3 text-2xl">{stat.icon}</div>
            <div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stat.label}
              </p>
              <p
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gardening Palette */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-xl mb-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-amber-50"
        } border ${
          theme === "dark" ? "border-gray-700" : "border-amber-200"
        } shadow-md`}
      >
        <h2
          className={`text-xl font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-amber-300" : "text-amber-800"
          }`}
        >
          <IoMdColorPalette className="mr-2 text-green-500 dark:text-green-400" />
          Gardening Palette
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Tomatoes", "Basil", "Mint", "Rosemary", "Chili", "Lettuce"].map(
            (plant, i) => (
              <motion.div
                key={plant}
                whileHover={{ scale: 1.05 }}
                className={`p-3 rounded-lg text-center font-medium ${
                  i % 3 === 0
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : i % 3 === 1
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    : "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
                }`}
              >
                {plant}
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* Pest Control Expertise */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-xl mb-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-red-50"
        } border ${
          theme === "dark" ? "border-gray-700" : "border-red-200"
        } shadow-md`}
      >
        <h2
          className={`text-xl font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-amber-300" : "text-red-800"
          }`}
        >
          <FaBug className="mr-2 text-red-500 dark:text-red-400" />
          Pest Control Expertise
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Whiteflies", "Slugs", "Aphids", "Spider Mites"].map((pest, i) => (
            <motion.div
              key={pest}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                theme === "dark"
                  ? "bg-red-900 text-red-100"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {pest}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-xl ${
          theme === "dark" ? colors.dark.card : colors.light.card
        } border ${
          theme === "dark" ? "border-gray-700" : "border-yellow-100"
        } shadow-md`}
      >
        <h2
          className={`text-xl font-semibold mb-4 flex items-center ${
            theme === "dark" ? colors.dark.text : colors.light.text
          }`}
        >
          <FaWater className="mr-2 text-blue-400" />
          Garden Journal
        </h2>
        <div className="space-y-4">
          {[
            { action: "Harvested first tomatoes of the season", days: 1 },
            {
              action: "Started new compost bin with kitchen scraps",
              days: 3,
            },
            { action: "Treated rose bushes for black spot", days: 5 },
            { action: "Planted new basil seedlings", days: 7 },
          ].map((activity, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              className={`flex items-start pb-4 border-b ${
                theme === "dark" ? "border-gray-700" : "border-yellow-100"
              } last:border-0`}
            >
              <div
                className={`w-3 h-3 rounded-full mt-2 mr-3 ${
                  index % 3 === 0
                    ? "bg-green-500"
                    : index % 3 === 1
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
              ></div>
              <div>
                <p
                  className={`font-medium ${
                    theme === "dark" ? colors.dark.text : colors.light.text
                  }`}
                >
                  {activity.action}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {activity.days} day{activity.days !== 1 ? "s" : ""} ago
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
