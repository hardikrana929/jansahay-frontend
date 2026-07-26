import { FaHeart, FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FavoriteCard = ({ favorite, onRemove }) => {
  const { t } = useTranslation();
  const scheme = favorite.scheme;

  if (!scheme) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
              {scheme.schemeType}
            </span>

            <h3 className="mt-3 text-xl font-bold text-gray-800 dark:text-gray-100">
              {scheme.title}
            </h3>
          </div>

          <button
            onClick={() => onRemove(scheme._id)}
            className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center"
          >
            <FaHeart className="text-red-500 text-lg" />
          </button>
        </div>

        <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
          {scheme.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full">
            {scheme.government}
          </span>

          <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full">
            {scheme.state}
          </span>
        </div>

        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
        >
          {t("common.officialWebsite")}
          <FaExternalLinkAlt size={13} />
        </a>
      </div>
    </div>
  );
};

export default FavoriteCard;
