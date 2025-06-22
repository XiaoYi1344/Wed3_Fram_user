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

const categories = [
  {
    label: "Trái cây ôn đới",
    path: "/temperate",
    children: [
      "Táo",
      "Lê",
      "Nho",
      "Dâu tây",
      "Việt quất",
      "Mâm xôi",
      "Dâu đen",
      "Mơ",
      "Mận",
      "Anh đào",
      "Kiwi",
      "Hồng",
      "Lựu",
    ],
  },
  {
    label: "Trái cây nhiệt đới",
    path: "/tropical",
    children: [
      "Chuối",
      "Xoài",
      "Mít",
      "Dứa",
      "Đu đủ",
      "Dừa",
      "Sầu riêng",
      "Chôm chôm",
      "Măng cụt",
      "Vú sữa",
      "Sapôchê",
      "Na",
      "Mãng cầu xiêm",
      "Ổi",
      "Roi",
      "Me",
      "Cam sành",
      "Bơ",
      "Khế",
      "Chay",
      "Sơ ri",
      "Nhãn",
      "Vải",
      "Quất",
    ],
  },
  {
    label: "Trái cây có múi",
    path: "/citrus",
    children: [
      "Cam",
      "Quýt",
      "Bưởi",
      "Chanh vàng",
      "Chanh xanh",
      "Tắc",
      "Cam canh",
      "Cam xoàn",
      "Cam sành",
    ],
  },
  {
    label: "Trái cây mọng nước",
    path: "/juicy",
    children: [
      "Dưa hấu",
      "Thanh long ruột trắng",
      "Thanh long ruột đỏ",
      "Dưa lưới",
      "Dưa gang",
      "Dưa chuột",
      "Cà chua",
    ],
  },
  {
    label: "Đặc sản vùng miền",
    path: "/specialty",
    children: [
      "Cóc",
      "Lòng bong",
      "Thốt nốt",
      "Chùm ruột",
      "Táo ta",
      "Bình bát",
      "Dâu da",
      "Trám",
      "Sấu",
      "Mắc ca",
      "Hồng quân",
      "Lêkima",
    ],
  },
];

const SideBar = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const router = useRouter();

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  const navigateTo = (category: string, subitem: string) => {
    const path = `/category/${category}/${encodeURIComponent(subitem)}`;
    router.push(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e0e0e0",
        marginLeft: 3,
        paddingY: 2,
        height: 550,
        width: 280,
      }}
    >
      <Stack mt={15}>
        {categories.map(({ label, children }) => (
          <Box key={label}>
            <ListItemButton onClick={() => toggleCategory(label)}>
              <Typography fontWeight={600} flex={1}>
                {label}
              </Typography>
              {openCategory === label ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategory === label} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  maxHeight: 200, // khoảng hiển thị 5 mục
                  overflowY: "auto",
                  px: 1,
                  // Custom scrollbar styles
                  "&:hover::-webkit-scrollbar": {
                    width: "9px",
                  },
                  "&::-webkit-scrollbar": {
                    width: "4px", // mặc định
                    transition: "width 0.3s ease-in-out",
                  },
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
