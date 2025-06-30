"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
//   Button,
  Rating,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ProductType {
  id: number;
  product_name: string;
  variety: string;
  unit: string;
  img: string;
  newPrice?: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
}

const AllProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`);
        
        const res = await axios.get("https://retrieve-ibbn.onrender.com/api/product");
        const data = res.data?.data || [];
        console.log("Dữ liệu", res);
        

        const mockProducts = data.map((item: ProductType, index: number) => ({
          ...item,
          newPrice: 10 + index * 5,
          oldPrice: 20 + index * 5,
          rating: 3.5 + (index % 2),
          reviews: 5 + index * 2,
        }));

        setProducts(mockProducts);
      } catch (error) {
        console.error("Failed to fetch all products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box px={8} py={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Products
      </Typography>

      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {products.map((item) => {
          const images = JSON.parse(item.img || "[]");
          const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${images[0] || "uploads/no-img.jpeg"}`;

          return (
            <Card key={item.id} className="relative flex flex-col justify-between border-none rounded-md">
              <Chip
                label="NEW"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  bgcolor: "#10b981",
                  color: "white",
                  zIndex: 1,
                }}
              />

              <CardMedia
                component="img"
                image={imageUrl}
                alt={item.product_name}
                onClick={() => router.push(`/product/${item.id}`)}
                className="bg-gray-100 py-10 px-4 h-[250px]"
                style={{ objectFit: "contain", cursor: "pointer" }}
              />

              <CardContent className="flex flex-col gap-2">
                <Typography variant="body1" fontWeight="medium">
                  {item.product_name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontWeight="bold">${item.newPrice}</Typography>
                  <Typography sx={{ textDecoration: "line-through", color: "gray" }}>
                    ${item.oldPrice}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Rating value={item.rating || 0} precision={0.5} readOnly size="small" />
                  <Typography variant="caption">({item.reviews})</Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default AllProductsPage;
