import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaExclamationTriangle,
  FaHome,
  FaSearch,
  FaArrowLeft,
  FaHandsHelping,
} from "react-icons/fa";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-6 transition-colors">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-green-600 dark:from-blue-900 dark:to-green-800 p-8 text-center text-white transition-colors">
          <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <FaHandsHelping className="text-5xl text-blue-700 dark:text-blue-400" />
          </div>

          <h1 className="text-7xl font-extrabold mt-6">
            {t("notFound.title")}
          </h1>

          <p className="text-2xl font-semibold mt-2">
            {t("notFound.subtitle")}
          </p>

          <p className="text-blue-100 dark:text-blue-200 mt-3 max-w-xl mx-auto">
            {t("notFound.description")}
          </p>
        </div>
        {/* Body */}
        <div className="p-10">
          <div className="flex justify-center mb-8">
            <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 p-5 rounded-full">
              <FaExclamationTriangle size={45} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-700">
              <FaSearch className="mx-auto text-blue-600 dark:text-blue-400 text-3xl mb-3" />
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                {t("notFound.browseTitle")}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {t("notFound.browseDesc")}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-700">
              <FaHandsHelping className="mx-auto text-green-600 dark:text-green-400 text-3xl mb-3" />
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                {t("notFound.recommendTitle")}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {t("notFound.recommendDesc")}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 text-center border border-gray-200 dark:border-gray-700">
              <FaHome className="mx-auto text-purple-600 dark:text-purple-400 text-3xl mb-3" />
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                {t("notFound.homeTitle")}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {t("notFound.homeDesc")}
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
            >
              <FaHome />
              {t("notFound.goToDashboard")}
            </Link>

            <Link
              to="/schemes"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
            >
              <FaSearch />
              {t("notFound.browseSchemesBtn")}
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-semibold transition duration-300"
            >
              <FaArrowLeft />
              {t("notFound.goBack")}
            </button>
          </div>

          <div className="mt-10 text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} JanSahay • {t("loader.subtitle")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
