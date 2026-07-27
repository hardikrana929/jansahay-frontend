import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";

import RatingStars from "./RatingStars";
import SelectInput from "../common/SelectInput";
import Button from "../common/Button";

import { submitFeedback } from "../../services/feedbackService";

const FeedbackForm = () => {
  const { t } = useTranslation();

  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("suggestion");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categoryOptions = [
    { value: "suggestion", label: t("feedback.categorySuggestion") },
    { value: "bug", label: t("feedback.categoryBug") },
    { value: "compliment", label: t("feedback.categoryCompliment") },
    { value: "other", label: t("feedback.categoryOther") },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error(t("feedback.selectRating"));
      return;
    }

    if (!message.trim()) {
      toast.error(t("feedback.enterMessage"));
      return;
    }

    try {
      setLoading(true);

      await submitFeedback({ rating, category, message });

      setSubmitted(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || t("feedback.unableToSubmit"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRating(0);
    setCategory("suggestion");
    setMessage("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-12 transition-colors">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-6">
            {t("feedback.successTitle")}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md">
            {t("feedback.successDesc")}
          </p>

          <button
            onClick={handleReset}
            className="mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-xl transition"
          >
            {t("feedback.submitAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 sm:p-8 space-y-6 transition-colors"
    >
      {/* Rating */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          {t("feedback.ratingLabel")}
        </label>

        <RatingStars value={rating} onChange={setRating} />
      </div>

      {/* Category */}
      <SelectInput
        label={t("feedback.categoryLabel")}
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
      />

      {/* Message */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          {t("feedback.messageLabel")}
        </label>

        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("feedback.messagePlaceholder")}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 outline-none transition focus:border-blue-500 resize-none"
        />
      </div>

      <Button text={t("feedback.submit")} loading={loading} />
    </form>
  );
};

export default FeedbackForm;
