// src/services/axiosInstance.ts
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/auth";
import { LogoutResponse, RegisterPayload } from "@/constant/type-res-api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://retrieve-ibbn.onrender.com",
});

let isRefreshing = false;

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError & { config: InternalAxiosRequestConfig & { _retry?: boolean } }) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.set("Authorization", `Bearer ${token}`);
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${api.defaults.baseURL}/api/authentication/refresh-token`, {
          refreshToken: getRefreshToken(),
        });

        const { accessToken, refreshToken } = res.data;
        setTokens(accessToken, refreshToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// === API wrappers ===

type LoginPayload = {
  email?: string;
  phone?: string;
  password: string;
};

export const postLogin = async (payload: LoginPayload) => {
  const res = await api.post("/api/authentication/login", payload);
  return res.data;
};

export const postRegister = async (data: RegisterPayload) => {
  return await api.post("/api/authentication/register", data);
};

export const postLogout = async (refreshToken: string): Promise<LogoutResponse> => {
  const res = await api.post<LogoutResponse>("/api/authentication/log-out", {
    refreshToken,
  });
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/api/user/get-user"); // `api` tự động thêm token
  return res.data;
};



export default api;
