"use client";

import { de } from "@/content/de";
import { Facebook, Instagram, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[#0E0F12] border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <div className="relative h-12 w-32">
                                <Image
                                    src="/brand/masq-logo.png"
                                    alt="Masq Logo"
                                    fill
                                    className="object-contain object-left opacity-80"
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm max-w-xs leading-relaxed">
                            {de.hero.subtitle}
                        </p>
                    </div>

                    {/* info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white/90">{de.footer.hours}</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li className="flex gap-2">
                                <Clock className="w-4 h-4 text-[#C9A227] shrink-0" />
                                <span>Mo-Do: 18:00 - 02:00</span>
                            </li>
                            <li className="flex gap-2 text-transparent select-none">
                                <Clock className="w-4 h-4 shrink-0" />
                                <span className="text-white/60">Fr-Sa: 18:00 - 04:00</span>
                            </li>
                            <li className="flex gap-2 text-transparent select-none">
                                <Clock className="w-4 h-4 shrink-0" />
                                <span className="text-white/60">So: Geschlossen</span>
                            </li>
                        </ul>
                    </div>

                    {/* Location & Social */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white/90">{de.footer.address}</h3>
                        <div className="flex gap-2 text-sm text-white/60 mb-6">
                            <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                            <span>
                                Musterstraße 123
                                <br />
                                1010 Wien, Austria
                            </span>
                        </div>

                        <h3 className="font-semibold text-white/90 pt-2">{de.footer.socials}</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-[#C9A227] hover:bg-white/10 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-[#C9A227] hover:bg-white/10 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} Masq Lounge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
