import { FaStar } from "react-icons/fa";

const StarDisplay = ({ rating = 0, size = 14 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          className={
            rating >= star
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }
        />
      ))}
    </div>
  );
};

export default StarDisplay;
