import React, { useState } from "react";

const PlantDoctor = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [diagnosis, setDiagnosis] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What's happening with your plant?",
      options: [
        { id: "yellow", label: "Yellowing leaves", icon: "🍂" },
        { id: "spots", label: "Spots on leaves", icon: "🔴" },
        { id: "droop", label: "Drooping/wilting", icon: "🥀" },
        { id: "growth", label: "Stunted growth", icon: "📏" },
      ],
    },
    {
      id: 2,
      question: "How often do you water?",
      options: [
        { id: "daily", label: "Daily", icon: "💧" },
        { id: "weekly", label: "Weekly", icon: "📅" },
        { id: "biweekly", label: "Every 2 weeks", icon: "🗓️" },
        { id: "random", label: "When I remember", icon: "🤔" },
      ],
    },
    {
      id: 3,
      question: "How much sunlight does it get?",
      options: [
        { id: "direct", label: "6+ hours direct", icon: "☀️" },
        { id: "indirect", label: "Bright indirect", icon: "⛅" },
        { id: "low", label: "Low light", icon: "🌑" },
        { id: "artificial", label: "Artificial light", icon: "💡" },
      ],
    },
  ];

  const diagnoses = {
    overwater: {
      title: "Overwatering",
      solution:
        "Reduce watering frequency and ensure proper drainage. Let soil dry between waterings.",
      image: "https://i.ibb.co/pjVd55V6/r.jpg",
    },
    underwater: {
      title: "Underwatering",
      solution:
        "Water more frequently and thoroughly until water drains from the bottom. Consider self-watering pots.",
      image: "https://i.ibb.co/1fDrdjjd/www.jpg",
    },
    fungus: {
      title: "Fungal Infection",
      solution:
        "Remove affected leaves, improve air circulation, and apply organic fungicide like neem oil.",
      image: "https://i.ibb.co/hJBwTwmh/ne.jpg",
    },
    light: {
      title: "Incorrect Lighting",
      solution:
        "Move plant to better suited location based on its light requirements. Consider grow lights if needed.",
      image: "https://i.ibb.co/Vp5SYB9s/l.webp",
    },
  };

  const handleAnswer = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId });
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // Simple diagnostic logic
      if (answers[1] === "yellow" && answers[2] === "daily") {
        setDiagnosis(diagnoses.overwater);
      } else if (answers[1] === "droop" && answers[2] === "random") {
        setDiagnosis(diagnoses.underwater);
      } else if (answers[1] === "spots") {
        setDiagnosis(diagnoses.fungus);
      } else {
        setDiagnosis(diagnoses.light);
      }
    }
  };

  const restartDiagnosis = () => {
    setStep(1);
    setAnswers({});
    setDiagnosis(null);
  };

  return (
    <section className="py-16 px-4 bg-white md:m-8 rounded-2xl ">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-3">
            Plant Doctor
          </h2>
          <p className="text-xl text-gray-600">
            Diagnose plant problems with our interactive tool
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-8 shadow-inner">
          {!diagnosis ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {questions.map((q, i) => (
                    <div
                      key={q.id}
                      className={`h-2 rounded-full ${
                        step > i
                          ? "bg-green-600"
                          : step === i + 1
                          ? "bg-green-400"
                          : "bg-gray-200"
                      }`}
                      style={{ width: `${100 / questions.length}%` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-right">
                  Question {step} of {questions.length}
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                {questions[step - 1].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[step - 1].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleAnswer(questions[step - 1].id, option.id)
                    }
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center"
                  >
                    <span className="text-2xl mr-4">{option.icon}</span>
                    <span className="text-lg font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Diagnosis: {diagnosis.title}
                </h3>
                <img
                  src={diagnosis.image}
                  alt={diagnosis.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <p className="text-lg text-gray-700 mb-6">
                  {diagnosis.solution}
                </p>
                <button
                  onClick={restartDiagnosis}
                  className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-colors"
                >
                  Diagnose Another Plant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlantDoctor;
