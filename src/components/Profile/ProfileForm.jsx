import {
  FaGraduationCap,
  FaBriefcase,
  FaWallet,
  FaMapMarkerAlt,
  FaCity,
  FaUser,
  FaUsers,
  FaHeart,
  FaTractor,
  FaStore,
  FaWheelchair,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

import Input from "../common/Input";
import SelectInput from "../common/SelectInput";

const ProfileForm = ({ formData, handleChange, handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-5 sm:p-8 space-y-8 border border-gray-100"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUser className="text-blue-600" /> {t("profile.personalDetails")}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label={t("profile.age")}
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            icon={FaUser}
          />

          <SelectInput
            label={t("profile.gender")}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            icon={FaUsers}
            options={[
              { value: "Male", label: t("profile.male") },
              { value: "Female", label: t("profile.female") },
              { value: "Other", label: t("profile.other") },
            ]}
          />

          <Input
            label={t("profile.state")}
            name="state"
            value={formData.state}
            onChange={handleChange}
            icon={FaMapMarkerAlt}
          />

          <Input
            label={t("profile.district")}
            name="district"
            value={formData.district}
            onChange={handleChange}
            icon={FaCity}
          />

          <SelectInput
            label={t("profile.maritalStatus")}
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            icon={FaHeart}
            options={[
              { value: "Single", label: t("profile.single") },
              { value: "Married", label: t("profile.married") },
              { value: "Widowed", label: t("profile.widowed") },
              { value: "Divored", label: t("profile.divorced") },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaBriefcase className="text-blue-600" />{" "}
          {t("profile.occupationIncome")}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <SelectInput
            label={t("profile.occupation")}
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            icon={FaBriefcase}
            options={[
              { value: "Student", label: t("profile.student") },
              { value: "Farmer", label: t("profile.farmer") },
              { value: "Employee", label: t("profile.employee") },
              { value: "Business", label: t("profile.business") },
              { value: "Unemployed", label: t("profile.unemployed") },
              { value: "Other", label: t("profile.other") },
            ]}
          />

          <Input
            label={t("profile.education")}
            name="education"
            value={formData.education}
            onChange={handleChange}
            icon={FaGraduationCap}
          />

          <Input
            label={t("profile.familyIncome")}
            type="number"
            name="familyIncome"
            value={formData.familyIncome}
            onChange={handleChange}
            icon={FaWallet}
          />

          <SelectInput
            label={t("profile.category")}
            name="category"
            value={formData.category}
            onChange={handleChange}
            icon={FaUsers}
            options={[
              { value: "General", label: t("profile.general") },
              { value: "OBC", label: "OBC" },
              { value: "SC", label: "SC" },
              { value: "ST", label: "ST" },
              { value: "EWS", label: "EWS" },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaWheelchair className="text-blue-600" />{" "}
          {t("profile.additionalDetails")}
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="farmer"
              checked={formData.farmer}
              onChange={handleChange}
            />
            <FaTractor className="text-gray-500" /> {t("profile.isFarmer")}
          </label>

          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="landOwnership"
              checked={formData.landOwnership}
              onChange={handleChange}
            />
            <FaMapMarkerAlt className="text-gray-500" /> {t("profile.ownsLand")}
          </label>

          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="businessOwner"
              checked={formData.businessOwner}
              onChange={handleChange}
            />
            <FaStore className="text-gray-500" /> {t("profile.businessOwner")}
          </label>

          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="disability"
              checked={formData.disability}
              onChange={handleChange}
            />
            <FaWheelchair className="text-gray-500" /> {t("profile.disability")}
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3.5 rounded-xl font-semibold transition shadow-md"
      >
        {loading ? t("profile.saving") : t("profile.saveProfile")}
      </button>
    </form>
  );
};

export default ProfileForm;
