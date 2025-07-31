"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  ListItemButton,
  Typography,
  Collapse,
  List,
  ListItemIcon,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SpaRounded from "@mui/icons-material/SpaRounded";

import { Category, Product } from "@/constant/type-res-api";

type Props = {
  categories: Category[];
  products: Product[];
  onNavigate: (categoryName: string, productName: string) => void;
  closeSidebar?: () => void;
};

const SideBarMobile = ({
  categories,
  products,
  onNavigate,
  closeSidebar,
}: Props) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const grouped = useMemo(() => {
    return categories.map((c) => ({
      ...c,
      products: products.filter(
        (p) => String(p.categoryId) === String(c.id)
      ),
    }));
  }, [categories, products]);

  const toggleCategory = (name: string) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <Box
      component="nav"
      aria-label="Mobile product categories"
      sx={{
        px: 2,
        py: 2,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {grouped.map(({ id, name, products }) => (
        <Box key={id} mb={1.5}>
          <ListItemButton
            aria-expanded={openCategory === name}
            aria-controls={`collapse-mobile-${id}`}
            onClick={() => toggleCategory(name)}
            sx={{
              borderRadius: 2,
              bgcolor: "#F5FFF3",
              "&:hover": {
                backgroundColor: "#E7F4E4",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "#4D774E" }}>
              <SpaRounded fontSize="small" />
            </ListItemIcon>

            <Typography
              flex={1}
              fontWeight={600}
              fontSize="16px"
              sx={{ color: "#4D774E" }}
            >
              {name}
            </Typography>

            {openCategory === name ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse
            in={openCategory === name}
            timeout="auto"
            unmountOnExit
            id={`collapse-mobile-${id}`}
          >
            <List disablePadding component="ul" role="menu" sx={{ mt: 1 }}>
              {products.map((product) => (
                <ListItemButton
                  key={product.id}
                  role="menuitem"
                  sx={{
                    pl: 6,
                    fontSize: "15px",
                    height: 44,
                    color: "#5C6B50",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "#F0F5ED",
                    },
                  }}
                  onClick={() => {
                    onNavigate(name, product.name);
                    closeSidebar?.();
                  }}
                >
                  {product.name}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default SideBarMobile;
