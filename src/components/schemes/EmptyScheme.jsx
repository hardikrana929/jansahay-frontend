import { Link } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const EmptyScheme = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
      <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
        <FaSearch className="text-blue-600 text-5xl" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mt-6">
        {t("schemes.notFoundTitle")}
      </h2>

      <p className="text-gray-500 mt-3 max-w-lg mx-auto">
        {t("schemes.notFoundDesc")}
      </p>

      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
      >
        <FaArrowLeft />
        {t("common.backToDashboard")}
      </Link>
    </div>
  );
};

export default EmptyScheme;
