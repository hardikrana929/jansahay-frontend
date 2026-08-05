import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const RecommendationCard = ({ scheme }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {scheme.title}
        </h2>

        <FaHeart className="text-red-500 cursor-pointer" />
      </div>

      <p className="text-gray-600 dark:text-gray-300 mt-4 line-clamp-3">
        {scheme.description}
      </p>

      <div className="flex flex-wrap gap-3 mt-5">
        {/* <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
          {scheme.category}          
        </span> */}

        <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <FaMapMarkerAlt />
          {scheme.state || t("common.india")}
        </span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link
          to={`/schemes/${scheme._id}`}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          {t("common.viewDetails")}
        </Link>

        {scheme.officialLink && (
          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noreferrer"
            className="text-green-600 dark:text-green-400"
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
