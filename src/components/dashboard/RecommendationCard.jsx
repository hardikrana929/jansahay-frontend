import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const RecommendationCard = ({ scheme }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-800">{scheme.title}</h2>

        <FaHeart className="text-red-500 cursor-pointer" />
      </div>

      <p className="text-gray-600 mt-4 line-clamp-3">{scheme.description}</p>

      <div className="flex flex-wrap gap-3 mt-5">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {scheme.categorys}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <FaMapMarkerAlt />
          {scheme.state || "India"}
        </span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link
          to={`/schemes/${scheme._id}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          View Details
        </Link>

        {scheme.officialLink && (
          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noreferrer"
            className="text-green-600"
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
