import { Link } from "react-router-dom";
import { FaSearch, FaUserEdit } from "react-icons/fa";

const EmptyRecommendation = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
        <FaSearch className="text-blue-600 text-5xl" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mt-6">
        No Matching Schemes Found
      </h2>

      <p className="text-gray-500 mt-4 max-w-xl mx-auto">
        We couldn't find any government schemes matching your current profile.
        Update your profile information to receive more accurate
        recommendations.
      </p>

      <Link
        to="/profile"
        className="inline-flex items-center gap-3 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-300"
      >
        <FaUserEdit />
        Update Profile
      </Link>
    </div>
  );
};

export default EmptyRecommendation;
