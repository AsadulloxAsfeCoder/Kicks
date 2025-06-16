"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";

const deliveryFee = 6.99;

function ProductCheckout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<"standard" | "store" | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const [product, setProduct] = useState({
    title: "",
    image: "",
    price: "0.00",
    category: "",
  });

  useEffect(() => {
    setProduct({
      title: searchParams.get("title") || "No Title",
      image: searchParams.get("image") || "/placeholder.jpg",
      price: searchParams.get("price") || "0.00",
      category: searchParams.get("category") || "Unknown",
    });
  }, [searchParams]);

  const total =
    parseFloat(product.price) + (selected === "standard" ? deliveryFee : 0);

  const handleSubmit = async () => {
    if (!selected) {
      alert("Iltimos, delivery option tanlang.");
      return;
    }

    const orderData = {
      product,
      userInfo: formData,
      deliveryMethod: selected,
      total,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Xatolik yuz berdi!");

      const data = await res.json();
      console.log("Order successful:", data);

      router.push("/orders");
    } catch (err) {
      console.error(err);
      alert("Buyurtma yuborishda xatolik yuz berdi.");
    }
  };

  return (
    <main className="container mx-auto p-4 lg:p-14 gap-8 flex justify-between">
      <section>
        {/* CONTACT SECTION */}
        <div className="mb-8">
          <h3 className="text-[32px] font-semibold">Contact Details</h3>
          <p className="text-[16px] font-semibold opacity-60 mb-6">
            We will use these details to keep you informed about your delivery.
          </p>
          <input
            className="w-[342px] h-[48px] border border-[#000] rounded-[8px] pl-4 mb-4"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* SHIPPING */}
        <div>
          <h3 className="text-[32px] font-semibold mb-4">Shipping Address</h3>
          <div className="flex gap-4 mb-4">
            <input
              className="w-[322px] h-[48px] border border-[#000] rounded-[8px] pl-4"
              type="text"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              className="w-[322px] h-[48px] border border-[#000] rounded-[8px] pl-4"
              type="text"
              placeholder="Last Name*"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <input
            className="w-[664px] h-[48px] border border-[#000] rounded-[8px] pl-4 mb-1"
            type="text"
            placeholder="Find Delivery Address*"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <p className="text-[12px] font-normal opacity-60 mb-4">
            Start typing your street address or zip code for suggestion
          </p>
          <input
            className="w-[342px] h-[48px] border border-[#000] rounded-[8px] pl-4 mb-1"
            type="number"
            placeholder="Phone Number*"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <p className="text-[12px] font-normal opacity-60">E.g. (123) 456-7890</p>
        </div>

        {/* DELIVERY OPTIONS */}
        <div className="mt-8">
          <h3 className="text-[32px] font-semibold mb-4">Delivery Options</h3>
          <div className="space-y-6">
            {/* STANDARD */}
            <div
              onClick={() => setSelected("standard")}
              className={clsx(
                "w-[664px] h-[90px] rounded-2xl p-4 cursor-pointer transition-all",
                "hover:border-[#00f] hover:shadow",
                selected === "standard"
                  ? "border border-[#000] bg-[#e6f0ff]"
                  : "border border-gray-300 bg-white text-[#000]"
              )}
            >
              <h3 className="flex justify-between text-xl font-semibold">
                <span>Standard Delivery</span>
                <span className="text-[#00f]">${deliveryFee.toFixed(2)}</span>
              </h3>
              <p className="text-base">Enter your address to see when you’ll get your order</p>
            </div>

            {/* COLLECT IN STORE */}
            <div
              onClick={() => setSelected("store")}
              className={clsx(
                "w-[664px] h-[90px] rounded-2xl p-4 cursor-pointer transition-all",
                "hover:border-[#00f] hover:shadow",
                selected === "store"
                  ? "border border-[#000] bg-[#e6f0ff]"
                  : "border border-gray-300 bg-white text-[#000]"
              )}
            >
              <h3 className="flex justify-between text-xl font-semibold">
                <span>Collect in store</span>
                <span>Free</span>
              </h3>
              <p className="text-base">Pay now, collect in store</p>
            </div>
          </div>
        </div>

        {/* CHECKBOXLAR */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox className="border-[#000]" />
            <p className="text-[16px] font-semibold">
              My billing and delivery information are the same
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox className="border-[#000]" />
            <p className="text-[16px] font-semibold">I’m 13+ years old</p>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox className="border-[#000]" />
            <p className="text-[16px] font-semibold">
              Yes, I’d like to receive emails about exclusive sales and more.
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={cn(buttonVariants(), "w-[362px] h-[48px] uppercase mt-8")}
        >
          Review AND PAY
        </Link>
      </section>

      {/* ORDER SUMMARY */}
      <section>
        <div className="w-[466px] bg-white rounded-xl shadow-sm p-6 sticky top-8">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>ITEM</span>
              <span>{product.title}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {selected === "standard" ? `$${deliveryFee.toFixed(2)}` : "Free"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span>-</span>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
         {/* <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
          <h2 className="text-xl font-bold mb-6">Buyurtma xulosasi</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm">Hajmi: {product.size}, Miqdori: {product.quantity}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Mahsulot narxi:</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Yetkazib berish:</span>
              <span>{selected === "standard" ? `$${deliveryFee.toFixed(2)}` : "Bepul"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Jami:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div> */}

        {/* ORDER DETAILS */}
        <div className="relative w-[466px] mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
          <div className="flex gap-4">
            <img
              className="w-[138px] h-[158px] object-cover rounded-lg"
              src={product.image}
              alt={product.title}
            />
            <div>
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-semibold text-lg">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductCheckout;
s