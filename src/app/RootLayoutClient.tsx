"use client";

import React from "react";
import Footer from "@/components/Footer/Footer";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Khởi tạo QueryClient một lần
const queryClient = new QueryClient();

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ProductProvider>
          <ResponsiveNav />
          {children}
          <ToastContainer
            style={{ zIndex: 9999 }}
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
          <Footer />
        </ProductProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
