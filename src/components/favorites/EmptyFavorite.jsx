import { Link } from "react-router-dom";
import { FaHeartBroken, FaArrowRight } from "react-icons/fa";

const EmptyFavorite = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Icon */}

        <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center">
          <FaHeartBroken className="text-6xl text-red-500" />
        </div>

        {/* Title */}

        <h2 className="text-3xl font-bold text-gray-800 mt-8">
          No Favorite Schemes
        </h2>

        {/* Description */}

        <p className="text-gray-500 mt-4 max-w-xl leading-7">
          You haven't saved any government schemes yet. Browse available schemes
          and click the ❤️ icon to save them for quick access later.
        </p>

        {/* Button */}

        <Link
          to="/schemes"
          className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Browse Schemes
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default EmptyFavorite;
