"use client"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import useCategories from "@/hooks/useCategoriyes"
import useSizes from "@/hooks/useSizes"
import useColors from "@/hooks/useColors"
import React, { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button, buttonVariants } from "@/components/ui/button"
import { ListFilter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import ProductFilterCategory from "./product-filter-category"
import ProductFilterSize from "./product-filter-size"
import ProductFilterColor from "./product-filter-color"
import ProductFilterGender from "./product-filter-gender"
import ProductFilterPrice from "./product--filter-price"

const fallbackSizes = ["42", "41", "39", "38", "43", "45", "44"]
const fallbackColors = ["Red", "Blue", "White", "Black", "Pink", "Orange", "Yellow"]
const fallbackCategories = [
  "Casual shoes", "Runners", "Hiking", "Sneaker", "Basketball", "Golf", "Outdoor"
]

const ProductFilterMobile = () => {
  const { isLoading: isCatLoading, data: categoriesData } = useCategories()
  const { isLoading: isSizeLoading, data: sizeData } = useSizes()
  const { isLoading: isColorLoading, data: colorData } = useColors()
  const [minPrice, setMinPrice] = useState(0)



  const categories = categoriesData?.length ? categoriesData.map(c => c.name) : fallbackCategories
  const sizes = sizeData?.length ? sizeData.map(s => s.value) : fallbackSizes
  const colors = colorData?.length ? colorData.map(c => c.name) : fallbackColors

  const isInitialLoading = (isCatLoading && !categoriesData) ||
    (isSizeLoading && !sizeData) ||
    (isColorLoading && !colorData)

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    genders: [] as string[],
  })

  const handleCheckboxChange = (
    type: 'categories' | 'sizes' | 'colors' | 'genders',
    value: string
  ) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }))
  }

  return (
    <Drawer>
      <DrawerTrigger className={cn(
        buttonVariants({ variant: 'outline' }),
        'flex items-center gap-2 lg:hidden text-sm font-semibold max-w-[136px] mb-6'
      )}>
        Filter <ListFilter className="w-4 h-4" />
      </DrawerTrigger>

      <DrawerContent className="top-0 mt-0 pt-0 max-h-screen h-screen rounded-t-none px-4 flex flex-col">
        <DrawerHeader>
          <div className="flex items-center justify-between w-full">
            <DrawerTitle className="text-[20px] font-semibold">Filter</DrawerTitle>
            <DrawerDescription className="sr-only">Product Filter</DrawerDescription>
            <DrawerClose>
              <X className="w-6 h-6 text-gray-700" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto flex-grow pb-6">
          <ScrollArea>
          <Accordion className="w-full p-5" type="multiple" >
            {/* Category */}
          <ProductFilterCategory/>
          <hr className="border border-black opacity-10" />
            {/* Sizes */}
          <ProductFilterSize/>
          <hr className="border border-black opacity-10" />
            {/* Colors */}
          <ProductFilterColor/>
          <hr className="border border-black opacity-10" />
            {/* Gender */}
          <ProductFilterGender/>
          <hr className="border border-black opacity-10" />
            {/* Price */}
          <ProductFilterPrice/> 
          <hr className="border border-black opacity-10" />
          </Accordion>
          </ScrollArea>
        </div>

<DrawerFooter className="flex flex-row justify-between gap-4">
  <Button
    variant="outline"
    className="w-[175px] h-[44px] rounded-xl border border-black text-black bg-white hover:bg-gray-100 transition"
  >
    Reset
  </Button>
  <Button
    className=" w-[175px] h-[44px] rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-md"
  >
    Apply
  </Button>
</DrawerFooter>

      </DrawerContent>
    </Drawer>
  )
}

export default ProductFilterMobile
