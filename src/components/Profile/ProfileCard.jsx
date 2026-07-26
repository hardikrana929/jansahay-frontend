import { FaUserCircle, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ProfileCard = ({ user, profile }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          <FaUserCircle className="text-blue-600 dark:text-blue-400 text-7xl" />
        </div>

        <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100">
          {user?.name}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-2">
          <FaEnvelope />
          {user?.email}
        </p>

        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-2">
          <FaMapMarkerAlt />
          {profile?.district}, {profile?.state}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
