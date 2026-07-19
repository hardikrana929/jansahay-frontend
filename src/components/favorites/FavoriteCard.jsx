import { FaHeart, FaExternalLinkAlt } from "react-icons/fa";

const FavoriteCard = ({ favorite, onRemove }) => {
  const scheme = favorite.scheme;

  if (!scheme) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              {scheme.schemeType}
            </span>

            <h3 className="mt-3 text-xl font-bold text-gray-800">
              {scheme.title}
            </h3>
          </div>

          <button
            onClick={() => onRemove(scheme._id)}
            className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"
          >
            <FaHeart className="text-red-500 text-lg" />
          </button>
        </div>

        <p className="mt-4 text-gray-600 line-clamp-3">{scheme.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
            {scheme.government}
          </span>

          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
            {scheme.state}
          </span>
        </div>

        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          Official Website
          <FaExternalLinkAlt size={13} />
        </a>
      </div>
    </div>
  );
};

export default FavoriteCard;
