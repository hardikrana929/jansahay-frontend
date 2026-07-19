import api from "./api";

export const getRecommendations = async ({
    page = 1,
    limit = 9,
    search = "",
    schemeType = "",
    government = "",
    sort = "latest",
}) => {
    const { data } = await api.get("/recommendation", {
        params: {
            page,
            limit,
            search,
            schemeType,
            government,
            sort,
        },
    });

    return data;
};

export const getFavorites = async () => {
    const { data } = await api.get("/favorites");
    return data;
};

export const addFavorite = async (schemeId) => {
    const { data } = await api.post("/favorites", { schemeId });
    return data;
};

export const removeFavorite = async (schemeId) => {
    const { data } = await api.delete(`/favorites/${schemeId}`);
    return data;
};