import { Link } from "react-router-dom";
import { FaHeartBroken, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const EmptyFavorite = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-12 transition-colors">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Icon */}

        <div className="w-28 h-28 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
          <FaHeartBroken className="text-6xl text-red-500" />
        </div>

        {/* Title */}

        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-8">
          {t("favorites.notFoundTitle")}
        </h2>

        {/* Description */}

        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl leading-7">
          {t("favorites.notFoundDesc")}
        </p>

        {/* Button */}

        <Link
          to="/schemes"
          className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {t("favorites.browseSchemes")}
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default EmptyFavorite;
