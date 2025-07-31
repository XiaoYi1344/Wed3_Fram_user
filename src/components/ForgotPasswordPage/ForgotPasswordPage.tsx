// pages/forgot-password/page.tsx
"use client";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const router = useRouter();

  const handleSendOtp = async () => {
    setError("");
    setInfo("");

    if (!emailOrPhone) {
      setError("Please enter your email or phone number.");
      return;
    }

    try {
      const res = await axios.post(
        "https://d6b7-2a09-bac5-d46b-101e-00-19b-f.ngrok-free.app/api/user/forgot-password",
        emailOrPhone.includes("@")
          ? { email: emailOrPhone }
          : { phone: emailOrPhone },
      );

      if (res.data.success) {
        setInfo("OTP sent successfully.");
        setTimeout(() => {
          router.push(`/forgot-password/verify-otp?contact=${emailOrPhone}`);
        }, 1500);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" my={30} px={2}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Forgot Password
      </Typography>
      <Typography color="textSecondary" mb={2}>
        Enter your email or phone number to receive an OTP.
      </Typography>

      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {info && <Alert severity="success">{info}</Alert>}

        <TextField
          label="Email or Phone"
          fullWidth
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />

        <Button variant="contained" color="warning" onClick={handleSendOtp}>
          Send OTP
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => router.push("/change-password")}
        >
          Change Password
        </Button>
      </Stack>
    </Box>
  );
}
