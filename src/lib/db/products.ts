import { db } from "@/lib/firebase/client";
import { Product } from "@/types/product";
import { normalizeProduct } from "@/lib/normalizers/product";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  serverTimestamp,
  QueryConstraint,
  writeBatch,
  getCountFromServer,
} from "firebase/firestore";

const COLLECTION = "products";

export interface ListProductsParams {
  categoryIds?: string[];
  isAvailable?: boolean;
  search?: string;
  limit?: number;
}

export async function listProducts(params: ListProductsParams = {}): Promise<Product[]> {
  const constraints: QueryConstraint[] = [];

  if (params.isAvailable !== undefined) {
    constraints.push(where("isAvailable", "==", params.isAvailable));
  }
  
  if (params.categoryIds && params.categoryIds.length > 0) {
     constraints.push(where("categoryId", "in", params.categoryIds));
  }

  if (params.limit) {
    constraints.push(limit(params.limit));
  }
  
  const q = query(collection(db, COLLECTION), ...constraints);
  const snapshot = await getDocs(q);
  
  let products = snapshot.docs.map((doc) => normalizeProduct(doc.id, doc.data()));

  if (params.search) {
      const lower = params.search.toLowerCase();
      products = products.filter(p => (p.title || "").toLowerCase().includes(lower));
  }
  
  return products;
}

export async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return normalizeProduct(snapshot.id, snapshot.data());
}

export async function createProduct(payload: Omit<Product, "id" | "updatedAt" | "createdAt">): Promise<string> {
  // We explicitly manage createdAt/updatedAt on creation
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(id: string, patch: Partial<Product>): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, updatedAt, createdAt, ...rest } = patch;
  await updateDoc(docRef, {
    ...rest,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function countProductsByCategory(categoryId: string): Promise<number> {
  const q = query(
    collection(db, COLLECTION), 
    where("categoryId", "==", categoryId)
  );
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

export async function reassignProductsCategory(oldCategoryId: string, newCategoryId: string): Promise<void> {
  const q = query(
    collection(db, COLLECTION),
    where("categoryId", "==", oldCategoryId)
  );
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { 
      categoryId: newCategoryId,
      updatedAt: serverTimestamp() 
    });
  });
  
  await batch.commit();
}
