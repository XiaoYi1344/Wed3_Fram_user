"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Breadcrumbs,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";

const AddressBook = () => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [phone, setPhone] = useState("");

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://192.168.1.100:3001/api/user/get-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const user = res.data.data;
      const userAddress = user.address ? [user.address] : [];
      const userPhone = user.phone || "";

      setAddresses(userAddress);
      setPhone(userPhone);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const handleSaveAddress = () => {
    if (!newAddress.trim()) return;

    const updated = [...addresses];

    if (editIndex !== null) {
      updated[editIndex] = newAddress;
    } else {
      updated.push(newAddress);
    }

    setAddresses(updated);
    setNewAddress("");
    setEditIndex(null);
  };

  const handleDeleteAddress = (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewAddress(addresses[index]);
  };

  const handleUpdateServer = async () => {
    try {
      await axios.put(
        "http://192.168.1.100:3001/api/user/update-address",
        {
          address: addresses[0] || "",
          phone: phone || "",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("Updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <Box bgcolor="#fff" minHeight="100vh" py={20}>
      <Container maxWidth="md">
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <MuiLink underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <Link href="/account/profile" passHref legacyBehavior>
            <MuiLink underline="hover" color="inherit">
              My Account
            </MuiLink>
          </Link>
          <Typography color="text.primary">Address Book</Typography>
        </Breadcrumbs>

        <Typography variant="h5" fontWeight={600} mb={3}>
          Manage Your Addresses
        </Typography>

        {/* Phone Number */}
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Address List */}
        <Stack spacing={2} mb={4}>
          {addresses.map((addr, idx) => (
            <Paper
              key={idx}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{addr}</Typography>
              <Box>
                <IconButton onClick={() => handleEdit(idx)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteAddress(idx)}>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Stack>

        {/* Add / Edit Address */}
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mb={2}>
          <TextField
            label={editIndex !== null ? "Edit Address" : "New Address"}
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleSaveAddress}
            sx={{ bgcolor: "#ff8d2f", "&:hover": { bgcolor: "#e67c1f" } }}
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </Stack>

        {/* Save to DB */}
        <Button variant="outlined" onClick={handleUpdateServer}>
          Save All Changes
        </Button>
      </Container>
    </Box>
  );
};

export default AddressBook;
