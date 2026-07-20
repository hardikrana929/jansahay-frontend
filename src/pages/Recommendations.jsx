import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Pagination from "../components/common/Pagination";
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [schemeType, setSchemeType] = useState("");
  const [government, setGovernment] = useState("");
  const [sort, setSort] = useState("latest");

  const [loading, setLoading] = useState(true);

  const [recommendations, setRecommendations] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page, search, schemeType, government, sort]);

  useEffect(() => {
    setPage(1);
  }, [search, schemeType, government, sort]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [recommendationRes, favoriteRes] = await Promise.all([
        getRecommendations({
          page,
          limit: 9,
          search,
          schemeType,
          government,
          sort,
        }),
        getFavorites(),
      ]);

      setRecommendations(recommendationRes.recommendation || []);

      setTotalPages(recommendationRes.totalPages || 1);

      const favoriteIds = (favoriteRes.favorite || [])
        .filter((item) => item.scheme)
        .map((item) => item.scheme._id);

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
    let filtered = [...recommendations];

    // Search
    if (search.trim()) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.title.toLowerCase().includes(search.toLowerCase()) ||
          scheme.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Scheme Type
    if (schemeType) {
      filtered = filtered.filter((scheme) => scheme.schemeType === schemeType);
    }

    // Government
    if (government) {
      filtered = filtered.filter((scheme) => scheme.government === government);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return filtered;
  }, [recommendations, search, schemeType, government, sort]);

  if (loading) {
    return <Loader text="Loading Recommendations..." />;
  }

  return (
    <MainLayout>
      <div className="flex flex-wrap gap-3 justify-between items-center mt-8">
        <h2 className="text-xl font-bold">Available Recommendations</h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {recommendations.length} Schemes
        </span>
      </div>
      <PageHeader
        title="Recommended Government Schemes"
        subtitle="These schemes are selected based on your profile information and eligibility."
      />

      <RecommendationFilter
        search={search}
        setSearch={setSearch}
        schemeType={schemeType}
        setSchemeType={setSchemeType}
        government={government}
        setGovernment={setGovernment}
        sort={sort}
        setSort={setSort}
      />

      {recommendations.length === 0 ? (
        <EmptyRecommendation />
      ) : (
        <>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8">
            {recommendations.map((scheme) => (
              <RecommendationCard
                key={scheme._id}
                scheme={scheme}
                favorite={favorites.includes(scheme._id)}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </MainLayout>
  );
};

export default Recommendation;
