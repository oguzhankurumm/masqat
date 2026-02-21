
"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { ProductsTable } from "./_components/products-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { ListProductsParams } from "@/lib/db/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [availability, setAvailability] = useState<string>("all");

  const { data: categories } = useCategories();

  // Prepare params for the hook
  const params: ListProductsParams = {
    search: search || undefined,
  };
  
  if (categoryId && categoryId !== "all") {
    params.categoryIds = [categoryId];
  }

  if (availability !== "all") {
    params.isAvailable = availability === "available";
  }

  const { data: products = [], isLoading } = useProducts(params);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader 
          title="Products" 
          description="Manage your lounge menu items"
          className="pb-0"
        />
        <Link href="/admin/products/new">
          <Button variant="premium" className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add New Dish
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-surface-1 p-1 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 border-none bg-transparent pl-9 focus-visible:ring-0"
          />
        </div>
        <div className="flex gap-2 p-1">
            <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="h-9 w-full min-w-[140px] border-none bg-surface-2 md:w-auto">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                    {cat.title}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>

            <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="h-9 w-full min-w-[120px] border-none bg-surface-2 md:w-auto">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Active</SelectItem>
                <SelectItem value="unavailable">Draft</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </div>

      <ProductsTable products={products} isLoading={isLoading} />
    </div>
  );
}
