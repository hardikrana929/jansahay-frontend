import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import Input from "../../components/common/Input";
import SelectInput from "../../components/common/SelectInput";
import Button from "../../components/common/Button";

import { createScheme } from "../../services/adminService";

const SCHEME_TYPES = [
  "Education",
  "Agriculture",
  "Employment",
  "Women",
  "Health",
  "Business",
  "Housing",
  "Pension",
  "Other",
];
const GOVERNMENTS = ["Central", "State"];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];
const OCCUPATIONS = [
  "Student",
  "Farmer",
  "Employee",
  "Business",
  "Unemployed",
  "Other",
];

const AddScheme = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    schemeType: "",
    government: "",
    state: "All",
    eligibleOccupations: [],
    eligibleCategories: [],
    incomeLimit: "",
    minAge: "",
    maxAge: "",
    disabilityRequired: false,
    benefits: "",
    documentsRequired: "",
    officialLink: "",
    applicationDeadline: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleArrayValue = (field, value) => {
    setForm((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.schemeType ||
      !form.government ||
      !form.benefits ||
      !form.officialLink ||
      !form.applicationDeadline
    ) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        documentsRequired: form.documentsRequired
          ? form.documentsRequired.split(",").map((d) => d.trim())
          : [],
      };

      const res = await createScheme(payload);
      toast.success(res.message);
      navigate("/admin/manage-schemes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create scheme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Scheme</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-5 sm:p-8 space-y-5 border border-gray-100"
      >
        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectInput
            label="Scheme Type"
            name="schemeType"
            value={form.schemeType}
            onChange={handleChange}
            options={SCHEME_TYPES.map((t) => ({ label: t, value: t }))}
          />

          <SelectInput
            label="Government"
            name="government"
            value={form.government}
            onChange={handleChange}
            options={GOVERNMENTS.map((g) => ({ label: g, value: g }))}
          />
        </div>

        <Input
          label="State (or 'All')"
          name="state"
          value={form.state}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            label="Income Limit"
            name="incomeLimit"
            type="number"
            value={form.incomeLimit}
            onChange={handleChange}
          />
          <Input
            label="Min Age"
            name="minAge"
            type="number"
            value={form.minAge}
            onChange={handleChange}
          />
          <Input
            label="Max Age"
            name="maxAge"
            type="number"
            value={form.maxAge}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium text-gray-700 block mb-2">
            Eligible Categories
          </label>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={form.eligibleCategories.includes(c)}
                  onChange={() => toggleArrayValue("eligibleCategories", c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700 block mb-2">
            Eligible Occupations
          </label>
          <div className="flex flex-wrap gap-3">
            {OCCUPATIONS.map((o) => (
              <label
                key={o}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={form.eligibleOccupations.includes(o)}
                  onChange={() => toggleArrayValue("eligibleOccupations", o)}
                />
                {o}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="disabilityRequired"
            checked={form.disabilityRequired}
            onChange={handleChange}
          />
          Disability required
        </label>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Benefits</label>
          <textarea
            name="benefits"
            rows={3}
            value={form.benefits}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <Input
          label="Documents Required (comma separated)"
          name="documentsRequired"
          value={form.documentsRequired}
          onChange={handleChange}
        />

        <Input
          label="Official Link"
          name="officialLink"
          value={form.officialLink}
          onChange={handleChange}
        />

        <Input
          label="Application Deadline"
          name="applicationDeadline"
          type="date"
          value={form.applicationDeadline}
          onChange={handleChange}
        />

        <Button text="Create Scheme" loading={loading} />
      </form>
    </AdminLayout>
  );
};

export default AddScheme;
