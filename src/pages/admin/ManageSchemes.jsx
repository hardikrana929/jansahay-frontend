import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaPlus } from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { getAllSchemes, toggleSchemeStatus } from "../../services/adminService";

const ManageSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await getAllSchemes();
      setSchemes(res.schemes);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleSchemeStatus(id);
      toast.success(res.message);

      setSchemes((prev) =>
        prev.map((s) => (s._id === id ? { ...s, isActive: res.isActive } : s)),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader text="Loading schemes..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Schemes</h1>

        <Link
          to="/admin/add-scheme"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition"
        >
          <FaPlus /> Add Scheme
        </Link>
      </div>

      {schemes.length === 0 ? (
        <EmptyState
          title="No Schemes Found"
          description="Add your first scheme to get started."
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Government</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme._id} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {scheme.title}
                  </td>
                  <td className="px-6 py-4">{scheme.schemeType}</td>
                  <td className="px-6 py-4">{scheme.government}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        scheme.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {scheme.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      to={`/admin/edit-scheme/${scheme._id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <FaEdit /> Edit
                    </Link>

                    <button
                      onClick={() => handleToggle(scheme._id)}
                      className={`text-sm font-medium ${
                        scheme.isActive ? "text-red-600" : "text-green-600"
                      } hover:underline`}
                    >
                      {scheme.isActive ? "Deactivate" : "Activate"}
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

export default ManageSchemes;
