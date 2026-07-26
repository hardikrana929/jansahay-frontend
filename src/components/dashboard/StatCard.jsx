const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
