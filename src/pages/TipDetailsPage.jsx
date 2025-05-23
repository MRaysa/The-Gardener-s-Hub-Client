import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUser,
  FaClock,
  FaSeedling,
  FaThumbsUp,
  FaHeart,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const TipDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Theme-based styles
  const themeStyles = {
    light: {
      bg: "bg-green-50",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      card: "bg-white",
      border: "border-gray-200",
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      card: "bg-gray-900",
      border: "border-gray-700",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  useEffect(() => {
    const fetchTipDetails = async () => {
      try {
        const response = await fetch(
          `https://the-gardener-s-hub-server.vercel.app/tips/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch tip details");
        }

        setTip(data.data);
        setLikeCount(data.data.totalLiked || 0);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);

        MySwal.fire({
          title: '<span style="color: #ef4444">Oops!</span>',
          html: `<div class="text-gray-700 dark:text-gray-200">${err.message}</div>`,
          icon: "error",
          background: theme === "dark" ? "#1f2937" : "#f9fafb",
          color: theme === "dark" ? "white" : "#111827",
          showConfirmButton: true,
          confirmButtonColor: "#10b981",
          confirmButtonText: '<span style="color: white">Got it</span>',
          customClass: {
            popup: `border-2 ${
              theme === "dark" ? "border-red-700" : "border-red-200"
            } rounded-xl`,
          },
        });
      }
    };

    fetchTipDetails();
  }, [id, theme]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = async () => {
    if (isLiked) return;

    setIsAnimating(true);

    try {
      const response = await fetch(
        `https://the-gardener-s-hub-server.vercel.app/tips/${id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like tip");
      }

      const result = await response.json();

      if (result.success) {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);

        MySwal.fire({
          title: '<span style="color: #10b981">Loved it!</span>',
          html: '<div class="text-gray-700 dark:text-gray-200">Your appreciation helps the gardening community grow!</div>',
          icon: "success",
          background: theme === "dark" ? "#1f2937" : "#f9fafb",
          color: theme === "dark" ? "white" : "#111827",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: `border-2 ${
              theme === "dark" ? "border-green-700" : "border-green-200"
            } rounded-xl`,
          },
        });
      } else {
        throw new Error(result.message || "Failed to like tip");
      }
    } catch (err) {
      console.error("Like error:", err);
      setIsLiked(false);

      MySwal.fire({
        title: '<span style="color: #ef4444">Sprout Trouble!</span>',
        html: `<div class="text-gray-700 dark:text-gray-200">${err.message}</div>`,
        icon: "error",
        background: theme === "dark" ? "#1f2937" : "#f9fafb",
        color: theme === "dark" ? "white" : "#111827",
        confirmButtonColor: "#10b981",
        confirmButtonText: '<span style="color: white">Try Again</span>',
        customClass: {
          popup: `border-2 ${
            theme === "dark" ? "border-red-700" : "border-red-200"
          } rounded-xl`,
        },
      });
    } finally {
      setTimeout(() => setIsAnimating(false), 1000);
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
          Growing your tip details...
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
        className={`container mx-auto px-4 py-8 max-w-4xl ${
          theme === "dark" ? "bg-gray-800 text-white" : ""
        }`}
      >
        <div
          className={`${
            theme === "dark"
              ? "bg-red-900 border-red-700 text-red-100"
              : "bg-red-100 border-red-500 text-red-700"
          } border-l-4 p-4`}
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={handleBack}
            className={`mt-4 ${
              theme === "dark"
                ? "bg-green-700 hover:bg-green-600"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            <FaArrowLeft className="inline mr-2" /> Back to Tips
          </button>
        </div>
      </div>
    );
  }

  if (!tip) {
    return (
      <div
        className={`container mx-auto px-4 py-8 max-w-4xl text-center ${
          theme === "dark" ? "bg-gray-800 text-white" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Tip Not Found</h2>
        <button
          onClick={handleBack}
          className={`${
            theme === "dark"
              ? "bg-green-700 hover:bg-green-600"
              : "bg-green-600 hover:bg-green-700"
          } text-white font-bold py-2 px-4 rounded`}
        >
          <FaArrowLeft className="inline mr-2" /> Back to Tips
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen md:py-12 md:px-8 lg:px-16 mx-auto p-6 shadow ${currentTheme.bg}`}
    >
      <div
        className={`container mx-auto px-4 py-8 max-w-4xl my-4 rounded-2xl ${currentTheme.card}`}
      >
        <button
          onClick={handleBack}
          className={`flex items-center ${
            theme === "dark"
              ? "text-green-400 hover:text-green-300"
              : "text-green-600 hover:text-green-800"
          } mb-6 transition-colors`}
        >
          <FaArrowLeft className="mr-2" /> Back to Tips
        </button>

        <div
          className={`rounded-lg shadow-lg overflow-hidden ${currentTheme.card}`}
        >
          {tip.imageUrl && (
            <img
              src={tip.imageUrl}
              alt={tip.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1
                  className={`text-2xl md:text-3xl font-bold mb-2 ${currentTheme.text}`}
                >
                  {tip.title}
                </h1>
                <p className={`${currentTheme.secondaryText} italic`}>
                  {tip.plantType}
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  tip.difficulty === "Easy"
                    ? theme === "dark"
                      ? "bg-green-900 text-green-200"
                      : "bg-green-100 text-green-800"
                    : tip.difficulty === "Medium"
                    ? theme === "dark"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-yellow-100 text-yellow-800"
                    : theme === "dark"
                    ? "bg-red-900 text-red-200"
                    : "bg-red-100 text-red-800"
                }`}
                >
                  {tip.difficulty}
                </span>
              </div>
            </div>

            <div
              className={`flex flex-wrap gap-4 mb-6 text-sm ${currentTheme.secondaryText}`}
            >
              <div className="flex items-center">
                <FaSeedling
                  className={`mr-2 ${
                    theme === "dark" ? "text-green-400" : "text-green-500"
                  }`}
                />
                <span>{tip.category}</span>
              </div>
              <div className="flex items-center">
                <FaUser
                  className={`mr-2 ${
                    theme === "dark" ? "text-green-400" : "text-green-500"
                  }`}
                />
                <span>By {tip.name}</span>
              </div>
              <div className="flex items-center">
                <FaClock
                  className={`mr-2 ${
                    theme === "dark" ? "text-green-400" : "text-green-500"
                  }`}
                />
                <span>
                  Posted on {new Date(tip.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <button
                onClick={handleLike}
                disabled={isLiked}
                className={`flex items-center px-4 py-2 rounded-lg mr-4 transition-colors
                ${
                  isLiked
                    ? theme === "dark"
                      ? "bg-red-900 text-red-200 cursor-default"
                      : "bg-red-100 text-red-600 cursor-default"
                    : theme === "dark"
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-100"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <FaHeart
                  className={`mr-2 ${
                    isLiked ? "text-red-500" : "text-gray-500"
                  } ${isAnimating ? "animate-ping" : ""}`}
                />
                Like
              </button>
              <div className={`flex items-center ${currentTheme.text}`}>
                <FaThumbsUp
                  className={`mr-2 ${
                    theme === "dark" ? "text-green-400" : "text-green-500"
                  }`}
                />
                <span className="font-medium">{likeCount} likes</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className={`text-xl font-semibold mb-3 ${currentTheme.text}`}>
                Description
              </h2>
              <p className={currentTheme.secondaryText}>{tip.description}</p>
            </div>

            <div
              className={`pt-4 border-t ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              } text-sm ${currentTheme.secondaryText}`}
            >
              <p>Last updated: {new Date(tip.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetailsPage;
