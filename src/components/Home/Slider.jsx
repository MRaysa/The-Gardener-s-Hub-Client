import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Typewriter from "typewriter-effect";
import { useTheme } from "../../contexts/ThemeContext";
import { FaLeaf, FaSeedling, FaTree, FaSun, FaRecycle } from "react-icons/fa";
import { motion } from "framer-motion";
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
      icon: <FaLeaf className="text-4xl" />,
      color: "from-emerald-600 to-teal-700",
    },
    {
      title: "Urban Gardening",
      description: "Make the most of your small spaces",
      cta: "Learn Techniques",
      icon: <FaSeedling className="text-4xl" />,
      color: "from-amber-600 to-orange-600",
    },
    {
      title: "Organic Harvest",
      description: "Discover chemical-free growing methods",
      cta: "Explore Recipes",
      icon: <FaTree className="text-4xl" />,
      color: "from-lime-600 to-green-700",
    },
    {
      title: "Seasonal Plants",
      description: "Find what to plant each season",
      cta: "View Calendar",
      icon: <FaSun className="text-4xl" />,
      color: "from-sky-600 to-blue-700",
    },
    {
      title: "Sustainable Living",
      description: "Eco-friendly gardening practices",
      cta: "Join Movement",
      icon: <FaRecycle className="text-4xl" />,
      color: "from-violet-600 to-purple-700",
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
      bg: "bg-gradient-to-br from-gray-900 to-gray-800",
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
      className={`relative rounded-3xl overflow-hidden shadow-2xl m-4 md:m-8 ${currentTheme.bg}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/fdQGfQpp/img1.jpg')] bg-cover bg-center animate-pulse-slow"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `rgba(255,255,255,${Math.random() * 0.1})`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        {/* Header with Typewriter */}
        <div className="text-center mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-200">
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
            className={`text-xl ${currentTheme.secondaryText} max-w-2xl mx-auto`}
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
          {[
            "https://i.ibb.co/fdQGfQpp/img1.jpg",
            "https://i.ibb.co/qMDR2cpN/2.jpg",
            "https://i.ibb.co/hJL83kvS/img3.jpg",
            "https://i.ibb.co/tyVjVpj/img4.webp",
            "https://i.ibb.co/YBJ4x9TL/img5.jpg",
          ].map((img, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="relative group h-full"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={img}
                  alt={`Gardening tip ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    slideContent[index].color
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
                    {slideContent[index].icon}
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ y: 20 }}
                    animate={{ y: activeIndex === index ? 0 : 20 }}
                  >
                    {slideContent[index].title}
                  </motion.h3>
                  <motion.p
                    className={`${currentTheme.secondaryText} mb-4`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  >
                    {slideContent[index].description}
                  </motion.p>
                  <motion.button
                    className={`self-start px-6 py-2 rounded-full font-medium transition-all ${currentTheme.button} shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slideContent[index].cta}
                  </motion.button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {slideContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-green-400 w-6"
                  : theme === "dark"
                  ? "bg-gray-500"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .mySwiper {
          width: 100%;
          padding: 40px 0 80px;
        }

        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          height: 450px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .swiper-slide-active {
          transform: scale(1.08);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
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
