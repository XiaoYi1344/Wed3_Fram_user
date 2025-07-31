// "use client";

// import { useEffect, useState } from "react";
// import {
//   fetchCategories,
//   fetchAllProducts,
//   fetchProductsByCategoryId,
//   fetchProductById,
// } from "@/services/axiosInstance";
// import { Product, Category } from "@/constant/type-res-api";
// import ProductCard from "./ProductCard";
// import FilterSidebar from "./FilterSidebar";
// import { Pagination } from "@mui/material";

// const PRODUCTS_PER_PAGE = 6;

// export default function ProductListPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Normalize product image from API
//   const normalizeProducts = async (list: Product[]): Promise<Product[]> => {
//     return await Promise.all(
//       list.map(async (p) => {
//         if (!p.imageUrl || p.imageUrl.length === 0) {
//           try {
//             const detail = await fetchProductById(p.id);
//             return detail;
//           } catch {
//             return p;
//           }
//         }
//         return p;
//       }),
//     );
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       const [categoryRes, productList] = await Promise.all([
//         fetchCategories(),
//         fetchAllProducts(),
//       ]);
//       setCategories(categoryRes.data);
//       const normalized = await normalizeProducts(productList);
//       setProducts(normalized);
//       setFilteredProducts(normalized);
//     };
//     loadData();
//   }, []);

//   useEffect(() => {
//     const fetchByCategory = async () => {
//       if (selectedCategory) {
//         const res = await fetchProductsByCategoryId(selectedCategory);
//         const normalized = await normalizeProducts(res.data);
//         setProducts(normalized);
//       } else {
//         const allProducts = await fetchAllProducts();
//         const normalized = await normalizeProducts(allProducts);
//         setProducts(normalized);
//       }
//       setCurrentPage(1);
//     };
//     fetchByCategory();
//   }, [selectedCategory]);

//   useEffect(() => {
//     let filtered = [...products];
//     if (searchTerm) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase()),
//       );
//     }
//     filtered = filtered.filter(
//       (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
//     );
//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [products, searchTerm, priceRange]);

//   const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * PRODUCTS_PER_PAGE,
//     currentPage * PRODUCTS_PER_PAGE,
//   );

//   return (
//     <div className="flex max-w-7xl mx-auto px-4 pt-60 pb-30 gap-6">
//       <FilterSidebar
//         products={products}
//         categories={categories}
//         onSearch={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//         onPriceChange={setPriceRange}
//       />
//       <div className="flex-1 flex flex-col gap-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {paginatedProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-4">
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={(_, page) => setCurrentPage(page)}
//               color="primary"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
