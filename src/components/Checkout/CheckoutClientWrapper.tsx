'use client';

import dynamic from "next/dynamic";

// Chỉ định dynamic import với ssr: false ở client
const CheckoutPage = dynamic(() => import("@/components/Checkout/Checkout"), { ssr: false });

export default function CheckoutClientWrapper() {
  return <CheckoutPage />;
}
