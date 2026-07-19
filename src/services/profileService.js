import api from "./api";

// Get Profile
export const getProfile = async () => {
    const { data } = await api.get("/profile");
    return data;
};

// Create Profile
export const createProfile = async (profileData) => {
    const { data } = await api.post("/profile", profileData);
    return data;
};

// Update Profile
export const updateProfile = async (profileData) => {
    const { data } = await api.put("/profile", profileData);
    return data;
};