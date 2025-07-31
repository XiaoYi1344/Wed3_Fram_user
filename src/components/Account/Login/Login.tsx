"use client";

import React from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginPayload, LoginResponse } from "@/constant/type-res-api";
import { postLogin } from "@/services/axiosInstance";
import { schemaLogin } from "@/utils/validator";
import { AxiosError } from "axios";

import { useAuthStore } from "@/stores/authStore";
type ErrorResponse = {
  message?: string;
  detail?: string;
};

const Login = () => {
  const router = useRouter();

  const { checkLogin } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const mutation = useMutation<
  LoginResponse,
  AxiosError<ErrorResponse>,
  LoginPayload
>({
  mutationFn: postLogin,

  onMutate: () => {
    toast.info("Đang xử lý đăng nhập...");
  },

  onSuccess: (user) => {
    if (!user?.access_token) {
      toast.error("Không nhận được access_token từ server.");
      return;
    }

    Cookies.set("access_token", user.access_token, { expires: 7 });
    Cookies.set("user_id", String(user.id), { expires: 7 });
    Cookies.set("email", user.email, { expires: 7 });
    Cookies.set("role", user.role, { expires: 7 });

    checkLogin(); // ✅ Đồng bộ trạng thái login vào Zustand
    
    toast.success("Đăng nhập thành công 🎉");
    setTimeout(() => router.push("/"), 1000);
  },

  onError: (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.detail ||
      err.message ||
      "Sai thông tin đăng nhập.";
    toast.error(msg);
  },
});


  const onSubmit = (data: LoginPayload) => {
    mutation.mutate(data);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={40}>
      <ToastContainer />
      <Typography variant="h4" mb={3}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email or Phone"
                fullWidth
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
          <Link href="/forgot-password" underline="hover" fontSize={14}>
            Quên mật khẩu?
          </Link>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
