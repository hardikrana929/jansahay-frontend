import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
const heroImage =
  "https://res.cloudinary.com/ddn203hk8/image/upload/v1784434860/JanSahay_yyi7ap.png";

const Hero = () => {
  const { user } = useAuth();

  const primaryLink = !user
    ? "/register"
    : user.role === "admin"
      ? "/admin/dashboard"
      : "/schemes";

  const primaryText = !user ? "Get Started" : "Browse Schemes";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-green-500 text-white">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 py-20 md:py-15 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
            Helping Every Citizen Discover the Government Benefits They Deserve.
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            Find Government Schemes
            <br />
            Made For You
          </h1>

          <p className="mt-6 text-lg text-blue-50 max-w-xl leading-relaxed">
            JanSahay matches your profile — age, income, occupation, and state —
            against real central and state government schemes, so you only see
            the scholarships, subsidies, pensions, and benefits you actually
            qualify for.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={primaryLink}
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
            >
              {primaryText}
              <FaArrowRight />
            </Link>

            <Link
              to="/schemes"
              className="inline-flex items-center gap-2 border-2 border-white/70 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Explore All Schemes
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-blue-50">
            <span className="flex items-center gap-2">
              <FaCheckCircle /> 100% Free to Use
            </span>
            <span className="flex items-center gap-2">
              <FaShieldAlt /> All States & Categories
            </span>
            <span className="flex items-center gap-2">
              <FaBolt /> Instant Recommendations
            </span>
          </div>
        </motion.div>

        {/* Right: hero illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center md:justify-end"
        >
          <img
            src={heroImage}
            alt="Person reviewing government scheme documents on JanSahay"
            className="w-72 md:w-250 drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
