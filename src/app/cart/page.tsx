"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { cartItems, updateQuantity, subtotal } = useCart();
  const router = useRouter();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Cart</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Product</th><th>Price</th><th>Quantity</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p className="font-bold">Subtotal: ${subtotal}</p>
        <Button onClick={() => router.push("/checkout")} className="mt-4 bg-orange-500 text-white">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
