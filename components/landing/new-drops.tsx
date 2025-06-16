"use client"

import AxiosInstance from '@/lib/axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/common/product-card'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from "@/lib/utils"


// Dummy productlar
const dummyProducts = [
  {
    id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "/product/test-product-1",
    is_new: true,
    discount: true,
  },
  {
    id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "/product/test-product-1",
    is_new: true,
  },
  {
    id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "/product/test-product-1",
    is_new: true,
    discount: true,
  },
  {
    id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "/product/test-product-1",
    is_new: true,
  },
]

// Type'lar
interface Product {
  id: number | string
  name: string
  is_new: boolean
  discount: number
  thumbnail: {
    file: string
  }
  price: number
  slug: string
}

interface Response {
  count: number
  next: string | null
  pervious: string | null
  results: Product[]
}

// 🔧 Component
const NewDrops = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts)

  async function getProduct() {
    try {
      const response = await AxiosInstance.get<Response>("/product/product-list")
      console.log(response.data.results)
      setProducts(response.data.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <section className='lg:pr-0 '>
      <div className='p-5 lg:p-12 pb-4 lg:pb-32 pr-0'>
        <div className='flex justify-between items-center pr-5 lg:items-end mb-6 lg:mb-8'>
            <div className='w-[589px] '>
        <h2 className='w-full max-w-[589x]  text-2xl lg:text-[74px] font-semibold lg:uppercase'> Don't miss out new droops</h2>
            </div>
        <Link href='/new-drps' className={cn(buttonVariants({variant: "blue"}))} >SHOW NEW DROPS</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pr-5 ">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              is_new={product.is_new}
              priceColor
              image={product.thumbnail?.file || ""}
              title={product.name}
              slug={product.slug}
              price={product.price}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewDrops
