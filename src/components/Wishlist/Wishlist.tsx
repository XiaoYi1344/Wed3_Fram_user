"use client";

import { Box, Typography, Grid, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";

import { fetchWishlistByUserId } from "@/services/axiosInstance";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Card, CardContent } from "@/components/ui/card";
import type { WishlistItem } from "@/stores/wishlistStore";

const WishlistPage = () => {
  const { wishlist, setWishlist } = useWishlistStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = Cookies.get("user_id");
        if (!userId) throw new Error("Không tìm thấy user_id từ cookie");

        const products = await fetchWishlistByUserId(userId);
        const wishlistItems: WishlistItem[] = products.map((item) => {
          const hasNewPrice = typeof item.newPrice === "number";
          return {
            id: item.id,
            title: item.name,
            image: item.imageUrl?.[0] || "/image/no-image.jpg",
            price: hasNewPrice ? item.newPrice! : item.price,
            oldPrice: hasNewPrice ? item.price : undefined,
            discount: hasNewPrice
              ? Math.round(((item.price - item.newPrice!) / item.price) * 100)
              : undefined,
          };
        });

        setWishlist(wishlistItems);
      } catch (err) {
        console.error("Lỗi khi fetch wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [setWishlist]);

  return (
    <Box
      px={{ xs: 4, md: 10 }}
      py={10}
      sx={{
        backgroundColor: "#f5e9dc",
        minHeight: "100vh",
        backgroundImage: "url('/bg-farm-texture.png')",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{
          color: "#994d00",
          fontFamily: "'Segoe UI', sans-serif",
          textAlign: "center",
        }}
      >
        🧺 Danh sách yêu thích của bạn
      </Typography>

      {loading ? (
        <Typography textAlign="center" color="text.secondary">
          Đang tải...
        </Typography>
      ) : wishlist.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          🌾 Chưa có sản phẩm nào được yêu thích.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {wishlist.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                data-aos="zoom-in"
              >
                <Card
                  className="rounded-xl"
                  style={{
                    border: "2px solid #d68f54",
                    backgroundColor: "#fffaf3",
                    boxShadow: "4px 4px 12px rgba(153, 77, 0, 0.15)",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#fdf7f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      aspectRatio: "1 / 1",
                      width: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      loading="lazy"
                      sx={{
                        maxHeight: "90%",
                        maxWidth: "90%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        color: "#994d00",
                        fontSize: "1.05rem",
                        mb: 1,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={1}>
                      <Typography
                        fontWeight="bold"
                        sx={{ color: "#ff6600", fontSize: "1.1rem" }}
                      >
                        ${item.price}
                      </Typography>
                      {item.oldPrice && (
                        <Typography
                          sx={{
                            textDecoration: "line-through",
                            color: "#bbb",
                            fontSize: "0.9rem",
                          }}
                        >
                          ${item.oldPrice}
                        </Typography>
                      )}
                    </Box>

                    {item.discount && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "center",
                          color: "#d64b00",
                          fontStyle: "italic",
                          mt: 0.5,
                        }}
                      >
                        🎁 Giảm {item.discount}%
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
