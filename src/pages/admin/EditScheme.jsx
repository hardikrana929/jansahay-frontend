import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";
import Input from "../../components/common/Input";
import SelectInput from "../../components/common/SelectInput";
import Button from "../../components/common/Button";

import { getScheme, updateScheme } from "../../services/adminService";

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

const EditScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    schemeType: "",
    government: "",
    state: "All",
    incomeLimit: "",
    minAge: "",
    maxAge: "",
    benefits: "",
    documentsRequired: "",
    officialLink: "",
    applicationDeadline: "",
  });

  useEffect(() => {
    fetchScheme();
  }, [id]);

  const fetchScheme = async () => {
    try {
      const res = await getScheme(id);
      const s = res.scheme;

      setForm({
        title: s.title || "",
        description: s.description || "",
        schemeType: s.schemeType || "",
        government: s.government || "",
        state: s.state || "All",
        incomeLimit: s.incomeLimit ?? "",
        minAge: s.minAge ?? "",
        maxAge: s.maxAge ?? "",
        benefits: s.benefits || "",
        documentsRequired: (s.documentsRequired || []).join(", "),
        officialLink: s.officialLink || "",
        applicationDeadline: s.applicationDeadline
          ? s.applicationDeadline.slice(0, 10)
          : "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load scheme");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...form,
        documentsRequired: form.documentsRequired
          ? form.documentsRequired.split(",").map((d) => d.trim())
          : [],
      };

      const res = await updateScheme(id, payload);
      toast.success(res.message);
      navigate("/admin/manage-schemes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update scheme");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader text="Loading scheme..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Scheme</h1>

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

        <Button text="Update Scheme" loading={saving} />
      </form>
    </AdminLayout>
  );
};

export default EditScheme;
