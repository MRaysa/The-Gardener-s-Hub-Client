import React, { use, useState } from "react";
import { FaSeedling, FaUpload, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Swal from "sweetalert2";

const ShareAGardenTip = () => {
  const { theme } = useTheme();
  const { user } = use(AuthContext);
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://the-gardener-s-hub-server.vercel.app/tips",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Garden tip shared successfully!",
          icon: "success",
          confirmButtonText: "OK",
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        });

        setFormData({
          title: "",
          plantType: "",
          difficulty: "Easy",
          description: "",
          imageUrl: "",
          category: "Plant Care",
          availability: "Public",
          email: user?.email || "",
          name: user?.displayName || "",
        });
      } else {
        throw new Error("Failed to submit garden tip.");
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

  return (
    <div
      className={`min-h-screen md:py-12 md:px-8  lg:px-16 mx-auto p-6 shadow   ${
        theme === "dark" ? "bg-gray-800" : "bg-green-50"
      }`}
    >
      <div
        className={`max-w-2xl mx-auto p-6 shadow rounded-2xl my-6 ${
          theme === "dark" ? "bg-gray-900" : "bg-green-100"
        }`}
      >
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-bold flex items-center justify-center ${
              theme === "dark" ? "text-green-300" : "text-green-800"
            }`}
          >
            <FaSeedling className="mr-2" /> Share Your Gardening Tip
          </h1>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Help others grow by sharing your knowledge
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title (e.g., How I Grow Tomatoes Indoors)"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                : "border focus:ring-green-500"
            }`}
            required
          />

          <input
            type="text"
            name="plantType"
            placeholder="Plant Type / Topic"
            value={formData.plantType}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:ring-green-400"
                : "border focus:ring-green-500"
            }`}
            required
          />

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
            <option value="">Category</option>
            <option value="Composting">Composting</option>
            <option value="Plant Care">Plant Care</option>
            <option value="Vertical Gardening">Vertical Gardening</option>
            <option value="Pest Control">Pest Control</option>
            <option value="Seed Starting">Seed Starting</option>
          </select>

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

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent cursor-not-allowed ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-green-400"
                  : "bg-gray-100 border focus:ring-green-500"
              }`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className={`w-full px-3 py-2 rounded focus:ring-2 focus:border-transparent cursor-not-allowed ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-green-400"
                  : "bg-gray-100 border focus:ring-green-500"
              }`}
            />
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
                Submitting...
              </>
            ) : (
              <>
                <FaUpload className="mr-2" />
                Submit Tip
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareAGardenTip;
