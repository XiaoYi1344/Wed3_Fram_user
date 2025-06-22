"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedDropdownContent } from "@/components/AnimatedDropdownContent";

interface Product {
  id: number;
  icon: string;
  title: string;
  subcategories: string[];
}

const products: Product[] = [
  {
    id: 1,
    icon: "/fruit/apple.png",
    title: "Pinaapple",
    subcategories: ["Tomato", "Potato", "Cabbage", "Carrot", "Cucumber"],
  },
  {
    id: 2,
    icon: "/fruit/apple.png",
    title: "Trái cây nhiệt đới",
    subcategories: ["Mango", "Banana", "Durian", "Grapefruit", "Orange"],
  },
  {
    id: 3,
    icon: "/fruit/apple.png",
    title: "Trái cây có mùi",
    subcategories: ["Rice", "Corn", "Cassava"],
  },
  {
    id: 4,
    icon: "/fruit/apple.png",
    title: "Trái cây mọng nước & dưa",
    subcategories: [
      "Green Coffee",
      "Ground Coffee",
      "Black Pepper",
      "White Pepper",
    ],
  },
  {
    id: 5,
    icon: "/fruit/apple.png",
    title: "Trái cây ít phổ biến hoặc đặc sản vùng miền",
    subcategories: ["Fish", "Shrimp", "Chicken", "Pork", "Beef"],
  },
  {
    id: 6,
    icon: "/fruit/apple.png",
    title: "Dry Goods",
    subcategories: [
      "Dried Banana",
      "Dried Jackfruit",
      "Fish Sauce",
      "Herbal Tea",
      "Dried Fish",
    ],
  },
  {
    id: 7,
    icon: "/fruit/apple.png",
    title: "Organic",
    subcategories: ["Certified Organic", "VietGAP", "Traceable"],
  },
  {
    id: 8,
    icon: "/fruit/apple.png",
    title: "Fertilizer & Seeds",
    subcategories: [
      "Organic Fertilizer",
      "Rice Seeds",
      "Vegetable Seeds",
      "Pesticides",
      "Tools",
    ],
  },
];

const Categories = () => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (openDropdownId === null) return;

    const handleScroll = () => {
      setOpenDropdownId(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openDropdownId]);

  return (
    <Box px={8} py={4}>
      {/* Section Label */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Box
          sx={{
            width: 20,
            height: 40,
            bgcolor: "#ff8d2f",
            borderRadius: "15%",
          }}
        />
        <Typography variant="h6" fontWeight="bold" color="#ff8d2f">
          Categories
        </Typography>
      </Box>

      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
        px={1}
      >
        <Typography variant="h4" fontWeight="bold">
          {isMobile ? "Mobile Categories" : "Browse By Category"}
        </Typography>
      </Box>

      {/* Carousel */}
      <Carousel opts={{ align: "start" }} className="w-full relative mt-8">
        <CarouselContent>
          {products.map((item) => (
            <CarouselItem
              key={item.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/6 mt-7"
            >
              <DropdownMenu
                open={openDropdownId === item.id}
                modal={false}
                onOpenChange={(isOpen) => {
                  setOpenDropdownId(isOpen ? item.id : null);
                }}
              >
                <DropdownMenuTrigger asChild>
                  <Card className="relative h-full flex flex-col items-center justify-between py-4 rounded-[30px] transition-all duration-300 hover:bg-orange-500 group cursor-pointer">
                    <Box className="flex justify-center items-center ">
                      <CardMedia
                        component="img"
                        image={item.icon}
                        width="80%"
                        height="60%"
                        alt={item.title}
                        className="object-contain transition-all duration-300 "
                      />
                    </Box>
                    <CardContent className="flex flex-col items-center">
                      <Box className="flex items-center gap-1">
                        <Typography
                          variant="body1"
                          fontWeight="medium"
                          className="transition-all duration-300 group-hover:text-white"
                        >
                          {item.title}
                        </Typography>
                        <ChevronDown
                          className={cn(
                            "transition-transform duration-300",
                            openDropdownId === item.id ? "rotate-180" : ""
                          )}
                          size={18}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </DropdownMenuTrigger>

                <AnimatedDropdownContent
                  side="bottom"
                  align="center"
                  className="max-h-[200px] overflow-y-auto w-[180px] lg:w-[220px] bg-white shadow-md rounded"
                >
                  {item.subcategories.map((sub, idx) => (
                    <DropdownMenuItem key={idx}>{sub}</DropdownMenuItem>
                  ))}
                </AnimatedDropdownContent>
              </DropdownMenu>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation */}
        <Box sx={{ position: "absolute", right: "10%", top: "-9%" }}>
          <CarouselPrevious />
          <CarouselNext />
        </Box>
      </Carousel>
    </Box>
  );
};

export default Categories;
