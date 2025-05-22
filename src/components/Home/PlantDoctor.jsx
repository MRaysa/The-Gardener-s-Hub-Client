import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaLeaf, FaTint, FaSun, FaBug, FaRedo } from "react-icons/fa";

const PlantDoctor = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [diagnosis, setDiagnosis] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What's happening with your plant?",
      options: [
        {
          id: "yellow",
          label: "Yellowing leaves",
          icon: <FaLeaf className="text-yellow-500 text-3xl" />,
          color: "bg-yellow-100",
        },
        {
          id: "spots",
          label: "Spots on leaves",
          icon: <FaBug className="text-red-500 text-3xl" />,
          color: "bg-red-100",
        },
        {
          id: "droop",
          label: "Drooping/wilting",
          icon: "🥀",
          color: "bg-purple-100",
        },
        {
          id: "growth",
          label: "Stunted growth",
          icon: "📏",
          color: "bg-blue-100",
        },
      ],
    },
    {
      id: 2,
      question: "How often do you water?",
      options: [
        {
          id: "daily",
          label: "Daily",
          icon: <FaTint className="text-blue-500 text-3xl" />,
          color: "bg-blue-100",
        },
        {
          id: "weekly",
          label: "Weekly",
          icon: "📅",
          color: "bg-green-100",
        },
        {
          id: "biweekly",
          label: "Every 2 weeks",
          icon: "🗓️",
          color: "bg-teal-100",
        },
        {
          id: "random",
          label: "When I remember",
          icon: "🤔",
          color: "bg-gray-100",
        },
      ],
    },
    {
      id: 3,
      question: "How much sunlight does it get?",
      options: [
        {
          id: "direct",
          label: "6+ hours direct",
          icon: <FaSun className="text-yellow-500 text-3xl" />,
          color: "bg-yellow-100",
        },
        {
          id: "indirect",
          label: "Bright indirect",
          icon: "⛅",
          color: "bg-orange-100",
        },
        {
          id: "low",
          label: "Low light",
          icon: "🌑",
          color: "bg-indigo-100",
        },
        {
          id: "artificial",
          label: "Artificial light",
          icon: "💡",
          color: "bg-pink-100",
        },
      ],
    },
  ];

  const diagnoses = {
    overwater: {
      title: "Overwatering",
      solution:
        "Reduce watering frequency and ensure proper drainage. Let soil dry between waterings.",
      image: "https://i.ibb.co/pjVd55V6/r.jpg",
      icon: <FaTint className="text-blue-500 text-5xl mb-4" />,
      color: "bg-blue-50",
    },
    underwater: {
      title: "Underwatering",
      solution:
        "Water more frequently and thoroughly until water drains from the bottom. Consider self-watering pots.",
      image: "https://i.ibb.co/1fDrdjjd/www.jpg",
      icon: "💧",
      color: "bg-blue-50",
    },
    fungus: {
      title: "Fungal Infection",
      solution:
        "Remove affected leaves, improve air circulation, and apply organic fungicide like neem oil.",
      image: "https://i.ibb.co/hJBwTwmh/ne.jpg",
      icon: <FaBug className="text-red-500 text-5xl mb-4" />,
      color: "bg-red-50",
    },
    light: {
      title: "Incorrect Lighting",
      solution:
        "Move plant to better suited location based on its light requirements. Consider grow lights if needed.",
      image: "https://i.ibb.co/Vp5SYB9s/l.webp",
      icon: <FaSun className="text-yellow-500 text-5xl mb-4" />,
      color: "bg-yellow-50",
    },
  };

  const handleAnswer = (questionId, answerId) => {
    setSelectedOption(answerId);
    setTimeout(() => {
      setAnswers({ ...answers, [questionId]: answerId });
      setSelectedOption(null);
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
    }, 500);
  };

  const restartDiagnosis = () => {
    setStep(1);
    setAnswers({});
    setDiagnosis(null);
  };

  return (
    <section
      className={`py-16 px-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } md:m-8 rounded-2xl`}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl font-bold mb-3 ${
              theme === "dark" ? "text-green-300" : "text-green-800"
            }`}
          >
            🌱 Plant Doctor
          </h2>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Diagnose plant problems with our interactive tool
          </p>
        </motion.div>

        <div
          className={`rounded-2xl p-8 ${
            theme === "dark"
              ? "bg-gray-700 shadow-lg"
              : "bg-green-50 shadow-inner"
          }`}
        >
          {!diagnosis ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {questions.map((q, i) => (
                    <motion.div
                      key={q.id}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        step > i
                          ? theme === "dark"
                            ? "bg-green-400"
                            : "bg-green-600"
                          : step === i + 1
                          ? theme === "dark"
                            ? "bg-green-300"
                            : "bg-green-400"
                          : theme === "dark"
                          ? "bg-gray-500"
                          : "bg-gray-200"
                      }`}
                      style={{ width: `${100 / questions.length}%` }}
                    />
                  ))}
                </div>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } text-right`}
                >
                  Question {step} of {questions.length}
                </p>
              </div>

              <motion.h3
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-2xl font-semibold text-center mb-8 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {questions[step - 1].question}
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[step - 1].options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleAnswer(questions[step - 1].id, option.id)
                    }
                    className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center ${
                      theme === "dark"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : option.color
                    } ${
                      selectedOption === option.id
                        ? "ring-2 ring-green-500"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={
                        selectedOption === option.id
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                      className="mb-3"
                    >
                      {option.icon}
                    </motion.div>
                    <span
                      className={`text-lg font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div
                className={`rounded-xl p-6 shadow-md mb-8 ${
                  theme === "dark" ? "bg-gray-600" : diagnosis.color
                }`}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {diagnosis.icon}
                </motion.div>
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    theme === "dark" ? "text-white" : "text-green-700"
                  }`}
                >
                  Diagnosis: {diagnosis.title}
                </h3>
                <img
                  src={diagnosis.image}
                  alt={diagnosis.title}
                  className="w-full h-48 object-cover rounded-lg mb-6 mx-auto"
                />
                <p
                  className={`text-lg mb-6 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {diagnosis.solution}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restartDiagnosis}
                  className={`px-6 py-3 rounded-full transition-colors flex items-center mx-auto ${
                    theme === "dark"
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-green-700 hover:bg-green-800 text-white"
                  }`}
                >
                  <FaRedo className="mr-2" />
                  Diagnose Another Plant
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlantDoctor;
