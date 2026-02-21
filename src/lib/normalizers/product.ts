import { Timestamp, DocumentData } from 'firebase/firestore';

export interface ProductModel {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  parentCategoryId: string | null;
  isAvailable: boolean;
  preparationTime: number | null;
  allergens: string[];
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function normalizeProduct(docId: string, data: DocumentData): ProductModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeDate = (val: any): Date => {
    if (!val) return new Date();
    if (val instanceof Timestamp) return val.toDate();
    if (typeof val === 'string') return new Date(val);
    return new Date();
  };

  // Handle image path: ensure it starts with /uploads/ if it looks like a local file
  // But strictly speaking, the report says product.image = "/uploads/images/<file>.webp"
  // so we just pass it through if present, or provide a placeholder.
  const imagePath = data.image || '/uploads/images/placeholder.webp';

  return {
    id: docId,
    title: data.title || 'Untitled Item',
    description: data.description || '',
    price: typeof data.price === 'number' ? data.price : 0,
    image: imagePath,
    categoryId: data.categoryId || '',
    parentCategoryId: data.parentCategoryId || null,
    isAvailable: data.isAvailable ?? true,
    preparationTime: typeof data.preparationTime === 'number' ? data.preparationTime : null,
    allergens: Array.isArray(data.allergens) ? data.allergens : [],
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    createdAt: safeDate(data.createdAt),
    updatedAt: safeDate(data.updatedAt),
  };
}
