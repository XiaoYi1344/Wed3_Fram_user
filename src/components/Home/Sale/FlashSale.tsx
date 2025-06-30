"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Chip,
  Rating,
  // CardHeader,
} from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion, AnimatePresence } from "framer-motion";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import CountdownTimer from "@/components/Home/Sale/CountdownTimerRolling";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SmartCountdownSale from "./SmartCountdownSale";
import { productSales } from "@/data";
import { saleDays } from "@/data";
import { useCart } from "@/hook/useCart";

// const saleDays = [
//   {
//     date: "2025-06-20",
//     startTime: "08:00:00",
//     endTime: "20:00:00",
//   },
//   {
//     date: "2025-06-22",
//     startTime: "09:00:00",
//     endTime: "18:00:00",
//   },
// ];

// interface Product {
//   id: number;
//   image: string;
//   title: string;
//   oldPrice: number;
//   newPrice: number;
//   rating: number;
//   discount: number;
//   reviews: number;
// }

// const products: Product[] = [
//   {
//     id: 1,
//     image: "fruit/mango.png",
//     title: "Mango",
//     oldPrice: 160,
//     newPrice: 120,
//     rating: 4.5,
//     discount: 25,
//     reviews: 88,
//   },
//   {
//     id: 2,
//     image: "fruit/strawberry.png",
//     title: "Strawberry",
//     oldPrice: 160,
//     newPrice: 100,
//     rating: 4.6,
//     discount: 18,
//     reviews: 75,
//   },
//   {
//     id: 3,
//     image: "fruit/banana.png",
//     title: "Banana",
//     oldPrice: 400,
//     newPrice: 370,
//     rating: 4.7,
//     discount: 20,
//     reviews: 99,
//   },
//   {
//     id: 4,
//     image: "fruit/papaya.png",
//     title: "Papaya",
//     oldPrice: 400,
//     newPrice: 375,
//     rating: 4.2,
//     discount: 35,
//     reviews: 89,
//   },
//   {
//     id: 5,
//     image: "fruit/papaya.png",
//     title: "Papaya",
//     oldPrice: 400,
//     newPrice: 375,
//     rating: 4.2,
//     discount: 35,
//     reviews: 89,
//   },
//   {
//     id: 6,
//     image: "fruit/tomato.png",
//     title: "Tomato",
//     oldPrice: 400,
//     newPrice: 375,
//     rating: 4.2,
//     discount: 35,
//     reviews: 89,
//   },
//   {
//     id: 7,
//     image: "fruit/papaya.png",
//     title: "Papaya",
//     oldPrice: 400,
//     newPrice: 375,
//     rating: 4.2,
//     discount: 35,
//     reviews: 89,
//   },
//   {
//     id: 8,
//     image: "fruit/tomato.png",
//     title: "Tomato",
//     oldPrice: 400,
//     newPrice: 375,
//     rating: 4.2,
//     discount: 35,
//     reviews: 89,
//   },
// ];

// Placeholder: Replace with actual logic
// const getNextFlashSale = () => {
//   const now = new Date();
//   now.setHours(now.getHours() + 3);
//   return now;
// };

const FlashSales = () => {
  const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>(
    {}
  );
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const products = productSales.filter(
    (p) => p.saleDay === today && p.isOnSale
  );

  const toggleLike = (id: number) => {
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const { addItem } = useCart();
  const handleAddToCart = (item: (typeof productSales)[0]) => {
    addItem({
      id: item.id,
      name: item.title,
      image: item.image,
      price: item.newPrice,
      quantity: 1,
    });
  };

  // const next = getNextFlashSale();

  return (
    <Box px={8} py={{sm: 28, md: 20}}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Box
        fontSize={{sm: 20, md: 35}}
          sx={{
            width: 20,
            height: 40,
            bgcolor: "#ff8d2f",
            borderRadius: "15%",
          }}
        />
        <Typography variant="h6" fontWeight="bold" color="#ff8d2f">
          Today&apos;s
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
        px={1}
      >
        <Typography variant="h4" fontWeight="bold" fontSize={{sm: 20, md: 35}}>
          Flash Sales
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ position: "absolute", left: "25%" }}
        >
          <SmartCountdownSale saleDays={saleDays} />
        </Box>
      </Box>

      <Carousel opts={{ align: "start" }} className="w-full relative mt-7">
        <CarouselContent>
          {products.map((item) => (
            <CarouselItem
              key={item.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5 -mt-16"
            >
              <Card className="relative h-full flex flex-col justify-between border-none shadow-none rounded-md ">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  height="100%"
                  position="relative"
                >
                  <Box>
                    <Chip
                      label={`-${item.discount}%`}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: "13vh",
                        left: 12,
                        zIndex: 1,
                        bgcolor: "#ff8d2f",
                        color: "white",
                        height: 30,
                        width: 50,
                        borderRadius: "5px",
                      }}
                    />
                  </Box>

                  <Box
                    p={1}
                    display="flex"
                    flexDirection="column"
                    position="absolute"
                    right={0}
                    top="12vh"
                    sx={{ zIndex: 1 }}
                  >
                    <Button
                      onClick={() => toggleLike(item.id)}
                      disableRipple
                      sx={{
                        minWidth: 0,
                        bgcolor: "white",
                        borderRadius: "100%",
                        color: likedProducts[item.id] ? "#dc2626" : "#4b5563",
                        "&:hover": {
                          color: "#ef4444",
                        },
                        "&:active": {
                          color: "#dc2626",
                        },
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

                {/* Nút thêm giỏ hàng */}
                <Box
                  sx={{
                    width: "100%",
                    height: "300%",
                    aspectRatio: "1 / 1",
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "30px",
                    overflow: "hidden",
                    position: "relative", // cần cho nút trượt lên
                    "&:hover .add-to-cart-btn": {
                      bottom: 0,
                      opacity: 1,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                  />

                  {/* Button trượt lên khi hover */}
                  <Box
                    className="add-to-cart-btn"
                    sx={{
                      position: "absolute",
                      bottom: "-30%", // bắt đầu ẩn bên dưới
                      left: 0,
                      width: "100%",
                      height: "18%",
                      backgroundColor: "#ff8d2f",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "bottom 0.3s ease, opacity 0.3s ease",
                      opacity: 0,
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      borderBottomLeftRadius: "30px",
                      borderBottomRightRadius: "30px",
                    }}
                    onClick={() => handleAddToCart(item)}
                  >
                    Thêm vào giỏ hàng
                  </Box>
                </Box>

                <CardContent className="flex flex-col gap-2 flex-grow">
                  <Typography variant="body1" fontWeight="medium">
                    {item.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight="bold">${item.newPrice}</Typography>
                    <Typography
                      sx={{ textDecoration: "line-through", color: "gray" }}
                    >
                      ${item.oldPrice}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Rating
                      value={item.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="caption">({item.reviews})</Typography>
                  </Box>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <Box sx={{ position: "absolute", right: "10%", top: "-9%" }}>
          <CarouselPrevious />
          <CarouselNext />
        </Box>
      </Carousel>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" size="large" sx={{ bgcolor: "#ff8d2f" }}>
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default FlashSales;
