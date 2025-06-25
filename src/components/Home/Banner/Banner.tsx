import { Card, CardContent } from "@/components/ui/card";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        height: { xs: 250, sm: 300, md: 400, lg: 470 },
        borderRadius: 0,
        boxShadow: "none",
        width: "100%",
        marginTop: { sm: 10, md: 25, lg: 6},
      }}
    >
      <Card className="rounded-none border-0 shadow-none w-full h-full">
        <CardContent className="p-0 relative w-full h-full">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src="/img/Group.png"
              alt="Fresh everyday banner"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Text overlay */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: { xs: "16px", sm: "40px" },
                transform: "translateY(-50%)",
                color: "#2e7d32",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  whiteSpace: "pre-line",
                  fontSize: { xs: "30px", sm: "45px", md: "60px" },
                }}
              >
                {`Fresh\neveryday`}
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "15%",
                left: "50%",
                transform: "translate(-50%, 10%)",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                fontSize: { xs: "16px", sm: "24px", md: "30px" },
                whiteSpace: "pre-line",
                lineHeight: 1.1,
                textAlign: "center",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              {`20%\nOFF`}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Banner;
