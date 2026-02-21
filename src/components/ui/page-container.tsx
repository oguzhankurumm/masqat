import * as React from "react"
import { cn } from "@/lib/utils"

type PageContainerProps = React.HTMLAttributes<HTMLDivElement>

export function PageContainer({ className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-5xl px-4 py-6 pb-24 md:px-6 md:py-8",
        className
      )}
      {...props}
    />
  )
}
