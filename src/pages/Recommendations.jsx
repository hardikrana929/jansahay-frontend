import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";

import RecommendationCard from "../components/recommendation/RecommendationCard";
import RecommendationFilter from "../components/recommendation/RecommendationFilter";
import EmptyRecommendation from "../components/recommendation/EmptyRecommendation";

import {
  getRecommendations,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/recommendationService";

const Recommendation = () => {
  const [loading, setLoading] = useState(true);

  const [recommendations, setRecommendations] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recommendationRes, favoriteRes] = await Promise.all([
        getRecommendations(),
        getFavorites(),
      ]);

      setRecommendations(recommendationRes.recommendations || []);

      const favoriteIds = favoriteRes.favorite.map((item) => item.scheme._id);

      setFavorites(favoriteIds);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load recommendations.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (schemeId) => {
    try {
      if (favorites.includes(schemeId)) {
        await removeFavorite(schemeId);

        setFavorites((prev) => prev.filter((id) => id !== schemeId));

        toast.success("Removed from favorites");
      } else {
        await addFavorite(schemeId);

        setFavorites((prev) => [...prev, schemeId]);

        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const filteredSchemes = useMemo(() => {
    return recommendations.filter((scheme) =>
      scheme.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [recommendations, search]);

  if (loading) {
    return <Loader text="Loading Recommendations..." />;
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold">Available Recommendations</h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {filteredSchemes.length} Schemes
        </span>
      </div>
      <PageHeader
        title="Recommended Government Schemes"
        subtitle="These schemes are selected based on your profile information and eligibility."
      />

      <RecommendationFilter search={search} setSearch={setSearch} />

      {filteredSchemes.length === 0 ? (
        <EmptyRecommendation />
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8">
          {filteredSchemes.map((scheme) => (
            <RecommendationCard
              key={scheme._id}
              scheme={scheme}
              favorite={favorites.includes(scheme._id)}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Recommendation;
