import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { postLogout } from "@/services/axiosInstance";

interface AuthState {
  isLoggedIn: boolean;
  checkLogin: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: !!Cookies.get("access_token"),

      checkLogin: () => {
        const token = Cookies.get("access_token");
        set({ isLoggedIn: !!token });
      },

      logout: async () => {
        try {
          await postLogout();
        } catch (err) {
          console.error("Lỗi khi gọi API logout:", err);
        } finally {
          Cookies.remove("access_token");
          Cookies.remove("user_id");
          Cookies.remove("email");
          Cookies.remove("role");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          set({ isLoggedIn: false });
        }
      },
    }),
    {
      name: "auth-storage", // tên key trong localStorage
    }
  )
);
