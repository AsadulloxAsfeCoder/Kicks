"use client"
import React, { useState, useEffect } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import useSizes from "@/hooks/useSizes";

const fallbackSizes = ["42", "41", "39", "38", "43", "45", "44"];

function ProductFilterSize() {
  const { isLoading: isSizeLoading, data: sizeData } = useSizes();
  const isInitialLoading = isSizeLoading && !sizeData;

  const sizes = sizeData?.length ? sizeData.map((s) => s.name) : fallbackSizes;

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    genders: [] as string[],
  });

  useEffect(() => {
    console.log("Tanlangan filterlar:", selectedFilters);
  }, [selectedFilters]);

  const handleCheckboxChange = (
    type: "sizes", // to‘g‘ri nom
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const alreadySelected = prev[type].includes(value);
      const updated = alreadySelected
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];

      return {
        ...prev,
        [type]: updated,
      };
    });
  };

  return (
    <div>
      <AccordionItem className="w-full" value="sizes">
        <AccordionTrigger className="text-base font-semibold text-primary uppercase hover:no-underline">
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
                    checked={selectedFilters.sizes.includes(size)}
                    onCheckedChange={() => handleCheckboxChange("sizes", size)}
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
    </div>
  );
}

export default ProductFilterSize;
