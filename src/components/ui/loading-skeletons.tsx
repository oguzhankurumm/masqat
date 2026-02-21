import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-surface-1 shadow-sm">
      <Skeleton className="aspect-[4/3] w-full rounded-none bg-surface-2" />
      <div className="flex flex-col gap-3 p-5 pt-4">
        <Skeleton className="h-5 w-3/4 rounded-md bg-surface-2" />
        <Skeleton className="h-4 w-1/2 rounded-md bg-surface-2/50" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-16 rounded-md bg-amber-400/10" />
        </div>
      </div>
    </div>
  )
}

export function CategorySkeleton() {
  return <Skeleton className="h-10 w-28 rounded-full bg-surface-2" />
}

export function ListSkeleton({ count = 8, className }: { count?: number, className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
