"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { SmartImage } from "@/components/media/SmartImage"
import { PriceTag } from "@/components/ui/price-tag"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Wheat, AlertTriangle, Clock } from "lucide-react"
import { de } from "@/content/de"

import { Product } from "@/types/product"

interface ProductDetailSheetProps {
  product: Product | null | undefined
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailSheet({
  product,
  isOpen,
  onClose,
}: ProductDetailSheetProps) {
  if (!product) return null

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 overflow-hidden border-l border-white/10 bg-[#0E0F12] p-0 shadow-2xl backdrop-blur-xl sm:max-w-lg sm:rounded-l-3xl"
      >
        {/* 1. Hero Section */}
        <div className="relative h-[45vh] w-full shrink-0 bg-[#151822]">
          <SmartImage
            path={product.image}
            alt={product.title || "Bild"}
            fill
            className="object-cover"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/40 to-transparent" />

          <SheetClose asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-6 top-6 h-10 w-10 rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md hover:bg-black/60 focus:ring-2 focus:ring-[#C9A227] focus:outline-none"
              onClick={onClose}
              aria-label={de.common.close}
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>

          {/* Title on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-end justify-between gap-4">
              <SheetTitle className="text-4xl font-bold leading-none tracking-tight text-white drop-shadow-lg">
                {product.title}
              </SheetTitle>
            </div>
          </div>
        </div>

        <SheetDescription className="sr-only">
          {product.description}
        </SheetDescription>

        {/* 2. Scrollable Content */}
        <ScrollArea className="relative z-10 -mt-6 flex-1 rounded-t-3xl bg-[#0E0F12] px-8 pb-8 pt-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              {product.isAvailable ? (
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#C9A227]/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                  </span>
                  <span className="text-sm font-medium text-[#C9A227]">{de.menu.available}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                  <span className="text-sm font-medium text-red-400">{de.menu.notAvailable}</span>
                </div>
              )}
              <PriceTag price={product.price} className="text-3xl font-bold text-white relative right-0" />
            </div>

            {product.description && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C9A227] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]"></span> {de.menu.description}
                </h3>
                <p className="text-lg font-light leading-relaxed text-white/80">
                  {product.description}
                </p>
              </div>
            )}

            {/* Additional info like Prep Time */}
            {product.preparationTime && (
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Clock className="h-4 w-4" />
                <span>{de.menu.prepTime}: {de.menu.timeApprox.replace("{{time}}", String(product.preparationTime))}</span>
              </div>
            )}

            {/* Ingredients & Allergens */}
            <div className="space-y-6 pb-12">
              {(product.ingredients && product.ingredients.length > 0) && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Wheat className="h-3 w-3" /> {de.menu.ingredients}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <Badge
                        key={ing}
                        variant="secondary"
                        className="bg-[#151822] text-zinc-300 hover:bg-[#1A1E2B] border border-white/5 px-3 py-1.5 text-sm font-normal"
                      >
                        {ing}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(product.allergens && product.allergens.length > 0) && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-orange-500/80 flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3" /> {de.menu.allergens}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((alg) => (
                      <Badge
                        key={alg}
                        variant="outline"
                        className="border-orange-500/20 bg-orange-500/5 text-orange-400 px-3 py-1.5 text-sm font-normal"
                      >
                        {alg}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
