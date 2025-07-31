"use client";

import { RegisterFormValues, RegisterPayload } from "@/constant/type-res-api";
import { postRegister } from "@/services/axiosInstance";
import { schemaRegister } from "@/utils/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Register = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schemaRegister),
    mode: "onSubmit",
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      nameCompany: "",
      city: "",
      district: "",
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterPayload) => postRegister(data),
    onSuccess: (res) => {
      toast.success(res?.message || "Đăng ký thành công!");
      router.push("/login");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error?.response?.data?.message || "Đăng ký thất bại");
    },
  });

  const handleRegister = (data: RegisterFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
const { confirmPassword, ...payload } = data;
mutate(payload);

  };

  const renderField = (
    name: keyof RegisterFormValues,
    label: string,
    type: string = "text"
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          variant="standard"
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString() || ""}
        />
      )}
    />
  );

  return (
    <Box
      sx={{
        minHeight: "150vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundImage: 'url("/img/Form1.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        mt: { xs: 5, md: 30 },
        overflowY: "auto",
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width={{ xs: "90%", md: "80%" }}
        mx="auto"
        mb="100px"
        boxShadow="0 10px 30px rgba(0,0,0,0.1)"
        borderRadius={{ md: "2rem" }}
        overflow="hidden"
        bgcolor="rgba(255, 255, 255, 0.85)"
      >
        <Box
          flex={{ md: "1 1 40%" }}
          bgcolor="#ffcb6a"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="600"
          data-aos="fade-right"
        >
          <Image
            src="/img/Form1.webp"
            alt="Register Illustration"
            width={400}
            height={400}
            style={{ objectFit: "contain", maxWidth: "100%", height: "100%" }}
          />
        </Box>

        <motion.div
          style={{
            flex: "1 1 60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            maxWidth={500}
            width="100%"
            p={6}
            sx={{
              background: "rgba(255, 247, 232, 0.3)",
              backdropFilter: "blur(3px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Typography variant="h5" fontWeight={700} fontSize={32} mb={1}>
              Create an Account
            </Typography>
            <Typography color="textSecondary" fontSize={15} mb={3}>
              Enter your details below
            </Typography>

            <form onSubmit={handleSubmit(handleRegister)}>
              <Stack spacing={2}>
                {renderField("userName", "Username")}
                {renderField("email", "Email")}
                {renderField("phone", "Phone")}
                {renderField("nameCompany", "Company Name")}
                {renderField("city", "City")}
                {renderField("district", "District")}
                {renderField("address", "Address")}
                {renderField("password", "Password", "password")}
                {renderField("confirmPassword", "Confirm Password", "password")}

                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  sx={{ textTransform: "none" }}
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Creating..." : "Create Account"}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FcGoogle />}
                  sx={{ textTransform: "none" }}
                  type="button"
                >
                  Sign up with Google
                </Button>

                <Typography fontSize={14} textAlign="center">
                  Already have an account?{" "}
                  <Link href="/login" underline="hover">
                    Log in
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Register;
