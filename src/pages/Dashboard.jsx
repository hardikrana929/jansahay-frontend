import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import Loader from "../components/common/Loader";

import PageHeader from "../components/common/PageHeader";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import RecentSchemeCard from "../components/dashboard/RecentSchemeCard";

import {
  getProfile,
  getRecommendations,
  getFavorites,
  getSchemes,
} from "../services/dashboardService";

import {
  FaUser,
  FaHeart,
  FaMagic,
  FaFileAlt,
  FaUserEdit,
} from "react-icons/fa";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);

  const [recommendations, setRecommendations] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [profileRes, recommendationRes, favoriteRes, schemeRes] =
        await Promise.all([
          getProfile(),
          getRecommendations(),
          getFavorites(),
          getSchemes(),
        ]);

      setProfile(profileRes.profile);

      setRecommendations(recommendationRes.recommendations || []);

      setFavorites(favoriteRes.favorites || []);

      setSchemes(schemeRes.schemes || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Dashboard..." />;
  }

  return (
    <MainLayout>
      <PageHeader title="Dashboard" subtitle="Welcome back to JanSahay" />

      <WelcomeCard profile={profile} />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Profile"
          value={profile ? "Completed" : "Pending"}
          icon={<FaUser size={24} />}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Schemes"
          value={schemes.length}
          icon={<FaFileAlt size={24} />}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Recommendations"
          value={recommendations.length}
          icon={<FaMagic size={24} />}
          color="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Favorites"
          value={favorites.length}
          icon={<FaHeart size={24} />}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Quick Actions */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <QuickActionCard
            title="Update Profile"
            icon={<FaUserEdit size={30} />}
            color="bg-blue-600"
            link="/profile"
          />

          <QuickActionCard
            title="View Schemes"
            icon={<FaFileAlt size={30} />}
            color="bg-green-600"
            link="/schemes"
          />

          <QuickActionCard
            title="Recommendations"
            icon={<FaMagic size={30} />}
            color="bg-purple-600"
            link="/recommendations"
          />

          <QuickActionCard
            title="Favorites"
            icon={<FaHeart size={30} />}
            color="bg-red-500"
            link="/favorites"
          />
        </div>
      </div>

      {/* Recommended Schemes */}

      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Recommended Schemes</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.length > 0 ? (
            recommendations
              .slice(0, 2)
              .map((scheme) => (
                <RecommendationCard key={scheme._id} scheme={scheme} />
              ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>

      {/* Latest Schemes */}

      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Latest Government Schemes</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes.slice(0, 2).map((scheme) => (
            <RecentSchemeCard key={scheme._id} scheme={scheme} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
