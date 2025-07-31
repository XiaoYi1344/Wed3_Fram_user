"use client";

import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  CardMedia,
  useMediaQuery,
  useTheme,
  Skeleton,
} from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProductsByCategoryId } from "@/services/axiosInstance";
import { Product } from "@/constant/type-res-api";

const Carousel = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.Carousel),
  { ssr: false }
);
const CarouselContent = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselContent),
  { ssr: false }
);
const CarouselItem = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselItem),
  { ssr: false }
);
const CarouselNext = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselNext),
  { ssr: false }
);
const CarouselPrevious = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselPrevious),
  { ssr: false }
);

const Categories = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const categoryIds = [1, 2, 3, 4, 5, 6, 7, 8];

        const requests = categoryIds.map((id) =>
          fetchProductsByCategoryId(String(id)).then((res) => {
            const products = res; // ✅ FIXED

            if (!products?.length) return null;

            const latest = products.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )[0];

            return latest;
          })
        );

        const results = await Promise.all(requests);
        const filtered = results.filter(Boolean) as Product[];
        setLatestProducts(filtered);
      } catch (error) {
        console.error("❌ Lỗi khi fetch sản phẩm mới nhất:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <Box px={2} py={4}>
      {/* Section Label */}
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
          Categories
        </Typography>
      </Box>

      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
        px={1}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          fontSize={{ xs: 20, sm: 24, md: 32 }}
        >
          {isMobile ? "Mobile Categories" : "Browse By Category"}
        </Typography>
      </Box>

      {/* Carousel */}
      {latestProducts.length > 0 ? (
        <Suspense fallback={<Skeleton variant="rectangular" height={200} />}>
          <Carousel opts={{ align: "start" }} className="w-full relative mt-8">
            <CarouselContent>
              {latestProducts.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/6 mt-7"
                >
                  <Card className="h-full p-4 flex flex-col items-center justify-between rounded-[30px]">
                    <CardMedia
                      component="img"
                      image={item.imageUrl?.[0] || "/image/no-image.jpg"}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/image/no-image.jpg";
                      }}
                      style={{
                        width: "80%",
                        height: 100,
                        objectFit: "contain",
                      }}
                    />
                    <CardContent className="text-center">
                      <Typography variant="body1" fontWeight="bold">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {!isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  right: { xs: "3%", sm: "13%" },
                  top: { xs: "-2%", sm: "-9%" },
                }}
              >
                <CarouselPrevious />
                <CarouselNext />
              </Box>
            )}
          </Carousel>
        </Suspense>
      ) : (
        <Skeleton variant="rounded" height={200} />
      )}
    </Box>
  );
};

export default Categories;
