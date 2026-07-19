import api from "./api";

// Get Logged In User Profile
export const getProfile = async () => {
    const { data } = await api.get("/profile");
    return data;
};

// Get Recommended Schemes
export const getRecommendations = async () => {
    const { data } = await api.get("/recommendation");
    return data;
};

// Get Favorite Schemes
export const getFavorites = async () => {
    const { data } = await api.get("/favorites");
    return data;
};

// Get All Schemes
export const getSchemes = async () => {
    const { data } = await api.get("/schemes");
    return data;
};