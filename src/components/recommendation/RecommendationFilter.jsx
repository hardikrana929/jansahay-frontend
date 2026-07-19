import { FaSearch, FaFilter } from "react-icons/fa";

const RecommendationFilter = ({
  search,
  setSearch,
  schemeType,
  setSchemeType,
  government,
  setGovernment,
  sort,
  setSort,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <FaFilter className="text-blue-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Search & Filter</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Search */}
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

        {/* Scheme Type */}
        <select
          value={schemeType}
          onChange={(e) => setSchemeType(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Categories</option>
          <option value="Education">Education</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Employment">Employment</option>
          <option value="Women">Women</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
          <option value="Housing">Housing</option>
          <option value="Pension">Pension</option>
          <option value="Other">Other</option>
        </select>

        {/* Government */}
        <select
          value={government}
          onChange={(e) => setGovernment(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Government</option>
          <option value="Central">Central Government</option>
          <option value="State">State Government</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default RecommendationFilter;
