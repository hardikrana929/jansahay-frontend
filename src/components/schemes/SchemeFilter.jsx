import { FaSearch, FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SchemeFilter = ({
  search,
  setSearch,
  schemeType,
  setSchemeType,
  government,
  setGovernment,
  sort,
  setSort,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <FaFilter className="text-blue-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">{t("common.filter")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Search */}

        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder={t("schemes.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Scheme Type */}

        <select
          value={schemeType}
          onChange={(e) => setSchemeType(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">{t("common.allCategories")}</option>

          <option value="Education">{t("schemeCategories.education")}</option>

          <option value="Agriculture">{t("schemeCategories.agriculture")}</option>

          <option value="Employment">{t("schemeCategories.employment")}</option>

          <option value="Women">{t("schemeCategories.women")}</option>

          <option value="Health">{t("schemeCategories.health")}</option>

          <option value="Business">{t("schemeCategories.business")}</option>

          <option value="Housing">{t("schemeCategories.housing")}</option>

          <option value="Pension">{t("schemeCategories.pension")}</option>

          <option value="Other">{t("schemeCategories.other")}</option>
        </select>

        {/* Government */}

        <select
          value={government}
          onChange={(e) => setGovernment(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">{t("common.allGovernment")}</option>

          <option value="Central">{t("common.central")}</option>

          <option value="State">{t("common.state")}</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="latest">{t("common.latestFirst")}</option>
          <option value="oldest">{t("common.oldestFirst")}</option>
        </select>
      </div>
    </div>
  );
};

export default SchemeFilter;