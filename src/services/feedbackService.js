import api from "./api";

/**
 * Submit Feedback
 */
export const submitFeedback = async (feedbackData) => {
    const { data } = await api.post("/feedback", feedbackData);
    return data;
};