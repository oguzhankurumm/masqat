import { useQuery } from "@tanstack/react-query";
import { 
  collection, 
  getCountFromServer, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs 
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const productsRef = collection(db, "products");
      const categoriesRef = collection(db, "categories");

      // 1. Total Products
      const totalSnapshot = await getCountFromServer(productsRef);
      const totalProducts = totalSnapshot.data().count;

      // 2. Available Products
      const availableQuery = query(productsRef, where("isAvailable", "==", true));
      const availableSnapshot = await getCountFromServer(availableQuery);
      const availableCount = availableSnapshot.data().count;

      // 3. Recently Updated Products
      const recentQuery = query(productsRef, orderBy("updatedAt", "desc"), limit(5));
      const recentSnapshot = await getDocs(recentQuery);
      const recentProducts = recentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      // 4. Categories Distribution
      // Fetch all categories first
      const categoriesSnapshot = await getDocs(categoriesRef);
      const categories = categoriesSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Category[];
      
      // For distribution, we need product counts per category.
      // Running a count query per category might be expensive if many categories exist.
      // Alternatively, we can fetch all products (lightweight) if < 1000 items.
      // Given typical menu size, let's fetch all products for now to do client-side aggregation
      // which is often cheaper than N count queries if N is large.
      // However, if we scale, we should use aggregation bundles.
      // Let's stick to a simpler approach: fetch all products meta (id, categoryId)
      // Actually, since we already need "Total", let's just fetch all docs? No, that's heavy.
      // Let's do a count query for each category if categories < 20.
      
      const categoryStats = await Promise.all(
        categories.slice(0, 10).map(async (cat) => {
          // If category has no title, use id
          const name = cat.title || cat.id;
          const catQuery = query(productsRef, where("categoryId", "==", cat.id));
          const snap = await getCountFromServer(catQuery);
          return {
            name,
            count: snap.data().count
          };
        })
      );

      return {
        totalProducts,
        availableCount,
        unavailableCount: totalProducts - availableCount,
        recentProducts,
        categoryStats: categoryStats
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
