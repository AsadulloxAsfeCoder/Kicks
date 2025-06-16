"use client"

import useProduct from '@/hooks/useProduct'
import React from 'react'
import ProductCard from '../common/product-card'
import { Skeleton } from '../ui/skeleton'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import CarouselContent, { Carousel, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'


interface Product {
  id:string | number | undefined
  name: string
  thumbnail: { file: string }
  price: number
  slug: string
  is_new?: boolean | string // Can be boolean or string
  discount?: number
}

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 125,
    slug: "/product/adidas-4dfwd-parley",
    is_new: true,
    discount: 10,
  },
  {
    id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 125,
    slug: "/product/adidas-4dfwd-parley-2",
    is_new: "true", // String example
  },
  {
    id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 125,
    slug: "/product/adidas-4dfwd-parley-3",
    is_new: true,
    discount: 15,
  },
  {
    id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 125,
    slug: "/product/adidas-4dfwd-parley-4",
    is_new: false, // Explicit false example
  },
]

function RelatedProducts() {
  const { data, isLoading, error } = useProduct()

  // Determine which products to display
  const products = error || !data?.results?.length ? dummyProducts : data.results

  // Safe check for is_new status
  const checkIsNew = (value: boolean | string | undefined): boolean => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true'
    }
    return Boolean(value)
  }

  return (
    <Carousel className='overflow-hidden'>
    <CarouselContent>
        <CarouselItem>
    <section className="p-14">
      <h2 className="text-2xl lg:text-[48px] font-bold mb-8">You may also like</h2>
    <div className='relative lg:bottom-8 bottom-16 lg:right-0'>
      <CarouselPrevious isWhiteIcon className="bg-primary p-2"/>
      <CarouselNext isWhiteIcon className='bg-primary'/>
      </div>
      {error && (
     
  <div></div>
      
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.id}
              image={p.thumbnail?.file || "/placeholder.png"}
              title={p.name}
              slug={p.slug}
              price={p.price}
              priceColor={true}
    
            />
          ))
        )}
      </div>
    </section>
    </CarouselItem>
       <CarouselItem>
    <section className="p-14">
      <h2 className="text-2xl lg:text-[48px] font-bold mb-8">You may also like</h2>
     <div className='relative lg:bottom-8 bottom-16 lg:right-0'>
      <CarouselPrevious isWhiteIcon className="bg-primary p-2"/>
      <CarouselNext isWhiteIcon className='bg-primary'/>
      </div>
      {error && (
     
  <div></div>
      
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.id}
              image={p.thumbnail?.file || "/placeholder.png"}
              title={p.name}
              slug={p.slug}
              price={p.price}
              priceColor={true}
            />
          ))
        )}
      </div>
    </section>
    </CarouselItem>
       <CarouselItem>
    <section className="p-14">
      <h2 className="text-2xl lg:text-[48px] font-bold mb-8">You may also like</h2>
      <div className='relative lg:bottom-8 bottom-16 lg:right-0'>
      <CarouselPrevious isWhiteIcon className="bg-primary p-2"/>
      <CarouselNext isWhiteIcon className='bg-primary'/>
      </div>
      {error && (
     
  <div></div>
      
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.id}
              image={p.thumbnail?.file || "/placeholder.png"}
              title={p.name}
              slug={p.slug}
              price={p.price}
              priceColor={true}
            />
          ))
        )}
      </div>
    </section>
    </CarouselItem>
    </CarouselContent>
    </Carousel>
  )
}

export default RelatedProducts