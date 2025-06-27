import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import {
  FaSeedling,
  FaUserFriends,
  FaPenAlt,
  FaChartPie,
  FaLeaf,
  FaWater,
  FaRegCalendarAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import { GiPlantWatering, GiPlantSeed } from "react-icons/gi";
import { RiPlantLine } from "react-icons/ri";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const userName = user?.displayName || "Plant Lover";

  // Animated stats with growth indicators
  const stats = [
    {
      title: "Total Garden Tips",
      value: "142",
      change: "+12%",
      icon: <FaSeedling className="text-2xl text-green-800" />,
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "Active Gardeners",
      value: "63",
      change: "+5 new",
      icon: <FaUserFriends className="text-2xl text-green-800" />,
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "My Shared Tips",
      value: "18",
      change: "+2 this week",
      icon: <FaPenAlt className="text-2xl text-green-800" />,
      color: "from-purple-400 to-fuchsia-500",
    },
    {
      title: "Watering Reminders",
      value: "3",
      change: "Due today",
      icon: <FaWater className="text-2xl text-green-800" />,
      color: "from-cyan-400 to-sky-500",
    },
  ];

  // Interactive recent activities
  const recentActivities = [
    {
      action: "You shared a tip about tomato care",
      time: "2 hours ago",
      icon: <RiPlantLine className="text-emerald-500" />,
      actionText: "View Tip",
    },
    {
      action: "New gardener joined the community",
      time: "5 hours ago",
      icon: <GiPlantSeed className="text-blue-500" />,
      actionText: "Welcome",
    },
    {
      action: "Your tip got 5 new likes",
      time: "1 day ago",
      icon: <FaRegCommentDots className="text-purple-500" />,
      actionText: "See Comments",
    },
    {
      action: "Watering reminder for your basil plant",
      time: "1 day ago",
      icon: <GiPlantWatering className="text-cyan-500" />,
      actionText: "Mark Done",
    },
  ];

  // Time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8">
      {/* Personalized Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            {getTimeBasedGreeting()}, {userName.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Here's what's blooming in your garden community today
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-100 dark:bg-emerald-900 text-green-800 dark:text-emerald-100 px-4 py-2 rounded-full flex items-center shadow-sm"
        >
          <FaChartPie className="mr-2" />
          <span>Dashboard Overview</span>
        </motion.div>
      </motion.div>

      {/* Animated Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-gradient-to-r ${stat.color} text-white p-6 rounded-2xl shadow-lg overflow-hidden relative`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
          >
            <div className="absolute -right-4 -bottom-4 opacity-20">
              {React.cloneElement(stat.icon, { size: 80 })}
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium opacity-90">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full mt-2 inline-block text-green-800">
                    {stat.change}
                  </span>
                </div>
                <div className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity with Interactive Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-200 to-purple-300 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold flex items-center text-green-800">
            <FaLeaf className="mr-2 text-green-500" />
            Recent Garden Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-6 cursor-pointer transition-colors duration-200 group"
            >
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 mr-4 group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
                <button className="text-sm text-green-600 dark:text-emerald-400 font-medium hover:underline">
                  {activity.actionText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions with Hover Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-6 rounded-2xl shadow-lg overflow-hidden relative"
        >
          <div className="absolute -right-10 -bottom-10 opacity-20">
            <FaPenAlt size={80} />
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2">Share Your Garden Tip</h3>
            <p className="mb-4 opacity-90">
              Help others grow their plants better
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium shadow-md"
            >
              Write Tip
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white p-6 rounded-2xl shadow-lg overflow-hidden relative"
        >
          <div className="absolute -right-10 -bottom-10 opacity-20">
            <FaUserFriends size={80} />
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2">Explore Gardeners</h3>
            <p className="mb-4 opacity-90">Connect with fellow plant lovers</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium shadow-md"
            >
              Browse Gardeners
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg overflow-hidden relative"
        >
          <div className="absolute -right-10 -bottom-10 opacity-20">
            <FaRegCalendarAlt size={80} />
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2">Upcoming Events</h3>
            <p className="mb-4 opacity-90">Join our next gardening workshop</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium shadow-md"
            >
              View Events
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
