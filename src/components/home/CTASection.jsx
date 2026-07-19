import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const CTASection = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <section className="max-w-7xl mx-auto px-5 pb-20">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 rounded-3xl px-8 py-14 md:py-16 text-center text-white shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold">
          Don't miss out on benefits you're eligible for
        </h2>

        <p className="mt-4 text-blue-50 max-w-xl mx-auto">
          Create your free profile today and let JanSahay do the searching for
          you.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 mt-8 bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition"
        >
          Create Free Account
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
