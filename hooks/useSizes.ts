// hooks/useSizes.ts
"use client"

import { APICLient } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Size } from "@/types/product.types"

const apiClient = new APICLient<Size[]>("/products/sizes")

const useSizes = () =>
  useQuery<Size[], Error>({
    queryKey: ["sizes"],
    queryFn: () => apiClient.getAll({}),
    staleTime: 60 * 1000,
  })

export default useSizes
