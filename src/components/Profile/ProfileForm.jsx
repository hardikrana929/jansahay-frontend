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

import Input from "../common/Input";
import SelectInput from "../common/SelectInput";

const ProfileForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-8 space-y-8 border border-gray-100"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUser className="text-blue-600" /> Personal Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            icon={FaUser}
          />

          <SelectInput
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            icon={FaUsers}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />

          <Input
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            icon={FaMapMarkerAlt}
          />

          <Input
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
            icon={FaCity}
          />

          <SelectInput
            label="Marital Status"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            icon={FaHeart}
            options={[
              { value: "Single", label: "Single" },
              { value: "Married", label: "Married" },
              { value: "Widowed", label: "Widowed" },
              { value: "Divored", label: "Divorced" },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaBriefcase className="text-blue-600" /> Occupation & Income
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <SelectInput
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            icon={FaBriefcase}
            options={[
              { value: "Student", label: "Student" },
              { value: "Farmer", label: "Farmer" },
              { value: "Employee", label: "Employee" },
              { value: "Business", label: "Business" },
              { value: "Unemployed", label: "Unemployed" },
              { value: "Other", label: "Other" },
            ]}
          />

          <Input
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            icon={FaGraduationCap}
          />

          <Input
            label="Family Income (Annual)"
            type="number"
            name="familyIncome"
            value={formData.familyIncome}
            onChange={handleChange}
            icon={FaWallet}
          />

          <SelectInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            icon={FaUsers}
            options={[
              { value: "General", label: "General" },
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
          <FaWheelchair className="text-blue-600" /> Additional Details
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="farmer"
              checked={formData.farmer}
              onChange={handleChange}
            />
            <FaTractor className="text-gray-500" /> Farmer
          </label>

          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="landOwnership"
              checked={formData.landOwnership}
              onChange={handleChange}
            />
            <FaMapMarkerAlt className="text-gray-500" /> Owns Land
          </label>

          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="businessOwner"
              checked={formData.businessOwner}
              onChange={handleChange}
            />
            <FaStore className="text-gray-500" /> Business Owner
          </label>

          <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
            <input
              type="checkbox"
              name="disability"
              checked={formData.disability}
              onChange={handleChange}
            />
            <FaWheelchair className="text-gray-500" /> Disability
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3.5 rounded-xl font-semibold transition shadow-md"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
