import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from "@/lib/db/categories";
import { countProductsByCategory } from "@/lib/db/products";
import { type Category } from "@/types/category";
import { toast } from "sonner";

export function useCategories(isActiveOnly = false) {
  return useQuery({
    queryKey: ["categories", isActiveOnly],
    queryFn: () => listCategories(isActiveOnly),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMainCategories(isActiveOnly = false) {
  return useQuery({
    queryKey: ["categories", isActiveOnly],
    queryFn: () => listCategories(isActiveOnly),
    staleTime: 1000 * 60 * 5,
    select: (data) => data.filter(c => c.isMainCategory).sort((a, b) => a.order - b.order),
  });
}

export function useSubCategories(parentId: string | null, isActiveOnly = false) {
  return useQuery({
    queryKey: ["categories", isActiveOnly],
    queryFn: () => listCategories(isActiveOnly),
    staleTime: 1000 * 60 * 5,
    select: (data) => parentId ? data.filter(c => !c.isMainCategory && c.parentCategoryId === parentId).sort((a, b) => a.order - b.order) : [],
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error) => {
      console.error("Failed to create category", error);
      toast.error("Failed to create category");
    }
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) => updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update category", error);
      toast.error("Failed to update category");
    }
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const count = await countProductsByCategory(id);
      if (count > 0) {
        throw new Error(`Cannot delete category with ${count} products. Please reassign or delete them first.`);
      }
      return deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete category", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete category");
    }
  });
}
