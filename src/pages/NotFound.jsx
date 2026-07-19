import { Link } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaHome,
  FaSearch,
  FaArrowLeft,
  FaHandsHelping,
} from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-green-600 p-8 text-center text-white">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
            <FaHandsHelping className="text-5xl text-blue-700" />
          </div>

          <h1 className="text-7xl font-extrabold mt-6">404</h1>

          <p className="text-2xl font-semibold mt-2">Page Not Found</p>

          <p className="text-blue-100 mt-3 max-w-xl mx-auto">
            The page you're looking for doesn't exist or may have been moved.
            Let's help you get back to finding the right government schemes.
          </p>
        </div>

        {/* Body */}
        <div className="p-10">
          <div className="flex justify-center mb-8">
            <div className="bg-red-100 text-red-600 p-5 rounded-full">
              <FaExclamationTriangle size={45} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-blue-50 rounded-xl p-5 text-center border">
              <FaSearch className="mx-auto text-blue-600 text-3xl mb-3" />
              <h3 className="font-bold text-gray-800">Browse Schemes</h3>

              <p className="text-gray-500 text-sm mt-2">
                Explore Central and State Government schemes.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 text-center border">
              <FaHandsHelping className="mx-auto text-green-600 text-3xl mb-3" />
              <h3 className="font-bold text-gray-800">Smart Recommendations</h3>

              <p className="text-gray-500 text-sm mt-2">
                Discover schemes based on your eligibility profile.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 text-center border">
              <FaHome className="mx-auto text-purple-600 text-3xl mb-3" />
              <h3 className="font-bold text-gray-800">Return Home</h3>

              <p className="text-gray-500 text-sm mt-2">
                Continue using JanSahay without interruption.
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
            >
              <FaHome />
              Go to Dashboard
            </Link>

            <Link
              to="/schemes"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
            >
              <FaSearch />
              Browse Schemes
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold transition duration-300"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>

          <div className="mt-10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} JanSahay • Smart Government Scheme
            Recommendation System
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
