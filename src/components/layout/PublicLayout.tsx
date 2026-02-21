"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PublicBottomTabs } from "./PublicBottomTabs";

export function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Do not wrap admin routes with Header/Footer
    if (pathname.startsWith("/admin")) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main
                className="flex-1 pb-20 md:pb-0"
                style={{ paddingTop: 'calc(var(--header-height) + env(safe-area-inset-top))' }}
            >
                {children}
            </main>
            <Footer />
            <PublicBottomTabs />
        </div>
    );
}
