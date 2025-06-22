"use client";

import React, { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Typography,
  Link,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";

// Kiểu token giải mã
interface DecodedToken {
  email?: string;
  phone?: number;
  permission?: string[];
  roles?: string[];
  role?: string;
}

// Kiểu phản hồi từ backend
interface LoginResponse {
  accessToken?: string;
  token?: string;
  jwt?: string;
  data?: {
    accessToken?: string;
  };
  user?: {
    email?: string;
    roles?: string[];
  };
}

const Login = () => {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  setError(null);
  setLoading(true);

  try {
    const payload = { email: emailOrPhone, password };

    const res = await axios.post(
      "http://192.168.1.100:3001/api/authentication/login",
      payload,
      { withCredentials: true }
    );

    let data: LoginResponse;
    if (typeof res.data === "string") {
      data = JSON.parse(res.data);
    } else {
      data = res.data;
    }

    const accessToken =
      data.accessToken || data.token || data.jwt || data?.data?.accessToken;

    if (!accessToken) {
      throw new Error("Không nhận được access token từ server.");
    }

    localStorage.setItem("accessToken", accessToken);
    const decoded = jwtDecode<DecodedToken & { iat?: number; exp?: number }>(accessToken);

    // 👉 Log ra console
    console.log("✅ Đăng nhập thành công!");
    console.log("AccessToken:", accessToken);
    console.log("iat:", decoded.iat);
    console.log("exp:", decoded.exp);
    console.log("Full response:", data);

    const role =
      decoded.roles?.[0] || decoded.permission?.[0] || decoded.role || "user";

    const userInfo = {
      email: decoded.email ?? "Không có",
      phone: decoded.phone ?? "Không có",
      role,
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // 👉 Hiển thị alert (tuỳ chọn)
    alert("🎉 Đăng nhập thành công!");

    // Chuyển trang
    router.push("/account/profile");

  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || "Có lỗi xảy ra khi đăng nhập";
      setError(message);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Lỗi đăng nhập không xác định.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <Box pt={22} pb={10}>
      {/* Breadcrumb */}
      <Stack px={{ xs: 2, md: 15 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/" underline="none" sx={{ "&:hover": { color: "black" } }}>
            Home
          </Link>
          <Link href="/signup" underline="none" sx={{ "&:hover": { color: "black" } }}>
            Sign Up
          </Link>
          <Link href="/verify-otp" underline="none" sx={{ "&:hover": { color: "black" } }}>
            OTP
          </Link>
          <Typography color="textPrimary">Log In</Typography>
        </Breadcrumbs>
      </Stack>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4} mt={3}>
        {/* Left image */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center" sx={{ ml: "-35vh" }} p={2}>
          <Image
            src="/img/account.png"
            alt="Account"
            width={706}
            height={781}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* Right form */}
        <Box flex={1} maxWidth={500} mx="auto" alignSelf="center" mr={{ xs: 2, md: 15 }} sx={{ ml: "-6px" }}>
          <Typography variant="h5" fontWeight={600} mb={1} fontSize={35}>
            Log in to Exclusive
          </Typography>
          <Typography color="textSecondary" fontSize={15} mb={3}>
            Enter your details below
          </Typography>

          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              variant="standard"
              label="Email or Phone Number"
              fullWidth
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="warning"
                sx={{ textTransform: "none", flex: 1 }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>

              <Link
                href="/forgot-password"
                sx={{
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: 1,
                  flex: 1,
                  textDecoration: "none",
                  color: "warning.main",
                  "&:hover": {
                    textDecoration: "underline",
                    fontStyle: "italic",
                  },
                }}
              >
                Forget Password?
              </Link>
            </Box>

            <Button variant="outlined" startIcon={<FcGoogle />} sx={{ textTransform: "none" }}>
              Log in with Google
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
