import { FaBell, FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Topbar = ({ admin }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md px-4 sm:px-6 py-4 mb-8 border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left */}

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            {t("admin.dashboardTitle")}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t("admin.welcomeBack", {
              name: admin?.name || t("admin.administrator"),
            })}
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
          <button className="relative shrink-0">
            <FaBell className="text-2xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
              3
            </span>
          </button>

          <div className="flex items-center gap-3 min-w-0">
            <FaUserCircle className="text-4xl text-blue-600 dark:text-blue-400 shrink-0" />

            <div className="min-w-0">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                {admin?.name || t("admin.defaultName")}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {admin?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
