"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Breadcrumbs,
  TextField,
  Button,
  Link as MuiLink,
  Container,
} from "@mui/material";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getUserProfile, updateUserProfile } from "@/services/userService";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          router.push("/login");
          return;
        }

        const result = await getUserProfile();

        if (!result?.success || !result.data) return;

        const user = result.data;
        const parts = user.fullName?.trim()?.split(" ") || [];

        setFirstName(parts.slice(0, -1).join(" ") || "");
        setLastName(parts.slice(-1).join(" ") || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setUserName(user.userName || "");
        setYearOfBirth(user.yearOfBirth?.toString() || "");
        setAddress(user.address || "");
      } catch (error: unknown) {
        console.error("Lỗi lấy thông tin user:", error);
        if (axios.isAxiosError(error)) {
          const msg = error.response?.data?.message || "";
          if (msg.includes("OTP") || msg.includes("chưa xác minh")) {
            const otpInfo = error.response?.data?.otp || {};
            const type = otpInfo?.type || "verify-email";
            router.push(
              `/verify-otp?type=${type}&userId=${otpInfo?.userId}&email=${otpInfo?.email || ""}&phone=${otpInfo?.phone || ""}`
            );
          }
        }
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("❗ Vui lòng nhập đầy đủ họ và tên.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("❗ Email không hợp lệ.");
      return;
    }
    if (!phone.match(/^\d{10}$/)) {
      alert("❗ Số điện thoại phải gồm đúng 10 chữ số.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", `${firstName} ${lastName}`);
    if (email) formData.append("email", email);
    if (phone) formData.append("phone", phone);
    if (userName) formData.append("userName", userName);
    if (yearOfBirth) formData.append("yearOfBirth", yearOfBirth);
    if (address) formData.append("address", address);
    if (avatar) formData.append("avatar", avatar);

    setLoading(true);
    try {
      const result = await updateUserProfile(formData);
      console.log("API response:", result);

      if (result.success) {
        alert("✅ Cập nhật hồ sơ thành công!");
        if (result.data?.otp) {
          const { type } = result.data.otp;
          router.push(`/verify-otp?type=${type}`);
        }
      } else {
        alert("❌ Không thể cập nhật: " + result.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert("🚫 " + (error.response?.data?.message || "Lỗi server."));
      } else {
        alert("🚫 Lỗi không xác định khi cập nhật.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bgcolor="#fff" minHeight="100vh" py={10}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 8 }}>
          <MuiLink underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <Typography color="text.primary">My Account</Typography>
        </Breadcrumbs>

        <Stack spacing={2} mb={4}>
          <TextField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <TextField label="Username" value={userName} onChange={e => setUserName(e.target.value)} />
          <TextField label="Year of Birth" value={yearOfBirth} onChange={e => setYearOfBirth(e.target.value)} />
          <TextField label="Address" value={address} onChange={e => setAddress(e.target.value)} />
          <Button variant="contained" component="label">
            Upload Avatar
            <input hidden type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
          </Button>
        </Stack>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="text">Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            sx={{ bgcolor: "#ff8d2f", color: "#fff" }}
          >
            {loading ? "Đang lưu..." : "Save Changes"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Account;
