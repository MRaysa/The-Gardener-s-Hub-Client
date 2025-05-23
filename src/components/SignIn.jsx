import React, { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useTheme } from "../contexts/ThemeContext";

const MySwal = withReactContent(Swal);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const googleProvider = new GoogleAuthProvider();

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
            <FaUser className="text-green-600 dark:text-green-300 text-4xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome Back!
          </h2>
        </div>
      ),
      html: (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You've successfully signed in
            {isGoogle && " with Google"}
          </p>
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
            Redirecting to your desired destination...
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
            Welcome back, {user.displayName || user.email}!
          </p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-400"
            />
          )}
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

  const showResetSuccess = (email) => {
    MySwal.fire({
      title: (
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5 }}
            className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4"
          >
            <FaEnvelope className="text-blue-600 dark:text-blue-300 text-2xl" />
          </motion.div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Check Your Email
          </h2>
        </div>
      ),
      html: (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We've sent a password reset link to:
          </p>
          <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
            <p className="text-blue-700 dark:text-blue-300 font-medium">
              {email}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Didn't receive it? Check your spam folder.
          </p>
        </div>
      ),
      background: theme === "dark" ? "#1f2937" : "#ffffff",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const signInInfo = {
        uid: user.uid,
        email: user.email,
        lastSignInTime: user.metadata.lastSignInTime,
      };

      const updateResponse = await fetch(
        "https://the-gardener-s-hub-server.vercel.app/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInInfo),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.error || "Failed to update sign-in time");
      }

      showSuccessAlert(user);
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error.message);

      let errorMessage = error.message;
      if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "User not found";
      }

      MySwal.fire({
        title: (
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
              <FaLock className="text-red-600 dark:text-red-300 text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Sign-in Failed
            </h2>
          </div>
        ),
        html: (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">{errorMessage}</p>
          </div>
        ),
        background: theme === "dark" ? "#1f2937" : "#ffffff",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const updateResponse = await fetch(
        "https://the-gardener-s-hub-server.vercel.app/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            lastSignInTime: user.metadata.lastSignInTime,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update Google sign-in info");
      }

      showGoogleWelcome(user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);

      MySwal.fire({
        title: (
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
              <FaGoogle className="text-red-600 dark:text-red-300 text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Google Sign-in Failed
            </h2>
          </div>
        ),
        html: (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
          </div>
        ),
        background: theme === "dark" ? "#1f2937" : "#ffffff",
      });
    }
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    setError("");

    if (!email) {
      setError("Please enter your email first");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        showResetSuccess(email);
      })
      .catch((error) => {
        setError(error.message);
        MySwal.fire({
          title: (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                <FaEnvelope className="text-red-600 dark:text-red-300 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Reset Failed
              </h2>
            </div>
          ),
          html: (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                {error.message}
              </p>
            </div>
          ),
          background: theme === "dark" ? "#1f2937" : "#ffffff",
        });
      });
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
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-green-100 mt-2">Sign in to access your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-8 pt-6">
            <div
              className={`${
                theme === "dark"
                  ? "bg-red-900 text-red-100"
                  : "bg-red-100 text-red-700"
              } border-l-4 border-red-500 p-4`}
            >
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className={`flex items-center text-sm font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <FaEnvelope className="mr-2 text-green-500" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300 bg-white"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className={`flex items-center text-sm font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <FaLock className="mr-2 text-green-500" />
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-white"
                } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
                placeholder="••••••••"
                required
                minLength="6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }
                  />
                ) : (
                  <FaEye
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }
                  />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`h-4 w-4 text-green-600 focus:ring-green-500 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-white"
                } rounded`}
              />
              <label
                htmlFor="remember-me"
                className={`ml-2 block text-sm ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgetPassword}
              className={`text-sm ${
                theme === "dark"
                  ? "text-green-400 hover:text-green-300"
                  : "text-green-600 hover:text-green-500"
              }`}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } transition-colors shadow-md`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>

          {/* Divider */}
          <div className="relative">
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
                    ? "bg-gray-800 text-gray-300"
                    : "bg-white text-gray-500"
                }`}
              >
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="items-center flex justify-center">
            <motion.button
              whileHover={{ y: -2 }}
              type="button"
              onClick={handleGoogleLogin}
              className={`flex items-center justify-center py-2 px-4 rounded-lg transition cursor-pointer ${
                theme === "dark"
                  ? "border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white"
                  : "border border-green-300 bg-white hover:bg-gray-50"
              }`}
            >
              <FaGoogle className="text-red-500 mr-2" /> Login With Google
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
            Don't have an account?{" "}
            <a
              href="/signup"
              className={`font-medium ${
                theme === "dark"
                  ? "text-green-400 hover:text-green-300"
                  : "text-green-600 hover:text-green-500"
              }`}
            >
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
