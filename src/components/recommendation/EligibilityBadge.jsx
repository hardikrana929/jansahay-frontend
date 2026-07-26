const EligibilityBadge = ({ text, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    green:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
    purple:
      "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300",
    red: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}
    >
      {text}
    </span>
  );
};

export default EligibilityBadge;
