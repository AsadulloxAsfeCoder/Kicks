import React, { useState, useEffect } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Slider } from "../ui/slider";

function ProductFilterPrice() {
  // Narx diapazonini saqlash uchun state (masalan: [min, max])
  const [value, setValue] = useState<[number, number]>([0, 1000]);

  const [selectedFilters, setSelectedFilters] = useState({
    price: [] as string[],
  });

  useEffect(() => {
    console.log("Selected filters:", selectedFilters);
  }, [selectedFilters]);

  // Agar narx o'zgarganda selectedFilters ni yangilash kerak bo'lsa:
  useEffect(() => {
    const priceRange = `$${value[0]} - $${value[1]}`;
    setSelectedFilters(prev => ({
      ...prev,
      price: [priceRange],
    }));
  }, [value]);

  const handleCheckboxChange = (
    type: "price",
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div>
      <AccordionItem className="w-full" value="price">
        <AccordionTrigger className="text-base font-semibold text-primary uppercase hover:no-underline">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-2">
        <Slider defaultValue={[0]} max={1000} step={1} 
       onValueChange={(evt) => setValue(evt as [number, number])}
/>
        <div className="flex justify-between">
          <p className="text-sm text-gray-700 font-semibold">${value[0]}</p>
          <p className="text-sm text-gray-700 font-semibold">$1000</p>
        </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

export default ProductFilterPrice;
