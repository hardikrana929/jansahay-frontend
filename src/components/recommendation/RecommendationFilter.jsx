import { FaSearch, FaFilter } from "react-icons/fa";

const RecommendationFilter = ({ search, setSearch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <FaFilter className="text-blue-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Search</h2>
      </div>

      <div className="relative">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search recommended schemes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        
      </div>
    </div>
  );
};

export default RecommendationFilter;
