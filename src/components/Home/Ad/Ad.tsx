"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import AnimatedNumberRolling from "../../AnimatedNumberRolling";

import { flashSales, productSales, FlashSaleWithProduct } from "@/data";



// Helper lấy thời gian còn lại
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
import { Product, ProductSale } from "@/data"; // giả sử dùng alias

function convertProductSaleToProduct(p: ProductSale): Product {
  return {
    id: p.id,
    title: p.title,
    image: p.image,
    oldPrice: p.oldPrice,
    newPrice: p.newPrice,
    discount: p.discount,
    rating: p.rating,
    reviews: p.reviews,
    stock: p.stock ?? 0, // fallback để tránh lỗi
    isOnSale: p.isOnSale ?? false,
    isInStock: p.stock !== undefined && p.stock > 0,
    description: p.description ?? "",
    categories: p.categories ?? [],
    saleDay: p.saleDay,
    colours: [], // tùy bạn muốn default gì
    sizes: [],
  };
}


const CountdownSaleBanner: React.FC = () => {
  const [flashSale, setFlashSale] = useState<FlashSaleWithProduct | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => getTimeDiff(new Date()));

  useEffect(() => {
    const now = new Date();
    
    // Lọc ra flash sale đang active và trong thời gian hiện tại
    const currentFlashSales = flashSales
      .filter(f =>
        f.isActive &&
        new Date(f.startTime) <= now &&
        new Date(f.endTime) > now
      )
      .sort((a, b) => a.priority - b.priority);

    if (currentFlashSales.length > 0) {
      const topSale = currentFlashSales[0];
      const product = productSales.find(p => p.id === topSale.productId);

      if (product) {
  setFlashSale({
    ...topSale,
    product: convertProductSaleToProduct(product),
  });

  setTimeLeft(getTimeDiff(new Date(topSale.endTime)));
}

    }
  }, []);

  // Cập nhật đồng hồ đếm ngược
  useEffect(() => {
    if (!flashSale) return;

    const interval = setInterval(() => {
      setTimeLeft(getTimeDiff(new Date(flashSale.endTime)));
    }, 1000);

    return () => clearInterval(interval);
  }, [flashSale]);

  if (!flashSale) return null; // Nếu không có FlashSale đang diễn ra

  return (
    <Box
      sx={{
        bgcolor: "#00c853",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: 4,
        color: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Bên trái */}
      <Box flex={1}>
        <Typography variant="subtitle2" sx={{ color: "#c8facc", mb: 1 }}>
          Flash Sale
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {flashSale.product.title}
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => {
            const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][index];
            return (
              <Box
                key={label}
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                  borderRadius: "50%",
                  width: 70,
                  height: 70,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="h6">
                  <AnimatedNumberRolling number={value} duration={0.4} />
                </Typography>
                <Typography variant="caption" fontSize={12}>
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff6f00",
            color: "#fff",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: "#ff8f00",
            },
          }}
        >
          Mua ngay
        </Button>
      </Box>

      {/* Bên phải - hình ảnh */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: { xs: 4, md: 0 } }}
      >
        <Image
          src={`/${flashSale.product.image}`} // image đã có trong public
          alt={flashSale.product.title}
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default CountdownSaleBanner;
