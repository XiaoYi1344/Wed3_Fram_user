"use client";

import Image from "next/image";
import { Container, Typography } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function Featured() {
  return (
    <Container sx={{ px: { xs: 2, md: 12 }, py: 5 }}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-10 rounded-sm bg-[#ff8d2f]" />
          <Typography variant="body1" fontWeight="bold" color="#ff8d2f">
            Featured
          </Typography>
        </div>
        <Typography variant="h4" fontWeight="bold">
          New Arrival
        </Typography>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        {/* Left Large Card */}
        <Card className="relative overflow-hidden rounded-xl bg-black h-[600px]">
          <div className="relative h-full w-full">
            <Image
              src="/img/featured.png"
              alt="PlayStation 5"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              placeholder="empty"
            />
          </div>
          <CardContent className="absolute bottom-0 left-0 w-full text-white px-6 py-4">
            <Typography variant="body1" fontWeight="600">PlayStation 5</Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              Black and White version of the PS5 coming out on sale.
            </Typography>
            <Button className="bg-black hover:bg-[#222] text-white text-xs px-4 py-1 rounded">
              Shop Now
            </Button>
          </CardContent>
        </Card>

        {/* Right Side Cards */}
        <ScrollArea className="flex flex-col gap-4 max-h-[600px]">
          {/* Card 1 */}
          <Card className="relative overflow-hidden rounded-xl bg-black h-[284px]">
            <div className="relative h-full w-full">
              <Image
                src="/img/featured2.png"
                alt="Women’s Collections"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="empty"
              />
            </div>
            <CardContent className="absolute bottom-0 left-0 w-full text-white px-6 py-4">
              <Typography variant="body2" fontWeight="600">Women’s Collections</Typography>
              <Typography variant="caption" sx={{ mt: 1, mb: 2 }}>
                Featured woman collections that give you another vibe.
              </Typography>
              <Button className="bg-black hover:bg-[#222] text-white text-xs px-4 py-1 rounded">
                Shop Now
              </Button>
            </CardContent>
          </Card>

          {/* Two Smaller Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Card 2 */}
            <Card className="relative overflow-hidden rounded-xl bg-black h-[284px]">
              <div className="relative h-full w-full">
                <Image
                  src="/img/featured4.png"
                  alt="Speakers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  placeholder="empty"
                />
              </div>
              <CardContent className="absolute bottom-0 left-0 w-full text-white px-6 py-4">
                <Typography variant="body2" fontWeight="600">Speakers</Typography>
                <Typography variant="caption" sx={{ mt: 1, mb: 2 }}>Amazon wireless speakers</Typography>
                <Button className="bg-black hover:bg-[#222] text-white text-xs px-4 py-1 rounded">
                  Shop Now
                </Button>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="relative overflow-hidden rounded-xl bg-black h-[284px]">
              <div className="relative h-full w-full">
                <Image
                  src="/img/feaatured3.png"
                  alt="Perfume"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  placeholder="empty"
                />
              </div>
              <CardContent className="absolute bottom-0 left-0 w-full text-white px-6 py-4">
                <Typography variant="body2" fontWeight="600">Perfume</Typography>
                <Typography variant="caption" sx={{ mt: 1, mb: 2 }}>GUCCI INTENSE OUD EDP</Typography>
                <Button className="bg-black hover:bg-[#222] text-white text-xs px-4 py-1 rounded">
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </Container>
  );
}