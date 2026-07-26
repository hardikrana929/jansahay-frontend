import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaCommentDots, FaStar, FaTrash } from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import StatCard from "../../components/admin/StatCard";
import StarDisplay from "../../components/feedback/StarDisplay";

import {
  getAllFeedback,
  getFeedbackStats,
  deleteFeedback,
} from "../../services/adminService";

const ManageFeedback = () => {
  const { t } = useTranslation();

  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [ratingFilter, setRatingFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratingFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [feedbackRes, statsRes] = await Promise.all([
        getAllFeedback(ratingFilter),
        getFeedbackStats(),
      ]);

      setFeedbacks(feedbackRes.feedbacks);
      setStats(statsRes.stats);
    } catch (error) {
      toast.error(error.response?.data?.message || t("common.somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("admin.deleteConfirm"))) return;

    try {
      await deleteFeedback(id);

      setFeedbacks((prev) => prev.filter((item) => item._id !== id));
      toast.success(t("admin.deleted"));
    } catch (error) {
      toast.error(error.response?.data?.message || t("common.somethingWrong"));
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader text={t("common.pleaseWait")} fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("admin.feedbackTitle")}
        </h1>

        <p className="text-gray-500 mt-1">{t("admin.feedbackSubtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <StatCard
          title={t("admin.totalFeedback")}
          value={stats?.totalFeedback ?? 0}
          icon={<FaCommentDots />}
          color="bg-blue-600"
        />

        <StatCard
          title={t("admin.averageRating")}
          value={stats?.averageRating ?? 0}
          icon={<FaStar />}
          color="bg-yellow-500"
        />
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-6 flex justify-end">
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">{t("admin.filterByRating")}</option>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} ★
            </option>
          ))}
        </select>
      </div>

      {feedbacks.length === 0 ? (
        <EmptyState
          title={t("admin.noFeedbackTitle")}
          description={t("admin.noFeedbackDesc")}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-100 align-top"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">
                      {item.user?.name || "—"}
                    </p>
                    <p className="text-sm text-gray-500">{item.user?.email}</p>
                  </td>

                  <td className="px-6 py-4">
                    <StarDisplay rating={item.rating} />
                  </td>

                  <td className="px-6 py-4 capitalize">
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600 max-w-md">
                    {item.message}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-9 h-9 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition ml-auto"
                      aria-label={t("admin.delete")}
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageFeedback;
