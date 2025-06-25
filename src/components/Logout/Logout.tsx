"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { Loader2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface LogoutButtonProps {
  refreshToken: string;
  onLoggedOut?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  refreshToken,
  onLoggedOut,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const accessToken = localStorage.getItem("accessToken");

    // Trường hợp thiếu token
    if (!accessToken || !refreshToken) {
      clearTokensAndRedirect("Thiếu accessToken hoặc refreshToken. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      // Kiểm tra hạn token
      const decoded: { exp?: number } = jwtDecode(accessToken);
      const isExpired = !decoded.exp || decoded.exp * 1000 < Date.now();

      if (isExpired) {
        clearTokensAndRedirect("Phiên đăng nhập đã hết hạn.");
        return;
      }

      // Gọi API logout
      const response = await axios.post(
        "https://9637-2a09-bac5-d46c-18c8-00-278-42.ngrok-free.app/api/authentication/log-out",
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      // Nếu logout thành công
      if (response.data?.success) {
        setSuccessMessage("Đăng xuất thành công.");
        clearTokensAndRedirect();
      } else {
        setError(response.data?.message || "Đăng xuất không thành công.");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      // Nếu lỗi liên quan đến token => clear luôn
      const isTokenError =
        axiosErr.message.includes("jwt") ||
        axiosErr.message.includes("token") ||
        axiosErr.response?.data?.message?.toLowerCase().includes("token");

      if (isTokenError) {
        clearTokensAndRedirect("Token không hợp lệ hoặc đã hết hạn.");
        return;
      }

      // Lỗi khác
      setError(
        axiosErr.response?.data?.message ||
          "Lỗi không xác định. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearTokensAndRedirect = (msg?: string) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    if (msg) {
      setError(msg);
    } else {
      setError(null);
      setSuccessMessage(null);
    }

    if (onLoggedOut) onLoggedOut();

    // Redirect sau một chút để UI có thời gian cập nhật
    setTimeout(() => {
      router.push("/login");
    }, 100);
  };

  return (
    <Stack my={25}>
      <div className="space-y-4">
        {error && (
          <Alert severity="error">
            <AlertTitle>Lỗi</AlertTitle>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success">
            <AlertTitle>Thành công</AlertTitle>
            {successMessage}
          </Alert>
        )}

        <Button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng xuất...
            </>
          ) : (
            "Đăng xuất"
          )}
        </Button>
      </div>
    </Stack>
  );
};

export default LogoutButton;
