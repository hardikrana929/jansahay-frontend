import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/common/PageHeader";
import ProfileForm from "../components/Profile/ProfileForm";

import { createProfile } from "../services/profileService";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    state: "",
    district: "",
    occupation: "",
    education: "",
    familyIncome: "",
    category: "",
    disability: false,
    farmer: false,
    landOwnership: false,
    businessOwner: false,
    maritalStatus: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const res = await createProfile(formData);
      toast.success(res.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Complete Your Profile"
        subtitle="We need a few details to recommend the right government schemes for you."
      />

      <div className="max-w-3xl mx-auto">
        <ProfileForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </MainLayout>
  );
};

export default CompleteProfile;
