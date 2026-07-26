import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";

import FavoriteCard from "../components/favorites/FavoriteCard";
import EmptyFavorite from "../components/favorites/EmptyFavorite";

import { FaSearch } from "react-icons/fa";

import { getFavorites, removeFavorite } from "../services/favoriteService";

const Favorites = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();

      setFavorites(res.favorite || []);
    } catch (error) {
      toast.error(error.response?.data?.message || t("favorites.unableToLoad"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (schemeId) => {
    try {
      await removeFavorite(schemeId);

      setFavorites((prev) =>
        prev.filter((item) => item.scheme._id !== schemeId),
      );

      toast.success(t("favorites.removed"));
    } catch (error) {
      toast.error(
        error.response?.data?.message || t("favorites.unableToRemove"),
      );
    }
  };

  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      if (!item.scheme) return false;

      return (
        item.scheme.title.toLowerCase().includes(search.toLowerCase()) ||
        item.scheme.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [favorites, search]);

  if (loading) {
    return <Loader text={t("common.loadingFavorites")} />;
  }

  return (
    <MainLayout>
      <PageHeader
        title={t("favorites.title")}
        subtitle={t("favorites.subtitle")}
      />

      {/* Search */}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-5 mb-8 transition-colors">
        <div className="flex items-center gap-3">
          <FaSearch className="text-blue-600 dark:text-blue-400" />

          <input
            type="text"
            placeholder={t("favorites.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700 dark:text-gray-100 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Count */}

      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("favorites.saved")}
        </h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {t("favorites.count", { count: filteredFavorites.length })}
        </span>
      </div>

      {filteredFavorites.length === 0 ? (
        <EmptyFavorite />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredFavorites.map((favorite) => (
            <FavoriteCard
              key={favorite._id}
              favorite={favorite}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Favorites;
