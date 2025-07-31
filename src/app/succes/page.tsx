"use client";

import { useOrderStore } from "@/stores/orderStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const { latestOrder, clearLatestOrder } = useOrderStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Đảm bảo component đã được hydrate trước khi redirect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Nếu không có dữ liệu đơn hàng sau khi hydrate, redirect về trang chủ
  useEffect(() => {
    if (isMounted && !latestOrder) {
      router.replace("/");
    }

    // Clear dữ liệu đơn hàng khi rời trang
    return () => {
      clearLatestOrder();
    };
  }, [isMounted, latestOrder, clearLatestOrder, router]);

  // Nếu chưa hydrate hoặc chưa có đơn hàng, không render
  if (!isMounted || !latestOrder) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white rounded shadow space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Đặt hàng thành công!
      </h1>

      <p className="text-lg">
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.
      </p>

      <div className="border p-4 rounded space-y-2 text-sm">
        <p>
          <strong>Email:</strong> {latestOrder.buyerEmail}
        </p>
        <p>
          <strong>SĐT:</strong> {latestOrder.buyerPhone}
        </p>
        <p>
          <strong>Phương thức thanh toán:</strong>{" "}
          {latestOrder.paymentMethod === "card"
            ? "Thẻ ngân hàng"
            : latestOrder.paymentMethod === "crypto"
              ? "Crypto (MetaMask)"
              : "Thanh toán khi nhận hàng"}
        </p>
        <p>
          <strong>Tổng tiền:</strong> ${latestOrder.amount}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">🧾 Sản phẩm đã mua:</h2>
        <ul className="space-y-2">
          {latestOrder.cartItems.map((item) => (
            <li
              key={item.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Số lượng: {item.quantity}
                </p>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>

      <Button className="bg-black text-white" onClick={() => router.push("/")}>
        Quay về trang chủ
      </Button>
    </div>
  );
}
