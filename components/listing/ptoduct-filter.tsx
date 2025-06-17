"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import ProductFilterCategory from "./product-filter-category"
import ProductFilterSize from "./product-filter-size"
import ProductFilterColor from "./product-filter-color"
import ProductFilterGender from "./product-filter-gender"
import ProductFilterPrice from "./product--filter-price"

function ProductFilter() {
  return (
    <div className="w-full max-w-[315px]  flex-col hidden lg:flex space-y-4 pt-5 lg:pt-10">
      <h3 className="text-2xl font-semibold text-primary">Filters</h3> 
      <Accordion className="w-full " type="single"  collapsible>
        {/* Category */}
       <hr className="border border-black opacity-10" />
       <ProductFilterCategory/>
       <hr className="border border-black opacity-10" />
        {/* Gender */}
       <ProductFilterGender/>
       <hr className="border border-black opacity-10" />
        {/* Price Slider */}
        <ProductFilterPrice/>
          <hr className="border border-black opacity-10" />
      </Accordion>
    </div>
  )
}

export default ProductFilter
 