"use client";
import React, { useState } from "react";
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
import { categories } from "@/utils/categories";
type SideBarProps = {
  closeSidebar?: () => void;
};

const SideBar = ({ closeSidebar }: SideBarProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const router = useRouter();

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  // const navigateTo = (category: string, subitem: string) => {
  //   const path = `/category/${category}/${encodeURIComponent(subitem)}`;
  //   router.push(path);
  // };

  const navigateTo = (category: string, subitem: string) => {
    const path = `/category/${category}/${encodeURIComponent(subitem)}`;
    router.push(path);
    if (closeSidebar) closeSidebar(); // close on item click (optional)
  };

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex", md: "flex" },
        flexDirection: "column",
        borderRight: "1px solid #e0e0e0",
        marginLeft: {md: 3},
        paddingY: 2,
        height: {md: 550},
        width: { md: 280 },
        
      }}
      data-aos="fade-right"
      data-aos-anchor-placement="left-center"
    >
      <Stack mt={{sm: 22, md: 20 }}>
        {categories.map(({ label, children }) => (
          <Box key={label}>
            <ListItemButton onClick={() => toggleCategory(label)}>
              <Typography
                fontWeight= { 600 }
                flex={1}
              >
                {label}
              </Typography>

              {openCategory === label ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategory === label} timeout="auto" unmountOnExit>
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
                  {children.map((item) => (
                    <ListItemButton
                      key={item}
                      sx={{ pl: 4 }}
                      onClick={() => navigateTo(label, item)}
                    >
                      {item}
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default SideBar;
