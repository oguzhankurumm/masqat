import { z } from "zod"

export const categorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
  iconName: z.string().min(1, "Icon is required").default("utensils"),
  order: z.coerce.number().default(0),
  isMainCategory: z.boolean().default(false),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
