"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema, type CategoryFormValues } from "@/lib/schemas/category"
import { type Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"

interface CategoryFormProps {
  initialData?: Category
  onSubmit: (data: CategoryFormValues) => void
  isSubmitting: boolean
  onCancel: () => void
}

export function CategoryForm({ initialData, onSubmit, isSubmitting, onCancel }: CategoryFormProps) {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: initialData?.title || "",
      isActive: initialData?.isActive ?? true,
      iconName: initialData?.iconName || "utensils",
      order: initialData?.order ?? 0,
    },
  })

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-white/5 bg-surface-1 p-8 shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Category Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Starters" 
                    {...field} 
                    className="bg-surface-2 border-none h-12 text-lg focus-visible:ring-1 focus-visible:ring-primary/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="iconName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Icon Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. utensils" 
                      {...field} 
                      className="bg-surface-2 border-none h-12 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">Lucide icon name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Sort Order</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="0" 
                      {...field} 
                      value={(field.value as number) || 0}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      className="bg-surface-2 border-none h-12 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-xl bg-surface-2 p-5 border border-white/5">
                <div className="space-y-1">
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

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting} className="hover:bg-white/5">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} variant="premium">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Category
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
