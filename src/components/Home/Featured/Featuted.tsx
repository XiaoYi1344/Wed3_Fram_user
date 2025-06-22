"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const Featured = () => {
  return (
    <Box px={{ xs: 2, md: 18 }} py={10}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
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
            Featured
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" fontWeight="bold" mb={4}>
        New Arrival
      </Typography>

      {/* Main Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
        gap={2}
      >
        {/* Left Large Card */}
        <Card
          className="relative overflow-hidden rounded-xl bg-black w-[610px] h-[600px]"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Image
            src="/img/featured.png"
            alt="PlayStation 5"
            width={551}
            height={551}
            className="object-cover rounded-xl mt-10 ml-3"
          />
          <CardContent
            className="absolute bottom-0 left-0 text-black w-full"
            style={{
              padding: "16px",
              //background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          >
            <Typography fontSize={16} fontWeight={600} className="text-white">
              PlayStation 5
            </Typography>
            <Typography fontSize={13} mt={0.5} mb={1} className="text-white">
              Black and White version of the PS5 coming out on sale.
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#000",
                color: "#fff",
                textTransform: "none",
                fontSize: 12,
                px: 2,
                py: 0.5,
                borderRadius: "4px",
                ":hover": { bgcolor: "#222" },
              }}
            >
              Shop Now
            </Button>
          </CardContent>
        </Card>

        {/* Right Side Grid */}
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Card 1 */}
          <Card
            className="relative overflow-hidden rounded-xl bg-black w-[600px] h-[284px]"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src="/img/featured2.png"
              alt="Women’s Collections"
              width={432}
              height={286}
              className="object-cover rounded-xl ml-32"
            />
            <CardContent
              className="absolute bottom-0 left-0 text-white w-full"
              style={{
                padding: "16px",
                // background:
                //   "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              }}
            >
              <Typography fontSize={14} fontWeight={600}>
                Women’s Collections
              </Typography>
              <Typography fontSize={12} mt={0.5} mb={1}>
                Featured woman collections that give you another vibe.
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  textTransform: "none",
                  fontSize: 12,
                  px: 2,
                  py: 0.5,
                  borderRadius: "4px",
                  ":hover": { bgcolor: "#222" },
                }}
              >
                Shop Now
              </Button>
            </CardContent>
          </Card>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            {/* Card 2 */}
            <Card
              className="relative overflow-hidden rounded-xl bg-black w-[290px] h-[284px]"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src="/img/featured4.png"
                alt="Speakers"
                width={190}
                height={221}
                className="object-cover rounded-xl ml-[15%]"
              />
              <CardContent
                className="absolute bottom-0 left-0 text-white w-full"
                style={{
                  padding: "16px",
                  // background:
                  //   "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              >
                <Typography fontSize={14} fontWeight={600}>
                  Speakers
                </Typography>
                <Typography fontSize={12} mt={0.5} mb={1}>
                  Amazon wireless speakers
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    textTransform: "none",
                    fontSize: 12,
                    px: 2,
                    py: 0.5,
                    borderRadius: "4px",
                    ":hover": { bgcolor: "#222" },
                  }}
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card
              className="relative overflow-hidden rounded-xl bg-black w-[290px] h-[284px]"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src="/img/feaatured3.png"
                alt="Perfume"
                width={201}
                height={203}
                className="object-cover rounded-xl ml-[15%]"
              />
              <CardContent
                className="absolute bottom-0 left-0 text-white w-full"
                style={{
                  padding: "16px",
                  // background:
                  //   "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              >
                <Typography fontSize={14} fontWeight={600}>
                  Perfume
                </Typography>
                <Typography fontSize={12} mt={0.5} mb={1}>
                  GUCCI INTENSE OUD EDP
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    textTransform: "none",
                    fontSize: 12,
                    px: 2,
                    py: 0.5,
                    borderRadius: "4px",
                    ":hover": { bgcolor: "#222" },
                  }}
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Featured;
