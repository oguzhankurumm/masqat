import * as React from "react"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 shadow-lg shadow-destructive/10">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
        <p className="text-base text-muted-foreground max-w-[300px] mx-auto leading-relaxed">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2 border-destructive/20 hover:border-destructive/50 hover:bg-destructive/10 text-destructive h-12 px-8 rounded-full">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
