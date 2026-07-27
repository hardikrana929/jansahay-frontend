import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      return toast.error(t("admin.fillAllRequired"));
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
      toast.error(error.response?.data?.message || t("admin.failedToCreate"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {t("admin.addSchemeTitle")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 sm:p-8 space-y-5 border border-gray-100 dark:border-gray-700 transition-colors"
      >
        <Input
          label={t("admin.formTitle")}
          name="title"
          placeholder={t("admin.formTitlePlaceholder")}
          value={form.title}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <label className="font-medium text-gray-700 dark:text-gray-200">
            {t("schemeDetails.basicInfo")}
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder={t("admin.formDescriptionPlaceholder")}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 outline-none focus:border-blue-500"
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
          placeholder={t("admin.formStatePlaceholder")}
          value={form.state}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            label={t("schemes.incomeLimit")}
            name="incomeLimit"
            type="number"
            placeholder={t("admin.formIncomeLimitPlaceholder")}
            value={form.incomeLimit}
            onChange={handleChange}
          />
          <Input
            label={t("admin.formMinAge")}
            name="minAge"
            type="number"
            placeholder="18"
            value={form.minAge}
            onChange={handleChange}
          />
          <Input
            label={t("admin.formMaxAge")}
            name="maxAge"
            type="number"
            placeholder="60"
            value={form.maxAge}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium text-gray-700 dark:text-gray-200 block mb-2">
            {t("admin.formEligibleCategories")}
          </label>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2"
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
          <label className="font-medium text-gray-700 dark:text-gray-200 block mb-2">
            {t("admin.formEligibleOccupations")}
          </label>
          <div className="flex flex-wrap gap-3">
            {OCCUPATIONS.map((o) => (
              <label
                key={o}
                className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-2"
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

        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <input
            type="checkbox"
            name="disabilityRequired"
            checked={form.disabilityRequired}
            onChange={handleChange}
          />
          {t("admin.formDisabilityRequired")}
        </label>

        <div className="space-y-2">
          <label className="font-medium text-gray-700 dark:text-gray-200">
            {t("schemeDetails.benefits")}
          </label>
          <textarea
            name="benefits"
            rows={3}
            placeholder={t("admin.formBenefitsPlaceholder")}
            value={form.benefits}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <Input
          label={t("admin.formDocumentsRequired")}
          name="documentsRequired"
          placeholder={t("admin.formDocumentsRequiredPlaceholder")}
          value={form.documentsRequired}
          onChange={handleChange}
        />

        <Input
          label={t("admin.formOfficialLink")}
          name="officialLink"
          placeholder="https://"
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

        <Button text={t("admin.formCreateScheme")} loading={loading} />
      </form>
    </AdminLayout>
  );
};

export default AddScheme;
