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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaOtp } from "@/utils/validator";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp, resendOtp, stopVerifyOtp } from "@/services/authentication";

type OtpForm = { otp: string };
type OtpResponse = { success: boolean; message?: string; otp?: string };

const MAX_ATTEMPTS = 3;
const MAX_RESENDS = 3;

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const type = phone ? "verify-phone" : "verify-email";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtpForm>({
    resolver: yupResolver(schemaOtp),
  });

  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!userId) router.push("/signup");
  }, [userId]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: OtpForm) =>
      verifyOtp({ userId: userId!, otp: data.otp, type }),
    onSuccess: (response) => {
      const data: OtpResponse = response.data;

      if (data.success) {
        setInfo("Xác minh thành công. Chuyển hướng...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "OTP không đúng");
        setAttempts((prev) => prev + 1);

        if (attempts + 1 >= MAX_ATTEMPTS) {
          setCooldown(60);
          setAttempts(0);
          setError("Bạn đã nhập sai 3 lần. Vui lòng chờ 60 giây.");
        }
      }
    },
    onError: () => setError("Đã xảy ra lỗi xác minh OTP."),
  });

  const resendOtpMutation = useMutation({
    mutationFn: async () =>
      resendOtp({ userId: userId!, type, ...(phone ? { phone } : { email }) }),
    onSuccess: (response) => {
      const data: OtpResponse = response.data;

      if (data.success) {
        setInfo("Mã OTP đã được gửi lại.");
        setResendCount((prev) => prev + 1);
        setAttempts(0);
        reset();
      } else {
        setError(data.message || "Không thể gửi lại mã OTP.");
      }
    },
    onError: () => setError("Lỗi gửi lại mã OTP."),
  });

  const handleStopVerify = async () => {
    if (!userId) return;
    try {
      await stopVerifyOtp(userId);
    } finally {
      router.push("/signup");
    }
  };

  const onSubmit = (data: OtpForm) => {
    setError("");
    setInfo("");
    verifyOtpMutation.mutate(data);
  };

  return (
    <Stack mt={30}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mx: 15 }}>
        <Link href="/">Trang chủ</Link>
        <Link href="/signup">Đăng ký</Link>
        <Typography color="textPrimary">Xác minh OTP</Typography>
      </Breadcrumbs>

      <Box maxWidth={400} mx="auto" my={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Xác thực OTP
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Nhập mã OTP gửi đến {email || phone}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {info && <Alert severity="success">{info}</Alert>}

            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mã OTP"
                  disabled={cooldown > 0}
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                  fullWidth
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={verifyOtpMutation.isPending || cooldown > 0}
              fullWidth
            >
              {verifyOtpMutation.isPending ? "Đang xác minh..." : "Xác minh"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                if (resendCount >= MAX_RESENDS) {
                  setError("Vượt quá số lần gửi lại. Hủy tài khoản...");
                  setTimeout(() => handleStopVerify(), 3000);
                  return;
                }
                resendOtpMutation.mutate();
              }}
              fullWidth
            >
              Gửi lại OTP ({MAX_RESENDS - resendCount} lần còn lại)
            </Button>

            {cooldown > 0 && (
              <Typography align="center" color="error">
                Vui lòng chờ {cooldown}s để thử lại
              </Typography>
            )}

            <Button variant="text" color="error" onClick={handleStopVerify}>
              Hủy xác minh & Xóa tài khoản
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default VerifyOtpPage;
