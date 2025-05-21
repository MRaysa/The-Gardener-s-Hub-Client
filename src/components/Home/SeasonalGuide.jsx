import React, { useState } from "react";

const SeasonalGuide = () => {
  const [activeSeason, setActiveSeason] = useState("spring");

  const seasonalPlants = {
    spring: [
      {
        name: "Tomatoes",
        when: "After last frost",
        tip: "Start indoors 6-8 weeks before transplanting",
      },
      {
        name: "Lettuce",
        when: "Early spring",
        tip: "Can tolerate light frosts",
      },
      {
        name: "Peas",
        when: "As soon as soil can be worked",
        tip: "Direct sow for best results",
      },
    ],
    summer: [
      {
        name: "Beans",
        when: "When soil is warm",
        tip: "Bush varieties mature faster",
      },
      {
        name: "Cucumbers",
        when: "Late spring to early summer",
        tip: "Provide trellis for vertical growth",
      },
      {
        name: "Zucchini",
        when: "After frost danger passes",
        tip: "Only plant 1-2 plants per household",
      },
    ],
    fall: [
      {
        name: "Kale",
        when: "6-8 weeks before first frost",
        tip: "Flavor improves after frost",
      },
      {
        name: "Garlic",
        when: "4-6 weeks before ground freezes",
        tip: "Plant pointy end up",
      },
      {
        name: "Spinach",
        when: "Late summer to early fall",
        tip: "Harvest leaves when young",
      },
    ],
    winter: [
      {
        name: "Indoor Herbs",
        when: "Year-round",
        tip: "Use grow lights for best results",
      },
      { name: "Microgreens", when: "Year-round", tip: "Harvest in 10-14 days" },
      {
        name: "Planning",
        when: "Winter months",
        tip: "Sketch garden layouts for spring",
      },
    ],
  };

  return (
    <section className="py-12 px-4 bg-green-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-4">
          Seasonal Planting Guide
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          What to plant and when for optimal growth
        </p>

        <div className="flex justify-center mb-8 space-x-2">
          {["spring", "summer", "fall", "winter"].map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`px-4 py-2 rounded-full capitalize ${
                activeSeason === season
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-800 hover:bg-green-100"
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalPlants[activeSeason].map((plant, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {plant.name}
              </h3>
              <div className="mb-3">
                <span className="font-medium">When to plant:</span>
                <p className="text-gray-700">{plant.when}</p>
              </div>
              <div>
                <span className="font-medium">Expert tip:</span>
                <p className="text-gray-700">{plant.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalGuide;
