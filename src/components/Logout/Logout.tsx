// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Alert, AlertTitle, Stack } from "@mui/material";
// import { Loader2 } from "lucide-react";
// import { postLogout } from "@/services/axiosInstance";
// // import { LogoutResponse } from "@/constant/type-res-api";
// import { AxiosError } from "axios";

// const Logout = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//   const logout = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (!refreshToken) {
//       clearTokensAndRedirect("Không tìm thấy refreshToken. Vui lòng đăng nhập lại.");
//       return;
//     }

//     try {
//       const response = await postLogout(refreshToken);

//       if (response.success) {
//         setSuccessMessage("Đăng xuất thành công.");
//         setTimeout(() => {
//           clearTokensAndRedirect();
//         }, 1000); // cho thông báo hiển thị một chút
//       } else {
//         setError(response.message || "Đăng xuất không thành công.");
//         setLoading(false);
//       }
//     } catch (err) {
//       const axiosErr = err as AxiosError<{ message?: string }>;
//       const message =
//         axiosErr.response?.data?.message || axiosErr.message || "Lỗi không xác định.";

//       if (message.toLowerCase().includes("token") || message.toLowerCase().includes("jwt")) {
//         clearTokensAndRedirect("Token không hợp lệ hoặc đã hết hạn.");
//       } else {
//         setError(message);
//         setLoading(false);
//       }
//     }
//   };

//   logout();
// }, []);

// const clearTokensAndRedirect = (msg?: string) => {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");

//   if (msg) {
//     setError(msg);
//   }

//   setTimeout(() => {
//     router.push("/login");
//   }, 800); // delay nhỏ để UI không giật
// };

//   return (
//     <Stack my={25}>
//       <div className="space-y-4">
//         {error && (
//           <Alert severity="error">
//             <AlertTitle>Lỗi</AlertTitle>
//             {error}
//           </Alert>
//         )}

//         {successMessage && (
//           <Alert severity="success">
//             <AlertTitle>Thành công</AlertTitle>
//             {successMessage}
//           </Alert>
//         )}

//         {loading && (
//           <div className="flex items-center justify-center text-gray-700">
//             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//             Đang đăng xuất...
//           </div>
//         )}
//       </div>
//     </Stack>
//   );
// };

// export default Logout;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { Loader2 } from "lucide-react";
import { postLogout } from "@/services/axiosInstance";

const LogoutHandler = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const logout = async () => {
    try {
      postLogout();
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("Đăng xuất thất bại:", err);
    } finally {
      setLoading(false);
    }
  };

  logout();
}, [router]); // ✅ include router here


  return (
    <Stack my={25}>
      <div className="space-y-4">
        {success && (
          <Alert severity="success">
            <AlertTitle>Thành công</AlertTitle>
            Bạn đã đăng xuất thành công.
          </Alert>
        )}
        {loading && (
          <div className="flex items-center justify-center text-gray-700">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Đang đăng xuất...
          </div>
        )}
      </div>
    </Stack>
  );
};

export default LogoutHandler;
