"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useColors from "@/hooks/useColors";
import { useRouter } from "next/navigation";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const fallbackColors = ["Red", "Blue", "White", "Black", "Pink", "Orange", "Yellow"];
const fallbackSizes = ["42", "41", "39", "38", "43", "45", "44"];

const images = [
  { id: 1, src: "/images/detal2.jpg", alt: "Image 1" },
  { id: 2, src: "/images/detal1.png", alt: "Image 2" },
  { id: 3, src: "/images/detal3.jpg", alt: "Image 3" },
  { id: 4, src: "/images/detal4.jpg", alt: "Image 4" },
];

const ProductDetal = ({ params: { slug } }: { params: { slug: string } }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselApi = useRef<any>(null);
  const [product, setProduct] = useState<{ title: string; price: number } | null>(null);

  const router = useRouter();

const handleAddToCart = () => {
  const selectedSize = selectedFilters.sizes[0];
  const selectedColor = selectedFilters.colors[0];

  if (!selectedSize || !selectedColor) {
    alert("Please select both color and size");
    return;
  }

  const item = {
    title: product?.title || "Unknown Product",
    price: product?.price || 0,
    size: selectedSize,
    color: selectedColor,
    image: images[0].src, // yoki product.image bo‘lsa
  };

  localStorage.setItem("cartItem", JSON.stringify(item));

  router.push("/landing/cart");
};


useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null); // fallback trigger
    }
  };

  fetchProduct();
}, [slug]);


  useEffect(() => {
    if (!carouselApi.current) return;

    const handleSelect = () => {
      setCurrentIndex(carouselApi.current.selectedScrollSnap())
    };

    carouselApi.current.on("select", handleSelect);

    return () => {
      if (carouselApi.current) {
        carouselApi.current.off("select", handleSelect);
      }
    };
  }, []);

  const handleThumbnailClick = (index: number) => {
    if (carouselApi.current) {
      carouselApi.current.scrollTo(index);
    }
  };

  const { isLoading: isLoadingColors, data: colorsData } = useColors();
  const isInitialLoading = isLoadingColors && !colorsData;

  const colors = colorsData?.length ? colorsData.map((c) => c.name) : fallbackColors;

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    genders: [] as string[],
  });

  const handleCheckboxChange = (
    type: "categories" | "sizes" | "colors" | "genders",
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <main className="p-4 md:p-14">
      {/* Desktop */}
      <div className="hidden md:flex gap-10">
        <div>
<ul className="flex flex-wrap gap-4 mb-4">
  <li className="w-full md:w-[calc(50%-0.5rem)]">
    <Image
      className="rounded-tl-[48px] w-full h-auto object-cover"
      src={images[0].src}
      alt={images[0].alt}
      width={800}
      height={600}
    />
  </li>
  <li className="w-full md:w-[calc(50%-0.5rem)]">
    <Image
      className="rounded-tr-[48px] w-full h-auto object-cover"
      src={images[1].src}
      alt={images[1].alt}
      width={800}
      height={600}
    />
  </li>
</ul>

<ul className="flex flex-wrap gap-4">
  <li className="w-full md:w-[calc(50%-0.5rem)]">
    <Image
      className="rounded-bl-[48px] w-full h-auto object-cover"
      src={images[2].src}
      alt={images[2].alt}
      width={800}
      height={600}
    />
  </li>
  <li className="w-full md:w-[calc(50%-0.5rem)]">
    <Image
      className="rounded-br-[48px] w-full h-auto object-cover"
      src={images[3].src}
      alt={images[3].alt}
      width={800}
      height={600}
    />
  </li>
</ul>

        </div>

        <div className="w-[430px]">
          <Link href="/" className={cn(buttonVariants({ variant: "blue" }), "w-[106px] h-[38px] rounded-[12px] text-[12px] font-semibold lowercase mb-3")}>
            New Release
          </Link>
     <h2 className="text-[32px] font-semibold">
  {product?.title || "ADIDAS 4DFWD X PARLEY RUNNING SHOES"}
</h2>

<h3 className="text-blue-500 text-2xl font-semibold">
  {product?.price ? `$${product.price.toFixed(2)}` : "$123.00"}
      </h3>
           <Accordion type="multiple" className="mt-8 w-full">
            {/* Color */}
            <AccordionItem value="colors">
              <AccordionTrigger className="text-base font-semibold uppercase">
                Color
              </AccordionTrigger>
              <AccordionContent>
                {isInitialLoading ? (
                  <div className="space-y-3">
                    {fallbackColors.map((_, i) => (
                      <div key={`loading-${i}`} className="flex items-center space-x-2">
                        <Checkbox disabled />
                        <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {colors.map((color, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${i}`}
                          checked={selectedFilters.colors.includes(color)}
                          onCheckedChange={() => handleCheckboxChange("colors", color)}
                        />
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.toLowerCase() }} />
                          <label htmlFor={`color-${i}`} className="text-sm">{color}</label>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Size */}
            <AccordionItem value="sizes">
              <AccordionTrigger className="text-base font-semibold uppercase">
                Size
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3">
                  {fallbackSizes.map((size, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${i}`}
                        checked={selectedFilters.sizes.includes(size)}
                        onCheckedChange={() => handleCheckboxChange("sizes", size)}
                      />
                      <label htmlFor={`size-${i}`} className="text-sm">{size}</label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Buttons */}
          <div className="mt-6">
            <div className="flex gap-4 mb-4">
            <button
              onClick={handleAddToCart}
              className={cn(buttonVariants(), "w-[374px] h-[48px] text-white")}
              >
              ADD TO CART
              </button>

              <Link href="#" className={cn(buttonVariants(), "w-[48px] h-[48px] text-white")}>
                <Image src="/images/yurak.svg" alt="Heart" width={24} height={24} />
              </Link>
            </div>
            <Link href="#" className={cn(buttonVariants({ variant: "blue" }), "w-[374px] h-[48px] text-white uppercase")}>
              Buy it now
            </Link>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-[16px] font-semibold">About the product</h3>
            <p className="text-[16px] mt-2 opacity-80">Shadow Navy / Army Green</p>
            <p className="text-[16px] mt-4 opacity-80">This product is excluded from all promotional discounts and offers</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
              <li>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile */}
<div className="md:hidden space-y-4">
  <Carousel 
    setApi={(api) => (carouselApi.current = api)}
    className="w-full overflow-hidden"
    opts={{ loop: true }}
   
  >
    <CarouselContent>
      {images.map((image) => (
        <CarouselItem key={image.id}>
          <div className="aspect-square w-full overflow-hidden rounded-xl">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>

  {/* Thumbnail images (clickable) */}
  <div className="flex justify-center gap-2 px-2 overflow-x-auto scrollbar-hide">
    {images.map((image, index) => (
      <button
        key={index}
        onClick={() => handleThumbnailClick(index)}
        className={cn(
          "w-16 h-16 border rounded-md overflow-hidden transition-all duration-300",
          currentIndex === index ? "border-blue-500 scale-105" : "border-gray-300"
        )}
      >
        <Image
          src={image.src}
          alt={`Thumbnail ${index + 1}`}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
  </div>
  </div>

        <div className="w-[358px] p-5 md:hidden mt-8 ">
          <Link href="#" className={cn(buttonVariants({ variant: "blue" }), "w-[106px] h-[38px] rounded-[12px] text-[12px] font-semibold lowercase mb-3")}>
            New Release
          </Link>
     <h2 className="text-[20px] font-semibold font-sans">
  {product?.title || "ADIDAS 4DFWD X PARLEY RUNNING SHOES"}
</h2>

<h3 className="text-blue-500 text-2xl font-semibold">
  {product?.price ? `$${product.price.toFixed(2)}` : "$123.00"}
      </h3>
           <Accordion type="multiple" className="mt-8 w-[300px]">
            {/* Color */}
            <AccordionItem value="colors">
              <AccordionTrigger className="text-base font-semibold uppercase">
                Color
              </AccordionTrigger>
              <AccordionContent>
                {isInitialLoading ? (
                  <div className="space-y-3">
                    {fallbackColors.map((_, i) => (
                      <div key={`loading-${i}`} className="flex items-center space-x-2">
                        <Checkbox disabled />
                        <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {colors.map((color, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${i}`}
                          checked={selectedFilters.colors.includes(color)}
                          onCheckedChange={() => handleCheckboxChange("colors", color)}
                        />
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.toLowerCase() }} />
                          <label htmlFor={`color-${i}`} className="text-sm">{color}</label>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Size */}
            <AccordionItem value="sizes">
              <AccordionTrigger className="text-base font-semibold uppercase">
                Size
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3">
                  {fallbackSizes.map((size, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${i}`}
                        checked={selectedFilters.sizes.includes(size)}
                        onCheckedChange={() => handleCheckboxChange("sizes", size)}
                      />
                      <label htmlFor={`size-${i}`} className="text-sm">{size}</label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Buttons */}
          <div className="mt-6 ">
            <div className="flex gap-4 mb-4">
             <button
              onClick={handleAddToCart}
              className={cn(buttonVariants(), "text-[14px] w-full font-medium h-[48px] text-white")}
                >
               ADD TO CART
                </button>

              <Link href="#" className={cn(buttonVariants(), "w-[48px] h-[48px] text-white")}>
                <Image src="/images/yurak.svg" alt="Heart" width={24} height={24} />
              </Link>
            </div>
            <Link href="#" className={cn(buttonVariants({ variant: "blue" }), "text-[14px] w-full font-med  h-[48px] text-white uppercase")}>
              Buy it now
            </Link>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-[16px] font-semibold">About the product</h3>
            <p className="text-[16px] mt-2 opacity-80">Shadow Navy / Army Green</p>
            <p className="text-[16px] mt-4 opacity-80">This product is excluded from all promotional discounts and offers</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
              <li>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
            </ul>
          </div>
        </div>
    </main>
  );
};

export default ProductDetal;
