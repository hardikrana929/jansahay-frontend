const ProfileProgress = ({ profile }) => {
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
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-lg">Profile Completion</h3>

        <span className="font-semibold text-blue-600">{percent}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          style={{ width: `${percent}%` }}
          className="bg-blue-600 h-3 rounded-full"
        />
      </div>
    </div>
  );
};

export default ProfileProgress;
