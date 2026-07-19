import api from "./api";

/**
 * Get all favorite schemes
 */
export const getFavorites = async () => {
    const { data } = await api.get("/favorites");
    return data;
};

/**
 * Remove favorite scheme
 */
export const removeFavorite = async (schemeId) => {
    const { data } = await api.delete(`/favorites/${schemeId}`);
    return data;
};