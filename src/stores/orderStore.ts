// src/stores/orderStore.ts
import { create } from "zustand";

export type OrderStatus = "pending" | "paid" | "failed";

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface Order {
  buyerEmail: string;
  buyerPhone: string;
  cartItems: Product[];
  amount: number; // VND
  amountInEth?: string; // ✅ Thêm dòng này nếu bạn cần riêng
  amountInToken?: string;
  walletAddress?: string;
  token?: "ETH" | "PZO" | "SepoliaETH"|"BNBTestnet";
  paymentMethod: "card" | "crypto" | "cod";
  status?: OrderStatus;
  txHash?: string;
}

type OrderStore = {
  latestOrder: Order | null;
  setLatestOrder: (order: Order) => void;
  clearLatestOrder: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  latestOrder: null,
  setLatestOrder: (order) => set({ latestOrder: order }),
  clearLatestOrder: () => set({ latestOrder: null }),
}));
