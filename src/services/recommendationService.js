import api from "./api";

// Get Recommendation
export const getRecommendations = async () => {
    const { data } = await api.get("/recommendation");
    return data;
};

// Get Favorites
export const getFavorites = async () => {
    const { data } = await api.get("/favorites");
    return data;
};

// Add Favorite
export const addFavorite = async (schemeId) => {
    const { data } = await api.post("/favorites", {
        schemeId,
    });

    return data;
};

// Remove Favorite
export const removeFavorite = async (schemeId) => {
    const { data } = await api.delete(`/favorites/${schemeId}`);

    return data;
};