"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Container,
  Divider,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const router = useRouter();
  const { checkoutItems } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const userId = Cookies.get("user_id");

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // ✅ luôn gọi useMemo trước mọi return
  const orders = useMemo(() => {
    if (!userId) return [];
    return checkoutItems[userId] || [];
  }, [checkoutItems, userId]);

  const totalPrice = useMemo(() => {
    return orders.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }, [orders]);

  const handleCancelOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCancelDialogOpen(true);
  };

  const submitCancelRequest = () => {
    if (!selectedOrderId || !cancelReason.trim()) return;

    console.log("🛑 Hủy đơn:", selectedOrderId, "Lý do:", cancelReason);

    setCancelDialogOpen(false);
    setCancelReason("");
    setSelectedOrderId(null);
    alert("Yêu cầu hủy đơn đã được gửi. Vui lòng chờ duyệt.");
  };

  const handleTrackOrder = (orderId: string) => {
    router.push(`/orders/track?id=${orderId}`);
  };

  // 🛑 Sau khi đã khai báo hook xong, mới bắt đầu return
  if (!isLoggedIn || !userId) {
    return (
      <Container maxWidth="md" sx={{ mt: 40, textAlign: "center" }}>
        <Typography variant="h6">Bạn cần đăng nhập để xem đơn hàng.</Typography>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 40, textAlign: "center" }}>
        <Typography variant="h6">Bạn chưa có đơn hàng nào.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 40 }}>
      <Typography variant="h5" gutterBottom>
        Đơn hàng của bạn
      </Typography>

      <Stack spacing={3} divider={<Divider />}>
        {orders.map((item) => (
          <Card
            key={item.id}
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 2 }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                objectFit: "cover",
                mr: 2,
              }}
              image={item.image}
              alt={item.name}
            />
            <CardContent sx={{ flex: 1, px: 0 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Số lượng: {item.quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Giá: {item.price.toLocaleString()}₫
              </Typography>
              <Box mt={2} display="flex" gap={1}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleCancelOrder(item.id)}
                >
                  Hủy đơn
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleTrackOrder(item.id)}
                >
                  Theo dõi đơn
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box mt={4} textAlign="right">
        <Typography variant="h6">
          Tổng cộng: {totalPrice.toLocaleString()}₫
        </Typography>
      </Box>

      {/* Dialog chọn lý do hủy đơn */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Lý do hủy đơn</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Vui lòng nhập lý do hủy..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" color="error" onClick={submitCancelRequest}>
            Gửi yêu cầu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrdersPage;
