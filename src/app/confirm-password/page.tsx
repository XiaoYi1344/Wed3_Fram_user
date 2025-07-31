// app/(auth)/confirm-password/page.tsx
"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postConfirmPassword } from "@/services/axiosInstance";
import { ConfirmPasswordPayload } from "@/constant/type-res-api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  otpCode: yup.string().required("Vui lòng nhập mã OTP"),
  newPassword: yup
    .string()
    .min(6, "Ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
});

export default function ConfirmPasswordPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmPasswordPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      otpCode: "",
      newPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postConfirmPassword,
    onSuccess: () => {
      setSuccessMessage("🎉 Đổi mật khẩu thành công. Bạn có thể đăng nhập lại.");
      setTimeout(() => router.push("/login"), 1500);
    },
    onError: () => {
      setSuccessMessage("");
      alert("❌ OTP không chính xác hoặc đã hết hạn.");
    },
  });

  const onSubmit = (data: ConfirmPasswordPayload) => {
    mutation.mutate(data);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={20}>
      <Typography variant="h5" mb={2}>
        Đặt lại mật khẩu
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="otpCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mã OTP"
                fullWidth
                error={!!errors.otpCode}
                helperText={errors.otpCode?.message}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mật khẩu mới"
                type="password"
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
