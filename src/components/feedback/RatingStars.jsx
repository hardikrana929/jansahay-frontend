import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingStars = ({ value = 0, onChange, size = 32 }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
          aria-label={`Rate ${star} star`}
        >
          <FaStar
            size={size}
            className={
              (hover || value) >= star ? "text-yellow-400" : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;