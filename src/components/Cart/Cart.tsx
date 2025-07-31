"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, setCheckoutItems } =
    useCartStore();

  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const id = Cookies.get("user_id");
    if (!id) {
      setIsAuthenticated(false);
    } else {
      setUserId(id);
    }
  }, []);

  const userCart = useMemo(
    () => cart.filter((item) => item.userId === userId),
    [cart, userId]
  );

  const selectedProducts = useMemo(
    () => userCart.filter((item) => selectedItems.includes(item.id)),
    [userCart, selectedItems]
  );

  const subtotal = useMemo(
    () =>
      selectedProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [selectedProducts]
  );

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRemoveSelectedItems = () => {
    if (selectedItems.length === 0) return;
    selectedItems.forEach((id) => removeFromCart(id));
    setSelectedItems([]);
  };

  const handleCheckout = () => {
    if (selectedProducts.length === 0) return alert("Chọn ít nhất 1 sản phẩm.");
    if (!userId) return alert("Không xác định được người dùng.");

    setCheckoutItems(userId, selectedProducts); // ✅ đúng tham số
    router.push("/checkout");
  };

  if (!isAuthenticated) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h6" color="error" gutterBottom>
          Bạn chưa đăng nhập!
        </Typography>
        <Button variant="contained" onClick={() => router.push("/login")}>
          Đăng nhập ngay
        </Button>
      </Box>
    );
  }

  return (
    <motion.div
      style={{ padding: 32, backgroundColor: "#f9f9f9", minHeight: "100vh" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 30 }}>
        🛒 Giỏ hàng của bạn
      </Typography>

      {userCart.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Giỏ hàng trống.
        </Typography>
      ) : (
        <Box display="grid" gridTemplateColumns={{ lg: "2fr 1fr" }} gap={4}>
          {/* Cart Items */}
          <Box>
            <Stack direction="row" spacing={2} mb={2}>
              <Button
                variant="outlined"
                onClick={() => setSelectedItems(userCart.map((i) => i.id))}
              >
                Chọn tất cả
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSelectedItems([])}
                disabled={selectedItems.length === 0}
              >
                Bỏ chọn
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleRemoveSelectedItems}
                disabled={selectedItems.length === 0}
              >
                Xóa đã chọn
              </Button>
              <Button variant="text" onClick={clearCart}>
                Xóa toàn bộ
              </Button>
            </Stack>

            <Paper variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Chọn</TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="center">Giá</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="center">Tạm tính</TableCell>
                    <TableCell align="center">Xóa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userCart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              borderRadius: 8,
                              border: "1px solid #ddd",
                            }}
                          />
                          <Typography>{item.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">${item.price}</TableCell>
                      <TableCell align="center">
                        <Select
                          value={item.quantity}
                          size="small"
                          onChange={(e) =>
                            updateQuantity(item.id, Number(e.target.value))
                          }
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <MenuItem key={qty} value={qty}>
                              {qty}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="error"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            <Stack direction="row" spacing={2} mt={2}>
              <TextField
                fullWidth
                size="small"
                label="Mã giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  alert(`Mã giảm giá "${couponCode}" đã được áp dụng!`);
                  setCouponCode("");
                }}
              >
                Áp dụng
              </Button>
            </Stack>
          </Box>

          {/* Summary */}
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tóm tắt đơn hàng
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography>Tạm tính:</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography>Vận chuyển:</Typography>
              <Typography color="green">Miễn phí</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight="bold">
                Tổng cộng:
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              color="primary"
              onClick={handleCheckout}
            >
              Tiếp tục thanh toán
            </Button>
          </Paper>
        </Box>
      )}
    </motion.div>
  );
};

export default CartPage;
