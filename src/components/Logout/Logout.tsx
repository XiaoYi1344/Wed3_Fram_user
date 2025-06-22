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
  onLoggedOut?: () => void; // optional callback
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

    if (!accessToken) {
      setError("Bạn chưa đăng nhập hoặc thiếu token.");
      setLoading(false);
      return;
    }

    // ✅ Kiểm tra accessToken còn hạn không
    try {
      const decoded: { exp?: number } = jwtDecode(accessToken);
      const isExpired = !decoded.exp || decoded.exp * 1000 < Date.now();

      if (isExpired) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
        return;
      }
    } catch (decodeError) {
        console.log(decodeError);
        
      setError("Token không hợp lệ. Vui lòng đăng nhập lại.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
      return;
    }

    // ✅ Gọi API logout
    try {
      const response = await axios.post(
        "http://192.168.1.100:3001/api/authentication/log-out",
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage("Đăng xuất thành công.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (onLoggedOut) onLoggedOut(); // Gọi callback nếu có

        router.push("/login");
      } else {
        setError(response.data.message || "Đã xảy ra lỗi.");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(
        axiosError.response?.data?.message ||
          "Lỗi kết nối hoặc máy chủ không phản hồi."
      );
    } finally {
      setLoading(false);
    }
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
