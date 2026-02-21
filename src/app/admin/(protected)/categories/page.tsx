"use client"

import { useState } from "react"
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-categories"
import { useCountProductsByCategory, useReassignProductsCategory } from "@/hooks/use-products"
import { CategoryForm } from "./_components/category-form"
import { CategoriesTable } from "./_components/categories-table"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { Plus, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { type Category } from "@/types/category"
import { type CategoryFormValues } from "@/lib/schemas/category"
import { toast } from "sonner"

export default function AdminCategories() {
  const { data: categories = [], isLoading } = useCategories()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Migration state
  const [migrationOpen, setMigrationOpen] = useState(false)
  const [blockingProductCount, setBlockingProductCount] = useState(0)
  const [targetCategoryId, setTargetCategoryId] = useState<string>("")
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteCategory()
  const { mutateAsync: countProducts } = useCountProductsByCategory()
  const { mutateAsync: reassignProducts, isPending: isReassigning } = useReassignProductsCategory()

  const handleDeleteClick = async (id: string) => {
    try {
      const count = await countProducts(id)
      if (count > 0) {
        setBlockingProductCount(count)
        setCategoryToDelete(id)
        setMigrationOpen(true)
      } else {
        setDeleteId(id)
      }
    } catch {
      toast.error("Failed to check category usage")
    }
  }

  const handleReassignAndDelete = async () => {
    if (!categoryToDelete || !targetCategoryId) return

    try {
      await reassignProducts({
        oldCategoryId: categoryToDelete,
        newCategoryId: targetCategoryId
      })

      deleteMutate(categoryToDelete, {
        onSuccess: () => {
          setMigrationOpen(false)
          setCategoryToDelete(null)
          setTargetCategoryId("")
          setBlockingProductCount(0)
        }
      })
    } catch (err) {
      console.error(err);
      toast.error("Failed to reassign and delete category. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Categories"
          description="Organize your menu structure"
        />
        <Button onClick={() => {
          setEditingCategory(undefined)
          setIsDialogOpen(true)
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoriesTable
        categories={categories}
        isLoading={isLoading}
        onEdit={(category) => {
          setEditingCategory(category)
          setIsDialogOpen(true)
        }}
        onDelete={handleDeleteClick}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory ? "Make changes to your category here." : "Add a new category to your menu."}
            </DialogDescription>
          </DialogHeader>
          <CategoryFormWrapper
            initialData={editingCategory}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={migrationOpen} onOpenChange={(open) => {
        if (!open) {
          setMigrationOpen(false)
          setCategoryToDelete(null)
          setTargetCategoryId("")
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Cannot Delete Category
            </DialogTitle>
            <DialogDescription>
              This category contains <strong>{blockingProductCount}</strong> products. You must reassign them to another category before deleting.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reassign to</Label>
              {categories.filter(c => c.id !== categoryToDelete).length > 0 ? (
                <Select value={targetCategoryId} onValueChange={setTargetCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter(c => c.id !== categoryToDelete)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-destructive mt-2 p-3 bg-destructive/10 rounded-md">
                  There are no other categories to reassign products to. Please create another category first.
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMigrationOpen(false)}
              disabled={isReassigning || isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReassignAndDelete}
              disabled={!targetCategoryId || isReassigning || isDeleting}
            >
              {isReassigning ? "Reassigning..." : "Reassign & Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteMutate(deleteId)
          setDeleteId(null)
        }}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  )
}

function CategoryFormWrapper({ initialData, onClose }: { initialData?: Category, onClose: () => void }) {
  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()

  const onSubmit = (data: CategoryFormValues) => {
    if (initialData) {
      updateMutation.mutate({ id: initialData.id, data }, {
        onSuccess: onClose
      })
    } else {
      createMutation.mutate({
        ...data,
        description: data.description || "",
        parentCategoryId: null,
      }, {
        onSuccess: onClose
      })
    }
  }

  return (
    <CategoryForm
      initialData={initialData}
      onSubmit={onSubmit}
      isSubmitting={createMutation.isPending || updateMutation.isPending}
      onCancel={onClose}
    />
  )
}
