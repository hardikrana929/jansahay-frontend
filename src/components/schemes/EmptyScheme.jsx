import { Link } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa";

const EmptyScheme = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
      <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
        <FaSearch className="text-blue-600 text-5xl" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mt-6">
        No Schemes Found
      </h2>

      <p className="text-gray-500 mt-3 max-w-lg mx-auto">
        We couldn't find any schemes matching your search or filter. Try
        changing the search keywords or selecting different filters.
      </p>

      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default EmptyScheme;
