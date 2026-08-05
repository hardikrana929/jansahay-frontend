import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import MainLayout from "../layouts/MainLayout";

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
import Loader from "../components/common/Loader";

const Dashboard = () => {
  const { t } = useTranslation();

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

      setProfile(profileRes.profile || null);

      // Recommendation API returns "recommendation"
      setRecommendations(recommendationRes.recommendation || []);

      // Favorite API returns "favorite"
      setFavorites(favoriteRes.favorite || []);

      // Schemes API returns "schemes"
      setSchemes(schemeRes.schemes || []);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || t("dashboard.unableToLoad"));
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader text={t("common.loadingDashboard")} />;
  }

  return (
    <MainLayout>
      <PageHeader
        title={t("dashboard.title")}
        subtitle={t("dashboard.subtitle")}
      />

      <WelcomeCard profile={profile} />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <StatCard
          title={t("dashboard.statProfile")}
          value={
            profile ? t("dashboard.statCompleted") : t("dashboard.statPending")
          }
          icon={<FaUser size={24} />}
          color="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title={t("dashboard.statSchemes")}
          value={schemes.length}
          icon={<FaFileAlt size={24} />}
          color="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
        />

        <StatCard
          title={t("dashboard.statRecommendations")}
          value={recommendations.length}
          icon={<FaMagic size={24} />}
          color="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
        />

        <StatCard
          title={t("dashboard.statFavorites")}
          value={favorites.length}
          icon={<FaHeart size={24} />}
          color="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
        />
      </div>

      {/* Quick Actions */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          {t("dashboard.quickActions")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <QuickActionCard
            title={t("dashboard.updateProfile")}
            icon={<FaUserEdit size={30} />}
            color="bg-blue-600"
            link="/profile"
          />

          <QuickActionCard
            title={t("dashboard.viewSchemes")}
            icon={<FaFileAlt size={30} />}
            color="bg-green-600"
            link="/schemes"
          />

          <QuickActionCard
            title={t("dashboard.statRecommendations")}
            icon={<FaMagic size={30} />}
            color="bg-purple-600"
            link="/recommendations"
          />

          <QuickActionCard
            title={t("dashboard.statFavorites")}
            icon={<FaHeart size={30} />}
            color="bg-red-500"
            link="/favorites"
          />
        </div>
      </div>

      {/* Recommended Schemes */}

      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          {t("dashboard.recommendedSchemes")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.length > 0 ? (
            recommendations
              .slice(0, 2)
              .map((scheme) => (
                <RecommendationCard key={scheme._id} scheme={scheme} />
              ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              {t("dashboard.noRecommendations")}
            </p>
          )}
        </div>
      </div>

      {/* Latest Schemes */}

      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          {t("dashboard.latestSchemes")}
        </h2>

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
