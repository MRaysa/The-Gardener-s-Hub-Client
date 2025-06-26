import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaLeaf,
  FaSeedling,
  FaUsers,
  FaAward,
  FaGlobe,
  FaHandsHelping,
  FaTree,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { Link } from "react-router";
const AboutUs = () => {
  const { theme, toggleTheme } = useTheme();

  // Theme-based styles
  const themeStyles = {
    light: {
      bg: "bg-gradient-to-b from-green-50 to-white",
      text: "text-gray-800",
      card: "bg-white",
      secondaryText: "text-gray-600",
      button: "bg-green-600 hover:bg-green-700 text-white",
      accent: "text-green-600",
      overlay: "bg-white/80",
    },
    dark: {
      bg: "bg-gradient-to-b from-gray-900 to-gray-800",
      text: "text-gray-100",
      card: "bg-gray-800",
      secondaryText: "text-gray-300",
      button: "bg-green-700 hover:bg-green-600 text-white",
      accent: "text-green-400",
      overlay: "bg-black/60",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Mst. Aysa Siddika Meem",
      role: "Lead Developer",
      bio: "Passionate about creating digital solutions for gardening enthusiasts.",
      image:
        "https://i.ibb.co/RGF77CJM/Whats-App-Image-2025-06-27-at-03-45-32-175eb817.jpg",
    },
    {
      id: 2,
      name: "Alex Johnson",
      role: "Horticulture Expert",
      bio: "10+ years experience in organic farming and urban gardening.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Community Manager",
      bio: "Connects gardeners worldwide and organizes community events.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
    },
  ];

  // Stats data
  const stats = [
    { value: "10K+", label: "Community Members", icon: <FaUsers /> },
    { value: "5K+", label: "Gardening Tips", icon: <FaLeaf /> },
    { value: "100+", label: "Expert Gardeners", icon: <FaSeedling /> },
    { value: "2020", label: "Established", icon: <FaAward /> },
    { value: "50+", label: "Countries", icon: <FaGlobe /> },
  ];

  // Values data
  const values = [
    {
      title: "Sustainability",
      description: "Promoting eco-friendly gardening practices",
      icon: <FaTree />,
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Community",
      description: "Building connections between gardeners",
      icon: <FaUsers />,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Education",
      description: "Sharing knowledge for all skill levels",
      icon: <FaHandsHelping />,
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} transition-colors duration-300`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4"
        >
          <FaLeaf className={`text-6xl ${currentTheme.accent} opacity-10`} />
        </motion.div>
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/3 right-1/3"
        >
          <FaSeedling
            className={`text-5xl ${currentTheme.accent} opacity-10`}
          />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1800&auto=format&fit=crop&q=60"
            alt="Garden background"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${currentTheme.overlay}`}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-8"
          >
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 ${currentTheme.text}`}
            >
              About{" "}
              <span className={currentTheme.accent}>The Gardener's Hub</span>
            </h1>
          </motion.div>
          <p
            className={`text-xl md:text-2xl ${currentTheme.secondaryText} max-w-3xl mx-auto`}
          >
            Where passion for gardening meets digital innovation
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${currentTheme.button} px-8 py-4 rounded-full font-medium text-lg shadow-lg`}
            >
              Explore Our Community
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg
            className={`w-8 h-8 ${currentTheme.accent}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${currentTheme.card} rounded-3xl shadow-2xl overflow-hidden`}
          >
            <div className="flex flex-col lg:flex-row">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="lg:w-1/2 h-96 lg:h-auto"
              >
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop&q=60"
                  alt="Gardening team"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="lg:w-1/2 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h2
                    className={`text-3xl md:text-4xl font-bold mb-6 ${currentTheme.text}`}
                  >
                    Our <span className={currentTheme.accent}>Journey</span>
                  </h2>
                  <p className={`${currentTheme.secondaryText} mb-4 text-lg`}>
                    Founded in 2020, The Gardener's Hub began as a small online
                    community for urban gardeners. What started as a passion
                    project has blossomed into a global platform connecting
                    thousands of plant enthusiasts.
                  </p>
                  <p className={`${currentTheme.secondaryText} mb-6 text-lg`}>
                    Our mission is to democratize gardening knowledge, making it
                    accessible to everyone regardless of their experience level
                    or living situation.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${currentTheme.button} px-6 py-3 rounded-full font-medium`}
                  >
                    Read Our Full Story
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${currentTheme.text}`}
            >
              By The <span className={currentTheme.accent}>Numbers</span>
            </h2>
            <p
              className={`${currentTheme.secondaryText} max-w-2xl mx-auto text-lg`}
            >
              Our impact in the gardening community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className={`${currentTheme.card} rounded-xl p-6 text-center shadow-lg`}
              >
                <div className={`text-4xl mb-3 ${currentTheme.accent}`}>
                  {stat.icon}
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${currentTheme.text}`}>
                  {stat.value}
                </h3>
                <p className={currentTheme.secondaryText}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${currentTheme.text}`}
            >
              Our Core <span className={currentTheme.accent}>Values</span>
            </h2>
            <p
              className={`${currentTheme.secondaryText} max-w-2xl mx-auto text-lg`}
            >
              Principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-2xl overflow-hidden shadow-xl h-96"
              >
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 ${currentTheme.overlay}`}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className={`text-4xl mb-4 ${currentTheme.accent}`}>
                    {value.icon}
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${currentTheme.text}`}
                  >
                    {value.title}
                  </h3>
                  <p className={currentTheme.secondaryText}>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${currentTheme.text}`}
            >
              Meet The <span className={currentTheme.accent}>Team</span>
            </h2>
            <p
              className={`${currentTheme.secondaryText} max-w-2xl mx-auto text-lg`}
            >
              The passionate individuals behind The Gardener's Hub
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`${currentTheme.card} rounded-xl overflow-hidden shadow-xl`}
              >
                <div className="relative h-80">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3
                    className={`text-2xl font-bold mb-1 ${currentTheme.text}`}
                  >
                    {member.name}
                  </h3>
                  <p className={`mb-3 ${currentTheme.accent}`}>{member.role}</p>
                  <p className={currentTheme.secondaryText}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${currentTheme.card} rounded-3xl shadow-2xl p-12 text-center`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${currentTheme.text}`}
            >
              Ready to Grow With Us?
            </h2>
            <p
              className={`${currentTheme.secondaryText} max-w-2xl mx-auto mb-8 text-lg`}
            >
              Join our community of passionate gardeners today and start sharing
              your knowledge!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${currentTheme.button} px-8 py-4 rounded-full font-medium text-lg cursor-pointer`}
                >
                  Sign Up Now
                </motion.button>
              </Link>
              <Link to="/explore-gardeners">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`border cursor-pointer ${
                    theme === "dark"
                      ? "border-green-400 text-green-400"
                      : "border-green-600 text-green-600"
                  } px-8 py-4 rounded-full font-medium text-lg`}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theme toggle floating button */}
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

export default AboutUs;
