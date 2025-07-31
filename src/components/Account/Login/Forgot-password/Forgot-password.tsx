// app/(auth)/forget-password/page.tsx
"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postForgetPassword } from "@/services/axiosInstance";
import { ForgetPasswordPayload } from "@/constant/type-res-api";

const schema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

export default function ForgetPasswordPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordPayload>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: postForgetPassword,
    onSuccess: () => {
      setMessage("✅ Mã OTP đã được gửi đến email của bạn.");
      setTimeout(() => {
        router.push("/confirm-password");
      }, 2000);
    },
    onError: () => {
      setMessage("");
      alert("❌ Không thể gửi OTP. Vui lòng thử lại.");
    },
  });

  const onSubmit = (data: ForgetPasswordPayload) => {
    mutation.mutate(data);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={20}>
      <Typography variant="h5" mb={2}>
        Quên mật khẩu
      </Typography>

      {message && <Alert severity="info">{message}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Đang gửi OTP..." : "Gửi mã OTP"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
