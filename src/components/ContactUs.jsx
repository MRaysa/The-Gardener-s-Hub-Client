import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaLeaf,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const ContactUs = () => {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Theme-based styles
  const themeStyles = {
    light: {
      bg: "bg-gradient-to-b from-green-50 to-white",
      text: "text-gray-800",
      card: "bg-white",
      secondaryText: "text-gray-600",
      button: "bg-green-600 hover:bg-green-700 text-white",
      input: "bg-white border-gray-300 focus:border-green-500",
      accent: "text-green-600",
      mapFilter: "grayscale(0%) invert(0%)",
    },
    dark: {
      bg: "bg-gradient-to-b from-gray-900 to-gray-800",
      text: "text-gray-100",
      card: "bg-gray-800",
      secondaryText: "text-gray-300",
      button: "bg-green-700 hover:bg-green-600 text-white",
      input: "bg-gray-700 border-gray-600 focus:border-green-400",
      accent: "text-green-400",
      mapFilter: "grayscale(30%) invert(90%) hue-rotate(180deg)",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Our Location",
      description: "123 Garden Lane, Greenville, GT 12345",
    },
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Phone Number",
      description: "+1 (123) 456-7890",
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Address",
      description: "contact@gardenershub.com",
    },
  ];

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} transition-colors duration-300`}
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&auto=format&fit=crop&q=60')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 ${currentTheme.text}`}
            >
              Connect With <span className={currentTheme.accent}>Us</span>
            </h1>
            <p
              className={`text-xl ${currentTheme.secondaryText} max-w-2xl mx-auto`}
            >
              We're here to help your garden grow. Reach out anytime!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${currentTheme.card} rounded-3xl shadow-xl p-8 md:p-10`}
            >
              <h2 className={`text-2xl font-bold mb-8 ${currentTheme.text}`}>
                Send Us a Message
              </h2>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg ${
                    theme === "dark"
                      ? "bg-green-900 text-green-100"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className={`block mb-2 ${currentTheme.secondaryText}`}
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        currentTheme.input
                      } focus:outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "focus:ring-green-500"
                          : "focus:ring-green-600"
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className={`block mb-2 ${currentTheme.secondaryText}`}
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        currentTheme.input
                      } focus:outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "focus:ring-green-500"
                          : "focus:ring-green-600"
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className={`block mb-2 ${currentTheme.secondaryText}`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      currentTheme.input
                    } focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "focus:ring-green-500"
                        : "focus:ring-green-600"
                    }`}
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className={`${currentTheme.button} w-full py-4 rounded-full font-medium flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`${currentTheme.card} rounded-2xl shadow-lg p-6 flex items-start gap-4`}
                >
                  <div className={`p-3 rounded-full ${currentTheme.accent}`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold mb-1 ${currentTheme.text}`}
                    >
                      {method.title}
                    </h3>
                    <p className={currentTheme.secondaryText}>
                      {method.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Interactive Google Map */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`${currentTheme.card} rounded-2xl shadow-lg overflow-hidden`}
              >
                <div className="h-80 w-full relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.21520917933!2d-73.98784492401758!3d40.74844047138971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1712345678901"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: currentTheme.mapFilter,
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                  <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
                    <a
                      href="https://maps.google.com?q=123+Garden+Lane,+Greenville,+GT+12345"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1"
                    >
                      <FaMapMarkerAlt className="text-green-500" />
                      Open in Maps
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${currentTheme.text}`}>
                    Visit Our Garden Center
                  </h3>
                  <p className={currentTheme.secondaryText}>
                    Open Monday to Friday, 9am to 5pm. Weekends by appointment.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating theme toggle */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl ${
          theme === "dark" ? "bg-gray-700" : "bg-green-600"
        } text-white z-50`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </motion.button>
    </div>
  );
};

export default ContactUs;
