import { APICLient } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import type { Response } from "@/types/product.types"




const apiClient = new APICLient<Response>('/product/product-list')  


const useProduct =()=> useQuery<Response,Error>({
    queryKey:['product'],
    queryFn:()=> apiClient.getAll({})
})

export default useProduct