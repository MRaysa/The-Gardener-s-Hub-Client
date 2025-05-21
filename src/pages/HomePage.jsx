import React from "react";
import Slider from "../components/Home/Slider";
import Typewriter from "typewriter-effect";
import ActiveGardeners from "../components/Home/ActiveGardeners";
import TopTrendingTips from "../components/Home/TopTreandingTips";
import SeasonalGuide from "../components/Home/SeasonalGuide";
import PlantDoctor from "../components/Home/PlantDoctor";
const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-indigo-50 min-h-screen">
      <Slider />
      <ActiveGardeners />
      <TopTrendingTips></TopTrendingTips>
      <SeasonalGuide />
      <PlantDoctor />
    </div>
  );
};

export default HomePage;
