import api from "./api";

// Step 1: Send OTP to the user's email
export const forgotPassword = async (email) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
};

// Step 2: Verify the OTP that was emailed to the user
export const verifyResetOTP = async (email, otp) => {
    const { data } = await api.post("/auth/verify-reset-otp", { email, otp });
    return data;
};

// Step 3: Set a new password using the resetToken from step 2
export const resetPassword = async (resetToken, newPassword) => {
    const { data } = await api.post("/auth/reset-password", {
        resetToken,
        newPassword,
    });
    return data;
};