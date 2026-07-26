import { FaFolderOpen } from "react-icons/fa";

const EmptyState = ({
  title = "No Data Found",
  description = "There is nothing to display.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <FaFolderOpen className="text-gray-400 dark:text-gray-600" size={70} />

      <h2 className="mt-5 text-2xl font-bold text-gray-700 dark:text-gray-200">
        {title}
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default EmptyState;
