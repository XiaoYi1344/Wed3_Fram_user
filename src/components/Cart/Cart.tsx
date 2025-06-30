import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CheckoutPage from "@/components/Checkout/Checkout";
import SuccessPage from "./SuccessPage/SuccessPage";
import Image from "next/image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Mangoes",
      price: 20,
      quantity: 1,
      image: "/images/mango.png",
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      price: 10,
      quantity: 2,
      image: "/images/tomatoes.png",
    },
  ]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateQuantity = (id: number, qty: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedItems);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (showSuccess) return <SuccessPage />;
  if (showCheckout)
    return (
      <CheckoutPage
        cartItems={cartItems}
        subtotal={subtotal}
        onPlaceOrder={() => setShowSuccess(true)}
      />
    );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Cart</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2 flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded"
                />
                {item.name}
              </td>
              <td className="text-center">${item.price}</td>
              <td className="text-center">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="border rounded px-2 py-1"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </td>
              <td className="text-center">${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between">
        <div>
          <input
            type="text"
            placeholder="Coupon Code"
            className="border px-4 py-2 mr-2"
          />
          <Button className="bg-orange-500 text-white">Apply Coupon</Button>
        </div>

        <div className="border p-4 w-1/3">
          <h3 className="font-bold mb-2">Cart Total</h3>
          <p>Subtotal: ${subtotal}</p>
          <p>Shipping: Free</p>
          <p className="font-bold mt-2">Total: ${subtotal}</p>
          <Button
            className="bg-orange-500 text-white mt-4 w-full"
            onClick={() => setShowCheckout(true)}
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
