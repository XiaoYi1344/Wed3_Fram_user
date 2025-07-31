"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ListItemButton,
  Collapse,
  List,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SpaRounded from "@mui/icons-material/SpaRounded";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Category, Product } from "@/constant/type-res-api";

type Props = {
  categories: Category[];
  products: Product[];
  onNavigate: (categoryName: string, productName: string) => void;
};

const SideBarDesktop = ({ categories, products, onNavigate }: Props) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = useCallback((label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  }, []);

  const groupedProducts = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      products: products.filter((p) => String(p.categoryId) === String(cat.id)),
    }));
  }, [categories, products]);

  return (
    <Box
  component="aside"
  aria-label="Product categories"
  role="navigation"
  sx={{
    mt: 1,
    borderRight: "1px solid #D4E2D4",
    width: "22vw",
    maxWidth: "330px",
    minWidth: "230px",
    height: { xs: "45vh", md: "60vh" },
    p: "24px 20px",
    overflowY: "auto",
    // backgroundColor: "#FAFAFA",
  }}
>
      {/* <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: "18px",
          color: "#4D774E",
          mb: 2,
          textAlign: "center",
        }}
      >
        Danh mục sản phẩm
      </Typography> */}

      <Box sx={{ mt: 6}}>
        {groupedProducts.map(({ id, name, products }) => (
          <Box key={id}>
            <ListItemButton
              aria-expanded={openCategory === name}
              aria-controls={`collapse-${id}`}
              onClick={() => toggleCategory(name)}
              sx={{
                borderRadius: "8px",
                my: 0.5,
                "&:hover": {
                  backgroundColor: "#E7F4E4",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "36px", color: "#4D774E" }}>
                <SpaRounded fontSize="small" />
              </ListItemIcon>

              <Typography
                component="h3"
                flex={1}
                fontWeight={500}
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
              id={`collapse-${id}`}
            >
              <ScrollArea className="max-h-[150px] overflow-y-auto">
                <List component="ul" disablePadding role="menu">
                  {products.map((product) => (
                    <ListItemButton
                      key={product.id}
                      role="menuitem"
                      sx={{
                        pl: 5,
                        fontSize: "14px",
                        height: 44,
                        color: "#6B705C",
                        borderRadius: "6px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "&:hover": {
                          backgroundColor: "#F2F6ED",
                        },
                      }}
                      onClick={() => onNavigate(name, product.name)}
                    >
                      <span>{product.name}</span>

                      {/* 👇 Example: Show size or type if available
                      {product.size && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#A0A29E",
                            fontStyle: "italic",
                            fontSize: "12px",
                          }}
                        >
                          {product.size}
                        </Typography>
                      )} */}
                    </ListItemButton>
                  ))}
                </List>
              </ScrollArea>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SideBarDesktop;
