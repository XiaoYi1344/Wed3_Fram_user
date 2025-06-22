// pages/forgot-password/reset.tsx
"use client";
import { Box, TextField, Typography, Button, Stack, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const handleResetPassword = async () => {
    if (!userId || !password) {
      setError("Missing information.");
      return;
    }

    try {
      const res = await axios.post(
        "https://35be-2a09-bac5-d469-1d05-00-2e4-a1.ngrok-free.app/api/user/reset-password",
        { userId, newPassword: password }
      );

      if (res.data.success) {
        setInfo("Password reset successfully. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
        console.log(err);
        
      setError("Failed to reset password. Try again.");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={15} px={2}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Set New Password
      </Typography>

      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {info && <Alert severity="success">{info}</Alert>}

        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" color="warning" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Stack>
    </Box>
  );
}
