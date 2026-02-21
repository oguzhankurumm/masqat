
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "@/lib/schemas/product";
import { type Product } from "@/types/product";
import { useCategories } from "@/hooks/use-categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SmartImage } from "@/components/media/SmartImage";
import { PageHeader } from "@/components/ui/page-header";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting: boolean;
}

export function ProductForm({ initialData, onSubmit, isSubmitting }: ProductFormProps) {
  const router = useRouter();
  const { data: categories } = useCategories();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      categoryId: initialData?.categoryId || "",
      image: initialData?.image || "",
      isAvailable: initialData?.isAvailable ?? true,
      preparationTime: initialData?.preparationTime || null,
      allergens: initialData?.allergens || [],
      ingredients: initialData?.ingredients || [],
    },
  });
  // eslint-disable-next-line react-hooks/incompatible-library
  const imagePath = form.watch("image");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <PageHeader
          title={initialData ? "Edit Product" : "Create Product"}
          description={initialData ? "Make changes to your product" : "Add a new item to your menu"}
          backHref="/admin/products"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            variant="premium"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column - Main Info */}
            <div className="md:col-span-8 space-y-6">
              <div className="rounded-2xl border border-white/5 bg-surface-1 p-6 space-y-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Truffle Pasta" {...field} className="bg-surface-2 border-none focus-visible:ring-1 focus-visible:ring-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the dish..."
                            className="min-h-[120px] bg-surface-2 border-none focus-visible:ring-1 focus-visible:ring-primary/50 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preparationTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Prep Time (min)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 15"
                            {...field}
                            value={(field.value as number) || ""}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                            className="bg-surface-2 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Price (€)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              {...field}
                              value={field.value as number ?? ""}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              className="pl-8 bg-surface-2 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-surface-2 border-none focus:ring-1 focus:ring-primary/50">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-surface-1 p-6 space-y-6">
                <h3 className="text-lg font-medium text-white">Details</h3>
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Ingredients</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Flour, Sugar, Eggs"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                          className="bg-surface-2 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">Comma separated list</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allergens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Allergens</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Nuts, Dairy"
                          value={field.value?.join(", ") || ""}
                          onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                          className="bg-surface-2 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">Comma separated list</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Right Column - Media & Status */}
            <div className="md:col-span-4 space-y-6">
              <div className="rounded-2xl border border-white/5 bg-surface-1 p-6 space-y-6">
                <h3 className="text-lg font-medium text-white">Media</h3>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Image Path</FormLabel>
                      <FormControl>
                        <Input placeholder="/uploads/..." {...field} className="bg-surface-2 border-none focus-visible:ring-1 focus-visible:ring-primary/50 text-xs font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="aspect-[4/3] rounded-xl bg-surface-2 border border-white/5 overflow-hidden flex items-center justify-center relative group">
                  {imagePath ? (
                    <>
                      <SmartImage
                        path={imagePath}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white font-medium">Preview</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-muted-foreground text-sm">No Image</span>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-surface-1 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Availability</h3>
                <FormField
                  control={form.control}
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl bg-surface-2 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">Active Status</FormLabel>
                        <FormDescription className="text-xs">
                          Visible on menu
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
