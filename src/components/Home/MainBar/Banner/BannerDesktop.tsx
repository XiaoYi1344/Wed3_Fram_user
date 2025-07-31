"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Box, Typography } from "@mui/material";

export default function BannerDesktop() {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        mt: { sm: 5, md: 8 },
        pl: 7,
        // px: { xs: 2, sm: 2, md: 3, lg: 4 }, // padding ngang cân đối
        position: "relative",
      }}
    >
      <Card className="rounded-xl border-none shadow-none w-full h-full">
        <CardContent className="p-0 relative w-full h-full">
          <Box
            sx={{
              position: "relative",
              width: "97%",
              height: {
                sm: "300px",
                md: "360px",
                lg: "420px",
              },
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/img/Group.webp"
              alt="Fresh everyday banner"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <Typography
              component="h1"
              sx={{
                position: "absolute",
                bottom: "29%",
                left: "36px",
                fontWeight: 700,
                fontSize: { xs: "32px", sm: "42px", md: "56px" },
                whiteSpace: "pre-line",
                color: "#2e7d32",
              }}
            >
              {"Fresh\neveryday"}
            </Typography>

            <Typography
              component="p"
              sx={{
                position: "absolute",
                top: "18%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                color: "white",
                // fontWeight: 600,
                fontSize: { xs: "20px", sm: "26px", md: "32px" },
                whiteSpace: "pre-line",
                lineHeight: 1.1,
              }}
            >
              {"20%\nOFF"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
