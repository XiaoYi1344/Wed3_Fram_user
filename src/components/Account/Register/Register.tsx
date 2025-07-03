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

const Register = () => {
  const router = useRouter();

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

  // debugger
  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterPayload) => postRegister(data),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Đăng ký thành công!");
      // debugger
      router.push("/login"); // ✅ Không cần xác minh OTP nữa

    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error?.response?.data?.message || "Đăng ký thất bại");
    },
  });

  const handleRegister = (formData: RegisterFormValues) => {
  const { confirmPassword, ...dataToSubmit } = formData;
  console.log("📤 Submitting data:", dataToSubmit, confirmPassword);
  mutate(dataToSubmit);

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
        backgroundImage: 'url("/img/b.png")',
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
        >
          <Image
            src="/img/Form1.png"
            alt="Register Illustration"
            width={400}
            height={400}
            style={{ objectFit: "contain", maxWidth: "100%", height: "100%" }}
          />
        </Box>

        <Box
          flex={{ md: "1 1 60%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "rgba(255, 247, 232, 0.3)",
            backdropFilter: "blur(3px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Box maxWidth={500} width="100%" p={6}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
