import {
  FaHeart,
  FaRegHeart,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaUniversity,
  FaUserGraduate,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaFileAlt,
  FaWheelchair,
} from "react-icons/fa";

import EligibilityBadge from "./EligibilityBadge";

const RecommendationCard = ({ scheme, favorite, onFavorite }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{scheme.title}</h2>

            <p className="text-sm text-blue-100 mt-1">{scheme.schemeType}</p>
          </div>

          <button
            className="transition transform hover:scale-125"
            onClick={() => onFavorite(scheme._id)}
            className="text-2xl"
          >
            {favorite ? <FaHeart className="text-red-300" /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* Body */}

      <div className="p-5 space-y-5">
        {/* Description */}

        <div>
          <h3 className="font-semibold mb-2">Description</h3>

          <p className="text-gray-600 text-sm leading-6">
            {scheme.description}
          </p>
        </div>

        {/* Benefits */}

        <div>
          <h3 className="font-semibold mb-2">Benefits</h3>

          <p className="text-gray-600 text-sm">{scheme.benefits}</p>
        </div>

        {/* Badges */}

        <div className="flex flex-wrap gap-2">
          <EligibilityBadge text={scheme.schemeType} color="blue" />

          <EligibilityBadge text={scheme.government} color="green" />

          <EligibilityBadge text={scheme.state} color="purple" />
        </div>

        {/* Eligibility */}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-blue-600" />

            <span className="text-sm">
              Occupation:
              {scheme.eligibleOccupations.length > 0
                ? scheme.eligibleOccupations.join(", ")
                : " All"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />

            <span className="text-sm">
              Income Limit: ₹{scheme.incomeLimit.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" />

            <span className="text-sm">
              Age:
              {scheme.minAge} - {scheme.maxAge} Years
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />

            <span className="text-sm">
              State:
              {scheme.state}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaUniversity className="text-indigo-500" />

            <span className="text-sm">
              Category:
              {scheme.eligibleCategories.length > 0
                ? scheme.eligibleCategories.join(", ")
                : " All"}
            </span>
          </div>

          {scheme.disabilityRequired && (
            <div className="flex items-center gap-2">
              <FaWheelchair className="text-purple-600" />

              <span className="text-sm">Disability Certificate Required</span>
            </div>
          )}
        </div>

        {/* Documents */}

        {scheme.documentsRequired.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaFileAlt />
              Documents Required
            </h3>

            <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
              {scheme.documentsRequired.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}

        <div className="pt-4 border-t flex justify-between items-center">
          <div>
            {scheme.applicationDeadline && (
              <p className="text-xs text-red-500">
                Last Date:
                {new Date(scheme.applicationDeadline).toLocaleDateString()}
              </p>
            )}
          </div>

          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            Official Website
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
