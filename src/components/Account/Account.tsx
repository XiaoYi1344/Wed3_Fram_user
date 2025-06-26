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

        console.log("📦 [Token] accessToken:", accessTokenLocal);
        console.log("📦 [Token] refreshToken:", refreshTokenLocal);

        if (!accessTokenLocal || !refreshTokenLocal) {
          console.warn("❌ Không tìm thấy token, chuyển hướng login...");
          router.push("/login");
          return;
        }

        setAccessToken(accessTokenLocal);

        const res = await axios.get(
          "https://42da-2a09-bac1-7ac0-10-00-2e4-a0.ngrok-free.app/api/user/get-user",
          {
            headers: {
              Authorization: `Bearer ${accessTokenLocal}`,
              // Accept: "application/json",
            },
            withCredentials: true,
            // params: {
            //   refreshToken: refreshTokenLocal,
            // },
          }
        );
        console.log("👉 Authorization header:", res.headers.authorization);

        console.log("✅ [RESPONSE] Server trả về:", res);

        const user = res?.data?.user;
        console.log("📦 [USER DATA] Dữ liệu user:", user);

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

        if (axios.isAxiosError(error)) {
          console.error(
            "🔴 [AXIOS ERROR] Lỗi từ server:",
            error.response?.data
          );
          console.error("🔴 [STATUS]", error.response?.status);
        } else {
          console.error("🔴 [UNKNOWN ERROR]", error);
        }

        router.push("/login");
      }
    };

    console.log("🔍 useEffect chạy lần đầu...");
    if (typeof window !== "undefined") {
      console.log("🧠 Đang trong môi trường browser, gọi fetchUser...");
      fetchUser();
    } else {
      console.warn("🚨 useEffect không chạy trong trình duyệt.");
    }
  }, [router]);

  const handleSave = async () => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        alert("❗ Vui lòng nhập đầy đủ họ và tên.");
        return;
      }

      const res = await axios.put(
        "https://de20-2a09-bac1-7aa0-10-00-23-473.ngrok-free.app/api/user/update-user",
        {
          fullName: `${firstName} ${lastName}`,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("✅ Cập nhật hồ sơ thành công!");
      } else {
        alert("❌ Không thể cập nhật. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("❌ Error updating user:", error);
      alert("❌ Có lỗi xảy ra khi cập nhật.");
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

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
          mt={2}
        >
          {/* Sidebar */}
          <Box width={{ xs: "100%", md: 250 }}>
            <Typography fontWeight="bold" mb={1}>
              Manage My Account
            </Typography>
            <Stack spacing={1} pl={1} mb={3}>
              <Link href="/account/profile" passHref>
                <Typography
                  color="orange"
                  fontSize={14}
                  sx={{ cursor: "pointer" }}
                >
                  My Profile
                </Typography>
              </Link>
              <Link href="/account/address-book" passHref>
                <Typography
                  color="gray"
                  fontSize={14}
                  sx={{ cursor: "pointer" }}
                >
                  Address Book
                </Typography>
              </Link>
              <Link href="/account/payment-options" passHref>
                <Typography
                  color="gray"
                  fontSize={14}
                  sx={{ cursor: "pointer" }}
                >
                  My Payment Options
                </Typography>
              </Link>
            </Stack>

            <Typography fontWeight="bold" mb={1}>
              My Orders
            </Typography>
            <Stack spacing={1} pl={1} mb={3}>
              <Link href="/account/returns" passHref>
                <Typography
                  color="gray"
                  fontSize={14}
                  sx={{ cursor: "pointer" }}
                >
                  My Returns
                </Typography>
              </Link>
              <Link href="/account/cancellations" passHref>
                <Typography
                  color="gray"
                  fontSize={14}
                  sx={{ cursor: "pointer" }}
                >
                  My Cancellations
                </Typography>
              </Link>
            </Stack>

            <Box mb={1}>
              <Link href="/account/wishlist" passHref>
                <Typography
                  fontWeight="bold"
                  color="gray"
                  fontSize={14}
                  sx={{ cursor: "pointer" }}
                >
                  My Wishlist
                </Typography>
              </Link>
            </Box>
          </Box>

          {/* Form */}
          <Box
            flex={1}
            p={4}
            boxShadow={1}
            borderRadius={2}
            bgcolor="#fff"
            width="100%"
          >
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
