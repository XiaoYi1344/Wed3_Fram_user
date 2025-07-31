"use client";

import React, {
  useEffect,
  useState,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMediaQuery, useTheme } from "@mui/material";
import { Product, Category } from "@/constant/type-res-api";

const SideBarMobile = dynamic(() => import("./SideBarMobile"), { ssr: false });
const SideBarDesktop = dynamic(() => import("./SideBarDesktop"), {
  ssr: false,
});

const Sidebar = ({ closeSidebar }: { closeSidebar?: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [{ fetchCategories }, { fetchAllProducts }] = await Promise.all([
          import("@/services/axiosInstance").then((m) => ({
            fetchCategories: m.fetchCategories,
          })),
          import("@/services/axiosInstance").then((m) => ({
            fetchAllProducts: m.fetchAllProducts,
          })),
        ]);

        const [categoryRes, productRes] = await Promise.all([
          fetchCategories(),
          fetchAllProducts(),
        ]);

        setCategories(
          categoryRes.filter((c: Category) => c?.id && c?.name) || []
        );

        setProducts(productRes);
      } catch (err) {
        console.error("Failed to fetch sidebar data", err);
      }
    };

    loadData();
  }, []);

  const navigateToProduct = useCallback(
    (categoryName: string, productName: string) => {
      const category = categories.find((c) => c.name === categoryName);
      if (!category) return;
      router.push(
        `/category/${category.id}/${encodeURIComponent(productName)}`
      );
      closeSidebar?.();
    },
    [categories, closeSidebar, router]
  );

  const commonProps = useMemo(
    () => ({
      categories,
      products,
      onNavigate: navigateToProduct,
      closeSidebar,
    }),
    [categories, products, navigateToProduct, closeSidebar]
  );

  return (
    <Suspense
      fallback={
        <div className="h-[200px] w-full bg-gray-200 animate-pulse rounded-md" />
      }
    >
      {isMobile ? (
        <SideBarMobile {...commonProps} />
      ) : (
        <SideBarDesktop {...commonProps} />
      )}
    </Suspense>
  );
};

export default Sidebar;
