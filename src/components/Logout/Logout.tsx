"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { Loader2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface LogoutButtonProps {
  onLoggedOut?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLoggedOut }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);

    if (!accessToken || !refreshToken) {
      clearTokensAndRedirect("Thiếu accessToken hoặc refreshToken. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const decoded: { exp?: number } = jwtDecode(accessToken);
      const isExpired = !decoded.exp || decoded.exp * 1000 < Date.now();

      if (isExpired) {
        clearTokensAndRedirect("Phiên đăng nhập đã hết hạn.");
        return;
      }

      const response = await axios.post(
        `${baseUrl}/api/authentication/log-out`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data?.success) {
        setSuccessMessage("Đăng xuất thành công.");
        clearTokensAndRedirect();
      } else {
        setError(response.data?.message || "Đăng xuất không thành công.");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message =
        axiosErr.response?.data?.message || axiosErr.message || "Lỗi không xác định.";

      const isTokenError =
        message.toLowerCase().includes("token") || message.toLowerCase().includes("jwt");

      if (isTokenError) {
        clearTokensAndRedirect("Token không hợp lệ hoặc đã hết hạn.");
        return;
      }

      setError(message);
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

    setTimeout(() => {
      router.push("/login");
    }, 300); // Tăng nhẹ thời gian để UI kịp hiển thị thông báo
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
