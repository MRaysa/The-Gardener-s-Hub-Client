import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Typewriter from "typewriter-effect";
import { useTheme } from "../../contexts/ThemeContext";
import { FaLeaf, FaSeedling, FaTree, FaSun, FaRecycle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  const slideContent = [
    {
      title: "Grow Together",
      description: "Join our community of passionate gardeners",
      cta: "Share Your Tips",
      ctaLink: "/share-tip", // Added route
      icon: <FaLeaf className="text-4xl" />,
      color: "from-emerald-600 to-teal-700",
      image: "https://i.ibb.co/fdQGfQpp/img1.jpg",
    },
    {
      title: "Urban Gardening",
      description: "Make the most of your small spaces",
      cta: "Learn Techniques",
      ctaLink: "/browse-tips?category=urban", // Added route with query
      icon: <FaSeedling className="text-4xl" />,
      color: "from-amber-600 to-orange-600",
      image: "https://i.ibb.co/qMDR2cpN/2.jpg",
    },
    {
      title: "Organic Harvest",
      description: "Discover chemical-free growing methods",
      cta: "Explore Recipes",
      ctaLink: "/browse-tips?category=organic", // Added route with query
      icon: <FaTree className="text-4xl" />,
      color: "from-lime-600 to-green-700",
      image: "https://i.ibb.co/hJL83kvS/img3.jpg",
    },
    {
      title: "Seasonal Plants",
      description: "Find what to plant each season",
      cta: "View Calendar",
      ctaLink: "/seasonal-guide", // Added route
      icon: <FaSun className="text-4xl" />,
      color: "from-sky-600 to-blue-700",
      image: "https://i.ibb.co/tyVjVpj/img4.webp",
    },
    {
      title: "Sustainable Living",
      description: "Eco-friendly gardening practices",
      cta: "Join Movement",
      ctaLink: "/community", // Added route
      icon: <FaRecycle className="text-4xl" />,
      color: "from-violet-600 to-purple-700",
      image: "https://i.ibb.co/YBJ4x9TL/img5.jpg",
    },
  ];

  const themeStyles = {
    light: {
      bg: "bg-gradient-to-br from-green-700 to-teal-800",
      text: "text-white",
      secondaryText: "text-purple-100",
      button: "bg-white text-purple-600 hover:bg-purple-100",
    },
    dark: {
      bg: "bg-gradient-to-br from-gray-800 to-gray-800",
      text: "text-white",
      secondaryText: "text-gray-300",
      button: "bg-green-600 text-white hover:bg-green-700",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative overflow-hidden shadow-2xl ${currentTheme.bg}`}
      style={{ height: "65vh", maxHeight: "650px" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/fdQGfQpp/img1.jpg')] bg-cover bg-center animate-pulse-slow"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Header with Typewriter */}
        <div className="text-center mb-4 sm:mb-6">
          <motion.div whileHover={{ scale: 1.02 }} className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-200">
              <Typewriter
                options={{
                  strings: slideContent.map((item) => item.title),
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </h2>
          </motion.div>
          <p
            className={`text-lg md:text-xl ${currentTheme.secondaryText} max-w-2xl mx-auto`}
          >
            <Typewriter
              options={{
                strings: slideContent.map((item) => item.description),
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
              }}
            />
          </p>
        </div>

        {/* Enhanced Swiper */}
        <div className="w-full h-2/3 flex items-center">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 300,
              modifier: 1.8,
              slideShadows: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
            style={{
              "--swiper-pagination-color":
                theme === "dark" ? "#10B981" : "#FFFFFF",
              "--swiper-pagination-bullet-inactive-color":
                theme === "dark" ? "#6B7280" : "#A5B4FC",
            }}
          >
            {slideContent.map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      slide.color
                    } via-transparent to-transparent flex flex-col justify-end p-6 transition-all duration-500 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <motion.div
                      className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full"
                      animate={
                        activeIndex === index ? { rotate: 360 } : { rotate: 0 }
                      }
                      transition={{ duration: 1 }}
                    >
                      {slide.icon}
                    </motion.div>
                    <motion.h3
                      className="text-xl md:text-2xl font-bold text-white mb-2"
                      initial={{ y: 20 }}
                      animate={{ y: activeIndex === index ? 0 : 20 }}
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p
                      className={`${currentTheme.secondaryText} mb-4 text-sm md:text-base`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    >
                      {slide.description}
                    </motion.p>
                    <Link to={slide.ctaLink}>
                      <motion.button
                        className={` cursor-pointer self-start px-4 py-1 md:px-6 md:py-2 rounded-full font-medium transition-all ${currentTheme.button} shadow-lg text-sm md:text-base`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {slide.cta}
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Pagination Indicators */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
          {slideContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-green-400 sm:w-6"
                  : theme === "dark"
                  ? "bg-gray-500"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .mySwiper {
          width: 100%;
          padding: 20px 0 40px;
        }

        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 280px;
          height: 280px;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .swiper-slide-active {
          transform: scale(1.08);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 640px) {
          .swiper-slide {
            width: 320px;
            height: 320px;
          }
        }

        @media (min-width: 768px) {
          .swiper-slide {
            width: 350px;
            height: 350px;
          }
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .swiper-slide-active img {
          transform: scale(1.05);
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default Slider;
