"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  backHref?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  backHref,
  children,
  className,
  ...props
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <div className={cn("flex flex-col gap-4 pb-6 md:pb-8", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          {backHref !== undefined && (
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2 mb-2 h-8 w-fit px-2 text-muted-foreground hover:text-foreground"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          )}
          <h1 className="font-sans text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </div>
  )
}
