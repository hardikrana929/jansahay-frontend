import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaUniversity,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const SchemeCard = ({ scheme }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-green-500 p-5 text-white">
        <h2 className="text-xl font-bold">{scheme.title}</h2>

        <p className="text-sm text-blue-100 mt-1">{scheme.schemeType}</p>
      </div>

      {/* Body */}

      <div className="p-5">
        <p className="text-gray-600 line-clamp-3 leading-7">
          {scheme.description}
        </p>

        {/* Badges */}

        <div className="flex flex-wrap gap-2 mt-5">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {scheme.schemeType}
          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            {scheme.government}
          </span>

          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            {scheme.state}
          </span>
        </div>

        {/* Information */}

        <div className="space-y-3 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />

            <span>
              Income Limit :
              <strong> ₹{scheme.incomeLimit.toLocaleString()}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" />

            <span>
              Age :
              <strong>
                {" "}
                {scheme.minAge} - {scheme.maxAge}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />

            <span>{scheme.state}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaUniversity className="text-indigo-500" />

            <span>{scheme.government} Government</span>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="border-t px-5 py-4 flex justify-between items-center">
        <Link
          to={`/schemes/${scheme._id}`}
          className="text-blue-600 font-semibold flex items-center gap-2 hover:underline"
        >
          View Details
          <FaArrowRight />
        </Link>

        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          Apply
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
};

export default SchemeCard;
