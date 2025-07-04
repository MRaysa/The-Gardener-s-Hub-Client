import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate, NavLink, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTheme } from "../contexts/ThemeContext";

const MySwal = withReactContent(Swal);

const SignUp = () => {
  const { createUser, googleSignIn, updateUser, loading } =
    useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [useImageUrl, setUseImageUrl] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  const showSuccessAlert = (user, isGoogle = false) => {
    MySwal.fire({
      title: (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4"
          >
            <FaCheckCircle className="text-green-600 dark:text-green-300 text-4xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome {user.displayName || user.name}!
          </h2>
        </div>
      ),
      html: (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your account has been created successfully
            {isGoogle && " with Google"}
          </p>
          {user.photoURL && (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              src={user.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-400"
            />
          )}
          <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
            <p className="text-green-700 dark:text-green-300 font-medium">
              {user.email}
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-sm text-green-600 dark:text-green-400"
          >
            Ready to explore!
          </motion.div>
        </div>
      ),
      showConfirmButton: true,
      confirmButtonText: "Continue",
      confirmButtonColor: "#10b981",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
    }).then(() => {
      navigate(location?.state || "/");
    });
  };

  const showGoogleWelcome = (user) => {
    MySwal.fire({
      title: (
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center"
            >
              <FaGoogle className="text-red-500 text-4xl" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-2 -right-2 bg-green-100 dark:bg-green-800 rounded-full p-2"
            >
              <FaUser className="text-green-600 dark:text-green-300 text-xl" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Google Sign In Successful!
          </h2>
        </div>
      ),
      html: (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome back, {user.displayName}!
          </p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-400"
            />
          )}
          <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
            <p className="text-blue-700 dark:text-blue-300 font-medium">
              {user.email}
            </p>
          </div>
        </div>
      ),
      showConfirmButton: true,
      confirmButtonText: "Let's Go!",
      confirmButtonColor: "#10b981",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
    }).then(() => {
      navigate(location?.state || "/");
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and a special character";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (formData.photoURL && !isValidUrl(formData.photoURL)) {
      newErrors.photoURL = "Please enter a valid image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, photoURL: url }));
    if (isValidUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, photoURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveUserToDatabase = async (userProfile) => {
    try {
      const response = await fetch(
        "https://the-gardener-s-hub-server.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfile),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving user to database:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const userCredential = await createUser(
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const userProfile = {
        uid: user.uid,
        displayName: formData.name,
        email: formData.email,
        photoURL: formData.photoURL || "",
        phoneNumber: formData.phone || "",
        address: formData.address || "",
        createdAt: new Date().toISOString(),
      };

      await updateUser({
        displayName: formData.name,
        photoURL: formData.photoURL || "",
      });

      const dbResponse = await saveUserToDatabase(userProfile);
      if (dbResponse.insertedId) {
        showSuccessAlert({
          name: formData.name,
          email: formData.email,
          photoURL: formData.photoURL,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ firebase: error.message });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const userProfile = {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        phoneNumber: "",
        address: "",
        createdAt: new Date().toISOString(),
      };

      await saveUserToDatabase(userProfile);
      showGoogleWelcome(user);
    } catch (error) {
      setErrors({ firebase: error.message });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        theme === "dark"
          ? "bg-gray-800"
          : "bg-gradient-to-br from-green-50 to-teal-50"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-green-100 mt-2">Join us today!</p>
        </div>

        {/* Error Message */}
        {errors.firebase && (
          <div className="px-8 pt-6">
            <div
              className={`${
                theme === "dark"
                  ? "bg-red-900 text-red-100"
                  : "bg-red-100 text-red-700"
              } border-l-4 border-red-500 p-4`}
            >
              <p>{errors.firebase}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-2 ${
                  theme === "dark" ? "border-gray-600" : "border-green-100"
                }`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaImage className="text-green-500 text-3xl" />
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="upload-option"
                  name="image-option"
                  checked={!useImageUrl}
                  onChange={() => setUseImageUrl(false)}
                  className={`mr-2 ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                />
                <label
                  htmlFor="upload-option"
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Upload Image
                </label>
              </div>
              {!useImageUrl && (
                <label className="block w-full">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={`block w-full text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
                      theme === "dark"
                        ? "file:bg-gray-700 file:text-green-300 hover:file:bg-gray-600"
                        : "file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    }`}
                  />
                </label>
              )}

              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="url-option"
                  name="image-option"
                  checked={useImageUrl}
                  onChange={() => setUseImageUrl(true)}
                  className={`mr-2 ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                />
                <label
                  htmlFor="url-option"
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Use Image URL
                </label>
              </div>
              {useImageUrl && (
                <div className="mt-1">
                  <input
                    type="text"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleImageUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-3 py-2 border ${
                      errors.photoURL
                        ? "border-red-500"
                        : theme === "dark"
                        ? "border-gray-600"
                        : "border-gray-300"
                    } rounded-md text-sm shadow-sm placeholder:text-gray-400 ${
                      theme === "dark"
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                  {errors.photoURL && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.photoURL}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <label
              htmlFor="name"
              className={`flex items-center text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <FaUser className="mr-2 text-green-500" />
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.name
                  ? "border-red-500"
                  : theme === "dark"
                  ? "border-gray-600"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder:text-gray-400 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
              }`}
              placeholder="John Doe"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className={`flex items-center text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <FaEnvelope className="mr-2 text-green-500" />
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email
                  ? "border-red-500"
                  : theme === "dark"
                  ? "border-gray-600"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder:text-gray-400 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
              }`}
              placeholder="your@email.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className={`flex items-center text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <FaLock className="mr-2 text-green-500" />
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.password
                    ? "border-red-500"
                    : theme === "dark"
                    ? "border-gray-600"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder:text-gray-400 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-900"
                }`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  />
                ) : (
                  <FaEye
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  />
                )}
              </button>
            </div>
            {errors.password ? (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            ) : (
              <p
                className={`text-xs mt-1 ${
                  theme === "dark" ? "text-green-400" : "text-green-500"
                }`}
              >
                Must be at least 8 characters with uppercase, lowercase, and
                special character
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className={`flex items-center text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <FaPhone className="mr-2 text-green-500" />
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.phone
                  ? "border-red-500"
                  : theme === "dark"
                  ? "border-gray-600"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder:text-gray-400 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
              }`}
              placeholder="1234567890"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address Field */}
          <div className="space-y-1">
            <label
              htmlFor="address"
              className={`flex items-center text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <FaMapMarkerAlt className="mr-2 text-green-500" />
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors placeholder:text-gray-400 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
              }`}
              placeholder="123 Main St, City, Country"
              rows="2"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 mt-4 rounded-lg text-white font-semibold ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } transition-colors shadow-md`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
              >
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ y: -2 }}
              type="button"
              onClick={handleGoogleRegister}
              className={`flex items-center cursor-pointer justify-center py-2 px-4 rounded-lg transition ${
                theme === "dark"
                  ? "border border-gray-600 bg-gray-700 hover:bg-gray-600"
                  : "border border-green-300 bg-white hover:bg-gray-50"
              }`}
            >
              <FaGoogle className="text-red-500 mr-2" />
              <span>Login With Google</span>
            </motion.button>
          </div>
        </form>

        {/* Footer */}
        <div
          className={`px-8 py-4 text-center ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-green-700 underline"
                  : `font-medium ${
                      theme === "dark"
                        ? "text-green-400 hover:text-green-300"
                        : "text-green-600 hover:text-green-500"
                    }`
              }
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
