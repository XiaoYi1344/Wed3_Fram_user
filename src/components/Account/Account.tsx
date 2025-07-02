"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  TextField,
  Button,
  Stack,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { getUserProfile, updateUserProfile } from "@/services/userService";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
        setAddress(user.address || "");
      } catch (error: unknown) {
        router.push("/login");
        console.log("Error userEffect:", error);
      }
    };

    fetchUser();
  }, [router]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("fullName", `${firstName} ${lastName}`);
    formData.append("email", email);
    formData.append("address", address);

    setLoading(true);
    try {
      const result = await updateUserProfile(formData);
      if (result.success) {
        alert("✅ Cập nhật thành công!");
      } else {
        alert("❌ Lỗi cập nhật: " + result.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("🚫 " + error.message);
      } else {
        alert("🚫 Lỗi server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bgcolor="#fff" minHeight="100vh" py={20}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <Typography color="text.primary">My Account</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Left Sidebar */}
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
            <Typography fontWeight={600} fontSize="1rem" mb={2}>
              Manage My Account
            </Typography>
            <List
              component="nav"
              dense
              subheader={
                <ListSubheader component="div" disableSticky>
                  Manage My Account
                </ListSubheader>
              }
            >
              <ListItemButton selected component="div">
                <ListItemText primary="My Profile" />
              </ListItemButton>

              <ListItemButton component="div">
                <ListItemText primary="Address Book" />
              </ListItemButton>

              <ListItemButton component="div">
                <ListItemText primary="My Payment Options" />
              </ListItemButton>
            </List>
            <Typography fontWeight={600} mt={4} mb={1}>
              My Orders
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="My Returns" />
              </ListItem>
              <ListItem>
                <ListItemText primary="My Cancellations" />
              </ListItem>
            </List>
            <Typography fontWeight={600} mt={4}>
              My Wishlist
            </Typography>
          </Grid>

          {/* Right Profile Form */}
          <Grid size={{ xs: 12, md: 3, lg: 9 }}>
            <Box
              p={4}
              borderRadius={2}
              boxShadow={1}
              maxWidth={1300}
              sx={{ backgroundColor: "#fafafa" }}
            >
              <Typography variant="h6" fontWeight={600} color="#ff8d2f" mb={3}>
                Edit Your Profile
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography fontWeight={600} mb={2}>
                Password Changes
              </Typography>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Current Password"
                  type="password"
                />
                <TextField
                  fullWidth
                  placeholder="New Password"
                  type="password"
                />
                <TextField
                  fullWidth
                  placeholder="Confirm New Password"
                  type="password"
                />
              </Stack>

              <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="text">Cancel</Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={loading}
                  sx={{ backgroundColor: "#ff8d2f", color: "#fff" }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Account;
