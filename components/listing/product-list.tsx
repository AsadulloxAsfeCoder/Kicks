"use client"

import React, { useEffect, useState } from 'react'
import useProduct from '@/hooks/useProduct'
import ProductCard from '../common/product-card'

// Type definition
interface Product {
  id: number
  name: string
  thumbnail: {
    file: string
  }
  price: number
  slug: string
  is_new?: boolean | string
  discount?: number
}

// Dummy data fallback
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/images/krasofka.jpg" },
    price: 100,
    slug: "test-product-1",
    is_new: true,
    discount: 10,
  },
  {
    id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/images/krasofka.jpg" },
    price: 100,
    slug: "test-product-2",
    is_new: true,
  },
  {
    id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/images/krasofka.jpg" },
    price: 100,
    slug: "test-product-3",
    is_new: true,
    discount: 20,
  },
  {
    id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/images/krasofka.jpg" },
    price: 100,
    slug: "test-product-4",
    is_new: true,
  },
  {
    id: 5,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/images/krasofka.jpg" },
    price: 100,
    slug: "test-product-5",
    is_new: true,
  },
  {
    id: 6,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/images/krasofka.jpg" },
    price: 100,
    slug: "test-product-6",
    is_new: true,
  },
]

function ProductList() {
  const { data, isLoading } = useProduct()
  const [products, setProducts] = useState<Product[]>(dummyProducts)

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      const mapped = data.results.map((item: any) => ({
        id: Number(item.id),
        name: item.name,
        thumbnail: item.thumbnail,
        price: item.price,
        slug: item.slug,
        is_new: typeof item.is_new === 'string'
          ? item.is_new === 'true'
          : Boolean(item.is_new),
        discount: typeof item.discount === 'number' ? item.discount : undefined,
      }))
      setProducts(mapped)
    }
  }, [data])

  return (
    <div>
      {isLoading && !data ? (
        <p>...Loading</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="w-full">
              <ProductCard
                image={p.thumbnail?.file || "/images/placeholder.png"}
                title={p.name}
                slug={p.slug}
                price={p.price}
                priceColor={true}
                is_new={!!p.is_new}
                discount={p.discount}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
