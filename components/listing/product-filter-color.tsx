"use client"
import React, { useState, useEffect } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import useColors from "@/hooks/useColors";

interface Color {
  id: string;
  name: string;
  // Add other color properties if needed
}

const fallbackColors = [
  "Red",
  "Blue",
  "White",
  "Black",
  "Pink",
  "Orange",
  "Yellow",
];

function ProductFilterColor() {
  // Remove generic type from useColors since we're defining the return type in the interface
  const { isLoading: isLoadingColors, data: colorsData } = useColors();
  const isInitialLoading = isLoadingColors && !colorsData;

  // Cast colorsData to Color[] type if needed
 const colors = colorsData?.length
  ? colorsData.map((c) => c.name)
  : fallbackColors;

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    genders: [] as string[],
  });

  useEffect(() => {
    console.log("Selected filters:", selectedFilters);
  }, [selectedFilters]);

  const handleCheckboxChange = (
    type: "categories" | "sizes" | "colors" | "genders",
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
      <AccordionItem className="w-full" value="colors">
        <AccordionTrigger className="text-base font-semibold text-primary uppercase hover:no-underline">
          Color
        </AccordionTrigger>
        <AccordionContent>
          {isInitialLoading ? (
            <div className="space-y-3">
              {fallbackColors.map((_, i) => (
                <div
                  key={`color-loading-${i}`}
                  className="flex items-center space-x-2"
                >
                  <Checkbox disabled className="border-gray-300" />
                  <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="flex flex-col space-y-3">
              {colors.map((color, i) => (
                <li className="flex items-center space-x-2" key={`color-${i}`}>
                  <Checkbox
                    id={`color-${i}`}
                    checked={selectedFilters.colors.includes(color)}
                    onCheckedChange={() => handleCheckboxChange("colors", color)}
                    className="border-gray-400 data-[state=checked]:border-primary"
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    <label htmlFor={`color-${i}`} className="text-sm font-medium">
                      {color}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

export default ProductFilterColor;