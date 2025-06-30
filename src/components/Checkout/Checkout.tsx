"use client";
import React from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CheckoutPageProps = {
  cartItems: CartItem[];
  subtotal: number;
  onPlaceOrder: () => void;
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  subtotal,
  onPlaceOrder,
}) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Xác nhận đơn hàng</h1>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p className="font-semibold">Tổng cộng: ${subtotal}</p>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={onPlaceOrder}
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default CheckoutPage;
