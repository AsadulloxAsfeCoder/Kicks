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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import useCategories from "@/hooks/useCategoriyes"
import useSizes from "@/hooks/useSizes"
import useColors from "@/hooks/useColors"
import React, { useState } from 'react'
import { Button, buttonVariants } from "@/components/ui/button"
import { ListFilter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import ProductFilterCategory from "./product-filter-category"
import ProductFilterGender from "./product-filter-gender"
import ProductFilterPrice from "./product--filter-price"
import { useRouter, useSearchParams } from "next/navigation"

const fallbackCategories = [
  "Casual shoes", "Runners", "Hiking", "Sneaker", "Basketball", "Golf", "Outdoor"
]

interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  genders: string[];
  minPrice: number;
  maxPrice: number;
}

const ProductFilterMobile = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Initialize state from URL params or defaults
  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get('categories')?.split(',') || [],
    sizes: searchParams.get('sizes')?.split(',') || [],
    colors: searchParams.get('colors')?.split(',') || [],
    genders: searchParams.get('genders')?.split(',') || [],
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 1000,
  })

  const { isLoading: isCatLoading, data: categoriesData } = useCategories()
  const { isLoading: isSizeLoading, data: sizeData } = useSizes()
  const { isLoading: isColorLoading, data: colorData } = useColors()

  const categories = categoriesData?.length ? categoriesData.map(c => c.name) : fallbackCategories

  const handleApplyFilters = () => {
    // Create URL with all selected filters
    const params = new URLSearchParams()
    
    if (filters.categories.length) params.set('categories', filters.categories.join(','))
    if (filters.sizes.length) params.set('sizes', filters.sizes.join(','))
    if (filters.colors.length) params.set('colors', filters.colors.join(','))
    if (filters.genders.length) params.set('genders', filters.genders.join(','))
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString())
    if (filters.maxPrice < 1000) params.set('maxPrice', filters.maxPrice.toString())

    router.push(`/landing/listing?${params.toString()}`)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      genders: [],
      minPrice: 0,
      maxPrice: 1000,
    })
    router.push('/landing/listing')
  }

  const updateFilter = (type: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
            <Accordion className="w-full p-5" type="multiple">
              {/* Category */}
              <ProductFilterCategory 
             
              />
              <hr className="border border-black opacity-10" />
              
              {/* Gender */}
              <ProductFilterGender 
             
              />
              <hr className="border border-black opacity-10" />
              
              {/* Price */}
              <ProductFilterPrice
               
              />
              <hr className="border border-black opacity-10" />
            </Accordion>
          </ScrollArea>
        </div>

        <DrawerFooter className="flex flex-row justify-between gap-4">
          <Button
            variant="outline"
            className="w-[175px] h-[44px] rounded-xl border border-black text-black bg-white hover:bg-gray-100 transition"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
          <Button
            className="w-[175px] h-[44px] rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-md"
            onClick={handleApplyFilters}
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ProductFilterMobile