"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/constant/type-res-api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

export default function ProductCard({ product }: { product: Product }) {
  const [localQuantity, setLocalQuantity] = useState(product.quantity);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const userId = Cookies.get("user_id");

    if (!userId) {
      toast("❌ Vui lòng đăng nhập để mua hàng!");
      return;
    }

    if (localQuantity <= 0) {
      toast("❌ Sản phẩm đã hết hàng!");
      return;
    }

    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.imageUrl?.[0] || "/fallback.jpg",
      quantity: 1,
      userId,
    });

    setLocalQuantity((prev) => prev - 1);
    setIsAdding(true);

    // ✅ Toast có nút đóng (closeToast)
    toast(
      <div>
        <strong>🛒 Đã thêm vào giỏ hàng!</strong>
        <p>{product.name} đã được thêm.</p>
      </div>
    );

    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <Link
        href={`/product/${product.id}`}
        className="w-full flex flex-col items-center"
      >
        <div className="relative w-48 h-48 mb-4">
          <Image
            src={product.imageUrl?.[0] || "/fallback.jpg"}
            alt={product.name}
            fill
            sizes="192px"
            className="object-contain rounded-xl"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2 text-center">
          {product.name}
        </h3>
      </Link>

      <p className="text-gray-600 mb-1">${product.price.toLocaleString()}</p>
      <p className="text-sm text-gray-500 mb-2">
        {localQuantity > 0 ? `Còn lại: ${localQuantity}` : "Hết hàng"}
      </p>
      <Button
        className={`w-full transition-colors ${
          localQuantity <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : isAdding
            ? "bg-green-500"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
        disabled={localQuantity <= 0}
        onClick={handleAddToCart}
      >
        {localQuantity <= 0
          ? "Hết hàng"
          : isAdding
          ? "Đã thêm"
          : "Thêm vào giỏ hàng"}
      </Button>
    </div>
  );
}
