// services/userService.ts

import api from "./axiosInstance";

export const getUserProfile = async () => {
  const res = await api.get("/api/user/get-user");
  return res.data;
};

export const updateUserProfile = async (data: FormData) => {
  const res = await api.put("/api/user/user", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
