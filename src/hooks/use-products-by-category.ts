import { useQuery } from "@tanstack/react-query";
import { listProducts } from "@/lib/db/products";

export function useProductsByCategory(categoryId: string | null) {
    return useQuery({
        queryKey: ["products", "category", categoryId],
        queryFn: async () => {
            if (!categoryId) return [];

            const products = await listProducts({ categoryIds: [categoryId] });

            // Sort public view: Available first, then logically by title
            return products.sort((a, b) => {
                if (a.isAvailable === b.isAvailable) {
                    return (a.title || "").localeCompare(b.title || "");
                }
                return a.isAvailable ? -1 : 1;
            });
        },
        enabled: !!categoryId,
        staleTime: 1000 * 60 * 5, // 5 min cache
    });
}
