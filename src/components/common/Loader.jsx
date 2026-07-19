import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

const Loader = ({ text = "Loading...", fullScreen = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        fullScreen ? "fixed inset-0" : "w-full h-full min-h-[300px]"
      } flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50`}
    >
      <h1 className="text-4xl font-bold text-blue-600">JanSahay</h1>

      <p className="text-gray-500 mt-2 mb-8">
        Smart Government Scheme Recommendation System
      </p>

      <BeatLoader color="#2563EB" size={18} />

      <p className="mt-8 text-lg font-medium text-gray-700">{text}</p>
    </motion.div>
  );
};

export default Loader;
