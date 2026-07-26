const ProfileInfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 dark:text-blue-400 text-xl">{icon}</div>

        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>

      <span className="text-gray-600 dark:text-gray-400">{value}</span>
    </div>
  );
};

export default ProfileInfoItem;
