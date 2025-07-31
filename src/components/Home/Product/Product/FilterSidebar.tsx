"use client";

import { Category, Product } from "@/constant/type-res-api";
import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  categories: Category[];
  products: Product[];
  onSearch: (term: string) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onPriceChange: (range: [number, number]) => void;
}

export default function FilterSidebar({
  categories,
  products,
  onSearch,
  onCategoryChange,
  onPriceChange,
}: Props) {
  const [selectedMax, setSelectedMax] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceRange([min, max]);
      setSelectedMax(max);
      onPriceChange([min, max]);
    }
  }, [products, onPriceChange]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10);
    setSelectedMax(newMax);
    onPriceChange([priceRange[0], newMax]);
  };

  const handleAccordionChange = (value: string[]) => {
    if (value.includes("search")) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleCategoryChange = (id: string | null) => {
    setSelectedCategory(id);
    onCategoryChange(id);
  };

  return (
    <div className="w-full md:w-64">
      <Accordion
        type="multiple"
        className="space-y-4"
        onValueChange={handleAccordionChange}
      >
        {/* Search Input */}
        <AccordionItem value="search">
          <AccordionTrigger>Tìm kiếm</AccordionTrigger>
          <AccordionContent>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Tìm sản phẩm..."
              onChange={(e) => onSearch(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </AccordionContent>
        </AccordionItem>

        {/* Category Buttons */}
        <AccordionItem value="category">
          <AccordionTrigger>Danh mục</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  !selectedCategory
                    ? "bg-orange-500 text-white border-orange-500"
                    : "hover:bg-orange-100"
                }`}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id.toString())}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    selectedCategory === cat.id.toString()
                      ? "bg-orange-500 text-white border-orange-500"
                      : "hover:bg-orange-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Slider */}
        <AccordionItem value="price">
          <AccordionTrigger>Khoảng giá</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <input
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                step={1000}
                value={selectedMax}
                onChange={handleRangeChange}
                className="w-full accent-orange-500"
              />
              <div className="text-sm text-gray-600 text-center">
                Từ{" "}
                <span className="font-semibold text-orange-600">
                  {priceRange[0].toLocaleString()}đ
                </span>{" "}
                đến{" "}
                <span className="font-semibold text-orange-600">
                  {selectedMax.toLocaleString()}đ
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Manager Button */}
        <AccordionItem value="manager">
          <AccordionTrigger>Quản lý</AccordionTrigger>
          <AccordionContent>
            <Link href="/product_manager">
              <Button color="warning" fullWidth>
                Quản lý sản phẩm
              </Button>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
