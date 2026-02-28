"use client"

import * as React from "react"
import { useSignatureProducts } from "@/hooks/use-signature-products"
import { ProductCard } from "@/components/ui/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function SignaturePicks() {
    const { data: products, isLoading, isError, refetch } = useSignatureProducts()
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted || isLoading) {
        return (
            <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-[360px] w-[280px] shrink-0 rounded-3xl bg-surface-2" />
                ))}
            </div>
        )
    }

    if (isError) {
        return <ErrorState title="Unable to load signature dishes" onRetry={() => refetch()} />
    }

    if (!products || products.length === 0) return null

    return (
        <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-4">
                {products.map(product => (
                    <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 whitespace-normal">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
    )
}
