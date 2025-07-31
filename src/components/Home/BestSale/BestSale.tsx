"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/Home/Product/Product/ProductCard";
import { Product } from "@/constant/type-res-api";
import { fetchAllProducts } from "@/services/axiosInstance";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSale = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const all = await fetchAllProducts();
        const sorted = all
          .filter((p) => p.price > 0)
          .sort((a, b) => a.price - b.price)
          .slice(0, 12); // Tùy chọn hiển thị thêm nếu muốn
        setProducts(sorted);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    loadProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Box px={8} py={14}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Box
          sx={{
            width: 20,
            height: 40,
            bgcolor: "#ff8d2f",
            borderRadius: "15%",
          }}
        />
        <Typography variant="h6" fontWeight="bold" color="#ff8d2f">
          Giá tốt nhất
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Sản phẩm giá rẻ nổi bật
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "#ff8d2f" }}
          onClick={() => router.push("/best-price")}
        >
          Xem tất cả
        </Button>
      </Box>

      <Slider {...settings}>
        {products.map((product) => (
          <Box key={product.id} px={1}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default BestSale;
