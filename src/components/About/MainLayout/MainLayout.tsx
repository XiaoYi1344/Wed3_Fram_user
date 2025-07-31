"use client";

import React from "react";
import { Stack, Typography, Box, Breadcrumbs } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const MainLayout: React.FC = () => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <Stack pt={30} pb={10} spacing={4}>
      {/* Breadcrumb */}
      <Stack px={{ xs: 2, md: 14, lg: 20 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography color="inherit" sx={{ "&:hover": { color: "black" } }}>
              Home
            </Typography>
          </Link>
          <Typography color="textPrimary">Contact</Typography>
        </Breadcrumbs>
      </Stack>

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        mt={4}
      >
        {/* Left side - Text */}
        <Box flex={1} px={{ xs: 2, md: 14, lg: 20 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            fontSize={35}
            fontFamily="inherit"
          >
            Our Story
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1">
              Launched in 2015, Exclusive is South Asia’s premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by a wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 million customers across the region.
            </Typography>
            <Typography variant="body1">
              Exclusive has more than 1 Million products to offer, growing very
              fast. Exclusive offers a diverse assortment in categories ranging
              from consumer.
            </Typography>
          </Stack>
        </Box>

        {/* Right side - Image */}
        <Box
          flexShrink={0}
          position="relative"
          width={705}
          height={609}
          ml="auto"
        >
          <Image
            src={hasError ? "/image/no-img.jpg" : "/img/about.webp"}
            alt="About"
            fill
            priority
            onError={() => setHasError(true)}
            style={{ objectFit: "cover", borderRadius: "5px" }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default MainLayout;
