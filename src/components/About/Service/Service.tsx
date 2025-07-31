"use client";
import React, { useMemo } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FaShippingFast } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { AiOutlineSafety } from "react-icons/ai";

const Service = () => {
  const items = useMemo(() => [
    {
      icon: <FaShippingFast size={32} />,
      count: "FREE AND FAST DELIVERY",
      label: "Free delivery for all orders over $140",
    },
    {
      icon: <TfiHeadphoneAlt size={32} />,
      count: "24/7 CUSTOMER SERVICE",
      label: "Friendly 24/7 customer support",
    },
    {
      icon: <AiOutlineSafety size={32} />,
      count: "MONEY BACK GUARANTEE",
      label: "We return money within 30 days",
    },
  ], []);

  return (
    <Box px={{ xs: 2, md: 10 }} py={6}>
      <Grid container spacing={2} justifyContent="center">
        {items.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                transition: "0.3s",
                border: "none",
                boxShadow: "none",
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
                    border: "8px solid #d1d5db",
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

export default Service;
