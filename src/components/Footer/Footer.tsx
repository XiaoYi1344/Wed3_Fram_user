"use client";

import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
// import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter, CiLinkedin } from "react-icons/ci";
import { SlSocialInstagram } from "react-icons/sl";
import { IoMdSend } from "react-icons/io";
import Link from "next/link";

const Footer = () => {
  return (
    <Box >
    <Box sx={{ bgcolor: "#000", color: "#fff", px: 6, pt: 8, pb: 2 }}>
      <Grid container spacing={4}>
        {/* Exclusive & Subscribe */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Exclusive
          </Typography>
          <Typography variant="subtitle2" mb={1}>
            Subscribe
          </Typography>
          <Typography variant="body2" mb={2}>
            Get 10% off your first order
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              placeholder="Enter your email"
              variant="filled"
              size="small"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: { bgcolor: "#fff", borderRadius: 1 },
              }}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <Button
              //   variant="contained"
              sx={{
                minWidth: "70px",
                bgcolor: "#ffffff",
                color: "#000",
                "&:hover": { bgcolor: "#00e640" },
              }}
            >
              <IoMdSend />
            </Button>
          </Stack>
        </Grid>

        {/* Support */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Support
          </Typography>
          <Typography variant="body2">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh
          </Typography>
          <Typography variant="body2" mt={1}>
            exclusive@gmail.com
          </Typography>
          <Typography variant="body2" mt={1}>
            +88015-88888-9999
          </Typography>
        </Grid>

        {/* // Account Section */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Account
          </Typography>
          <Stack spacing={1}>
            <Link href="/account" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                My Account
              </Typography>
            </Link>
            <Stack spacing={0.5} direction="row">
              <Link href="/login" passHref >
                <Typography
                  variant="body2"
                  // component="a"
                  sx={{
                    color: "#fff",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      color: "#ccc",
                    },
                  }}
                >
                  Login
                </Typography>
              </Link>

              <Typography>/</Typography>
                  
              <Link href="/signup" passHref >
                <Typography
                  variant="body2"
                  // component="a"
                  sx={{
                    color: "#fff",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      color: "#ccc",
                    },
                  }}
                >
                  Register
                </Typography>
              </Link>
            </Stack>

            <Link href="/cart" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                Cart
              </Typography>
            </Link>
            <Link href="/wishlist" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                Wishlist
              </Typography>
            </Link>
            <Link href="/shop" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                Shop
              </Typography>
            </Link>
          </Stack>
        </Grid>

        {/* // Quick Link Section */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Quick Link
          </Typography>
          <Stack spacing={1}>
            <Link href="/policy" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/term" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                Terms Of Use
              </Typography>
            </Link>
            <Link href="/faq" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                FAQ
              </Typography>
            </Link>
            <Link href="/contact" passHref >
              <Typography
                variant="body2"
                // component="a"
                className="text-white hover:scale-105 hover:text-gray-300 transition-all duration-200"
              >
                Contact
              </Typography>
            </Link>
          </Stack>
        </Grid>

        {/* Download App */}
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Download App
          </Typography>
          <Typography variant="body2" mb={1}>
            Save $3 with App New User Only
          </Typography>
          {/* <Box mb={2}>
            <Image
              src="/img/qrcode.png" // Đảm bảo có ảnh này trong thư mục public/img
              alt="QR code"
              width={80}
              height={80}
              style={{ backgroundColor: "#fff" }}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Image
              src="/img/googleplay.png"
              alt="Google Play"
              width={100}
              height={30}
            />
            <Image
              src="/img/appstore.png"
              alt="App Store"
              width={100}
              height={30}
            />
          </Stack> */}
          {/* Social icons */}
          <Stack direction="row" spacing={2} mt={4}>
            <FaFacebookF />
            <CiTwitter />
            <SlSocialInstagram />
            <CiLinkedin />
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "#444" }} />

      {/* Footer bottom */}
      <Typography variant="body2" textAlign="center" color="gray">
        © Copyright Rimel 2022. All right reserved
      </Typography>
    </Box>
    </Box>
  );
};

export default Footer;
