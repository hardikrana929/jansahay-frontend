import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const Loader = ({ text, fullScreen = true }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        fullScreen ? "fixed inset-0" : "w-full h-full min-h-[300px]"
      } flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50`}
    >
      <h1 className="text-4xl font-bold text-blue-600">{t("nav.name")}</h1>

      <p className="text-gray-500 mt-2 mb-8">{t("loader.subtitle")}</p>

      <BeatLoader color="#2563EB" size={18} />

      <p className="mt-8 text-lg font-medium text-gray-700">
        {text || t("loader.default")}
      </p>
    </motion.div>
  );
};

export default Loader;
