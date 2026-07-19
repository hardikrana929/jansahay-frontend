import { Link } from "react-router-dom";
import {
  FaHeart,
  FaExternalLinkAlt,
  FaArrowRight,
  FaMapMarkerAlt,
  FaUniversity,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTrashAlt,
} from "react-icons/fa";

const FavoriteCard = ({ favorite, onRemove }) => {
  const scheme = favorite.scheme;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{scheme.title}</h2>

            <p className="text-blue-100 text-sm mt-1">{scheme.schemeType}</p>
          </div>

          <FaHeart className="text-red-300 text-2xl" />
        </div>
      </div>

      {/* Body */}

      <div className="p-5">
        <p className="text-gray-600 leading-7 line-clamp-3">
          {scheme.description}
        </p>

        {/* Badges */}

        <div className="flex flex-wrap gap-2 mt-5">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {scheme.schemeType}
          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            {scheme.government}
          </span>

          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            {scheme.state}
          </span>
        </div>

        {/* Details */}

        <div className="space-y-3 mt-6">
          <div className="flex items-center gap-2 text-sm">
            <FaMoneyBillWave className="text-green-600" />

            <span>
              Income Limit :
              <strong> ₹{scheme.incomeLimit.toLocaleString()}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FaCalendarAlt className="text-orange-500" />

            <span>
              Age :
              <strong>
                {" "}
                {scheme.minAge} - {scheme.maxAge}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-red-500" />

            <span>{scheme.state}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FaUniversity className="text-indigo-500" />

            <span>{scheme.government} Government</span>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="border-t p-5 space-y-3">
        <div className="flex gap-3">
          <Link
            to={`/schemes/${scheme._id}`}
            className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            View Details
            <FaArrowRight />
          </Link>

          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg transition"
          >
            Official Website
            <FaExternalLinkAlt />
          </a>
        </div>

        <button
          onClick={() => onRemove(scheme._id)}
          className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          <FaTrashAlt />
          Remove Favorite
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;
