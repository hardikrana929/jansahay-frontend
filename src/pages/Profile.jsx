import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";

import ProfileCard from "../components/Profile/ProfileCard";
import ProfileForm from "../components/Profile/ProfileForm";
import ProfileProgress from "../components/Profile/ProfileProgress";
import { State } from "country-state-city";
import { useAuth } from "../context/AuthContext";

import {
  getProfile,
  createProfile,
  updateProfile,
} from "../services/profileService";

const Profile = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileExist, setProfileExist] = useState(false);

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      if (res.profile) {
        setProfileExist(true);

        setFormData({
          age: res.profile.age || "",
          gender: res.profile.gender || "",
          state: res.profile.state || "",
          district: res.profile.district || "",
          occupation: res.profile.occupation || "",
          education: res.profile.education || "",
          familyIncome: res.profile.familyIncome || "",
          category: res.profile.category || "",
          disability: res.profile.disability || false,
          farmer: res.profile.farmer || false,
          landOwnership: res.profile.landOwnership || false,
          businessOwner: res.profile.businessOwner || false,
          maritalStatus: res.profile.maritalStatus || "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      const selectedState = State.getStateByCodeAndCountry(
        formData.state,
        "IN",
      );

      const payload = {
        ...formData,
        state: selectedState.name, // Save "Gujarat" instead of "GJ"
      };

      await createProfile(payload);

      toast.success("Profile saved");
    } catch (error) {
      toast.error("Failed");
    }
  };

  if (loading) {
    return <Loader text="Loading Profile..." />;
  }

  return (
    <MainLayout>
      <PageHeader
        title="My Profile"
        subtitle="Complete your profile to receive accurate government scheme recommendations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="space-y-6">
          <ProfileCard user={user} profile={formData} />

          <ProfileProgress profile={formData} />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">
          <ProfileForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={saving}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
