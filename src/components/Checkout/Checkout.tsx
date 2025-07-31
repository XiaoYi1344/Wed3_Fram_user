// src/components/Checkout/Checkout.tsx
"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { purchaseProduct } from "@/services/web3";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import Cookies from "js-cookie";
import { getUserById } from "@/services/axiosInstance";

const paymentMethods = ["card", "crypto", "cod"] as const;
type PaymentMethod = (typeof paymentMethods)[number];

const cryptoTokens = ["ETH", "PZO", "SepoliaETH", "BNBTestnet"] as const;
type CryptoToken = (typeof cryptoTokens)[number];

const initialCardInfo = { name: "", number: "", exp: "", cvv: "" };
const recipientWallet = process.env.NEXT_PUBLIC_RECIPIENT_WALLET || "";

const vndToTokenRates: Record<CryptoToken, number> = {
  ETH: 80000000,
  PZO: 10000,
  SepoliaETH: 5000000,
  BNBTestnet: 10000000,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { getCheckoutItemsByUser, removeItemsFromCart } = useCartStore();
  const { setLatestOrder } = useOrderStore();

  const userId = Cookies.get("user_id") || "unknown";
  const userCheckoutItems = getCheckoutItemsByUser(userId);

  const { data: userData } = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId && userId !== "unknown",
    staleTime: 1000 * 60 * 5,
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedToken, setSelectedToken] = useState<CryptoToken>("ETH");
  const [cardInfo, setCardInfo] = useState(initialCardInfo);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userCheckoutItems.length === 0) router.push("/cart");
  }, [userCheckoutItems, router]);

  const amount = useMemo(
    () =>
      userCheckoutItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [userCheckoutItems]
  );

  const amountInToken = useMemo(() => {
    const rate = vndToTokenRates[selectedToken];
    return rate ? (amount / rate).toFixed(6) : "0.000000";
  }, [amount, selectedToken]);

  const connectMetamask = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast.error("🦊 Vui lòng cài đặt MetaMask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      const balance = parseInt(balanceHex, 16) / 1e18;
      setWalletAddress(address);
      setWalletBalance(balance);
      setMetamaskConnected(true);
      toast.success("🎉 Đã kết nối MetaMask!");
    } catch (error) {
      toast.error("❌ Kết nối MetaMask thất bại.");
      console.log(error);
    }
  }, []);

  const handlePayment = useCallback(async () => {
    if (!userData?.email || !userData?.phone) {
      toast.warn("📬 Vui lòng điền thông tin người dùng.");
      return;
    }

    if (paymentMethod === "card") {
      const { name, number, exp, cvv } = cardInfo;
      if (!name || !number || !exp || !cvv) {
        toast.warn("💳 Vui lòng điền đủ thông tin thẻ.");
        return;
      }
    }

    setIsLoading(true);
    const itemsWithUserId = userCheckoutItems.map((item) => ({
      ...item,
      userId,
    }));

    if (paymentMethod === "crypto") {
      if (!metamaskConnected) {
        toast.error("🦊 Hãy kết nối MetaMask.");
        setIsLoading(false);
        return;
      }

      if (walletBalance < Number(amountInToken)) {
        toast.error("❌ Số dư không đủ.");
        setIsLoading(false);
        return;
      }

      try {
        const receipt = await purchaseProduct(
          Number(itemsWithUserId[0].id),
          amountInToken
        );
        setLatestOrder({
          buyerEmail: userData.email,
          buyerPhone: userData.phone,
          paymentMethod: "crypto",
          cartItems: itemsWithUserId,
          amount,
          amountInToken,
          walletAddress,
          token: selectedToken,
          status: "pending",
          txHash: receipt.transactionHash,
        });
        removeItemsFromCart(itemsWithUserId.map((i) => i.id));
        toast.success("🎉 Thanh toán thành công!");
        router.push("/checkout/invoice");
      } catch {
        toast.error("❌ Giao dịch thất bại.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setLatestOrder({
      buyerEmail: userData.email,
      buyerPhone: userData.phone,
      paymentMethod,
      cartItems: itemsWithUserId,
      amount,
      amountInToken,
      walletAddress,
      token: selectedToken,
      status: "paid",
    });
    removeItemsFromCart(itemsWithUserId.map((i) => i.id));
    toast.success("🎉 Đặt hàng thành công!");
    router.push("/checkout/invoice");
    setIsLoading(false);
  }, [
    userData,
    paymentMethod,
    cardInfo,
    userCheckoutItems,
    amount,
    amountInToken,
    walletBalance,
    walletAddress,
    selectedToken,
    metamaskConnected,
    removeItemsFromCart,
    router,
    setLatestOrder,
    userId,
  ]);

  return (
    <Paper elevation={3} sx={{ maxWidth: 1000, mx: "auto", p: 4, mt: 20 }}>
      <Typography variant="h4" gutterBottom>
        🧾 Thanh toán
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          {userData && (
            <Box mb={3} p={2} bgcolor="#f5f5f5">
              <Typography variant="h6">📄 Thông tin khách hàng</Typography>
              <Typography>👤 {userData.name}</Typography>
              <Typography>📍 {userData.address}</Typography>
              <Typography>📧 {userData.email}</Typography>
              <Typography>📞 {userData.phone}</Typography>
            </Box>
          )}

          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              🛒 Đơn hàng
            </Typography>
            {userCheckoutItems.map((item) => (
              <Box key={item.id} display="flex" justifyContent="space-between">
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography>
                  {(item.price * item.quantity).toLocaleString()}đ
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight="bold">
              Tổng cộng: {amount.toLocaleString()}đ
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Phương thức thanh toán</InputLabel>
            <Select
              value={paymentMethod}
              label="Phương thức thanh toán"
              onChange={(e) =>
                setPaymentMethod(e.target.value as PaymentMethod)
              }
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {paymentMethod === "card" && (
            <Box>
              <TextField
                label="Tên chủ thẻ"
                fullWidth
                margin="normal"
                value={cardInfo.name}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, name: e.target.value })
                }
              />
              <TextField
                label="Số thẻ"
                fullWidth
                margin="normal"
                value={cardInfo.number}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, number: e.target.value })
                }
              />
              <Box display="flex" gap={2}>
                <TextField
                  label="MM/YY"
                  fullWidth
                  margin="normal"
                  value={cardInfo.exp}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, exp: e.target.value })
                  }
                />
                <TextField
                  label="CVV"
                  fullWidth
                  margin="normal"
                  value={cardInfo.cvv}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, cvv: e.target.value })
                  }
                />
              </Box>
            </Box>
          )}

          {paymentMethod === "crypto" && (
            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel>Token</InputLabel>
                <Select
                  value={selectedToken}
                  label="Token"
                  onChange={(e) =>
                    setSelectedToken(e.target.value as CryptoToken)
                  }
                >
                  {cryptoTokens.map((token) => (
                    <MenuItem key={token} value={token}>
                      {token}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={connectMetamask}
              >
                {metamaskConnected
                  ? "🦊 MetaMask đã kết nối"
                  : "Kết nối MetaMask"}
              </Button>

              {walletAddress && (
                <Box mt={2} p={2} bgcolor="#f9f9f9">
                  <Typography>Ví: {walletAddress}</Typography>
                  <Typography>
                    Số dư: {walletBalance.toFixed(6)} {selectedToken}
                  </Typography>
                  <Typography>
                    Cần thanh toán: {amountInToken} {selectedToken}
                  </Typography>
                  <Box mt={1}>
                    <QRCode value={recipientWallet} />
                  </Box>
                </Box>
              )}
            </Box>
          )}

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 4 }}
            disabled={isLoading}
            onClick={handlePayment}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "Đang xử lý..." : "✅ Thanh toán"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
