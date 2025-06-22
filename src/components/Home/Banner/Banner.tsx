import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const Banner: React.FC = () => {
  return (
    <Card className="rounded-none border-0 shadow-none w-[970px] h-[467.75px] mt-10">
      <CardContent className="p-0 relative w-full h-full">
        <Box
          sx={{
            position: "relative",
            width: "978px",
            height: "390px",
            marginTop: "75px",
          }}
        >
          <Image
            src="/img/Group.png"
            alt="Fresh everyday banner"
            fill
            sizes="(max-width: 768px) 100vw, 75vw"
            style={{ objectFit: "cover" }}
            priority
          />

          {/* Text overlay */}
          <Box
            sx={{
              position: "absolute",
              top: "50%", // hoặc 82px nếu lấy theo toàn trang
              left: "40px", // hoặc 40–50 tùy bạn canh
              transform: "translateY(-50%)",
              color: "#2e7d32",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                whiteSpace: "pre-line",
                fontSize: "60px",
              }}
            >
              {`Fresh\neveryday`}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "45%",
              transform: "translateY(10%)",
              color: "white",
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              width: "fit-content",
              fontSize: "30px",
              whiteSpace: "pre-line",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            {`20%\nOFF`}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner;
