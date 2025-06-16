'use client'; // Add this directive at the top

import { useQuery } from "@tanstack/react-query"
import { APICLient } from "@/lib/axios"
import type { ProductDetail,  } from "@/types/product.types"

const useProducts = (slug: string) => {
  const apiClient = new APICLient<ProductDetail>(`/product/product/${slug}/`)
    
  return useQuery<ProductDetail, Error>({
    queryKey: ['product', slug],
    queryFn: () => apiClient.get(slug)
  })
}

export default useProducts