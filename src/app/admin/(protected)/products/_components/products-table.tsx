
"use client";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDeleteProduct } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/media/SmartImage";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ListSkeleton } from "@/components/ui/loading-skeletons";
import { EmptyState } from "@/components/ui/empty-state";
import { PriceTag } from "@/components/ui/price-tag";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductsTable({ products, isLoading }: ProductsTableProps) {
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { data: categories } = useCategories();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) {
    return <ListSkeleton count={5} className="grid-cols-1" />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Get started by adding your first product."
      >
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </EmptyState>
    );
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  const getCategoryName = (id: string) => {
    return categories?.find(c => c.id === id)?.title || "Unknown";
  };

  return (
    <>
      <div className="space-y-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4 rounded-2xl bg-surface-1 p-4 border border-white/5">
             <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-surface-2">
                <SmartImage 
                  path={product.image} 
                  alt={product.title || "Product"} 
                  fill 
                  className="object-cover"
                />
             </div>
             <div className="flex flex-1 flex-col justify-between">
                <div>
                   <div className="flex justify-between items-start">
                      <h3 className="font-medium text-white line-clamp-1">{product.title}</h3>
                      <PriceTag price={product.price} className="text-amber-400 font-bold" />
                   </div>
                   <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                   <Badge 
                      variant={product.isAvailable ? "default" : "secondary"}
                      className={product.isAvailable 
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-none px-2 py-0.5 text-[10px]" 
                        : "bg-muted text-muted-foreground px-2 py-0.5 text-[10px]"}
                    >
                      {product.isAvailable ? 'Active' : 'Draft'}
                    </Badge>
                    
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteId(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block rounded-2xl border border-white/5 bg-surface-1 overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-2/50">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[80px] pl-6">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-white/5 hover:bg-surface-2/30 transition-colors">
                <TableCell className="pl-6">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-surface-2 border border-white/5">
                    <SmartImage 
                      path={product.image} 
                      alt={product.title || "Product"} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-white">
                    {product.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <Badge variant="secondary" className="bg-surface-2 font-normal text-muted-foreground hover:bg-surface-3">
                    {getCategoryName(product.categoryId)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <PriceTag price={product.price} className="font-mono text-amber-400" />
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={product.isAvailable ? "default" : "secondary"}
                    className={product.isAvailable 
                      ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 shadow-none font-normal" 
                      : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700 font-normal"}
                  >
                    {product.isAvailable ? 'Active' : 'Unavailable'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                      onClick={() => setDeleteId(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />
    </>
  );
}
