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
  iat?: number;
  exp?: number;
}

interface LoginResponse {
  accessToken?: string;
  token?: string;
  jwt?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

const Login = () => {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!emailOrPhone || !password) {
    setError("Vui lòng nhập đầy đủ email/số điện thoại và mật khẩu.");
    return;
  }

  const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);
  const isPhone = /^\d{9,11}$/.test(emailOrPhone);

  if (!isEmail && !isPhone) {
    setError("Định dạng email hoặc số điện thoại không hợp lệ.");
    return;
  }

  setError(null);
  setLoading(true);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // timeout 7s

    const payload = { email: emailOrPhone, password };

    const { data } = await axios.post<LoginResponse>(
      "https://c645-2a09-bac1-7ac0-10-00-2e5-38.ngrok-free.app/api/authentication/login",
      payload,
      { signal: controller.signal, withCredentials: true }
    );

    clearTimeout(timeout);

    const accessToken = data.accessToken || data.token || data.jwt || data?.data?.accessToken;
    const refreshToken = data?.data?.refreshToken;

    if (!accessToken || !refreshToken) throw new Error("Không nhận được token.");

    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode<DecodedToken>(accessToken);
      const role = decoded.roles?.[0] || decoded.permission?.[0] || decoded.role || "user";

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          email: decoded.email ?? "Không có",
          phone: decoded.phone ?? "Không có",
          role,
        })
      );
    }

    router.push("/account/profile");
  } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    if (err.code === "ERR_CANCELED") {
      setError("Yêu cầu quá lâu. Vui lòng thử lại.");
    } else {
      const msg =
        (err.response?.data as { message?: string; detail?: string })?.message ||
        (err.response?.data as { detail?: string })?.detail ||
        "Sai thông tin đăng nhập.";
      setError(msg);
    }
  } else if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Lỗi không xác định khi đăng nhập.");
  }
  } finally {
    setLoading(false);
  }
};

  return (
    <Box pt={22} pb={10}>
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
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ ml: "-35vh" }}
          p={2}
        >
          <Image
            src="/img/account.png"
            alt="Account"
            width={706}
            height={781}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box
          flex={1}
          maxWidth={500}
          mx="auto"
          alignSelf="center"
          mr={{ xs: 2, md: 15 }}
          sx={{ ml: "-6px" }}
        >
          <Typography variant="h5" fontWeight={600} mb={1} fontSize={35}>
            Log in to Exclusive
          </Typography>
          <Typography color="textSecondary" fontSize={15} mb={3}>
            Enter your details below
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
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
                  type="submit"
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

              <Button
                variant="outlined"
                startIcon={<FcGoogle />}
                sx={{ textTransform: "none" }}
              >
                Log in with Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
