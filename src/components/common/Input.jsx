import { FaCircleExclamation } from "react-icons/fa6";

const Input = ({ label, icon: Icon, error, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">{label}</label>

      <div
        className={`flex items-center rounded-xl border bg-white px-4 py-3 transition
        ${
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-blue-500"
        }`}
      >
        {Icon && <Icon className="mr-3 text-gray-400" size={18} />}

        <input className="flex-1 outline-none bg-transparent" {...props} />
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <FaCircleExclamation />

          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
