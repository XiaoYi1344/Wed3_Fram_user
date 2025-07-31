"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Rating,
} from "@mui/material";
import { FlashSale, Product } from "@/constant/type-res-api";
import { fetchFakeFlashSales } from "./mock/fakeFlashSales";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const SmartCountdownSale = dynamic(() => import("./SmartCountdownSale"), {
  ssr: false,
});

export default function FlashSales() {
  const [items, setItems] = useState<(FlashSale & { product: Product })[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFakeFlashSales();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  return (
    <Box px={4} py={10}>
      <Typography variant="h4" fontWeight="bold">
        Flash Sales
      </Typography>

      <SmartCountdownSale
        saleDays={items.map((s) => ({
          date: dayjs(s.startTime).format("YYYY-MM-DD"),
          startTime: dayjs(s.startTime).format("HH:mm:ss"),
          endTime: dayjs(s.endTime).format("HH:mm:ss"),
          title: s.product.name,
        }))}
      />

      {items.length === 0 ? (
        <Skeleton variant="rounded" height={200} />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(260px,1fr))"
          gap={3}
          mt={3}
        >
          {items.map((s) => (
            <Card
              key={s.id}
              onClick={() =>
                router.push(
                  `/product/${s.product.id}?flashPrice=${s.flashPrice}`
                )
              }
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={s.product.imageUrl[0]}
                alt={s.product.name}
                sx={{
                  height: 220,
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  fontWeight="bold"
                  gutterBottom
                  noWrap
                  sx={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    fontSize: "1rem",
                    minHeight: 48,
                  }}
                >
                  {s.product.name}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Typography
                    color="#ff5722"
                    fontWeight="bold"
                    fontSize="1.1rem"
                  >
                    {s.flashPrice.toLocaleString()}đ
                  </Typography>
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: "gray",
                      fontSize: "0.9rem",
                    }}
                  >
                    {s.product.price.toLocaleString()}đ
                  </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {dayjs(s.startTime).format("HH:mm")} -{" "}
                  {dayjs(s.endTime).format("HH:mm")}
                </Typography>

                <Rating
                  value={s.product.rating || 0}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
