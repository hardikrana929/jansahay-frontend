const ProfileInfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 text-xl">{icon}</div>

        <span className="font-medium">{label}</span>
      </div>

      <span className="text-gray-600">{value}</span>
    </div>
  );
};

export default ProfileInfoItem;
