
"use client";

import { ProductForm } from "../_components/product-form";
import { useCreateProduct } from "@/hooks/use-products";

export default function NewProductPage() {
  const { mutate: createProduct, isPending } = useCreateProduct();

  return (
    <ProductForm
      onSubmit={(data) => createProduct(data)}
      isSubmitting={isPending}
    />
  );
}
