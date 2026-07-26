import { Link } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const EmptyScheme = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-10 text-center transition-colors">
      <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
        <FaSearch className="text-blue-600 dark:text-blue-400 text-5xl" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-6">
        {t("schemes.notFoundTitle")}
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto">
        {t("schemes.notFoundDesc")}
      </p>

      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition"
      >
        <FaArrowLeft />
        {t("common.backToDashboard")}
      </Link>
    </div>
  );
};

export default EmptyScheme;
