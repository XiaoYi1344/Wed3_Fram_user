// CardList1WithFilter.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { Category  } from "@/constant/type-res-api";
import { useProductContext } from "@/context/ProductContext";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const PRODUCTS_PER_PAGE = 6;

export default function CardList1WithFilter({
  categories,
}: {
  categories: Category[];
}) {
  const { allProducts, isLoading } = useProductContext();
  const rawSearchParams = useSearchParams();
  const searchParams = rawSearchParams ?? new URLSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999999999]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    if (priceRange) params.set("price", priceRange.join("-"));
    params.set("page", currentPage.toString());
    router.replace(`?${params.toString()}`);
  }, [searchTerm, selectedCategory, priceRange, currentPage, router]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const inCategory = selectedCategory
        ? String(product.categoryId) === selectedCategory
        : true;
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && inCategory && inPriceRange;
    });
  }, [allProducts, searchTerm, selectedCategory, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="flex gap-8 pt-10 px-6">
        <div className="w-64 h-96 bg-gray-200 animate-pulse rounded"></div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(PRODUCTS_PER_PAGE)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-8 pt-40 px-20">
      <FilterSidebar
        categories={categories}
        products={allProducts}
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onPriceChange={setPriceRange}
      />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + searchTerm + selectedCategory + priceRange.join("-")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded transition-colors duration-200 ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
