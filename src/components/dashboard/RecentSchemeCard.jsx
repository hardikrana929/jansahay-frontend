import { Link } from "react-router-dom";
import { FaArrowRight, FaFileAlt } from "react-icons/fa";

const RecentSchemeCard = ({ scheme }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <FaFileAlt size={24} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">{scheme.title}</h2>

          <p className="text-gray-500 text-sm">{scheme.schemeType}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-600 line-clamp-2">{scheme.description}</p>

      <Link
        to={`/schemes/${scheme._id}`}
        className="mt-5 inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
      >
        View Scheme
        <FaArrowRight />
      </Link>
    </div>
  );
};

export default RecentSchemeCard;
