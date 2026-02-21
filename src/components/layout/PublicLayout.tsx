"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Do not wrap admin routes with Header/Footer
    if (pathname.startsWith("/admin")) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
