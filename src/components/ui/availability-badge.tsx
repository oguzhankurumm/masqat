import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface AvailabilityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  available: boolean
  stock?: number
}

export function AvailabilityBadge({
  available,
  stock,
  className,
  ...props
}: AvailabilityBadgeProps) {
  if (!available) {
    return (
      <Badge variant="destructive" className={cn("px-2 py-0.5 text-xs", className)} {...props}>
        Sold Out
      </Badge>
    )
  }

  if (stock !== undefined && stock > 0 && stock < 5) {
    return (
      <Badge variant="secondary" className={cn("bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 px-2 py-0.5 text-xs", className)} {...props}>
        Low Stock
      </Badge>
    )
  }

  return null // Don't show anything if available and plenty of stock
}
