"use client";

import { useCart } from "@/hook/useCart";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    alert("Order placed!");
    clearCart();
    router.push("/thank-you");
  };

  return (
    <Stack my={20}>
        <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between font-semibold">
        <span>Total:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
    </Stack>
  );
}
