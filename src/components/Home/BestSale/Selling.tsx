// app/best-selling/page.tsx
"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Rating,
  CardMedia,

} from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { flashSales, products } from "@/data";

const Selling = () => {
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  const allActiveSales = flashSales
    .filter((item) => item.isActive)
    .map((item) => ({
      ...item,
      ...productMap[item.productId],
    }));

  return (
    <Box px={8} py={12}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        All Best Selling Products
      </Typography>

      <Grid container spacing={3}>
        {allActiveSales.map((item) => (
          <Grid size={{xs:12, sm: 6, md: 4, lg: 3}} key={item.id}>
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

export default Selling;
