import React, { useState, useEffect } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";






function ProductFilterGender() {
  const [selectedFilters, setSelectedFilters] = useState({
    genders: [] as string[],
  });

  useEffect(() => {
    console.log("Selected filters:", selectedFilters);
  }, [selectedFilters]);

  const handleCheckboxChange = (
    type: "genders",
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
      <AccordionItem className="w-full" value="gender">
          <AccordionTrigger className="text-base font-semibold text-primary uppercase hover:no-underline">
            Gender
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col space-y-3">
              {["Man", "Woman"].map((gender, i) => (
                <li className="flex items-center space-x-2" key={`gender-${i}`}>
                  <Checkbox 
                    id={`gender-${i}`}
                    checked={selectedFilters.genders.includes(gender)}
                    onCheckedChange={() => handleCheckboxChange('genders', gender)}
                    className="border-gray-400 data-[state=checked]:border-primary"
                  />
                  <label htmlFor={`gender-${i}`} className="text-sm font-medium">
                    {gender}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
    </div>
  );
}

export default ProductFilterGender;