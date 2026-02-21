import * as React from "react"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/utils/money"

interface PriceTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  price: number
  currency?: string
}

export function PriceTag({ price, currency = "EUR", className, ...props }: PriceTagProps) {
  return (
    <span className={cn("font-medium tracking-tight", className)} {...props}>
      {formatPrice(price, currency)}
    </span>
  )
}
