// app/checkout/invoice/page.tsx
"use client";

import { useOrderStore } from "@/stores/orderStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvoicePage() {
  const { latestOrder } = useOrderStore();
  const router = useRouter();

  useEffect(() => {
    if (!latestOrder) {
      router.push("/"); // Nếu không có order, quay về trang chủ
    }
  }, [latestOrder, router]);

  if (!latestOrder) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 pt-35 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">🧾 Hóa đơn thanh toán</h1>
      <div className="space-y-2 text-sm">
        <p><strong>📧 Email:</strong> {latestOrder.buyerEmail}</p>
        <p><strong>📞 SĐT:</strong> {latestOrder.buyerPhone}</p>
        <p><strong>Phương thức:</strong> {latestOrder.paymentMethod.toUpperCase()}</p>
        <p><strong>Trạng thái:</strong> {latestOrder.status}</p>
        {latestOrder.amountInEth && (
          <>
            <p><strong>Ví:</strong> {latestOrder.walletAddress}</p>
            <p><strong>Số tiền (ETH):</strong> {latestOrder.amountInEth}</p>
            <p><strong>Tx Hash:</strong> <a href={`https://etherscan.io/tx/${latestOrder.txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{latestOrder.txHash}</a></p>
          </>
        )}
        <hr />
        <p><strong>Tổng thanh toán:</strong> ${latestOrder.amount}</p>
        <ul className="mt-2">
          {latestOrder.cartItems.map((item) => (
            <li key={item.id}>🛒 {item.name} x {item.quantity} = ${item.price * item.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
