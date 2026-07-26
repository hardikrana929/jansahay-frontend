import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const CTASection = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (user) return null;

  return (
    <section className="max-w-7xl mx-auto px-5 pb-20">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 rounded-3xl px-8 py-14 md:py-16 text-center text-white shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold">
          {t("home.cta.heading")}
        </h2>

        <p className="mt-4 text-blue-50 max-w-xl mx-auto">
          {t("home.cta.description")}
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 mt-8 bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition"
        >
          {t("home.cta.button")}
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
