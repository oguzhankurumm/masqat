
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  listProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  countProductsByCategory,
  reassignProductsCategory,
  type ListProductsParams 
} from "@/lib/db/products";
import { type ProductFormValues } from "@/lib/schemas/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useProducts(params?: ListProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => listProducts(params),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useCountProductsByCategory() {
  return useMutation({
    mutationFn: (categoryId: string) => countProductsByCategory(categoryId),
  });
}

export function useReassignProductsCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ oldCategoryId, newCategoryId }: { oldCategoryId: string, newCategoryId: string }) => 
      reassignProductsCategory(oldCategoryId, newCategoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // We don't necessarily need to toast here, as this is part of a larger flow usually
    },
    onError: (error) => {
      console.error("Failed to reassign products", error);
      toast.error("Failed to reassign products");
    }
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ProductFormValues) => {
      // We need to map form values to ProductModel
      // The DB function expects Omit<Product, "id" | "updatedAt" | "createdAt">
      
      return createProduct({
        title: data.title,
        description: data.description || "",
        price: data.price,
        image: data.image,
        categoryId: data.categoryId,
        parentCategoryId: data.parentCategoryId || null,
        isAvailable: data.isAvailable,
        preparationTime: data.preparationTime || null,
        allergens: data.allergens,
        ingredients: data.ingredients,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      router.push("/admin/products");
    },
    onError: (error) => {
      console.error("Failed to create product", error);
      toast.error("Failed to create product");
    }
  });
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: Partial<ProductFormValues>) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    },
    onError: (error) => {
      console.error("Failed to update product", error);
      toast.error("Failed to update product");
    }
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  });
}
