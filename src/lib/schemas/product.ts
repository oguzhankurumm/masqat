
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  parentCategoryId: z.string().optional(),
  preparationTime: z.coerce.number().min(0).optional(),
  image: z
    .string()
    .min(1, "Image path is required")
    .startsWith("/uploads/", "Image path must start with /uploads/"),
  isAvailable: z.boolean().default(true),
  allergens: z.array(z.string()).default([]),
  ingredients: z.array(z.string()).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
