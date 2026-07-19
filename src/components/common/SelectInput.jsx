const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  icon: Icon,
  error,
}) => {
  return (
    <div className="space-y-2">
      {label && <label className="font-medium text-gray-700">{label}</label>}

      <div
        className={`flex items-center rounded-xl border bg-white px-4 py-3 transition
        ${
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-blue-500"
        }`}
      >
        {Icon && <Icon className="mr-3 text-gray-400" size={18} />}

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 outline-none bg-transparent"
        >
          <option value="">Select</option>

          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectInput;
