// app/components/ProductGrid.tsx
"use client";

import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ProductCard from "./Product/ProductCard";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/ProductContext";

const ProductGrid: React.FC = () => {
  const { allProducts, isLoading } = useProductContext();
  const [slice, setSlice] = useState(1);
  const router = useRouter();

  const getSlicedProducts = () => allProducts.slice(0, slice * 8);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-8 py-6">
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-orange-500 mr-2 rounded"></div>
        <Typography variant="body2" className="text-orange-500 font-semibold">
          Our Products
        </Typography>
      </div>
      <Typography variant="h5" className="font-bold mb-6">
        Explore Our Products
      </Typography>
      <Grid container spacing={3}>
        {getSlicedProducts().map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 3}} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <div className="text-center mt-8">
        {slice * 8 < allProducts.length ? (
          <Button
            onClick={() => setSlice(slice + 1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            View More
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/products")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            View All Products
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
