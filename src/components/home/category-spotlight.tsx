"use client"

import * as React from "react"
import { useCategories } from "@/hooks/use-categories"
import { CategoryCard } from "@/components/ui/category-card"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { useRouter } from "next/navigation"

export function CategorySpotlight() {
    const { data: categories, isLoading, isError, refetch } = useCategories(true)
    const router = useRouter()

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} className="h-36 w-full rounded-3xl bg-surface-2" />
                ))}
            </div>
        )
    }

    if (isError) {
        return <ErrorState title="Unable to load categories" onRetry={() => refetch()} />
    }

    if (!categories || categories.length === 0) return null

    // Spotlight limits to up to 8 top categories
    const spotlightCategories = categories.slice(0, 8)

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {spotlightCategories.map(category => (
                <CategoryCard
                    key={category.id}
                    title={category.title}
                    iconName={category.iconName}
                    onClick={() => router.push(`/menukarte?category=${category.id}`)}
                />
            ))}
        </div>
    )
}
