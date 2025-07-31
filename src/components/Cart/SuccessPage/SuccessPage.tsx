"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center p-6">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Thanh toán thành công!</h1>
      <p className="text-gray-700 mb-6">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
      </p>
      <Link href="/">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Quay lại trang chủ
        </Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
