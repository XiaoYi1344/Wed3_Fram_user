"use client";

import { Box, Typography, Grid, CardMedia } from "@mui/material";
import { useWishlistStore } from "@/stores/wishlistStore"; // giả sử bạn dùng Zustand
import { Card, CardContent } from "@/components/ui/card";

const WishlistPage = () => {
  const wishlistItems = useWishlistStore((state) => state.wishlist);

  return (
    <Box px={8} py={10}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Danh sách yêu thích
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography>Chưa có sản phẩm nào được yêu thích.</Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Card className="rounded-md">
                <Box
                  sx={{
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1 / 1",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <CardContent>
                  <Typography fontWeight="medium">{item.title}</Typography>
                  <Box display="flex" gap={1}>
                    <Typography fontWeight="bold">${item.price}</Typography>
                    {item.oldPrice && (
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "gray",
                        }}
                      >
                        ${item.oldPrice}
                      </Typography>
                    )}
                  </Box>
                  {item.discount && (
                    <Typography variant="caption" color="error">
                      Giảm {item.discount}%
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
