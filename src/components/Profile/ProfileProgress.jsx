import { useTranslation } from "react-i18next";

const ProfileProgress = ({ profile }) => {
  const { t } = useTranslation();

  const fields = [
    profile?.age,
    profile?.gender,
    profile?.state,
    profile?.district,
    profile?.occupation,
    profile?.education,
    profile?.familyIncome,
    profile?.category,
  ];

  const completed = fields.filter(Boolean).length;

  const percent = Math.round((completed / fields.length) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
          {t("profile.completionTitle")}
        </h3>

        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {percent}%
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          style={{ width: `${percent}%` }}
          className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full"
        />
      </div>
    </div>
  );
};

export default ProfileProgress;
