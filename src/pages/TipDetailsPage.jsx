import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaLeaf,
  FaUser,
  FaClock,
  FaHeart,
  FaRegHeart,
  FaSeedling,
  FaThumbsUp,
} from "react-icons/fa";
import Swal from "sweetalert2";

const TipDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchTipDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tips/${id}`);

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

        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchTipDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = async () => {
    if (isLiked) return;

    try {
      const response = await fetch(
        `https://the-gardener-s-hub-server.vercel.app/${id}/like`,
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

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tip liked!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(result.message || "Failed to like tip");
      }
    } catch (err) {
      console.error("Like error:", err);

      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={handleBack}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaArrowLeft className="inline mr-2" /> Back to Tips
          </button>
        </div>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tip Not Found</h2>
        <button
          onClick={handleBack}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaArrowLeft className="inline mr-2" /> Back to Tips
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={handleBack}
        className="flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Tips
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {tip.title}
              </h1>
              <p className="text-gray-600 italic">{tip.plantType}</p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center space-x-4">
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
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <FaSeedling className="mr-2 text-green-500" />
              <span>{tip.category}</span>
            </div>
            <div className="flex items-center">
              <FaUser className="mr-2 text-green-500" />
              <span>By {tip.name}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-green-500" />
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
                    ? "bg-red-100 text-red-600 cursor-default"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
            >
              {isLiked ? (
                <FaHeart className="text-red-500 mr-2" />
              ) : (
                <FaRegHeart className="mr-2" />
              )}
              Like
            </button>
            <div className="flex items-center text-gray-700">
              <FaThumbsUp className="mr-2 text-green-500" />
              <span className="font-medium">{likeCount} likes</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {tip.description}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>Last updated: {new Date(tip.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetailsPage;
