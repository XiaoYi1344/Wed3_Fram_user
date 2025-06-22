"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Rating,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { motion, AnimatePresence } from "framer-motion";

import { flashSales, products } from "@/data";
import { useWishlistStore } from "@/stores/wishlistStore"; // <-- IMPORT zustand store

const BestSale = () => {
  const router = useRouter();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  const activeFlashSales = flashSales
    .filter((item) => item.isActive)
    .map((item) => ({
      ...item,
      ...productMap[item.productId],
    }))
    .slice(0, 4);

  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>(
    {}
  );

  // ✅ Sync likedProducts state with zustand wishlist (on initial load)
  useEffect(() => {
    const likedState: Record<string, boolean> = {};
    wishlist.forEach((item) => {
      likedState[item.id] = true;
    });
    setLikedProducts(likedState);
  }, [wishlist]);

  const toggleLike = (item: (typeof activeFlashSales)[number]) => {
    const id = item.id.toString(); // ✅ Ép kiểu

    const isLiked = likedProducts[id];
    const updated = { ...likedProducts };

    if (isLiked) {
      delete updated[id];
      removeFromWishlist(id);
    } else {
      updated[id] = true;
      addToWishlist({
        id: item.id.toString(), // nếu item.id là number, cần ép sang string
        title: item.title,
        image: item.bannerImage, // ✅ dùng đúng key: 'image' chứ không phải 'bannerImage'
        price: item.newPrice,
        oldPrice: item.oldPrice,
        discount: item.discount,
      });
    }

    setLikedProducts(updated);
  };

  return (
    <Box px={8} py={14}>
      {/* Header */}
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
          This Month
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={3}
        px={1}
      >
        <Typography variant="h4" fontWeight="bold">
          Best Selling Products
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ bgcolor: "#ff8d2f" }}
          onClick={() => router.push("/best-selling")}
        >
          View All
        </Button>
      </Box>

      <Grid container spacing={3}>
        {activeFlashSales.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
            <Card className="relative h-full flex flex-col justify-between border-none shadow-none rounded-md">
              <Box
                display="flex"
                justifyContent="space-between"
                height="100%"
                position="relative"
              >
                <Box
                  p={1}
                  display="flex"
                  flexDirection="column"
                  position="absolute"
                  right={0}
                  top="1vh"
                  sx={{ zIndex: 1 }}
                >
                  <Button
                    onClick={() => toggleLike(item)}
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

              <Box
                sx={{
                  mt: "-13vh",
                  width: "100%",
                  height: "300%",
                  aspectRatio: "1 / 1",
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "30px",
                  overflow: "hidden",
                  position: "relative",
                  "&:hover .add-to-cart-btn": {
                    bottom: 0,
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.bannerImage}
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
                <Box
                  className="add-to-cart-btn"
                  sx={{
                    position: "absolute",
                    bottom: "-30%",
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
                  onClick={() => {
                    console.log(`Thêm ${item.title} vào giỏ hàng`);
                  }}
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSale;
