import { useTranslation } from "react-i18next";

const Button = ({ text, loading, type = "submit" }) => {
  const { t } = useTranslation();

  return (
    <button
      type={type}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition text-white py-3 rounded-lg font-semibold disabled:opacity-70"
    >
      {loading ? t("common.pleaseWait") : text}
    </button>
  );
};

export default Button;
