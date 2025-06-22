"use client";

import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stack } from "@mui/material";

export default function FarmCard() {
  return (
   <Stack m={25} bgcolor='black'>
     <div className="relative w-[360px] rounded-[20px] overflow-hidden bg-gray-300 shadow-md">
      {/* Top Image */}
      <div className="h-[200px] relative">
        <Image
          src="/img/farm.jpg" // Thay bằng đường dẫn thật
          alt="Farm"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Nội dung */}
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-green-700">
          Florida spicy garden TAM NGUYEN Farm
        </h3>
        <div className="flex items-center mt-1 mb-2 text-yellow-500">
          {"★".repeat(4)}
          {"☆"}
        </div>
        <div className="flex items-start text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mt-0.5 mr-1 text-gray-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
          <span>36363 SW 217th Ave, Homestead, FL 33034, United States</span>
        </div>
      </CardContent>

      {/* Góc khuyết và nút tròn */}
      <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
        {/* Lớp tạo khuyết bằng mask hình tròn */}
        <div className="absolute bottom-3 right-1 w-5 rotate-45 h-full bg-white"></div>   {/* cạnh khuyết nhọn phía trên viền */}
        <div className="absolute -bottom-6 -right-6 w-22 h-22 rotate-48 bg-white rounded-full z-10"></div>   {/* Viền bên ngoài của nút */}
        <div className="absolute -bottom-6 right-9 w-5 -rotate-129 h-full bg-white"></div>   {/* cạnh khuyết nhọn phía duoi viền */}
        {/* Mặt trăng khuyết */}
  <div className="absolute w-full h-full bg-white rounded-full" />
  <div className="absolute w-full h-full right-[10px] bg-[#f5f5f5] rounded-full" />

        {/* Nút tròn nằm trên khuyết */}
        <div className="absolute bottom-[10px] right-[10px] z-20 pointer-events-auto">
          <Button
            variant="default"
            className="w-10 h-10 rounded-full bg-yellow-400 border border-gray-300 shadow p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 L17 7 M17 7 H10 M17 7 V14" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
   </Stack>
  );
}
