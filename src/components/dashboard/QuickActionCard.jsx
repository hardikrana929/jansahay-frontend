import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const QuickActionCard = ({ title, icon, link, color }) => {
  return (
    <Link
      to={link}
      className={`${color} rounded-2xl p-6 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-4xl mb-4">{icon}</div>

          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <FaArrowRight size={22} />
      </div>
    </Link>
  );
};

export default QuickActionCard;
