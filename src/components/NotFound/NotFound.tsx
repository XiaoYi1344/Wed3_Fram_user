"use client";

import React from "react";
import {
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Stack pt={25} pb={10} spacing={4}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            underline="none"
            sx={{ "&:hover": { color: "black" }, fontSize: 14 }}
          >
            Home
          </Link>
          <Typography color="text.primary" fontSize={14}>
            404 Error
          </Typography>
        </Breadcrumbs>

        <Stack alignItems="center" textAlign="center" spacing={4}>
          {/* Title */}
          <Typography fontSize={48} fontWeight={700}>
            404 Not Found
          </Typography>

          {/* Subtitle */}
          <Typography fontSize={16} color="text.secondary">
            Your visited page not found. You may go home page.
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            color="warning"
            size="large"
            sx={{ textTransform: "none", px: 4 }}
            onClick={() => router.push("/")}
          >
            Back to home page
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFound;
