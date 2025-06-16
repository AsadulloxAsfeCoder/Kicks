"use client"

import React, { useEffect, useState } from 'react'
import useProduct from '@/hooks/useProduct'
import ProductCard from '../common/product-card'

const dummyProducts = [
  {
    id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "test-product-1",
    is_new: true,
    discount: 10,
  },
  {
    id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "test-product-2",
    is_new: true,
  },
  {
    id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "test-product-3",
    is_new: true,
    discount: 20,
  },
  {
    id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "test-product-4",
    is_new: true,
  },
    {
    id: 5,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "test-product-4",
    is_new: true,
  },
   {
    id: 6,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    thumbnail: { file: "/krasofka.jpg" },
    price: 100,
    slug: "test-product-4",
    is_new: true,
  },
]

function ProductList() {
  const { data, isLoading, error } = useProduct()
  const [products, setProducts] = useState(dummyProducts)

useEffect(() => {
  if (data?.results && data.results.length > 0) {
    const mapped = data.results.map(item => ({
      ...item,
      id: Number(item.id),
      is_new:
        typeof item.is_new === "string"
          ? item.is_new === "true"
          : Boolean(item.is_new),
      discount: typeof item.discount === "number" ? item.discount : undefined,
    }));
    setProducts(mapped);
  }
}, [data]);



  return (
    <div>
      {isLoading && !data ? (
        <p>...Loading</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
          {products.map((p) => (
            <div className=' w-[]'>
            <ProductCard
              key={p.id}
              image={p.thumbnail?.file || "/placeholder.png"}
              title={p.name}
              slug={p.slug}
              price={p.price}
              priceColor={true}
              is_new={p.is_new === true}
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
