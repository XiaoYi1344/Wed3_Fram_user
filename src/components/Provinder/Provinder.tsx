"use client";

import { CartProvider } from "@/context/CartContext";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviders,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProviders client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProviders>
  );
}
