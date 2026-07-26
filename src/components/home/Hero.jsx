import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const primaryLink = !user
    ? "/register"
    : user.role === "admin"
      ? "/admin/dashboard"
      : "/schemes";

  const primaryText = !user
    ? t("home.hero.getStarted")
    : t("home.hero.browseSchemes");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-green-500 text-white">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 py-14 sm:py-20 md:py-16 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
            {t("home.hero.badge")}
          </span>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            {t("home.hero.titleLine1")}
            <br />
            {t("home.hero.titleLine2")}
          </h1>

          <p className="mt-6 text-lg text-blue-50 max-w-xl leading-relaxed">
            {t("home.hero.description")}
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
              {t("home.hero.exploreAll")}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-blue-50">
            <span className="flex items-center gap-2">
              <FaCheckCircle /> {t("home.hero.freeToUse")}
            </span>
            <span className="flex items-center gap-2">
              <FaShieldAlt /> {t("home.hero.allStates")}
            </span>
            <span className="flex items-center gap-2">
              <FaBolt /> {t("home.hero.instant")}
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
            className="w-full max-w-[280px] sm:max-w-sm md:max-w-full drop-shadow-2xl rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;