// hooks/useCategories.ts
"use client"; // ← bu qatordan boshlang

import { APICLient } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Category } from "@/types/product.types";  // agar mavjud bo‘lsa

const apiCLient = new APICLient<Category[]>("/products/categories")

const useCategories = () => useQuery<Category[], Error>({
  queryKey: ["categories"],
  queryFn: () => apiCLient.getAll({}),
  staleTime: 60 * 1000,
})

export default useCategories
