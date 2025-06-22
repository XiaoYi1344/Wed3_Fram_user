"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Alert,
  Link,
  Breadcrumbs,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const MAX_ATTEMPTS = 3;
const MAX_RESENDS = 3;

const VerifyOtpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const type = phone ? "verify-phone" : "verify-email";

  // Countdown cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldown]);

  const handleSubmitOtp = async () => {
    if (!userId || !otp) {
      setError("Vui lòng nhập mã OTP.");
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await axios.post(
        "http://192.168.1.100:3001/api/authentication/verify-otp",
        { userId, otp, type },
        { withCredentials: true }
      );

      if (response.data.success) {
        setInfo("Xác minh thành công. Chuyển hướng...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const msg = response.data.message || "OTP không đúng";
        setError(msg);
        setAttempts((prev) => prev + 1);

        if (attempts + 1 >= MAX_ATTEMPTS) {
          setCooldown(60);
          setAttempts(0);
          setError("Bạn đã nhập sai 3 lần. Vui lòng chờ 60 giây.");
        }
      }
    } catch (err) {
      console.error("Lỗi xác minh:", err);
      setError("Lỗi xác minh OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!userId) return;

    if (resendCount >= MAX_RESENDS) {
      setError("Đã vượt quá số lần gửi lại. Tài khoản sẽ bị xoá...");
      try {
        await axios.post(
          "http://192.168.1.100:3001/api/authentication/stop-verify-otp",
          { userId },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Lỗi xoá tài khoản:", err);
      }
      setTimeout(() => router.push("/register"), 3000);
      return;
    }

    try {
      const payload = {
        userId,
        type,
        ...(phone ? { phone } : { email }),
      };

      const response = await axios.post(
        "http://192.168.1.100:3001/api/authentication/again-otp",
        payload,
        { withCredentials: true }
      );
      console.log("Dữ liệu:", response);

      if (response.data.success) {
        setInfo("Mã OTP đã được gửi lại.");
        setResendCount((prev) => prev + 1);
        setAttempts(0);
        setOtp(""); // reset field OTP

        // 👉 Log OTP nếu backend trả về
        if (response.data.otp) {
          console.log("Mã OTP là:", response.data.otp);
        }
      } else {
        setError(response.data.message || "Không thể gửi lại mã OTP.");
      }
    } catch (err) {
      console.error("Lỗi gửi lại mã:", err);
      setError("Lỗi gửi lại OTP.");
    }
  };

  const handleStopVerify = async () => {
    if (!userId) return;
    try {
      await axios.post(
        "http://192.168.1.100:3001/api/authentication/stop-verify-otp",
        { userId },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Lỗi hủy xác minh:", err);
    } finally {
      router.push("/signup");
    }
  };

  return (
    <Stack mt={30}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mx: 15 }}>
        <Link
          color="inherit"
          href="/"
          underline="none"
          sx={{ "&:hover": { color: "black" } }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="/signup"
          underline="none"
          sx={{ "&:hover": { color: "black" } }}
        >
          Sign Up
        </Link>
        <Typography color="textPrimary">OTP</Typography>
      </Breadcrumbs>

      <Box
        maxWidth={400}
        mx="auto"
        my={10}
        px={4}
        py={8}
        borderRadius={3}
        boxShadow={4}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Xác thực tài khoản
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Vui lòng nhập mã OTP được gửi tới {email || phone}
        </Typography>

        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {info && <Alert severity="success">{info}</Alert>}

          <TextField
            label="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={cooldown > 0}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitOtp}
            disabled={loading || cooldown > 0}
            fullWidth
          >
            {loading ? "Đang xác minh..." : "Xác minh"}
          </Button>

          <Button
            variant="outlined"
            onClick={handleResendOtp}
            disabled={resendCount >= MAX_RESENDS}
            fullWidth
          >
            Gửi lại mã OTP ({MAX_RESENDS - resendCount} lần còn lại)
          </Button>

          {cooldown > 0 && (
            <Typography color="error" align="center">
              Vui lòng chờ {cooldown}s để thử lại
            </Typography>
          )}

          <Button variant="text" color="error" onClick={handleStopVerify}>
            Hủy xác minh & Xóa tài khoản
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default VerifyOtpPage;
