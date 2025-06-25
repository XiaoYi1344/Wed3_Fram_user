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

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;
        console.log("Token:", token);

        if (!token) {
          console.error("❌ Access token không tồn tại");
          router.push("/login");
          return;
        }

        const res = await axios.get(
          "https://c645-2a09-bac1-7ac0-10-00-2e5-38.ngrok-free.app/api/user/get-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              // "Ngrok-Skip-Browser-Warning": "1", // ✅ Tránh bị trả về HTML
            },
            maxRedirects: 0,
            withCredentials: true,
            validateStatus: () => true, // Đừng tự động throw nếu status >= 400
          }
        );

        console.log("📡 Status:", res.status);
        console.log("📡 Response URL:", res.request?.responseURL);
        console.log("📡 Headers:", res.headers);

        const contentType = res.headers["content-type"] || "";
        if (!contentType.includes("application/json")) {
          console.error("❌ Phản hồi không phải JSON:", res.data);
          router.push("/login");
          return;
        }

        if (res.status === 200) {
          console.log("User:", res.data.user);
        } else if (res.status === 204) {
          console.warn("⚠️ Không có nội dung trả về từ BE");
        } else {
          console.error("❌ Lỗi khác:", res.status);
        }

        const user = res.data;

        if (!user || typeof user !== "object") {
          console.error("❌ Dữ liệu người dùng không hợp lệ:", user);
          router.push("/login");
          return;
        }

        const fullName = user.fullName || "";
        const [fName, ...rest] = fullName.split(" ");
        setFirstName(fName);
        setLastName(rest.join(" "));
        setEmail(user.email || "");
        setAddress(user.address || "");
      } catch (error) {
        console.error("❌ Lỗi khi fetch user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

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

          {/* Form Section */}
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

            <Typography fontWeight={600} mb={1}>
              Password Changes
            </Typography>
            <Stack spacing={2}>
              <TextField
                placeholder="Current Password"
                fullWidth
                InputProps={{ sx: { bgcolor: "#f5f5f5", borderRadius: "6px" } }}
              />
              <TextField
                placeholder="New Password"
                fullWidth
                InputProps={{ sx: { bgcolor: "#f5f5f5", borderRadius: "6px" } }}
              />
              <TextField
                placeholder="Confirm New Password"
                fullWidth
                InputProps={{ sx: { bgcolor: "#f5f5f5", borderRadius: "6px" } }}
              />
            </Stack>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button variant="text">Cancel</Button>
              <Button
                variant="contained"
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
