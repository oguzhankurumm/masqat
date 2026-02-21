import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon, SearchX } from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: LucideIcon
  children?: React.ReactNode
}

export function EmptyState({
  title = "No items found",
  description = "Try adjusting your search or filters.",
  icon: Icon = SearchX,
  children,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-3xl border border-white/5 bg-surface-1/50 p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface-2 shadow-inner border border-white/5">
        <Icon className="h-10 w-10 text-muted-foreground/50" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
        {description && (
          <p className="text-base text-muted-foreground max-w-[300px] mx-auto font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}
