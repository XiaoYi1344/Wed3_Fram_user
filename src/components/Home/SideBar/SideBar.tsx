"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  ListItemButton,
  Collapse,
  List,
  Typography,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { fetchCategories, fetchProducts } from "@/services/axiosInstance";

type Category = {
  id: number;
  name: string;
  description: string;
};

type Product = {
  name: string;
  categoryId: number;
};

type SideBarProps = {
  closeSidebar?: () => void;
};

const SideBar = ({ closeSidebar }: SideBarProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  const navigateTo = (category: string, subitem: string) => {
    const path = `/category/${category}/${encodeURIComponent(subitem)}`;
    router.push(path);
    if (closeSidebar) closeSidebar();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(categoryRes);
        setProducts(productRes);
      } catch (error) {
        console.error("Error loading sidebar data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex", md: "flex" },
        flexDirection: "column",
        borderRight: "1px solid #e0e0e0",
        marginLeft: { md: 3 },
        paddingY: 2,
        height: { md: 550 },
        width: { md: 280 },
      }}
      data-aos="fade-right"
      data-aos-anchor-placement="left-center"
    >
      <Stack mt={{ sm: 22, md: 20 }}>
        {categories.map(({ id, name }) => {
          const categoryProducts = products
            .filter((p) => p.categoryId === id)
            .map((p) => p.name);

          return (
            <Box key={id}>
              <ListItemButton onClick={() => toggleCategory(name)}>
                <Typography fontWeight={600} flex={1}>
                  {name}
                </Typography>
                {openCategory === name ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCategory === name} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    maxHeight: 200,
                    overflowY: "auto",
                    px: 1,
                    "&:hover::-webkit-scrollbar": { width: "9px" },
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#c1c1c1",
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#a0a0a0",
                    },
                  }}
                >
                  <List component="div" disablePadding>
                    {categoryProducts.map((item) => (
                      <ListItemButton
                        key={item}
                        sx={{ pl: 4 }}
                        onClick={() => navigateTo(name, item)}
                      >
                        {item}
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SideBar;
