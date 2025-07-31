"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Rating, CardMedia } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Product, FlashSale } from "@/constant/type-res-api";
import {
  fetchAllProducts,
  // fetchFlashSales,
} from "@/services/axiosInstance";

import { fetchFakeFlashSales } from "../Sale/mock/fakeFlashSales";
const BestSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [flashSales, setFlashSales] = useState<FlashSale[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, flashSaleData] = await Promise.all([
          fetchAllProducts(),
          fetchFakeFlashSales(),
        ]);
        setProducts(productData);
        setFlashSales(flashSaleData);
      } catch (error) {
        console.error("Error loading best selling data:", error);
      }
    };

    loadData();
  }, []);

  const productMap: Record<string, Product> = Object.fromEntries(
    products.map((p) => [p.id, p])
  );

  const activeSales = flashSales
    .filter((sale) => sale.isActive)
    .map((sale) => {
      const product = productMap[sale.productId];

      const avgRating =
        product?.reviews && product.reviews.length > 0
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length
          : 0;

      return {
        id: sale.id,
        title: product?.name || "Unknown Product",
        bannerImage: sale.bannerImage || product?.imageUrl?.[0] || "",
        newPrice: sale.flashPrice,
        oldPrice: product?.price || 0,
        rating: avgRating,
        reviews: product?.reviews?.length || 0,
      };
    });

  return (
    <Box px={8} py={12}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        All Best Selling Products
      </Typography>

      <Grid container spacing={3}>
        {activeSales.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3}} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                image={item.bannerImage}
                alt={item.title}
                sx={{ height: 200, objectFit: "contain", p: 2 }}
              />
              <CardContent>
                <Typography fontWeight="bold">{item.title}</Typography>
                <Box display="flex" gap={1} alignItems="center" mt={1}>
                  <Typography color="primary">${item.newPrice}</Typography>
                  <Typography sx={{ textDecoration: "line-through" }}>
                    ${item.oldPrice}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                  <Rating
                    value={item.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="caption">
                    ({item.reviews} reviews)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSelling;
