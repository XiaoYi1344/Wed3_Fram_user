"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { Category } from "@/constant/type-res-api";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import SkeletonCard from "./SkeletonCard";

const PRODUCTS_PER_PAGE = 6;

export default function ProductListPage({ categories }: { categories: Category[] }) {
  const { allProducts, isLoading } = useProductContext();
  const rawParams = useSearchParams();
  const searchParams = rawParams ?? new URLSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999999999]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  // Sync params with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    if (priceRange) params.set("price", priceRange.join("-"));
    params.set("page", currentPage.toString());
    router.replace(`?${params.toString()}`);
  }, [searchTerm, selectedCategory, priceRange, currentPage, router]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.categoryId.toString() === selectedCategory
        : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
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

  return (
    <Box display="flex" gap={4} pt={10} px={{ xs: 2, md: 6 }}>
      {/* Sidebar */}
      <Box width={{ xs: "100%", md: 250 }}>
        <FilterSidebar
          categories={categories}
          products={allProducts}
          onSearch={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onPriceChange={setPriceRange}
        />
      </Box>

      {/* Product List */}
      <Box flex={1}>
        {isLoading ? (
          <Grid container spacing={3}>
            {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4}} key={i}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage + searchTerm + selectedCategory + priceRange.join("-")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {paginatedProducts.length === 0 ? (
                  <Typography variant="h6" color="textSecondary">
                    Không tìm thấy sản phẩm.
                  </Typography>
                ) : (
                  <Grid container spacing={3}>
                    {paginatedProducts.map((product) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4}} key={product.id}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, val) => setCurrentPage(val)}
                  color="primary"
                  size="medium"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
