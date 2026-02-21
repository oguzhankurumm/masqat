
"use client";

import { ProductForm } from "../_components/product-form";
import { useProduct, useUpdateProduct } from "@/hooks/use-products";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const { data: product, isLoading } = useProduct(id);
  const { mutate: updateProduct, isPending } = useUpdateProduct(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-12 text-zinc-500">Product not found</div>;
  }

  return (
    <ProductForm
      initialData={product}
      onSubmit={(data) => updateProduct(data)}
      isSubmitting={isPending}
    />
  );
}
