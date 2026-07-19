import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";

import FavoriteCard from "../components/favorites/FavoriteCard";
import EmptyFavorite from "../components/favorites/EmptyFavorite";

import { FaSearch } from "react-icons/fa";

import { getFavorites, removeFavorite } from "../services/favoriteService";

const Favorites = () => {
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
      toast.error(
        error.response?.data?.message || "Unable to load favorite schemes.",
      );
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

      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to remove favorite.",
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
    return <Loader text="Loading Favorite Schemes..." />;
  }

  return (
    <MainLayout>
      <PageHeader
        title="My Favorite Schemes"
        subtitle="Access your saved government schemes quickly."
      />

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 mb-8">
        <div className="flex items-center gap-3">
          <FaSearch className="text-blue-600" />

          <input
            type="text"
            placeholder="Search favorite schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Count */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved Schemes</h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {filteredFavorites.length} Saved
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
