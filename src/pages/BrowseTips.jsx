import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaLeaf, FaFilter } from "react-icons/fa";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const navigate = useNavigate();

  // Difficulty options for the filter
  const difficultyOptions = ["All", "Easy", "Medium", "Hard"];

  useEffect(() => {
    const fetchPublicTips = async () => {
      try {
        const response = await fetch(
          "https://the-gardener-s-hub-server.vercel.app/tips/public"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tips");
        }
        const data = await response.json();
        setTips(data.data);
        setFilteredTips(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPublicTips();
  }, []);

  // Apply filter when difficultyFilter changes
  useEffect(() => {
    if (difficultyFilter === "All") {
      setFilteredTips(tips);
    } else {
      const filtered = tips.filter(
        (tip) => tip.difficulty === difficultyFilter
      );
      setFilteredTips(filtered);
    }
  }, [difficultyFilter, tips]);

  const handleViewDetails = (tipId) => {
    navigate(`/tips/${tipId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 flex items-center">
          <FaLeaf className="mr-2" /> Browse Gardening Tips
        </h1>

        {/* Difficulty Filter */}
        <div className="mt-4 md:mt-0 flex items-center">
          <FaFilter className="text-green-600 mr-2" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            {difficultyFilter === "All"
              ? "No gardening tips available yet."
              : `No ${difficultyFilter} difficulty tips found.`}
          </p>
          <p className="text-gray-400">
            {difficultyFilter !== "All" && (
              <button
                onClick={() => setDifficultyFilter("All")}
                className="text-green-600 hover:underline"
              >
                Show all tips instead
              </button>
            )}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plant Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTips.map((tip) => (
                <tr
                  key={tip._id}
                  className="hover:bg-green-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tip.imageUrl ? (
                      <img
                        src={tip.imageUrl}
                        alt={tip.title}
                        className="h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{tip.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tip.plantType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tip.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        tip.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : tip.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tip.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(tip._id)}
                      className="text-green-600 hover:text-green-900 flex items-center"
                    >
                      <FaEye className="mr-1" /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BrowseTips;
