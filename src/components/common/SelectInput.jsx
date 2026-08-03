import { useTranslation } from "react-i18next";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  icon: Icon,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div
        className={`flex items-center rounded-xl border bg-white dark:bg-gray-900 px-4 py-3 transition
        ${
          error
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-700 focus-within:border-blue-500"
        }`}
      >
        {Icon && (
          <Icon className="mr-3 text-gray-400 dark:text-gray-500" size={18} />
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-100"
        >
          <option value="" className="dark:bg-gray-900">
            {t("common.select")}
          </option>

          {options.map((item) => (
            <option
              key={item.value}
              value={item.value}
              className="dark:bg-gray-900"
            >
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
