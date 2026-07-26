import { Link } from "react-router-dom";
import { FaArrowRight, FaFileAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const RecentSchemeCard = ({ scheme }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <FaFileAlt size={24} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {scheme.title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {scheme.schemeType}
          </p>
        </div>
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">
        {scheme.description}
      </p>

      <Link
        to={`/schemes/${scheme._id}`}
        className="mt-5 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
      >
        {t("dashboard.viewSchemes")}
        <FaArrowRight />
      </Link>
    </div>
  );
};

export default RecentSchemeCard;
