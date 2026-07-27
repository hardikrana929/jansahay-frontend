import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";
import Input from "../../components/common/Input";
import SelectInput from "../../components/common/SelectInput";
import Button from "../../components/common/Button";

import {
  getScheme,
  updateScheme,
  toggleSchemeStatus,
} from "../../services/adminService";

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
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [isActive, setIsActive] = useState(true);

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

      setIsActive(s.isActive ?? true);

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
      toast.error(
        error.response?.data?.message || t("admin.failedToLoadScheme"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleStatus = async () => {
    try {
      setToggling(true);

      const res = await toggleSchemeStatus(id);
      toast.success(res.message);

      setIsActive(res.isActive);
    } catch (error) {
      toast.error(error.response?.data?.message || t("profile.somethingWrong"));
    } finally {
      setToggling(false);
    }
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
      toast.error(error.response?.data?.message || t("admin.failedToUpdate"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader text={t("common.loadingScheme")} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("admin.editSchemeTitle")}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isActive
                ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
            }`}
          >
            {isActive ? t("admin.active") : t("admin.inactive")}
          </span>

          <button
            type="button"
            onClick={handleToggleStatus}
            disabled={toggling}
            className={`px-4 py-2 rounded-lg text-white font-medium transition duration-200 disabled:opacity-60 ${
              isActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isActive ? t("admin.deactivate") : t("admin.activate")}
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 space-y-5 border border-gray-100 dark:border-gray-700 transition-colors"
      >
        <Input
          label={t("admin.formTitle")}
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <label className="font-medium text-gray-700 dark:text-gray-200">
            {t("schemeDetails.description")}
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectInput
            label={t("admin.formSchemeType")}
            name="schemeType"
            value={form.schemeType}
            onChange={handleChange}
            options={SCHEME_TYPES.map((type) => ({ label: type, value: type }))}
          />

          <SelectInput
            label={t("schemes.governmentLabel")}
            name="government"
            value={form.government}
            onChange={handleChange}
            options={GOVERNMENTS.map((g) => ({ label: g, value: g }))}
          />
        </div>

        <Input
          label={t("admin.formStateOrAll")}
          name="state"
          value={form.state}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            label={t("schemes.incomeLimit")}
            name="incomeLimit"
            type="number"
            value={form.incomeLimit}
            onChange={handleChange}
          />
          <Input
            label={t("admin.formMinAge")}
            name="minAge"
            type="number"
            value={form.minAge}
            onChange={handleChange}
          />
          <Input
            label={t("admin.formMaxAge")}
            name="maxAge"
            type="number"
            value={form.maxAge}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700 dark:text-gray-200">
            {t("schemeDetails.benefits")}
          </label>
          <textarea
            name="benefits"
            rows={3}
            value={form.benefits}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <Input
          label={t("admin.formDocumentsRequired")}
          name="documentsRequired"
          value={form.documentsRequired}
          onChange={handleChange}
        />

        <Input
          label={t("admin.formOfficialLink")}
          name="officialLink"
          value={form.officialLink}
          onChange={handleChange}
        />

        <Input
          label={t("schemeDetails.applicationDeadline")}
          name="applicationDeadline"
          type="date"
          value={form.applicationDeadline}
          onChange={handleChange}
        />

        <Button text={t("admin.formUpdateScheme")} loading={saving} />
      </form>
    </AdminLayout>
  );
};

export default EditScheme;
