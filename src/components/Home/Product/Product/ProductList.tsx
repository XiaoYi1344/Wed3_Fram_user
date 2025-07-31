// // app/components/ProductList.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { Product } from "@/constant/type-res-api";
// import ProductCard from "./ProductCard";
// import { useProductContext } from "@/context/ProductContext";

// type Props = {
//   searchTerm: string;
//   selectedCategory: string | null;
//   priceRange: [number, number];
// };

// export default function ProductList({
//   searchTerm,
//   selectedCategory,
//   priceRange,
// }: Props) {
//   const { allProducts, isLoading } = useProductContext();
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const filtered = allProducts.filter((p) => {
//       const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchCategory = selectedCategory
//         ? String(p.categoryId) === selectedCategory
//         : true;
//       const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

//       return matchName && matchCategory && matchPrice;
//     });
//     setFilteredProducts(filtered);
//   }, [searchTerm, selectedCategory, priceRange, allProducts]);

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {filteredProducts.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }
