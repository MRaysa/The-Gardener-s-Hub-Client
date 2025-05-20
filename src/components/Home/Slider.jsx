import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Typewriter from "typewriter-effect";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideContent = [
    {
      title: "Grow Together",
      description: "Join our community of passionate gardeners",
      cta: "Share Your Tips",
    },
    {
      title: "Urban Gardening",
      description: "Make the most of your small spaces",
      cta: "Learn Techniques",
    },
    {
      title: "Organic Harvest",
      description: "Discover chemical-free growing methods",
      cta: "Explore Recipes",
    },
    {
      title: "Seasonal Plants",
      description: "Find what to plant each season",
      cta: "View Calendar",
    },
    {
      title: "Sustainable Living",
      description: "Eco-friendly gardening practices",
      cta: "Join Movement",
    },
  ];

  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-green-700 to-teal-800 shadow-lg m-12">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/fdQGfQpp/img1.jpg')] bg-cover bg-center animate-pulse-slow"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        {/* Header with Typewriter */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
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
            rotate: 10,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: true,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {[
            "https://i.ibb.co/fdQGfQpp/img1.jpg",
            "https://i.ibb.co/1Gsp1xcB/img2.jpg",
            "https://i.ibb.co/hJL83kvS/img3.jpg",
            "https://i.ibb.co/tyVjVpj/img4.webp",
            "https://i.ibb.co/YBJ4x9TL/img5.jpg",
          ].map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative group">
                <img
                  src={img}
                  alt={`Gardening tip ${index + 1}`}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {slideContent[index].title}
                  </h3>
                  <p className="text-purple-100 mb-4">
                    {slideContent[index].description}
                  </p>
                  <button className="self-start px-4 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-100 transition-colors">
                    {slideContent[index].cta}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .mySwiper {
          width: 100%;
          padding: 20px 0 60px;
        }

        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 280px;
          height: 380px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .swiper-slide-active {
          transform: scale(1.05);
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
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
    </div>
  );
};
export default Slider;
