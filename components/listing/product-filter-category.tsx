import React, { useState, useEffect } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import useCategories from "@/hooks/useCategoriyes";

const fallbackCategories = [
  "Casual shoes",
  "Runners",
  "Hiking",
  "Sneaker",
  "Basketball",
  "Golf",
  "Outdoor",
];

function ProductFilterCategory() {
  const { isLoading: isCatLoading, data: categoriesData } = useCategories();
  const isInitialLoading = isCatLoading && !categoriesData;

  const categories = categoriesData?.length
    ? categoriesData.map((c) => c.name)
    : fallbackCategories;

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    genders: [] as string[],
  });

  // Agar sizda priceRange yoki celPer yo'q bo'lsa, ularsiz yozamiz
  useEffect(() => {
    console.log("Tanlangan filterlar:", selectedFilters);
    // console.log("Narx oralig'i:", priceRange);
    // console.log("Temperatura:", celPer);
  }, [selectedFilters]);

  const handleCheckboxChange = (
    type: "categories" | "sizes" | "colors" | "genders",
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
      <AccordionItem className="w-full" value="categories">
        <AccordionTrigger className="text-base font-semibold text-primary uppercase hover:no-underline">
          Category
        </AccordionTrigger>
        <AccordionContent>
          {isInitialLoading ? (
            <div className="space-y-3">
              {fallbackCategories.map((_, i) => (
                <div
                  key={`cat-loading-${i}`}
                  className="flex items-center space-x-2"
                >
                  <Checkbox disabled className="border-gray-300" />
                  <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="flex flex-col space-y-3">
              {categories.map((name, i) => (
                <li className="flex items-center space-x-2" key={`category-${i}`}>
                  <Checkbox
                    id={`category-${i}`}
                    checked={selectedFilters.categories.includes(name)}
                    onCheckedChange={() =>
                      handleCheckboxChange("categories", name)
                    }
                    className="border-gray-400 data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={`category-${i}`}
                    className="text-sm font-medium"
                  >
                    {name}
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

export default ProductFilterCategory;
