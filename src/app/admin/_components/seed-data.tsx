"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase/client"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Loader2, Database } from "lucide-react"
import { toast } from "sonner"

export function SeedData() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSeed = async () => {
    setIsLoading(true)
    try {
      // 1. Create Categories
      const categories = [
        { title: "Signature Cocktails", description: "Hand-crafted premium cocktails" },
        { title: "Main Course", description: "Exquisite dishes for the main event" },
        { title: "Desserts", description: "Sweet endings to your meal" },
      ]

      const categoryIds: Record<string, string> = {}

      for (const cat of categories) {
        const docRef = await addDoc(collection(db, "categories"), {
          ...cat,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        categoryIds[cat.title] = docRef.id
      }

      // 2. Create Products
      const products = [
        {
          title: "Masq Mule",
          description: "Premium Vodka, Spicy Ginger Beer, Fresh Lime Juice, Mint Sprig. Served in a copper mug.",
          price: 14.50,
          categoryId: categoryIds["Signature Cocktails"],
          image: "/uploads/images/cocktail.webp",
          isAvailable: true,
          ingredients: ["Vodka", "Ginger Beer", "Lime", "Mint"],
          allergens: [],
        },
        {
          title: "Truffle Wagyu Burger",
          description: "200g Wagyu Beef Patty, Black Truffle Mayo, Caramelized Onions, Aged Cheddar, Brioche Bun.",
          price: 24.90,
          categoryId: categoryIds["Main Course"],
          image: "/uploads/images/burger.webp",
          isAvailable: true,
          ingredients: ["Wagyu Beef", "Truffle Mayo", "Brioche", "Cheddar"],
          allergens: ["Gluten", "Dairy", "Eggs"],
        },
        {
          title: "Argentinian Ribeye",
          description: "300g Grass-fed Ribeye Steak, Grilled to perfection. Served with Herb Butter and Truffle Fries.",
          price: 34.00,
          categoryId: categoryIds["Main Course"],
          image: "/uploads/images/steak.webp",
          isAvailable: true,
          ingredients: ["Ribeye Steak", "Butter", "Potatoes", "Truffle Oil"],
          allergens: ["Dairy"],
        },
        {
          title: "Molten Lava Cake",
          description: "Warm Chocolate Cake with a molten center, served with Madagascar Vanilla Bean Ice Cream.",
          price: 12.50,
          categoryId: categoryIds["Desserts"],
          image: "/uploads/images/cake.webp",
          isAvailable: true,
          ingredients: ["Dark Chocolate", "Flour", "Eggs", "Vanilla"],
          allergens: ["Gluten", "Dairy", "Eggs"],
        },
      ]

      for (const prod of products) {
        await addDoc(collection(db, "products"), {
          ...prod,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }

      toast.success("Sample data seeded successfully!")
      window.location.reload()
    } catch (error) {
      console.error("Seeding error:", error)
      toast.error("Failed to seed data.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
        variant="outline" 
        size="sm" 
        onClick={handleSeed} 
        disabled={isLoading}
        className="gap-2"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
      Seed Sample Data
    </Button>
  )
}
