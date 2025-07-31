"use client";

import { useState } from "react";
import { Rating } from "@mui/material";
import { Product } from "@/constant/type-res-api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string>(
    product.imageUrl?.[0] || "/image/no-image.jpg"
  );
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const flashPriceParam = searchParams?.get("flashPrice");
  const flashPrice = flashPriceParam ? Number(flashPriceParam) : null;

  const images = product.imageUrl?.length
    ? product.imageUrl
    : ["/image/no-image.jpg"];

  const imageURL = (url: string) =>
    url.startsWith("http") ? url : `http://192.168.1.66:3000/image/${url}`;

  const availableQuantity =
    typeof product.quantity === "number" ? product.quantity : 0;

  const handleBuyNow = () => {
  const userId = Cookies.get("user_id");

  if (!userId) {
    toast("❌ Vui lòng đăng nhập để mua hàng!");
    return;
  }

  // if (!product.isInStock || availableQuantity < qty) {
  //   toast("❌ Sản phẩm đã hết hàng hoặc không đủ số lượng!");
  //   return;
  // }

  const finalPrice = flashPrice ?? product.price;

  addToCart({
    id: product.id.toString(),
    name: product.name,
    price: finalPrice,
    image: product.imageUrl?.[0] || "/fallback.jpg",
    quantity: 1,
    userId,
  });

  setIsAdding(true);

  toast(
    <div>
      <strong>🛒 Đã thêm vào giỏ hàng!</strong>
      <p>
        {product.name} (x{qty}) đã được thêm.
      </p>
    </div>
  );

  setTimeout(() => setIsAdding(false), 1500);
};


  return (
    <div className="px-6 pb-10 pt-10 max-w-7xl mx-auto">
      <div className="text-sm text-gray-400 mb-4">
        <span className="text-black font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hình ảnh */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-4">
            {images.map((img, idx) => (
              <Image
                key={idx}
                width={80}
                height={80}
                src={imageURL(img)}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-contain rounded-md border p-1 cursor-pointer ${
                  selectedImg === img
                    ? "ring-2 ring-orange-500"
                    : "hover:ring-2 hover:ring-orange-400"
                }`}
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>

          <div className="flex-1">
            <Image
              width={400}
              height={400}
              src={imageURL(selectedImg)}
              alt="Main"
              className="w-full h-[400px] object-contain bg-gray-100 p-6 rounded-xl"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <Rating
              value={product.rating || 0}
              readOnly
              precision={0.5}
              size="small"
            />
            <span className="text-sm text-gray-500">
              ({product.reviews?.length ?? 0} đánh giá)
            </span>
            {product.isInStock && (
              <span className="text-green-600 font-medium text-sm ml-2">
                Còn hàng
              </span>
            )}
          </div>

          <div className="text-2xl font-bold text-orange-500">
            {flashPrice !== null ? (
              <>
                <span className="text-gray-500 line-through mr-2">
                  {product.price.toLocaleString()} đ
                </span>
                <span>{flashPrice.toLocaleString()} đ</span>
              </>
            ) : (
              `${product.price.toLocaleString()} đ`
            )}
          </div>

          <p className="text-sm text-gray-700 leading-relaxed border-b pb-4">
            {product.description || "Không có mô tả sản phẩm."}
          </p>

          <div className="text-sm text-gray-600 border-b pb-4 space-y-1">
            <p>
              <strong>Xuất xứ:</strong> {product.origin || "Chưa rõ"}
            </p>
            <p>
              <strong>Đơn vị:</strong> {product.unit || "Chưa rõ"}
            </p>
            <p>
              <strong>Số lượng còn:</strong> {availableQuantity}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-1 text-lg font-bold"
              >
                -
              </button>
              <span className="px-4 py-1">{qty}</span>
              <button
                onClick={() =>
                  setQty((prev) => Math.min(prev + 1, availableQuantity))
                }
                className="px-3 py-1 text-lg font-bold"
              >
                +
              </button>
            </div>

            <button
              className={`${
                isAdding
                  ? "bg-green-500"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white font-semibold px-6 py-2 rounded transition`}
              onClick={handleBuyNow}
              disabled={isAdding}
            >
              {isAdding ? "Đã thêm" : "Mua ngay"}
            </button>
          </div>

          <div className="border rounded p-4 mt-6 flex flex-col gap-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span>🚚</span>
              <div>
                <span className="font-medium">Giao hàng miễn phí</span> <br />
                <span className="text-gray-500">
                  Nhập mã bưu điện để kiểm tra khả năng giao hàng
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 border-t pt-3">
              <span>🔁</span>
              <div>
                <span className="font-medium">Đổi trả dễ dàng</span> <br />
                <span className="text-gray-500">
                  Miễn phí đổi trả trong 30 ngày.{" "}
                  <a href="#" className="underline">
                    Xem chi tiết
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
