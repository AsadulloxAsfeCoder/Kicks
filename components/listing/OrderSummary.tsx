import React from "react";

interface Props {
  quantity: number;
  pricePerItem: number;
  deliveryFee: number;
}

export function OrderSummary({ quantity, pricePerItem, deliveryFee }: Props) {
  const subtotal = quantity * pricePerItem;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2 text-lg">
        <span>{quantity} ITEM</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2 text-lg">
        <span>Delivery</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2 text-lg">
        <span>Sales Tax</span>
        <span>-</span>
      </div>
      <div className="flex justify-between text-xl font-bold mt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
