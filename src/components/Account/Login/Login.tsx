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
      const timeout = setTimeout(() => controller.abort(), 7000);

      const payload = { email: emailOrPhone, password };

      const { data } = await axios.post<LoginResponse>(
        "https://42da-2a09-bac1-7ac0-10-00-2e4-a0.ngrok-free.app/api/authentication/login",
        payload,
        { signal: controller.signal, withCredentials: true }
      );

      clearTimeout(timeout);

      const accessToken =
        data.accessToken || data.token || data.jwt || data?.data?.accessToken;
      const refreshToken = data?.data?.refreshToken;

      if (!accessToken || !refreshToken)
        throw new Error("Không nhận được token.");

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const decoded = jwtDecode<DecodedToken>(accessToken);
        const role =
          decoded.roles?.[0] ||
          decoded.permission?.[0] ||
          decoded.role ||
          "user";

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
            (err.response?.data as { message?: string; detail?: string })
              ?.message ||
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
    <Box
      // minHeight="100vh"
      sx={{
        // background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 25,
        backgroundImage: 'url("/img/b.png")',
      }}
    >
      <Stack px={{ xs: 2, md: 15 }} mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            href="/"
            underline="none"
            sx={{
              display: "inline-block", 
              color: "#ff8d2f",
              transition: "transform 0.3s ease, color 0.3s ease",
              "&:hover": {
                color: "#ff6b00",
                transform: "scale(1.05)",
              },
            }}
          >
            Home
          </Link>
          <Link
            href="/signup"
            underline="none"
            sx={{
              display: "inline-block", 
              color: "#ff8d2f",
              transition: "transform 0.3s ease, color 0.3s ease",
              "&:hover": {
                color: "#ff6b00",
                transform: "scale(1.05)",
              },
            }}
          >
            Sign Up
          </Link>
          <Link
            href="/verify-otp"
            underline="none"
            sx={{
              display: "inline-block", 
              color: "#ff8d2f",
              transition: "transform 0.3s ease, color 0.3s ease",
              "&:hover": {
                color: "#ff6b00",
                transform: "scale(1.05)",
              },
            }}
          >
            OTP
          </Link>
          <Typography color="textPrimary">Log In</Typography>
        </Breadcrumbs>
      </Stack>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        height={{ xs: "auto", md: "50%" }}
        width="58%"
        mx="auto"
        boxShadow="0 10px 30px rgba(0,0,0,0.1)"
        borderRadius={{ md: "2rem" }}
        overflow="hidden"
      >
        {/* Img */}
        <Box
          flex={{ md: "1 1 40%", xs: "none" }}
          width={{ md: "40%", xs: "100%" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            ml: "",
            bgcolor: "#fff7e8",
            p: "-5",
            // borderRadius: { xs: 0, md: "0 2rem 2rem 0" },
            // boxShadow: { md: "8px 0 24px rgba(0,0,0,0.05)" },
            // minHeight:"10vh"
          }}
        >
          <Image
            src="/img/Form.png"
            alt="Login Illustration"
            width={390}
            height={400}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>

        {/* Form */}
        <Box
          flex={{ md: "1 1 60%", xs: "none" }}
          width={{ md: "60%", xs: "100%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          m="-10"
        >
          <Box
            maxWidth="auto"
            width="100%"
            sx={{
              p: 10,
              // borderRadius: 4,
              // boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
              background: "rgba(255, 247, 232, 0.3)",
              color: "#ff8d2f",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={1} fontSize={32}>
              Welcome Us Back
            </Typography>

            <Typography color="textSecondary" fontSize={15} mb={3}>
              Please enter your login details
            </Typography>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <Stack spacing={2} textAlign="left">
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
                    sx={{
                      textTransform: "none",
                      flex: 1,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      "&:hover": {
                        backgroundColor: "#ffb74d",
                      },
                    }}
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
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<FcGoogle />}
                  sx={{
                    textTransform: "none",
                    borderColor: "#ccc",
                    "&:hover": {
                      borderColor: "#aaa",
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                >
                  Log in with Google
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
