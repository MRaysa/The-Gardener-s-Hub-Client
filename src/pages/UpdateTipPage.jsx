import React, { use, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaSave, FaSpinner, FaSeedling } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const UpdateTipPage = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficulty: "Easy",
    description: "",
    imageUrl: "",
    category: "",
    availability: "Public",
    email: user?.email || "",
    name: user?.displayName || "",
  });

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await fetch(
          `https://the-gardener-s-hub-server.vercel.app/tips/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tip");
        }

        const data = await response.json();

        if (data.success) {
          setFormData({
            title: data.data.title,
            plantType: data.data.plantType,
            difficulty: data.data.difficulty,
            description: data.data.description,
            imageUrl: data.data.imageUrl,
            category: data.data.category,
            availability: data.data.availability,
            email: data.data.email,
            name: data.data.name,
          });
        } else {
          throw new Error(data.message || "Tip not found");
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        });
        navigate("/mytips");
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [id, navigate, theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://the-gardener-s-hub-server.vercel.app/tips/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update tip");
      }

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Tip updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        }).then(() => {
          navigate("/my-tips");
        });
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-64 ${
          theme === "dark" ? "bg-gray-800" : ""
        }`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            theme === "dark" ? "border-green-400" : "border-green-500"
          }`}
        ></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen md:py-12 md:px-8  lg:px-16 mx-auto p-6 shadow   ${
        theme === "dark" ? "bg-gray-800" : "bg-green-50"
      }`}
    >
      <div
        className={`max-w-2xl mx-auto p-4 md:p-6 shadow rounded-md my-6 ${
          theme === "dark" ? "bg-gray-900" : "bg-green-100"
        }`}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              theme === "dark" ? "text-green-300" : "text-green-800"
            }`}
          >
            <FaSeedling className="mr-2" /> Update Your Gardening Tip
          </h1>
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center ${
              theme === "dark"
                ? "text-green-400 hover:text-green-300"
                : "text-green-600 hover:text-green-800"
            }`}
          >
            <FaArrowLeft className="mr-1" /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                readOnly
                className={`w-full px-3 py-2 rounded cursor-not-allowed ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "bg-gray-100 border"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className={`w-full px-3 py-2 rounded cursor-not-allowed ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "bg-gray-100 border"
                }`}
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                  : "border focus:ring-green-500"
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Plant Type
            </label>
            <input
              type="text"
              name="plantType"
              placeholder="Plant Type"
              value={formData.plantType}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                  : "border focus:ring-green-500"
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                  : "border focus:ring-green-500"
              }`}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                  : "border focus:ring-green-500"
              }`}
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                  : "border focus:ring-green-500"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                    : "border focus:ring-green-500"
                }`}
              >
                <option value="Composting">Composting</option>
                <option value="Plant Care">Plant Care</option>
                <option value="Vertical Gardening">Vertical Gardening</option>
                <option value="Pest Control">Pest Control</option>
                <option value="Seed Starting">Seed Starting</option>
              </select>
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Visibility
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                    : "border focus:ring-green-500"
                }`}
              >
                <option value="Public">Public</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded flex items-center justify-center ${
              isSubmitting ? "opacity-75" : ""
            } ${
              theme === "dark"
                ? "bg-green-600 hover:bg-green-500 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Update Tip
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTipPage;
