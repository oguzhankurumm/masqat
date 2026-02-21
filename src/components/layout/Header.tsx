"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { de } from "@/content/de";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { href: "/", label: de.nav.home },
        { href: "/menukarte", label: de.nav.menu },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-white/5 bg-[#0E0F12]/80 backdrop-blur-md",
            )}
            style={{ height: 'calc(var(--header-height) + env(safe-area-inset-top))', paddingTop: 'env(safe-area-inset-top)' }}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <Link href="/" className="relative z-50 flex items-center">
                    <div className="relative h-10 w-32">
                        <Image
                            src="/brand/masq-logo.png"
                            alt="Masq Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-[#C9A227]",
                                pathname === link.href ? "text-[#C9A227]" : "text-white/80"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden relative z-50 text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div
                className={cn(
                    "fixed inset-0 bg-[#0E0F12] z-40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden",
                    mobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <nav className="flex flex-col items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-2xl font-bold transition-colors hover:text-[#C9A227]",
                                pathname === link.href ? "text-[#C9A227]" : "text-white"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
