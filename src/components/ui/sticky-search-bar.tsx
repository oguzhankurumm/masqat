import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface StickySearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string
    onChange: (val: string) => void
}

export const StickySearchBar = React.forwardRef<HTMLInputElement, StickySearchBarProps>(({ value, onChange, className, ...props }, ref) => {
    return (
        <div className={cn("sticky top-0 z-40 bg-background/80 py-4 backdrop-blur-xl border-b border-white/5", className)}>
            <div className="relative flex w-full items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <input
                    ref={ref}
                    type="text"
                    placeholder="Search menu..."
                    className="h-14 w-full rounded-full border border-white/10 bg-surface-1 pl-12 pr-12 text-base text-white placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                />
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute right-4 rounded-full p-1 text-muted-foreground hover:bg-white/10 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    )
})

StickySearchBar.displayName = "StickySearchBar"
