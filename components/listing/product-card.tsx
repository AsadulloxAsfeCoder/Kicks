"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import useSizes from "@/hooks/useSizes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface ProductCardProps {
  color: string;
}

interface Size {
  name: string;
  // boshqa maydonlar...
}

interface CartItem {
  size: string;
  quantity: string;
  price: number;
  name: string;
  description: string;
  image: string;
   color?: string;
}

const fallbackSizes = ["42", "41", "39", "38", "43", "45", "44"];
const quantities = ["1", "2", "3", "4", "5", "6", "7"];
const pricePerItem = 130;
const deliveryFee = 6.99;

function ProductCard({ color }: ProductCardProps) {
 const { isLoading: isSizeLoading, data: sizeData } = useSizes();
  const { addToCart } = useCart();
  const router = useRouter();
  const isInitialLoading = isSizeLoading && !sizeData;

  const sizes = sizeData?.length ? sizeData.map((s) => s.name) : fallbackSizes;

  const [selectedFilters, setSelectedFilters] = useState({
    size: "",
    quantity: "1",
    
  });

  const [liked, setLiked] = useState(false);
  const [removed, setRemoved] = useState(false);

  const handleSizeChange = (size: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      size: prev.size === size ? "" : size,
    }));
  };


  const handleQuantityChange = (quantity: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      quantity,
    }));
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    alert("Added to Wish List!");
  };

  const handleRemove = () => {
    setRemoved(true);
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleCheckout = () => {
    if (!selectedFilters.size) {
      alert("Please select a size first!");
      return;
    }

    const cartItem: CartItem = {
      size: selectedFilters.size,
      quantity: selectedFilters.quantity,
      price: pricePerItem,
      name: "DROPSET TRAINER SHOES",
      description: "Men's Road Running Shoes, Enamel Blue / University White",
      image: "/images/krasofka.jpg",
      color:color,
    };

    addToCart(cartItem);
    router.push("/landing/chekout");
  };



  const totalPrice =
    parseInt(selectedFilters.quantity) * pricePerItem + deliveryFee;

  if (removed) {
    return (
      <main className="p-14">
        <h2 className="text-2xl font-semibold">Item removed. Redirecting...</h2>
      </main>
    );
  }

  return (
    <main className="lg:p-14 p-5 gap-6">
      <section className="mb-[32px]">
        <h3 className="lg:text-[32px] text-2xl font-semibold">Saving to celebrate</h3>
        <p className="lg:text-[14px] text-[12px] font-semibold opacity-80 leading-7">
          Enjoy up to 60% off thousands of styles during the End of Year sale -
          while supplies last. No code needed.
          <span className="lg:text-[16px] text-[14px] font-semibold block">Join us or Sign-in</span>
        </p>
      </section>

      <section className="lg:flex gap-6">
        <div className="lg:w-[781px] bg-white rounded-[16px] relative overflow-hidden">
          <div className="p-6">
            <h3 className="lg:text-[32px] text-[20px] font-semibold mb-1">Your Bag</h3>
            <p className="text-[16px] font-normal">
              Items in your bag not reserved - check out now to make them yours.
            </p>
          </div>

          <ul className="flex gap-6 p-6 relative">
            <li>
              <Image 
                src="/images/krasofka.jpg" 
                alt="shoe" 
                width={207} 
                height={225}
                className="lg:w-[207px] w-[157px] h-[225px]"
                priority
              />
            </li>
            <li className="lg:w-[350px] w-[160px] relative z-10">
              <h3 className="lg:text-2xl text-[16px] font-bold mb-2">
                DROPSET TRAINER SHOES
              </h3>
              <p className="lg:text-[20px] lg:w-[350px] w-[160px] text-[14px] font-semibold opacity-80 leading-relaxed">
                Men's Road Running Shoes
                <br />
                Enamel Blue / University White
              </p>
              <div className="flex md:justify-between mt-[-20px] gap-6">
                <Accordion type="single" collapsible className="w-[114px] mt-4 lowercase z-20">
                  <AccordionItem value="sizes">
                    <AccordionTrigger className="text-base font-semibold text-primary lowercase hover:no-underline">
                      Size
                    </AccordionTrigger>
                    <AccordionContent>
                      {isInitialLoading ? (
                        <div className="space-y-3">
                          {fallbackSizes.map((_, i) => (
                            <div key={`size-loading-${i}`} className="flex items-center space-x-2">
                              <Checkbox disabled className="border-gray-300" />
                              <div className="h-5 w-16 bg-gray-100 rounded animate-pulse" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="flex flex-col space-y-3">
                          {sizes.map((size, i) => (
                            <li key={`size-${i}`} className="flex items-center space-x-2">
                              <Checkbox
                                id={`size-${i}`}
                                checked={selectedFilters.size === size}
                                onCheckedChange={() => handleSizeChange(size)}
                                className="border-gray-400 data-[state=checked]:border-primary"
                              />
                              <label htmlFor={`size-${i}`} className="text-sm font-medium">
                                {size}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-[114px] mt-4 lowercase z-20">
                  <AccordionItem value="quantity">
                    <AccordionTrigger className="text-base font-semibold text-primary lowercase hover:no-underline">
                      Quantity
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col space-y-3">
                        {quantities.map((qty, i) => (
                          <li key={`qty-${i}`} className="flex items-center space-x-2">
                            <Checkbox
                              id={`qty-${i}`}
                              checked={selectedFilters.quantity === qty}
                              onCheckedChange={() => handleQuantityChange(qty)}
                              className="border-gray-400 data-[state=checked]:border-primary"
                            />
                            <label htmlFor={`qty-${i}`} className="text-sm font-medium">
                              {qty}
                            </label>

                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <h3 className="lg:text-2xl md:hidden text-[20px] font-semibold text-[#00f]">
                ${pricePerItem.toFixed(2)}
              </h3>
              <div className="flex gap-6 mt-4 z-30 relative">
                <Image
                  src={liked ? "/images/Yure-filled.svg" : "/images/Yure.svg"}
                  alt="heart icon"
                  className="cursor-pointer w-[24px]"
                  onClick={handleLike}
                  width={24}
                  height={24}
                />
                <Image
                  src="/images/chelak.svg"
                  alt="trash icon"
                  className="cursor-pointer w-6"
                  onClick={handleRemove}
                  width={24}
                  height={24}
                />
              </div>
            </li>
            <li className="hidden md:block">
              <h3 className="lg:text-2xl text-[20px] font-semibold text-[#00f]">
                ${pricePerItem.toFixed(2)}
              </h3>
            </li>
          </ul>
        </div>

        <div className="min-w-[418px] bg-white lg:bg-gray-300 rounded-[16px] p-5 mt-6">
          <h3 className="text-[32px] font-semibold">Order Summary</h3>
          <p className="flex justify-between mt-6 text-[20px] font-semibold">
            {selectedFilters.quantity} ITEM
            <span>${(pricePerItem * +selectedFilters.quantity).toFixed(2)}</span>
          </p>
          <p className="flex justify-between mt-6 text-[20px] font-semibold">
            Delivery <span>${deliveryFee.toFixed(2)}</span>
          </p>
          <p className="flex justify-between mt-6 text-[20px] font-semibold">
            Sales Tax <span>-</span>
          </p>
          <h3 className="flex justify-between mt-6 mb-6 text-2xl font-semibold">
            Total <span>${totalPrice.toFixed(2)}</span>
          </h3>
          <button
            onClick={handleCheckout}
            className={cn(buttonVariants(), "w-full h-[48px]")}
          >
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductCard;