import { db } from "@/lib/firebase/client";
import { Category } from "@/types/category";
import { normalizeCategory } from "@/lib/normalizers/category";
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
  serverTimestamp,
} from "firebase/firestore";

const COLLECTION = "categories";

export async function listCategories(isActiveOnly = false): Promise<Category[]> {
  const constraints = [];
  if (isActiveOnly) {
    constraints.push(where("isActive", "==", true));
  }
  
  const q = query(collection(db, COLLECTION), ...constraints);
  const snapshot = await getDocs(q);
  
  const categories = snapshot.docs.map((doc) => normalizeCategory(doc.id, doc.data()));
  
  // Sort by order first (ascending), then by title
  return categories.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export async function getCategory(id: string): Promise<Category | null> {
  const docRef = doc(db, COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return normalizeCategory(snapshot.id, snapshot.data());
}

export async function createCategory(payload: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCategory(id: string, patch: Partial<Category>): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, createdAt, updatedAt, ...rest } = patch;
  await updateDoc(docRef, {
      ...rest,
      updatedAt: serverTimestamp(),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
