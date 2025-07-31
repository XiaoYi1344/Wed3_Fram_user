"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  userId: string;
};

type CartStore = {
  cart: CartItem[];
  checkoutItems: Record<string, CartItem[]>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  removeItemsFromCart: (ids: string[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCheckoutItems: (userId: string, items: CartItem[]) => void;
  getCheckoutItemsByUser: (userId: string) => CartItem[];
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      checkoutItems: {},
      addToCart: (item) =>
        set((state) => {
          if (!item.userId) {
            console.warn("User chưa đăng nhập - không thể thêm vào giỏ hàng.");
            return state;
          }

          const exists = state.cart.find(
            (i) => i.id === item.id && i.userId === item.userId
          );

          if (exists) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.userId === item.userId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      removeItemsFromCart: (ids) =>
        set((state) => ({
          cart: state.cart.filter((item) => !ids.includes(item.id)),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      setCheckoutItems: (userId, items) =>
        set((state) => ({
          checkoutItems: {
            ...state.checkoutItems,
            [userId]: items,
          },
        })),
      getCheckoutItemsByUser: (userId) => {
        return get().checkoutItems[userId] || [];
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
