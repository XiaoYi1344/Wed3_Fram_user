// context/ProductContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useOptimizedProducts } from "@/hook/useOptimizedProducts";
import { Product, Category } from "@/constant/type-res-api";

interface ProductContextType {
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
  allProducts: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const { categories, productsByCategory, isLoading, error } = useOptimizedProducts();

  // Ép kiểu để tránh lỗi Type 'unknown[]' is not assignable to type 'Product[]'
  const allProducts = Object.values(productsByCategory).flat() as Product[];

  return (
    <ProductContext.Provider
      value={{ categories, productsByCategory, allProducts, isLoading, error }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used inside ProductProvider");
  return ctx;
};
