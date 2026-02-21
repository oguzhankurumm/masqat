"use client"

import * as React from "react"
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, X, Clock } from "lucide-react"
import { de } from "@/content/de"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ContactSheetProps {
    isOpen: boolean
    onClose: () => void
}

export function ContactSheet({ isOpen, onClose }: ContactSheetProps) {
    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent
                side="bottom"
                className="flex max-h-[90vh] w-full flex-col gap-0 overflow-hidden border-t border-white/10 bg-[#0E0F12] p-0 shadow-2xl backdrop-blur-xl sm:max-h-screen sm:max-w-md sm:rounded-t-3xl sm:border-l sm:border-t-0 sm:right-0 sm:top-0 sm:bottom-0 sm:side-right"
            >
                <div className="flex items-center justify-between border-b border-white/5 bg-[#151822] p-6 pt-safe">
                    <SheetTitle className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">
                        {de.contact.title}
                    </SheetTitle>
                    <SheetClose asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                            onClick={onClose}
                            aria-label={de.common.close}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </SheetClose>
                </div>

                <ScrollArea className="flex-1 px-6 pb-12 pt-6">
                    <SheetDescription className="text-base font-light leading-relaxed text-white/80 mb-8">
                        {de.contact.description}
                    </SheetDescription>

                    <div className="flex flex-col gap-8">
                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href={`tel:${de.contact.phone}`}
                                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-surface-1 py-6 transition-all hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A227]/20 text-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.15)]">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-medium tracking-wide text-white">
                                    {de.contact.callNow}
                                </span>
                            </a>

                            <a
                                href="https://maps.google.com/?q=Teststraße+1,10115+Berlin" // Dummy map link, could be parametrized
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-surface-1 py-6 transition-all hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A227]/20 text-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.15)]">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-medium tracking-wide text-white">
                                    {de.contact.openMaps}
                                </span>
                            </a>
                        </div>

                        {/* Address */}
                        <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
                                <MapPin className="h-3 w-3" /> {de.footer.address}
                            </h3>
                            <div className="rounded-2xl border border-white/5 bg-[#151822] p-5">
                                <p className="text-lg font-light text-white/90">Masq Lounge</p>
                                <p className="font-light text-white/60">{de.contact.addressLine1}</p>
                                <p className="font-light text-white/60">{de.contact.addressLine2}</p>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="space-y-3 pb-safe">
                            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
                                <Clock className="h-3 w-3" /> {de.footer.hours}
                            </h3>
                            <div className="rounded-2xl border border-white/5 bg-[#151822] p-5">
                                <div className="flex justify-between py-1">
                                    <span className="font-light text-white/60">Mo - Do</span>
                                    <span className="text-white/90">16:00 - 01:00</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-light text-white/60">Fr - Sa</span>
                                    <span className="text-white/90">16:00 - 03:00</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-light text-white/60">Sonntag</span>
                                    <span className="text-white/90">15:00 - 01:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
