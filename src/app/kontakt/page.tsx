"use client";

import { de } from "@/content/de";
import { MapPin, Phone, Globe, Clock, ExternalLink } from "lucide-react";

export default function KontaktPage() {
    return (
        <div className="min-h-screen bg-[#0E0F12] text-white selection:bg-[#C9A227]/30 selection:text-white pt-10 pb-32">
            <div className="container max-w-2xl mx-auto px-4">

                {/* Hero section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        {de.contact.title}
                    </h1>
                    <p className="text-white/60 text-lg max-w-md mx-auto">
                        {de.contact.description}
                    </p>
                </div>

                {/* Cards Container */}
                <div className="space-y-6">

                    {/* Address Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-[#C9A227]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{de.contact.addressTitle}</h2>
                                <p className="text-white/80 text-lg leading-relaxed">
                                    {de.contact.addressLine1}
                                    <br />
                                    {de.contact.addressLine2}
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Wiener%20Str.%202g%2C%204020%20Linz%2C%20%C3%96sterreich"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white active:scale-[0.98] transition-all py-3.5 rounded-xl font-medium"
                        >
                            <span>{de.contact.openMaps}</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                                <Phone className="w-6 h-6 text-[#C9A227]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{de.contact.phoneTitle}</h2>
                                <p className="text-white/80 text-lg">
                                    {de.contact.phone}
                                </p>
                            </div>
                        </div>
                        <a
                            href="tel:+436605353007"
                            className="w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#D4AF37] text-black active:scale-[0.98] transition-all py-3.5 rounded-xl font-semibold shadow-[0_0_20px_rgba(201,162,39,0.2)]"
                        >
                            <Phone className="w-4 h-4" />
                            <span>{de.contact.callNow}</span>
                        </a>
                    </div>

                    {/* Website Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                                <Globe className="w-6 h-6 text-[#C9A227]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{de.contact.websiteTitle}</h2>
                                <p className="text-white/80 text-lg">
                                    {de.contact.website}
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://masq.at"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white active:scale-[0.98] transition-all py-3.5 rounded-xl font-medium"
                        >
                            <span>{de.contact.openWebsite}</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Hours Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                                <Clock className="w-6 h-6 text-[#C9A227]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{de.contact.hoursTitle}</h2>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {de.footer.hoursList?.map((day, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 last:pb-0">
                                    <span className="text-white/70">{day.day}</span>
                                    <span className={`font-medium ${day.time === "Geschlossen" ? "text-white/40" : "text-white/90"}`}>
                                        {day.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
