"use client";

import { useCart } from "@/hook/useCart";
import { Stack } from "@mui/material";
// import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const router = useRouter();

  return (
    <Stack my={20}>
        <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center border p-3 rounded">
                <div>
                    {/* <Image fill /> */}
                  <p className="font-semibold">{item.title}</p>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 mt-1 border px-2"
                  />
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between">
            <strong>Total:</strong>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="mt-6 bg-black text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
    </Stack>
  );
}
