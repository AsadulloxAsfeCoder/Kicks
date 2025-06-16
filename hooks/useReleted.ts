import { useQuery } from '@tanstack/react-query'
import AxiosInstance from '@/lib/axios'

const useReletedProduct = (id: string | number) => {
  return useQuery({
    queryKey: ['releted-products', id],
    queryFn: async () => {
      const res = await AxiosInstance.get(`/product/${id}/`)
      return res.data.results 
    },
    enabled: !!id
  })
}

export default useReletedProduct
