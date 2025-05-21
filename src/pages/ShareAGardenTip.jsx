// import React, { use, useState } from "react";
// import { FaSeedling, FaUpload, FaSpinner } from "react-icons/fa";
// import { AuthContext } from "../contexts/AuthContext";

// const ShareAGardenTip = () => {
//   const { user } = use(AuthContext);
//   console.log(user);
//   const [formData, setFormData] = useState({
//     title: "",
//     plantType: "",
//     difficulty: "Easy",
//     description: "",
//     imageUrl: "",
//     category: "",
//     availability: "Public",
//     email: user?.email || "",
//     name: user?.displayName || "",
//   });

//   const [successMsg, setSuccessMsg] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/tips", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setSuccessMsg("Garden tip shared successfully!");
//         setFormData({
//           title: "",
//           plantType: "",
//           difficulty: "Easy",
//           description: "",
//           imageUrl: "",
//           category: "Plant Care",
//           availability: "Public",
//           email: user?.email || "",
//           name: user?.displayName || "",
//         });
//       } else {
//         throw new Error("Failed to submit garden tip.");
//       }
//     } catch (error) {
//       setSuccessMsg("Error: " + error.message);
//     }
//   };
//   console.log(formData);
//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md mt-6">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-green-800 flex items-center justify-center">
//           <FaSeedling className="mr-2" /> Share Your Gardening Tip
//         </h1>
//         <p className="mt-2 text-gray-600">
//           Help others grow by sharing your knowledge
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title (e.g., How I Grow Tomatoes Indoors)"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="plantType"
//           placeholder="Plant Type / Topic"
//           value={formData.plantType}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <select
//           name="difficulty"
//           value={formData.difficulty}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//         </select>

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           rows="4"
//           required
//         ></textarea>

//         <input
//           type="text"
//           name="imageUrl"
//           placeholder="Image URL"
//           value={formData.imageUrl}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />

//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="">Category</option>
//           <option value="Composting">Composting</option>
//           <option value="Plant Care">Plant Care</option>
//           <option value="Vertical Gardening">Vertical Gardening</option>
//           <option value="Pest Control">Pest Control</option>
//           <option value="Seed Starting">Seed Starting</option>
//         </select>

//         <select
//           name="availability"
//           value={formData.availability}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="Public">Public</option>
//           <option value="Hidden">Hidden</option>
//         </select>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             readOnly
//             className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             readOnly
//             className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Submit Tip
//         </button>
//       </form>

//       {successMsg && (
//         <div className="mt-4 text-green-700 font-medium">{successMsg}</div>
//       )}
//     </div>
//   );
// };

// export default ShareAGardenTip;
import React, { use, useState } from "react";
import { FaSeedling, FaUpload, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const ShareAGardenTip = () => {
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
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-green-50 shadow rounded-md mt-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 flex items-center justify-center">
          <FaSeedling className="mr-2" /> Share Your Gardening Tip
        </h1>
        <p className="mt-2 text-gray-600">
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
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />

        <input
          type="text"
          name="plantType"
          placeholder="Plant Type / Topic"
          value={formData.plantType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
          rows="4"
          required
        ></textarea>

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center ${
            isSubmitting ? "opacity-75" : ""
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
  );
};

export default ShareAGardenTip;
