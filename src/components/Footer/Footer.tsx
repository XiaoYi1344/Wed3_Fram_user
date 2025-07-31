"use client";

import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter, CiLinkedin } from "react-icons/ci";
import { SlSocialInstagram } from "react-icons/sl";
import { IoMdSend } from "react-icons/io";
import Link from "next/link";
import React, { useState, useCallback } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handleSubscribe = useCallback(() => {
    console.log("Subscribing email:", email);
    setEmail("");
    alert("Cảm ơn bạn đã đăng ký nhận tin!");
  }, [email]);

  const accountLinks = [
    { label: "My Account", href: "/account" },
    { label: "Cart", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shop", href: "/shop" },
  ];

  const quickLinks = [
    { label: "Privacy Policy", href: "/policy" },
    { label: "Terms Of Use", href: "/term" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      href: "https://www.facebook.com/farmfresh",
    },
    {
      icon: CiTwitter,
      label: "Twitter",
      href: "https://www.twitter.com/farmfresh",
    },
    {
      icon: SlSocialInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/farmfresh",
    },
    {
      icon: CiLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/farmfresh",
    },
  ];

  return (
    <Box component="footer" mt={20} aria-label="Website Footer">
      <Box
        sx={{
          bgcolor: "#3b2f2f",
          color: "#fefefe",
          px: { xs: 3, sm: 6, md: 10 },
          pt: 8,
          pb: 4,
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 2.4}}>
            <Typography variant="h6" fontWeight="bold" mb={2} component="h2">
              FarmFresh
            </Typography>
            <Typography variant="subtitle2" mb={1} component="p">
              Subscribe
            </Typography>
            <Typography variant="body2" mb={2} component="p">
              Get 10% off your first order
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Email"
                variant="filled"
                size="small"
                fullWidth
                type="email"
                value={email}
                onChange={handleEmailChange}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    bgcolor: "#fff",
                    borderRadius: 1,
                    fontSize: "14px",
                    px: 1,
                  },
                }}
                aria-label="Nhập địa chỉ email của bạn để đăng ký nhận tin tức"
                name="email-subscribe"
                id="email-subscribe"
              />
              <Button
                onClick={handleSubscribe}
                sx={{
                  minWidth: "48px",
                  bgcolor: "#e0c097",
                  color: "#3b2f2f",
                  "&:hover": {
                    bgcolor: "#cfa96d",
                  },
                }}
                aria-label="Gửi email đăng ký nhận tin"
                title="Gửi email đăng ký"
              >
                <IoMdSend />
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4}}>
            <Typography variant="h6" fontWeight="bold" mb={2} component="h2">
              Support
            </Typography>
            <Typography variant="body2" component="address">
              111 Green Street, Da Lat, Vietnam
            </Typography>
            <Typography variant="body2" mt={1} component="p">
              <a
                href="mailto:farmfresh@gmail.com"
                aria-label="Gửi email tới farmfresh@gmail.com"
                title="Gửi email tới FarmFresh"
              >
                farmfresh@gmail.com
              </a>
            </Typography>
            <Typography variant="body2" mt={1} component="p">
              <a
                href="tel:+84888999777"
                aria-label="Gọi số điện thoại +84 888 999 777"
                title="Gọi đến FarmFresh"
              >
                +84 888 999 777
              </a>
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4}}>
            <Typography variant="h6" fontWeight="bold" mb={2} component="h2">
              Account
            </Typography>
            <Stack spacing={1} component="nav" aria-label="Menu tài khoản người dùng">
              {accountLinks.map((item) => (
                <Typography
                  key={item.href}
                  component={Link}
                  href={item.href}
                  variant="body2"
                  sx={{ color: "inherit", textDecoration: "none" }}
                  className="hover:text-[#d2b48c] transition-all duration-200"
                  title={`Đi đến trang ${item.label}`}
                >
                  {item.label}
                </Typography>
              ))}
              <Stack spacing={0.5} direction="row">
                <Typography
                  component={Link}
                  href="/login"
                  variant="body2"
                  sx={{ color: "inherit", textDecoration: "none" }}
                  className="hover:text-[#d2b48c] transition-all duration-200"
                  title="Đăng nhập vào tài khoản của bạn"
                >
                  Login
                </Typography>
                <Typography component="span" sx={{ userSelect: "none" }}>
                  /
                </Typography>
                <Typography
                  component={Link}
                  href="/signup"
                  variant="body2"
                  sx={{ color: "inherit", textDecoration: "none" }}
                  className="hover:text-[#d2b48c] transition-all duration-200"
                  title="Đăng ký tài khoản mới"
                >
                  Register
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4}}>
            <Typography variant="h6" fontWeight="bold" mb={2} component="h2">
              Quick Links
            </Typography>
            <Stack spacing={1} component="nav" aria-label="Menu liên kết nhanh">
              {quickLinks.map((item) => (
                <Typography
                  key={item.href}
                  component={Link}
                  href={item.href}
                  variant="body2"
                  sx={{ color: "inherit", textDecoration: "none" }}
                  className="hover:text-[#d2b48c] transition-all duration-200"
                  title={`Đi đến trang ${item.label}`}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4}}>
            <Typography variant="h6" fontWeight="bold" mb={2} component="h2">
              Connect With Us
            </Typography>
            <Typography variant="body2" mb={1} component="p">
              Stay updated with our farm.
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
              {socialLinks.map((social, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#fff",
                    border: "1px solid #d2b48c",
                    "&:hover": {
                      bgcolor: "#d2b48c",
                      color: "#3b2f2f",
                    },
                  }}
                  aria-label={`Visit our ${social.label} page`}
                  title={`Truy cập trang ${social.label} của chúng tôi`}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#6e5b4e" }} />

        <Typography
          variant="caption"
          textAlign="center"
          color="#ccc"
          component="p"
          aria-label={`Bản quyền FarmFresh ${new Date().getFullYear()}`}
        >
          &copy; {new Date().getFullYear()} FarmFresh. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
