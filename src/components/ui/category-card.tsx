import * as React from "react"
import { cn } from "@/lib/utils"
import {
    Coffee,
    Martini,
    Wine,
    Beer,
    Pizza,
    Utensils,
    Info,
    IceCream,
    GlassWater,
    Leaf
} from "lucide-react"

// Map common string values to Lucide icons
const iconMap: Record<string, React.ElementType> = {
    coffee: Coffee,
    cocktail: Martini,
    drink: Martini,
    wine: Wine,
    beer: Beer,
    food: Pizza,
    pizza: Pizza,
    meal: Utensils,
    dessert: IceCream,
    water: GlassWater,
    vegan: Leaf,
    info: Info,
}

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
    iconName?: string
    productCount?: number
    onClick?: () => void
    isActive?: boolean
}

export function CategoryCard({
    title,
    description,
    iconName,
    productCount,
    onClick,
    isActive,
    className,
    ...props
}: CategoryCardProps) {
    // Use mapped icon or fallback to Info
    const Icon = (iconName && iconMap[iconName.toLowerCase()]) || Utensils

    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex cursor-pointer flex-col items-center gap-3 overflow-hidden rounded-3xl border border-white/5 bg-surface-1 p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-surface-2 active:scale-[0.96]",
                isActive && "border-primary/50 bg-primary/10 shadow-lg shadow-primary/20",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-surface-2 text-muted-foreground transition-colors group-hover:text-primary",
                    isActive && "bg-primary/20 text-primary border-primary/20"
                )}
            >
                <Icon className="h-8 w-8 stroke-[1.5]" />
            </div>

            <div className="flex flex-col items-center gap-1">
                <h3 className={cn("text-base font-medium leading-tight text-white transition-colors group-hover:text-white", isActive && "text-primary font-bold")}>
                    {title}
                </h3>
                {description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
                )}
            </div>

            {typeof productCount === "number" && (
                <span className="absolute right-4 top-4 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-surface-3 px-2 text-[10px] font-medium text-muted-foreground border border-white/5">
                    {productCount}
                </span>
            )}
        </div>
    )
}
