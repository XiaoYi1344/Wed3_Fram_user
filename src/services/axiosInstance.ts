//axiossInstance.ts
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

import { getAccessToken, clearTokens } from "../utils/auth";

import {
  LoginPayload,
  LoginResponse,
  Response,
  Product,
  RegisterPayload,
  Category,
  ChangePasswordPayload,
  ForgetPasswordPayload,
  ConfirmPasswordPayload,
  UpdateProfilePayload,
} from "@/constant/type-res-api";

// ========== AXIOS CONFIG ==========
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.1.66:3000",
});

// ========== REQUEST INTERCEPTOR ==========
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = config.url || "";
    const method = config.method?.toLowerCase();

    const isProtected =
      url.startsWith("/api/user") ||
      url.startsWith("/api/cart") ||
      url.startsWith("/api/orders") ||
      url.startsWith("/api/checkout") ||
      url.startsWith("/api/log-out") ||
      url.startsWith("/api/wishlist") ||
      (url.startsWith("/api/product") &&
        ["post", "delete", "put"].includes(method || ""));
    url.startsWith("/api/change-password");

    if (isProtected) {
      const token = getAccessToken() || Cookies.get("access_token");
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("⚠️ Không có token – có thể lỗi 401");
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ========== RESPONSE INTERCEPTOR ==========
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearTokens();
      Cookies.remove("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ========== API SHORTCUTS ==========
export const get = async <T>(url: string) =>
  (await api.get<Response<T>>(url)).data.data;

export const post = async <T, P = void>(url: string, payload?: P) =>
  (await api.post<Response<T>>(url, payload)).data.data;

export const put = async <T, P = void>(url: string, payload?: P) =>
  (await api.put<Response<T>>(url, payload)).data.data;

// ========== AUTH ==========
export const postLogin = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<Response<LoginResponse>>("/api/login", payload);
  return res.data.data;
};

export const postRegister = async (
  data: RegisterPayload
): Promise<Response<null>> => {
  return await api.post("/api/register", data);
};

export const postLogout = () => {
  Cookies.remove("access_token");
  Cookies.remove("user_id");
  Cookies.remove("email");
  Cookies.remove("role");
};

export const postForgetPassword = async (data: ForgetPasswordPayload) =>
  post<null, ForgetPasswordPayload>("/api/forget-password", data);

// ✅ Đổi mật khẩu qua OTP (quên mật khẩu) — KHÔNG cần token
export const postConfirmPassword = async (data: ConfirmPasswordPayload) =>
  post<null, ConfirmPasswordPayload>("/api/confirm-password", data);

// ✅ Đổi mật khẩu khi đã đăng nhập — CẦN token (đã được thêm trong interceptor)
export const postChangePassword = async (data: ChangePasswordPayload) =>
  post<null, ChangePasswordPayload>("/api/change-password", data);

// ========== USER ==========
export const getUserById = async (id: string) =>
  get<{
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
  }>(`/api/user/${id}`);

export const putUpdateProfile = async (data: UpdateProfilePayload) =>
  put<null, UpdateProfilePayload>("/api/profile", data);

// ========== CATEGORY ==========
export const fetchCategories = async (): Promise<Category[]> => {
  const data = await get<Category[]>("/api/category");
  return data;
};

// ========== PRODUCT ==========
export const fetchProductsByCategoryId = async (
  categoryId: string
): Promise<Product[]> => {
  interface RawProduct extends Omit<Product, "imageUrl"> {
    images?: { imageUrl: string }[];
  }

  const res = await api.get<Response<RawProduct[]>>(
    `/api/product/category/${categoryId}`
  );
  const rawProducts = res.data.data || [];

  return rawProducts.map((p) => ({
    ...p,
    imageUrl: p.images?.map((img) => img.imageUrl) || ["/image/no-image.jpg"],
  }));
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const categories = await fetchCategories();
  const productPromises = categories
    .filter((c) => !!c.id)
    .map((c) => fetchProductsByCategoryId(String(c.id)));
  const allProducts = await Promise.all(productPromises);
  return allProducts.flat();
};

export const fetchAllProductIds = async (): Promise<{ id: string }[]> => {
  const all = await fetchAllProducts();
  return all.map((p) => ({ id: String(p.id) }));
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await api.get<
    Response<Product & { images: { imageUrl: string }[] }>
  >(`/api/product/${id}`);

  const raw = res.data.data;

  return {
    ...raw,
    imageUrl: raw.images?.map((img) => img.imageUrl) || [],
  };
};

// ========== WISHLIST ==========
export const fetchWishlistByUserId = async (userId: string) => {
  return get<Product[]>(`/api/product/user/${userId}`);
};

export default api;

// Kết hợp FlashSale với Product
// export const fetchFlashSales = async (): Promise<(FlashSale & { product: Product })[]> => {
//   const res = await api.get("/api/flash-sale");
//   const allSales: (FlashSale & { product: Product })[] = res.data.data || [];

//   const now = new Date();

//   // Lọc các flash sale đang hoạt động
//   const activeSales = allSales.filter((sale) =>
//     sale.isActive &&
//     new Date(sale.startTime) <= now &&
//     new Date(sale.endTime) >= now
//   );

//   return activeSales;
// };

// export const fetchProductsByCategoryId = async (
//   categoryId: string,
// ): Promise<{ data: Product[] }> => {
//   const res = await api.get(`/api/product/category/${categoryId}`);
//   return { data: res.data.data || [] };
// };

// export const fetchProductById = async (id: string): Promise<Product> => {
//   const res = await api.get(`/api/product/${id}`);
//   return res.data.data;
// };
