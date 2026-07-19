import api from "./api";

export const getSchemes = async (page = 1) => {

  const { data } = await api.get(
    `/schemes?page=${page}&limit=12`
  );

  return data;
};

export const getSchemeById = async (id) => {
  const { data } = await api.get(`/schemes/${id}`);
  return data;
};