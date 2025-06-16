// hooks/useColors.ts
import { APICLient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Colors } from "@/types/product.types";

const apiClient = new APICLient<Colors[]>("/products/colors");

const useColors = () =>
  useQuery<Colors[], Error>({
    queryKey: ["colors"],
    queryFn: () => apiClient.getAll({}),
    staleTime: 60 * 1000,
  });

export default useColors;
