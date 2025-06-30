import api from "./axiosInstance";

// OTP verification
export const verifyOtp = (data: { userId: string; otp: string; type: string }) =>
  api.post("/api/authentication/verify-otp", data);

// Resend OTP
export const resendOtp = (data: { userId: string; email?: string; phone?: string; type: string }) =>
  api.post("/api/authentication/again-otp", data);

// Cancel verification and delete user
export const stopVerifyOtp = (userId: string) =>
  api.post("/api/authentication/stop-verify-otp", { userId });
