"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SmartImage } from "@/components/media/SmartImage"
import { PriceTag } from "@/components/ui/price-tag"

import { Product } from "@/types/product"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  onClick?: () => void
}

export function ProductCard({
  product,
  onClick,
  className,
  ...props
}: ProductCardProps) {
  // Premium Lounge Card Design (2026) -> Responsive Row/Col
  return (
    <div
      className={cn(
        "group relative flex cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-surface-1 shadow-md transition-all duration-300 hover:border-white/10 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]",
        "flex-row sm:flex-col items-stretch",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Image Area - Square on mobile, 4/3 on desktop */}
      <div className="relative aspect-square sm:aspect-[4/3] w-32 sm:w-full shrink-0 overflow-hidden bg-surface-2">
        <SmartImage
          path={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
        />

        {/* Cinematic Gradient Overlay (Only visible on desktop or subtly on mobile) */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent opacity-40 sm:opacity-60" />

        {/* Top Badges */}
        <div className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10 flex gap-2">
          {!product.isAvailable && (
            <span className="rounded-full bg-black/60 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur-md border border-white/10">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 mb-1 sm:mb-0">
            <h3 className="line-clamp-2 text-base sm:text-lg font-medium leading-tight tracking-tight text-white group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <PriceTag
              price={product.price}
              className="shrink-0 text-base sm:text-lg font-bold text-amber-400 drop-shadow-sm"
            />
          </div>

          {product.description && (
            <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground/80 font-light leading-relaxed">
              {product.description}
            </p>
          )}

          {product.preparationTime && (
            <div className="mt-2 text-[10px] sm:text-xs text-white/40 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              ~{product.preparationTime} Min.
            </div>
          )}
        </div>

        {/* Subtle Action Hint - Only show on desktop hover */}
        <div className="hidden sm:flex mt-4 items-center justify-between border-t border-white/5 pt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">Details</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
