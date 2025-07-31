"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { fetchFakeFlashSales } from "../Sale/mock/fakeFlashSales";
import AnimatedNumberRolling from "../../AnimatedNumberRolling";
import { FlashSale, Product } from "@/constant/type-res-api";

type FlashSaleWithProduct = FlashSale & { product: Product };

const getTimeDiff = (endDate: Date) => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
  const minutes = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

  return { days, hours, minutes, seconds };
};

const CountdownSaleBanner: React.FC = () => {
  const [flashSale, setFlashSale] = useState<FlashSaleWithProduct | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => getTimeDiff(new Date()));

  useEffect(() => {
    const fetchCurrentFlashSale = async () => {
      try {
        const res = await fetchFakeFlashSales();
        const now = new Date();

        const activeSales = res
          .filter(
            (f) =>
              f.isActive &&
              new Date(f.startTime) <= now &&
              new Date(f.endTime) > now
          )
          .sort((a, b) => a.priority - b.priority);

        if (activeSales.length > 0) {
          const topSale = activeSales[0];
          setFlashSale(topSale);
          setTimeLeft(getTimeDiff(new Date(topSale.endTime)));
        }
      } catch (error) {
        console.error("Error fetching flash sales:", error);
      }
    };

    fetchCurrentFlashSale();
  }, []);

  useEffect(() => {
    if (!flashSale) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeDiff(new Date(flashSale.endTime)));
    }, 1000);
    return () => clearInterval(interval);
  }, [flashSale]);

  if (!flashSale) return null;

  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: { xs: 3, md: 5 },
        mt: 6,
        mx: 3,
        background: "linear-gradient(135deg, #ff6f61, #ff8f00)",
        color: "#fff",
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      {/* Left Content */}
      <Box flex={1}>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          🔥 Đang diễn ra
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={1}
          mb={3}
          sx={{ lineHeight: 1.2 }}
        >
          {flashSale.product.name}
        </Typography>

        <Box display="flex" gap={2} mb={4} flexWrap="wrap">
          {["Ngày", "Giờ", "Phút", "Giây"].map((label, index) => {
            const value = [
              timeLeft.days,
              timeLeft.hours,
              timeLeft.minutes,
              timeLeft.seconds,
            ][index];
            return (
              <Box
                key={label}
                sx={{
                  background: "linear-gradient(145deg, #fff, #f4f4f4)",
                  color: "#333",
                  borderRadius: 2,
                  width: 70,
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  <AnimatedNumberRolling number={value} duration={0.4} />
                </Typography>
                <Typography variant="caption">{label}</Typography>
              </Box>
            );
          })}
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ffffff",
            color: "#ff6f00",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            textTransform: "none",
            borderRadius: "999px",
            "&:hover": {
              backgroundColor: "#fff3e0",
            },
          }}
        >
          Mua ngay
        </Button>
      </Box>

      {/* Product Image */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={{ xs: 4, md: 0 }}
      >
        <Image
          src={flashSale.product.imageUrl?.[0] || "/fallback.jpg"}
          alt={flashSale.product.name}
          width={320}
          height={320}
          style={{ objectFit: "contain", borderRadius: 20 }}
        />
      </Box>
    </Box>
  );
};

export default CountdownSaleBanner;
