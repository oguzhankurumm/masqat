import { useQuery } from "@tanstack/react-query";
import { listProducts } from "@/lib/db/products";

export function useSignatureProducts() {
    return useQuery({
        queryKey: ["products", "signature"],
        queryFn: async () => {
            // Since there's no explicit isFeatured flag in the current DB schema,
            // we'll fetch available items and restrict the quantity.
            const products = await listProducts({ isAvailable: true, limit: 10 });

            return products;
        },
        staleTime: 1000 * 60 * 5,
    });
}
