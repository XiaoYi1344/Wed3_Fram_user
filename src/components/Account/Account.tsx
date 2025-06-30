"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Breadcrumbs,
  TextField,
  Button,
  Link as MuiLink,
  Container,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface UpdateUserPayload {
  fullName: string;
  address?: string;
}

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const router = useRouter();

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const accessTokenLocal = localStorage.getItem("accessToken");
      const refreshTokenLocal = localStorage.getItem("refreshToken");

      if (!accessTokenLocal || !refreshTokenLocal) {
        console.warn("❌ Không tìm thấy token, chuyển hướng login...");
        router.push("/login");
        return;
      }

      setAccessToken(accessTokenLocal);

      const res = await fetch(`${baseUrl}/api/user/get-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessTokenLocal}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const result = await res.json();
      const user = result?.data;

      if (!user) {
        console.warn("⚠️ Không có dữ liệu user trả về.");
        return;
      }

      const parts = user.fullName?.trim()?.split(" ") || [];
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
    } catch (error) {
      console.error("❌ [ERROR] Lỗi khi fetch user:", error);
      router.push("/login");
    }
  };

  fetchUser();
}, [router]); // ✅ include `router`


  const handleSave = async () => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        alert("❗ Vui lòng nhập đầy đủ họ và tên.");
        return;
      }

      const payload: UpdateUserPayload = {
        fullName: `${firstName} ${lastName}`,
      };
      if (address.trim()) payload.address = address;

      const res = await axios.put(`${baseUrl}/api/user/user`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      const result = res.data;

      if (result.success) {
        alert("✅ Cập nhật hồ sơ thành công!");

        if (result?.data?.otp) {
          const { otp, type } = result.data.otp;
          console.log("📲 OTP:", otp, "Loại:", type);
          router.push(`/verify-otp?type=${type}`);
        }
      } else {
        alert("❌ Không thể cập nhật: " + result.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert("🚫 " + (error.response?.data?.message || "Lỗi server."));
      } else {
        alert("🚫 Lỗi không xác định khi cập nhật.");
      }
    }
  };

  return (
    <Box bgcolor="#fff" minHeight="100vh" py={25}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 8 }}>
          <MuiLink underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <Typography color="text.primary">My Account</Typography>
        </Breadcrumbs>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          {/* Sidebar */}
          <Box width={{ xs: "100%", md: 250 }}>
            <Typography fontWeight="bold" mb={1}>
              Manage My Account
            </Typography>
            <Stack spacing={1} pl={1} mb={3}>
              <Link href="/account/profile" passHref legacyBehavior>
                <Typography color="orange" fontSize={14} sx={{ cursor: "pointer" }}>
                  My Profile
                </Typography>
              </Link>
              <Link href="/account/address-book" passHref legacyBehavior>
                <Typography color="gray" fontSize={14} sx={{ cursor: "pointer" }}>
                  Address Book
                </Typography>
              </Link>
              <Link href="/account/payment-options" passHref legacyBehavior>
                <Typography color="gray" fontSize={14} sx={{ cursor: "pointer" }}>
                  My Payment Options
                </Typography>
              </Link>
            </Stack>
          </Box>

          {/* Form */}
          <Box flex={1} p={4} boxShadow={1} borderRadius={2} bgcolor="#fff">
            <Typography fontWeight="bold" fontSize={18} color="#ff8d2f" mb={3}>
              Edit Your Profile
            </Typography>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
              <Stack direction="column" width="50%">
                <Typography fontWeight={600} mb={1}>
                  First Name
                </Typography>
                <TextField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: { bgcolor: "#f5f5f5", borderRadius: "6px" },
                  }}
                />
              </Stack>
              <Stack direction="column" width="50%">
                <Typography fontWeight={600} mb={1}>
                  Last Name
                </Typography>
                <TextField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: { bgcolor: "#f5f5f5", borderRadius: "6px" },
                  }}
                />
              </Stack>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={4}>
              <Stack direction="column" width="50%">
                <Typography fontWeight={600} mb={1}>
                  Email
                </Typography>
                <TextField
                  value={email}
                  disabled
                  fullWidth
                  InputProps={{
                    sx: { bgcolor: "#f5f5f5", borderRadius: "6px" },
                  }}
                />
              </Stack>
              <Stack direction="column" width="50%">
                <Typography fontWeight={600} mb={1}>
                  Address
                </Typography>
                <TextField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: { bgcolor: "#f5f5f5", borderRadius: "6px" },
                  }}
                />
              </Stack>
            </Stack>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button variant="text">Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  bgcolor: "#ff8d2f",
                  color: "#fff",
                  px: 4,
                  "&:hover": { bgcolor: "#e67c1f" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Account;
