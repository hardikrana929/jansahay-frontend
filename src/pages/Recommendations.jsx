import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
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
import useDebounce from "../hooks/useDebounce";

const Recommendation = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [schemeType, setSchemeType] = useState("");
  const [government, setGovernment] = useState("");
  const [sort, setSort] = useState("latest");

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const isFirstLoad = useRef(true);

  const [recommendations, setRecommendations] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, schemeType, government, sort]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, schemeType, government, sort]);

  const fetchData = async () => {
    try {
      if (isFirstLoad.current) {
        setLoading(true);
      } else {
        setFetching(true);
      }

      const [recommendationRes, favoriteRes] = await Promise.all([
        getRecommendations({
          page,
          limit: 9,
          search: debouncedSearch,
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
        error.response?.data?.message || t("recommendations.unableToLoad"),
      );
    } finally {
      setLoading(false);
      setFetching(false);
      isFirstLoad.current = false;
    }
  };

  const handleFavorite = async (schemeId) => {
    try {
      if (favorites.includes(schemeId)) {
        await removeFavorite(schemeId);

        setFavorites((prev) => prev.filter((id) => id !== schemeId));

        toast.success(t("recommendations.removedFromFavorites"));
      } else {
        await addFavorite(schemeId);

        setFavorites((prev) => [...prev, schemeId]);

        toast.success(t("recommendations.addedToFavorites"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (loading) {
    return <Loader text={t("common.loadingRecommendations")} />;
  }

  return (
    <MainLayout>
      <div className="flex flex-wrap gap-3 justify-between items-center mt-8">
        <h2 className="text-xl font-bold">{t("recommendations.available")}</h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {t("recommendations.count", { count: recommendations.length })}
        </span>
      </div>
      <PageHeader
        title={t("recommendations.title")}
        subtitle={t("recommendations.subtitle")}
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
        <div
          className={`transition-opacity duration-200 ${
            fetching ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
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
        </div>
      )}
    </MainLayout>
  );
};

export default Recommendation;
