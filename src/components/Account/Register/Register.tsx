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

const Register = () => {
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
  // const [errorPass, setErrorPass] = useState("");
  // const [errorConfirmPass, setErrorConfirmPass] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone.trim());

  const validatePassword = (password: string) => password.length >= 6;

  // const validatePasswords = () => {
  //   if (formData.password !== formData.confirmPassword) {
  //     setErrorConfirmPass("Mật khẩu nhập lại không khớp");
  //     return false;
  //   }
  //   return true;
  // };

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
    if (
      !formData.userName ||
      !formData.fullName ||
      !formData.password 
    ) {
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

    // if (!validatePasswords()) {
    //   openSnackbar("Mật khẩu nhập lại không khớp", "error");
    //   return;
    // }

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
        "http://192.168.1.100:3001/api/authentication/register",
        payload,
        { withCredentials: true }
      );

      const data = response.data;
      console.log("Dữ liệu:", response);
       console.log("Register Response:", data); // 👈 kiểm tra ở đây
      console.log(
        "✅ Register API Raw Response:",
        JSON.stringify(data, null, 2)
      );
      

      if (!response.status || !data?.data?.userId) {
        openSnackbar("Đăng ký thất bại", "error");
        return;
      }

      openSnackbar("Đăng ký thành công", "success");

      const userId = data.data.userId;
      router.push(
        `/verify-otp?email=${formData.email}&phone=${formData.phone}&userId=${userId}`
      );
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
    <Box pt={22} pb={10}>
      <Stack px={{ xs: 2, md: 15 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            underline="none"
            sx={{ "&:hover": { color: "black" } }}
          >
            Home
          </Link>
          <Typography color="textPrimary">Sign Up</Typography>
        </Breadcrumbs>
      </Stack>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        mt={3}
      >
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ ml: "-35vh" }}
          p={2}
        >
          <Image
            src="/img/account.png"
            alt="Account"
            width={706}
            height={781}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box
          flex={1}
          maxWidth={500}
          mx="auto"
          alignSelf="center"
          mr={{ xs: 2, md: 15 }}
          sx={{ ml: "-6px" }}
        >
          <Typography variant="h5" fontWeight={600} mb={1} fontSize={35}>
            Create an account
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
            {/* <TextField label="Confirm Password" type="password" variant="standard" value={formData.confirmPassword} onChange={handleChange("confirmPassword")} /> */}

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
      {/* {errorPass && <p className="text-red-500 text-sm">{errorPass}</p>}
{errorConfirmPass && <p className="text-red-500 text-sm">{errorConfirmPass}</p>} */}

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
