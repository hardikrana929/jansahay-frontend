import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import Topbar from "../../components/admin/Topbar";
import StatCard from "../../components/admin/StatCard";
import Loader from "../../components/common/Loader";

import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/adminService";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.stats);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader text="Loading dashboard..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Topbar admin={user} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={<FaUsers />}
          color="bg-blue-600"
        />

        <StatCard
          title="Total Schemes"
          value={stats?.totalSchemes ?? 0}
          icon={<FaClipboardList />}
          color="bg-purple-600"
        />

        <StatCard
          title="Active Schemes"
          value={stats?.activeSchemes ?? 0}
          icon={<FaCheckCircle />}
          color="bg-green-600"
        />

        <StatCard
          title="Inactive Schemes"
          value={stats?.inactiveSchemes ?? 0}
          icon={<FaTimesCircle />}
          color="bg-red-500"
        />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
