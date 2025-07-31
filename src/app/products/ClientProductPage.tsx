// app/components/Home/Product/ClientProductPage.tsx
"use client";

import dynamic from "next/dynamic";

const ProductListPage = dynamic(() => import("@/components/Home/Product/Product/ProductListPage"), {
  ssr: false,
});

export default function ClientProductPage() {
  return <ProductListPage />;
}
