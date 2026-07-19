import api from "./api";

/**
 * Get Dashboard Stats (Admin)
 */
export const getDashboardStats = async () => {
    const { data } = await api.get("/admin/schemes/stats");
    return data;
};

/**
 * Get all schemes (Admin)
 */
export const getAllSchemes = async () => {
    const { data } = await api.get("/admin/schemes");
    return data;
};

/**
 * Create Scheme
 */
export const createScheme = async (schemeData) => {
    const { data } = await api.post("/admin/schemes", schemeData);
    return data;
};

/**
 * Update Scheme
 */
export const updateScheme = async (id, schemeData) => {
    const { data } = await api.put(`/admin/schemes/${id}`, schemeData);
    return data;
};

/**
 * Activate / Deactivate Scheme
 */
export const toggleSchemeStatus = async (id) => {
    const { data } = await api.patch(`/admin/schemes/${id}/deactivate`);
    return data;
};

/**
 * Get Single Scheme
 */
export const getScheme = async (id) => {
    const { data } = await api.get(`/admin/schemes/${id}`);
    return data;
};