import { Link } from "react-router-dom";
import { FaArrowRight, FaUserCircle } from "react-icons/fa";

const WelcomeCard = ({ profile }) => {
  const name = profile?.user?.name || "User";

  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <FaUserCircle size={55} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Welcome, {name} 👋</h1>

            <p className="mt-2 text-blue-100">
              Discover government schemes tailored to your profile.
            </p>
          </div>
        </div>

        <Link
          to="/recommendations"
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-50 transition"
        >
          View Recommendations
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default WelcomeCard;
