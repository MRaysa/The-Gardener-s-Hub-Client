import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaHome, FaSearch, FaLeaf } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Illustration Header */}
        <div className="bg-green-600 p-8 text-center relative overflow-hidden">
          {/* Animated plant icon */}
          <div className="animate-bounce mb-8">
            <FaLeaf className="text-8xl text-white mx-auto" />
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-9xl text-white font-bold mb-4"
          >
            404
          </motion.div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-green-700 rounded-full opacity-20"></div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-green-500 rounded-full opacity-30"></div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Lost in the Garden?
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved. Maybe
            it's hiding among the flowers or got composted by mistake!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <FaHome /> Return Home
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <FaSearch /> Go Back
            </motion.button>
          </div>

          {/* Fun Gardening Tip */}
          <div className="mt-10 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-700 italic">
              "While you're here, did you know? Talking to plants helps them
              grow! Maybe whisper to your router too?"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
