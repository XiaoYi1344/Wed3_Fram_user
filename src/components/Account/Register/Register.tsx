"use client";

import {
  Box,
  Breadcrumbs,
  Typography,
  Link,
  TextField,
  Button,
  Stack,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import Image from "next/image";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";

type RegisterProps = {
  onSuccess?: ({
    userId,
    email,
    phone,
  }: {
    userId: string;
    email: string;
    phone: string;
  }) => void;
};

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    yearOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone.trim());

  const validatePassword = (password: string) => password.length >= 6;

  const openSnackbar = (message: string, severity: AlertColor = "success") => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleRegister = async () => {
    if (!formData.userName || !formData.fullName || !formData.password) {
      openSnackbar("Vui lòng điền đầy đủ thông tin bắt buộc", "error");
      return;
    }

    if (!formData.email && !formData.phone) {
      openSnackbar(
        "Bạn phải cung cấp ít nhất email hoặc số điện thoại",
        "error"
      );
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      openSnackbar("Email không hợp lệ", "error");
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      openSnackbar("Số điện thoại không hợp lệ (phải đúng 10 số)", "error");
      return;
    }

    if (!validatePassword(formData.password)) {
      openSnackbar("Mật khẩu phải có ít nhất 6 ký tự", "error");
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      userName: formData.userName.trim(),
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      password: formData.password,
      yearOfBirth: formData.yearOfBirth ? Number(formData.yearOfBirth) : null,
      roleId: [],
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "https://de20-2a09-bac1-7aa0-10-00-23-473.ngrok-free.app/api/authentication/register",
        payload,
        { withCredentials: true }
      );

      const data = response.data;
      console.log("Register Response:", data);

      if (!response.status || !data?.data?.userId) {
        openSnackbar("Đăng ký thất bại", "error");
        return;
      }

      openSnackbar("Đăng ký thành công", "success");

      const userId = data.data.userId;

      if (onSuccess) {
        onSuccess({
          userId,
          email: formData.email,
          phone: formData.phone,
        });
      } else {
        router.push(
          `/verify-otp?email=${formData.email}&phone=${formData.phone}&userId=${userId}`
        );
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Có lỗi xảy ra khi đăng ký";
        openSnackbar(message, "error");
      } else {
        openSnackbar("Có lỗi không xác định", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 25,
        backgroundImage: 'url("/img/b.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          <Typography color="textPrimary">Sign Up</Typography>
        </Breadcrumbs>
      </Stack>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width="80%"
        mx="auto"
        boxShadow="0 10px 30px rgba(0,0,0,0.1)"
        borderRadius={{ md: "2rem" }}
        overflow="hidden"
      >
        <Box
          flex={{ md: "1 1 40%" }}
          bgcolor="#ffcb6a"
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          height="100%"
        >
          <Image
            src="/img/Form1.png"
            alt="Register Illustration"
            width={397}
            height={400}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
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
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Box maxWidth={500} width="100%" p={6}>
            <Typography variant="h5" fontWeight={700} mb={1} fontSize={32}>
              Create an Account
            </Typography>
            <Typography color="textSecondary" fontSize={15} mb={3}>
              Enter your details below
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Full Name"
                variant="standard"
                value={formData.fullName}
                onChange={handleChange("fullName")}
              />
              <TextField
                label="User Name"
                variant="standard"
                value={formData.userName}
                onChange={handleChange("userName")}
              />
              <TextField
                label="Email"
                variant="standard"
                value={formData.email}
                onChange={handleChange("email")}
              />
              <TextField
                label="Phone"
                variant="standard"
                value={formData.phone}
                onChange={handleChange("phone")}
              />
              <TextField
                label="Year of Birth"
                type="number"
                variant="standard"
                value={formData.yearOfBirth}
                onChange={handleChange("yearOfBirth")}
              />
              <TextField
                label="Password"
                type="password"
                variant="standard"
                value={formData.password}
                onChange={handleChange("password")}
              />

              <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<FcGoogle />}
                sx={{ textTransform: "none" }}
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
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Register;
