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

const SchemeDetailsCard = ({ scheme }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-8">
        <h1 className="text-3xl font-bold">{scheme.title}</h1>

        <p className="mt-2 text-blue-100">{scheme.description}</p>
      </div>

      {/* Body */}

      <div className="p-8 space-y-8">
        {/* Basic Information */}

        <section>
          <h2 className="text-xl font-bold mb-5">Basic Information</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <InfoRow
              icon={<FaUniversity />}
              label="Government"
              value={scheme.government}
            />

            <InfoRow
              icon={<FaMapMarkerAlt />}
              label="State"
              value={scheme.state}
            />

            <InfoRow
              icon={<FaMoneyBillWave />}
              label="Income Limit"
              value={`₹${scheme.incomeLimit.toLocaleString()}`}
            />

            <InfoRow
              icon={<FaCalendarAlt />}
              label="Age"
              value={`${scheme.minAge} - ${scheme.maxAge} Years`}
            />
          </div>
        </section>

        {/* Benefits */}

        <section>
          <h2 className="text-xl font-bold mb-4">Benefits</h2>

          <div className="bg-green-50 border border-green-100 rounded-xl p-5">
            {scheme.benefits}
          </div>
        </section>

        {/* Eligibility */}

        <section>
          <h2 className="text-xl font-bold mb-5">Eligibility</h2>

          <div className="space-y-4">
            <InfoRow
              icon={<FaUserGraduate />}
              label="Occupation"
              value={
                scheme.eligibleOccupations?.length
                  ? scheme.eligibleOccupations.join(", ")
                  : "All"
              }
            />

            <InfoRow
              icon={<FaUniversity />}
              label="Category"
              value={
                scheme.eligibleCategories?.length
                  ? scheme.eligibleCategories.join(", ")
                  : "All"
              }
            />

            <InfoRow
              icon={<FaWheelchair />}
              label="Disability Required"
              value={scheme.disabilityRequired ? "Yes" : "No"}
            />
          </div>
        </section>

        {/* Documents */}

        <section>
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <FaFileAlt />
            Required Documents
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
            <p className="text-gray-500">No documents specified.</p>
          )}
        </section>

        {/* Deadline */}

        {scheme.applicationDeadline && (
          <section>
            <h2 className="text-xl font-bold mb-3">Application Deadline</h2>

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
            Visit Official Website
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
