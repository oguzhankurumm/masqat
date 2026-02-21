import { Timestamp, DocumentData } from 'firebase/firestore';

export interface CategoryModel {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isActive: boolean;
  isMainCategory: boolean;
  order: number;
  parentCategoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function normalizeCategory(docId: string, data: DocumentData): CategoryModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeDate = (val: any): Date => {
    if (!val) return new Date();
    if (val instanceof Timestamp) return val.toDate();
    if (typeof val === 'string') return new Date(val);
    return new Date();
  };

  return {
    id: docId,
    title: data.title || 'Untitled Category',
    description: data.description || '',
    iconName: data.iconName || 'LayoutGrid', // Default lucide icon
    isActive: data.isActive ?? true,
    isMainCategory: data.isMainCategory ?? false,
    order: typeof data.order === 'number' ? data.order : 999,
    parentCategoryId: data.parentCategoryId || null,
    createdAt: safeDate(data.createdAt),
    updatedAt: safeDate(data.updatedAt),
  };
}
