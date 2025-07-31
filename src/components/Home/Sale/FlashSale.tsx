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
// import { fetchFlashSales } from "@/services/axnstance";iosI
import { fetchFakeFlashSales } from "./mock/fakeFlashSales";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

const SmartCountdownSale = dynamic(() => import("./SmartCountdownSale"), {
  ssr: false,
});

export default function FlashSales() {
  const [items, setItems] = useState<(FlashSale & { product: Product })[]>([]);

  useEffect(() => {
    fetchFakeFlashSales().then(setItems).catch(console.error);
  }, []);

  return (
    <Box px={4} py={10}>
      <Typography variant="h4" fontWeight="bold">Flash Sales</Typography>

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
          gridTemplateColumns="repeat(auto-fill, minmax(250px,1fr))"
          gap={2}
          mt={3}
        >
          {items.map((s) => (
            <Card key={s.id}>
              <CardMedia
                component="img"
                image={s.product.imageUrl[0]}
                alt={s.product.name}
                height={200}
              />
              <CardContent>
                <Typography noWrap fontWeight="medium">
                  {s.product.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography color="error" fontWeight="bold">
                    {s.flashPrice.toLocaleString()}đ
                  </Typography>
                  <Typography
                    sx={{ textDecoration: "line-through", color: "gray" }}
                  >
                    {s.product.price.toLocaleString()}đ
                  </Typography>
                </Stack>
                <Typography variant="caption">
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
