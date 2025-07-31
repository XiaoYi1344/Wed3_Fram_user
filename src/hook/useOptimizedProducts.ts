// hooks/useOptimizedProducts.ts
import { useEffect, useState } from "react";
import { fetchCategories, fetchProductsByCategoryId } from "@/services/axiosInstance";
import { Product, Category } from "@/constant/type-res-api";

interface OptimizedProductState {
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
  isLoading: boolean;
  error: string | null;
}

export const useOptimizedProducts = (): OptimizedProductState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const load = async () => {
    try {
      const categoryRes = await fetchCategories(); // ✅ là Category[]
      setCategories(categoryRes);

      const fetches = await Promise.all(
        categoryRes.map((c) =>
          fetchProductsByCategoryId(String(c.id)).then((res) => ({
            categoryId: c.id,
            products: res, // ✅ là Product[]
          }))
        )
      );

      const mapped: Record<string, Product[]> = {};
      fetches.forEach(({ categoryId, products }) => {
        mapped[categoryId] = products;
      });

      setProductsByCategory(mapped);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  load();
}, []);

  return { categories, productsByCategory, isLoading, error };
};
