import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { CiShop } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

const items = [
  {
    icon: <CiShop size={32} />,
    count: "10.5k",
    label: "Sellers active on our site",
  },
  {
    icon: <RiMoneyDollarCircleLine size={32} />,
    count: "33k",
    label: "Monthly Product Sale",
  },
  {
    icon: <MdOutlineShoppingBag size={32} />,
    count: "45.5k",
    label: "Customers active on our site",
  },
  {
    icon: <TbMoneybag size={32} />,
    count: "25k",
    label: "Annual gross sale on our site",
  },
];

const Counting = () => {
  return (
    <Box px={{ xs: 2, md: 10 }} py={6} >
      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3}} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#f97316", // Card bg on hover
                },
                "&:hover .iconBox": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "#fdba74",
                },
                "&:hover .cardContent": {
                  backgroundColor: "#ff8d2f",
                  color: "white",
                },
              }}
            >
              <CardContent
                className="cardContent"
                sx={{
                  backgroundColor: "white",
                  textAlign: "center",
                  py: 4,
                  transition: "0.3s",
                }}
              >
                <Box
                  className="iconBox"
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                    borderRadius: "50%",
                    backgroundColor: "black",
                    border: "8px solid #d1d5db", // gray-300
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {item.count}
                </Typography>
                <Typography variant="body2">{item.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Counting;
