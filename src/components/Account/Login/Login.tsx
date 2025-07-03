"use client";

import React from "react";
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
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";
import { yupResolver } from "@hookform/resolvers/yup";
import { postLogin } from "@/services/axiosInstance";
import { schemaLogin } from "@/utils/validator";
import { AxiosError } from "axios";
import { LoginResponse } from "@/constant/type-res-api";

type LoginForm = {
  userName: string; // email hoặc phone
  password: string;
};

type LoginPayload = {
  userName: string;
  password: string;
};


type DecodedToken = {
  email?: string;
  phone?: number;
  permission?: string[];
  roles?: string[];
  role?: string;
  iat?: number;
  exp?: number;
};

const Login = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const [error, setError] = React.useState<string | null>(null);

  const mutation = useMutation<
    LoginResponse,
    AxiosError<{ message?: string; detail?: string }>,
    LoginPayload
  >({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log("LOGIN SUCCESS RESPONSE:", data);
      // const accessToken =
      //   data.accessToken || data.token || data.jwt || data?.data?.accessToken;
      // const refreshToken = data.refreshToken || data?.data?.refreshToken;

      const accessToken = data?.data?.accessToken;
      const refreshToken = data?.data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error("Không nhận được token.");
      }

      debugger;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode<DecodedToken>(accessToken);
      const role =
        decoded.roles?.[0] || decoded.permission?.[0] || decoded.role || "user";

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          email: decoded.email ?? "Không có",
          phone: decoded.phone ?? "Không có",
          role,
        })
      );

      // router.push("/account/profile");
      console.log("LOGIN SUCCESS RESPONSE");
      router.push("/");
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err.message ||
        "Sai thông tin đăng nhập.";
      setError(msg);
    },
  });

  const onSubmit = (data: LoginForm) => {
    setError(null);

    const payload = {
      userName: data.userName,
      password: data.password,
    };

    // debugger
    console.log("Payload:", payload);
    mutation.mutate(payload);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 25,
        backgroundImage: 'url("/img/b.png")',
      }}
    >
      <Stack px={{ xs: 2, md: 15 }} mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          {["/", "/signup", "/verify-otp"].map((path, index) => (
            <Link
              key={path}
              href={path}
              underline="none"
              sx={{
                color: "#ff8d2f",
                "&:hover": {
                  color: "#ff6b00",
                  transform: "scale(1.05)",
                },
              }}
            >
              {["Home", "Sign Up", "OTP"][index]}
            </Link>
          ))}
          <Typography color="textPrimary">Log In</Typography>
        </Breadcrumbs>
      </Stack>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width="58%"
        mx="auto"
        boxShadow="0 10px 30px rgba(0,0,0,0.1)"
        borderRadius={{ md: "2rem" }}
        overflow="hidden"
      >
        <Box
          width={{ md: "40%", xs: "100%" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ bgcolor: "#fff7e8" }}
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

        <Box
          width={{ md: "60%", xs: "100%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              p: 10,
              background: "rgba(255, 247, 232, 0.3)",
              color: "#ff8d2f",
              backdropFilter: "blur(3px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "&:hover": { transform: "scale(1.01)" },
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={1} fontSize={32}>
              Welcome Us Back
            </Typography>
            <Typography color="textSecondary" fontSize={15} mb={3}>
              Please enter your login details
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}

                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email or Phone Number"
                      variant="standard"
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
                      variant="standard"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />

                <Box display="flex" gap={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    disabled={mutation.isPending}
                    sx={{
                      textTransform: "none",
                      flex: 1,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      "&:hover": { backgroundColor: "#ffb74d" },
                    }}
                  >
                    {mutation.isPending ? "Logging in..." : "Log In"}
                  </Button>

                  <Link
                    className="text-nowrap"
                    href="/forgot-password"
                    sx={{
                      flex: 1,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
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
