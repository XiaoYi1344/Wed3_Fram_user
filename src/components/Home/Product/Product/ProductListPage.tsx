// app/components/ProductListPage.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/services/axiosInstance";
import { Category } from "@/constant/type-res-api";
import CardList1WithFilter from "./CardList1WithFilter";

export default function ProductListPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
      }
    };
    load();
  }, []);

  return <CardList1WithFilter categories={categories} />;
}