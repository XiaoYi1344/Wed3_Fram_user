"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { products } from "@/data";
import type { Product as ProductType } from "@/data";

// Chia sản phẩm thành các nhóm 8 item
const chunkProducts = (arr: ProductType[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const Product = () => {
   const router = useRouter();
  const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const productGroups = chunkProducts(products, 8); // 8 sản phẩm / slide

  return (
    <Box px={8} py={4}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Box sx={{ width: 20, height: 40, bgcolor: "#ff8d2f", borderRadius: "15%" }} />
        <Typography variant="h6" fontWeight="bold" color="#ff8d2f">
          Our Products
        </Typography>
      </Box>

      {/* Title */}
      <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={2} px={1}>
        <Typography variant="h4" fontWeight="bold">
          Explore Our Products
        </Typography>
      </Box>

      {/* Carousel */}
      <Carousel opts={{ align: "start" }} className="w-full relative mt-7">
        <CarouselContent>
          {productGroups.map((group, index) => (
            <CarouselItem key={index} className="w-full">
              <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {group.map((item) => (
                  <Card key={item.id} className="relative flex flex-col justify-between border-none rounded-md">
                    {/* Badge & Buttons */}
                    <Box position="relative" height="100%">
                      <Chip
                        label={item.discount > 0 ? `-${item.discount}%` : "NEW"}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: "1vh",
                          left: 8,
                          zIndex: 1,
                          bgcolor: item.discount > 0 ? "#ff8d2f" : "#10b981",
                          color: "white",
                          height: 30,
                          width: 50,
                          borderRadius: "5px",
                        }}
                      />

                      <Box p={1} display="flex" flexDirection="column" position="absolute" right={0} top="1vh">
                        <Button
                          onClick={() => toggleLike(item.id)}
                          disableRipple
                          sx={{
                            minWidth: 0,
                            bgcolor: "white",
                            borderRadius: "100%",
                            color: likedProducts[item.id] ? "#dc2626" : "#4b5563",
                            "&:hover": { color: "#ef4444" },
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {likedProducts[item.id] ? (
                              <motion.span
                                key="filled"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FavoriteIcon />
                              </motion.span>
                            ) : (
                              <motion.span
                                key="outlined"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FavoriteBorderIcon />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>

                        <Button
                          sx={{
                            mt: 1,
                            minWidth: 0,
                            bgcolor: "white",
                            color: "black",
                            borderRadius: "100%",
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon />
                        </Button>
                      </Box>
                    </Box>

                    {/* Image */}
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      onClick={() => handleClick(item.id)}
                      style={{ objectFit: "contain", marginTop: "-10px" }}
                      className="bg-gray-100 py-10 px-4 h-[250px]"
                    />

                    {/* Info */}
                    <CardContent className="flex flex-col gap-2 flex-grow">
                      <Typography variant="body1" fontWeight="medium">{item.title}</Typography>
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
                ))}
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel controls */}
        <Box sx={{ position: "absolute", right: "10%", top: "-9%" }}>
          <CarouselPrevious />
          <CarouselNext />
        </Box>
      </Carousel>

      {/* Button */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" size="large" sx={{ bgcolor: "#ff8d2f" }}>
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default Product;
