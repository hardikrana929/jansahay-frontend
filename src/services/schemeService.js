import api from "./api";

export const getSchemes = async () => {
  const { data } = await api.get("/schemes");
  return data;
};

export const getSchemeById = async (id) => {
  const { data } = await api.get(`/schemes/${id}`);
  return data;
};