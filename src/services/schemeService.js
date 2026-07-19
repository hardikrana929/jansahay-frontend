import api from "./api";

export const getSchemes = async (params) => {
  const { data } = await api.get("/schemes", {
    params,
  });

  return data;
};

export const getSchemeById = async (id) => {
  const { data } = await api.get(`/schemes/${id}`);
  return data;
};