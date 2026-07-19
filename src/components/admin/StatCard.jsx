const StatCard = ({ title, value, icon, color = "bg-blue-600" }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">{value}</h2>
        </div>

        <div
          className={`${color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
