"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
}

interface CategoryChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  categories: Category[]
  selectedId?: string | null
  onSelect: (id: string | null) => void
}

export function CategoryChips({
  categories,
  selectedId,
  onSelect,
  className,
  ...props
}: CategoryChipsProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      {...props}
    >
      <button
        className={cn(
          "h-10 shrink-0 cursor-pointer rounded-full px-6 text-sm font-medium transition-all duration-300 border backdrop-blur-md",
          selectedId === null
            ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
            : "bg-surface-2/50 text-muted-foreground border-white/5 hover:bg-surface-2 hover:text-white hover:border-white/10"
        )}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={cn(
            "h-10 shrink-0 cursor-pointer rounded-full px-6 text-sm font-medium transition-all duration-300 border backdrop-blur-md",
            selectedId === category.id
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
              : "bg-surface-2/50 text-muted-foreground border-white/5 hover:bg-surface-2 hover:text-white hover:border-white/10"
          )}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
