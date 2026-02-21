"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Menu, Search, Phone } from "lucide-react";
import { de } from "@/content/de";

export function PublicBottomTabs() {
    const pathname = usePathname();
    const router = useRouter();

    const tabs = [
        {
            id: "home",
            label: de.nav.home || "Startseite",
            href: "/",
            icon: <Home className="w-5 h-5" />,
        },
        {
            id: "menu",
            label: de.nav.menu || "Menü",
            href: "/menukarte",
            icon: <Menu className="w-5 h-5" />,
        },
        {
            id: "search",
            label: de.nav.search || "Suchen",
            href: "/menukarte?focus=search",
            icon: <Search className="w-5 h-5" />,
        },
        {
            id: "contact",
            label: de.contact.title || "Kontakt",
            href: "/kontakt",
            icon: <Phone className="w-5 h-5" />,
        },
    ];

    const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: typeof tabs[0]) => {
        if (tab.id === "search") {
            e.preventDefault();
            if (pathname === "/menukarte") {
                // If already on menukarte, just append the URL param or focus directly 
                // Using URL param to let MenuKarte's useEffect catch it (cleanest)
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set("focus", "search");
                router.replace(currentUrl.pathname + currentUrl.search, { scroll: false });
            } else {
                router.push("/menukarte?focus=search");
            }
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] block md:hidden bg-[#0E0F12]/95 backdrop-blur-xl border-t border-white/10 pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {tabs.map((tab) => {
                    // Normalize matching logic
                    const isActive = pathname === tab.href || (pathname.startsWith("/menukarte") && tab.id === "menu");

                    return (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            onClick={(e) => handleTabClick(e, tab)}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${isActive ? "text-[#C9A227]" : "text-white/60 hover:text-white/90"
                                }`}
                        >
                            {tab.icon}
                            <span className="text-[10px] font-medium tracking-wide">
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
