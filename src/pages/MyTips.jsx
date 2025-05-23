import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEdit, FaTrash, FaLeaf, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

const MyTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = use(AuthContext);
  const userEmail = user?.email;

  // Theme styles
  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      card: "bg-white",
      tableHeader: "bg-green-200",
      tableRowHover: "hover:bg-green-50",
      button: "text-green-600 hover:text-green-800",
      deleteButton: "text-red-600 hover:text-red-800",
      emptyStateBg: "bg-white",
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      card: "bg-gray-800",
      tableHeader: "bg-gray-700",
      tableRowHover: "hover:bg-gray-700",
      button: "text-green-400 hover:text-green-300",
      deleteButton: "text-red-400 hover:text-red-300",
      emptyStateBg: "bg-gray-800",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  useEffect(() => {
    const fetchMyTips = async () => {
      try {
        const response = await fetch(
          `https://the-gardener-s-hub-server.vercel.app/mytips/${userEmail}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tips");
        }

        const data = await response.json();

        if (data.success) {
          setTips(data.data);
        } else {
          throw new Error(data.message || "No tips found");
        }
      } catch (err) {
        setError(err.message);
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
          background: theme === "dark" ? "#1f2937" : "#fff",
          color: theme === "dark" ? "#fff" : "#1f2937",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchMyTips();
    }
  }, [userEmail, theme]);

  const handleUpdate = (tipId) => {
    navigate(`/update-tip/${tipId}`);
  };

  const handleDelete = async (tipId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: theme === "dark" ? "#1f2937" : "#fff",
      color: theme === "dark" ? "#fff" : "#1f2937",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://the-gardener-s-hub-server.vercel.app/tips/${tipId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete tip");
        }

        setTips(tips.filter((tip) => tip._id !== tipId));

        Swal.fire({
          title: "Deleted!",
          text: "Your tip has been deleted.",
          icon: "success",
          background: theme === "dark" ? "#1f2937" : "#fff",
          color: theme === "dark" ? "#fff" : "#1f2937",
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
          background: theme === "dark" ? "#1f2937" : "#fff",
          color: theme === "dark" ? "#fff" : "#1f2937",
        });
      }
    }
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
          Growing your tips...
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
      className={`min-h-screen md:py-16 md:px-8  lg:px-16  ${currentTheme.bg}   px-4 py-8 `}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1
          className={`text-2xl md:text-3xl font-bold flex items-center ${
            theme === "dark" ? "text-green-400" : "text-green-800"
          }`}
        >
          <FaLeaf className="mr-2" /> My Gardening Tips
        </h1>
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center ${currentTheme.button}`}
        >
          <FaArrowLeft className="mr-1" /> Back
        </button>
      </div>

      {tips.length === 0 ? (
        <div
          className={`text-center py-12 rounded-lg ${currentTheme.emptyStateBg} shadow`}
        >
          <p className={`text-lg ${currentTheme.secondaryText}`}>
            You haven't shared any tips yet.
          </p>
          <button
            onClick={() => navigate("/share-tip")}
            className={`mt-4 ${
              theme === "dark"
                ? "bg-green-700 hover:bg-green-600"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            Share Your First Tip
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${currentTheme.tableHeader}`}>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={currentTheme.secondaryText}>Title</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
                  <span className={currentTheme.secondaryText}>Category</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">
                  <span className={currentTheme.secondaryText}>Difficulty</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell">
                  <span className={currentTheme.secondaryText}>Status</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={currentTheme.secondaryText}>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 ${currentTheme.card}`}>
              {tips.map((tip) => (
                <tr
                  key={tip._id}
                  className={`${currentTheme.tableRowHover} transition-colors`}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`font-medium ${currentTheme.text}`}>
                      {tip.title}
                    </div>
                    <div className="text-sm sm:hidden">
                      <span className={currentTheme.secondaryText}>
                        {tip.category}
                      </span>
                      <span className={`mx-2 ${currentTheme.secondaryText}`}>
                        •
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          tip.difficulty === "Easy"
                            ? "text-green-500"
                            : tip.difficulty === "Medium"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {tip.difficulty}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                    <span className={currentTheme.secondaryText}>
                      {tip.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
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
                  <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        tip.availability === "Public"
                          ? theme === "dark"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-blue-100 text-blue-800"
                          : theme === "dark"
                          ? "bg-gray-600 text-gray-300"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tip.availability}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleUpdate(tip._id)}
                      className={`mr-4 ${currentTheme.button}`}
                    >
                      <FaEdit className="inline mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(tip._id)}
                      className={currentTheme.deleteButton}
                    >
                      <FaTrash className="inline mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTips;
