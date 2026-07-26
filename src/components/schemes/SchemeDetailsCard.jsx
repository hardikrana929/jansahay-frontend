import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaFileAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUniversity,
  FaUserGraduate,
  FaWheelchair,
  FaCheckCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SchemeDetailsCard = ({ scheme }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-5 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold">{scheme.title}</h1>

        <p className="mt-2 text-blue-100">{scheme.description}</p>
      </div>

      {/* Body */}

      <div className="p-5 sm:p-8 space-y-8">
        {/* Basic Information */}

        <section>
          <h2 className="text-xl font-bold mb-5">
            {t("schemeDetails.basicInfo")}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <InfoRow
              icon={<FaUniversity />}
              label={t("schemes.governmentLabel")}
              value={scheme.government}
            />

            <InfoRow
              icon={<FaMapMarkerAlt />}
              label={t("profile.state")}
              value={scheme.state}
            />

            <InfoRow
              icon={<FaMoneyBillWave />}
              label={t("schemes.incomeLimit")}
              value={`₹${scheme.incomeLimit.toLocaleString()}`}
            />

            <InfoRow
              icon={<FaCalendarAlt />}
              label={t("schemes.ageRange")}
              value={`${scheme.minAge} - ${scheme.maxAge} ${t("schemeDetails.years")}`}
            />
          </div>
        </section>

        {/* Benefits */}

        <section>
          <h2 className="text-xl font-bold mb-4">
            {t("schemeDetails.benefits")}
          </h2>

          <div className="bg-green-50 border border-green-100 rounded-xl p-5">
            {scheme.benefits}
          </div>
        </section>

        {/* Eligibility */}

        <section>
          <h2 className="text-xl font-bold mb-5">
            {t("schemeDetails.eligibility")}
          </h2>

          <div className="space-y-4">
            <InfoRow
              icon={<FaUserGraduate />}
              label={t("schemeDetails.occupation")}
              value={
                scheme.eligibleOccupations?.length
                  ? scheme.eligibleOccupations.join(", ")
                  : t("schemeDetails.all")
              }
            />

            <InfoRow
              icon={<FaUniversity />}
              label={t("schemeDetails.category")}
              value={
                scheme.eligibleCategories?.length
                  ? scheme.eligibleCategories.join(", ")
                  : t("schemeDetails.all")
              }
            />

            <InfoRow
              icon={<FaWheelchair />}
              label={t("schemeDetails.disabilityRequired")}
              value={
                scheme.disabilityRequired
                  ? t("schemeDetails.yes")
                  : t("schemeDetails.no")
              }
            />
          </div>
        </section>

        {/* Documents */}

        <section>
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <FaFileAlt />
            {t("schemeDetails.documentsRequired")}
          </h2>

          {scheme.documentsRequired?.length ? (
            <ul className="space-y-3">
              {scheme.documentsRequired.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                >
                  <FaCheckCircle className="text-green-600" />

                  {doc}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">{t("schemeDetails.noDocuments")}</p>
          )}
        </section>

        {/* Deadline */}

        {scheme.applicationDeadline && (
          <section>
            <h2 className="text-xl font-bold mb-3">
              {t("schemeDetails.applicationDeadline")}
            </h2>

            <div className="bg-red-50 text-red-700 border border-red-100 rounded-lg p-4">
              {new Date(scheme.applicationDeadline).toLocaleDateString()}
            </div>
          </section>
        )}

        {/* Official Website */}

        <div className="pt-6 border-t">
          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            {t("schemeDetails.visitWebsite")}
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
    <div className="text-blue-600 text-xl mt-1">{icon}</div>

    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default SchemeDetailsCard;
