// app/components/Home/index.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

const MainBar = dynamic(() => import("./MainBar/MainBar"));
const FlashSales = dynamic(() => import("./Sale/MockFlashSale"));
const Categories = dynamic(() => import("./Category/Categories"));
const BestSale = dynamic(() => import("./BestSale/BestSale"));
const Ad = dynamic(() => import("./Ad/Ad"));
const ProductGrid = dynamic(() => import("./Product/ProductGrid"));
const Service = dynamic(() => import("../About/Service/Service"));

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div>
      <Stack mt={10}>
        <MainBar />
      </Stack>
      <FlashSales />
      <hr className="mx-18" />
      <Categories />
      <hr className="mx-18" />
      <BestSale />
      <hr className="mx-18" />
      <Ad />
      <ProductGrid />
      <Service />
    </div>
  );
}
