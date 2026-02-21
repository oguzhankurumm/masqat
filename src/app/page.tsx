import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategorySpotlight } from "@/components/home/category-spotlight";
import { SignaturePicks } from "@/components/home/signature-picks";
import { de } from "@/content/de";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-[#C9A227]/30">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden pt-20">
        {/* Background Image with Parallax-like effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/brand/masq-hero.jpg"
            alt="Masq Lounge Atmosphere"
            fill
            className="object-cover object-center scale-105 animate-[slow-pan_30s_ease-in-out_infinite_alternate]"
            priority
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F12]/80 via-[#0E0F12]/60 to-[#0E0F12]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0F12]/90 via-transparent to-[#0E0F12]/90" />
        </div>

        {/* Premium Mustard Glow */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#C9A227]/20 blur-[120px] opacity-30 pointer-events-none rounded-[100%] mix-blend-screen" />

        <div className="container relative z-10 px-4 md:px-8 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-7xl md:text-[5.5rem] leading-[1.05] drop-shadow-2xl">
              {de.hero.title}
            </h1>
            <p className="text-lg text-white/80 sm:text-xl font-light tracking-wide leading-relaxed max-w-xl">
              {de.hero.subtitle}
            </p>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-3">
            {[de.hero.chips.signature, de.hero.chips.classics, de.hero.chips.snacks].map((chip, idx) => (
              <span key={idx} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/90">
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/menukarte">
              <Button size="lg" className="h-14 bg-[#C9A227] text-[#0E0F12] hover:bg-[#B8921D] min-w-[200px] rounded-full text-lg font-bold shadow-lg shadow-[#C9A227]/20 transition-all hover:scale-105 active:scale-95">
                {de.hero.primaryCTA}
              </Button>
            </Link>
            <Link href="#signature">
              <Button size="lg" variant="outline" className="h-14 min-w-[200px] rounded-full border-white/10 bg-transparent text-white text-lg font-semibold backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
                {de.hero.secondaryCTA}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SPOTLIGHT */}
      <section className="relative py-20 bg-[#0E0F12]">
        <div className="container px-4 md:px-8 space-y-10">
          <CategorySpotlight />
        </div>
      </section>

      {/* 3. SIGNATURE PICKS */}
      <section id="signature" className="relative py-20 bg-[#151822] border-t border-white/5">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-[#C9A227]/10 blur-[100px] pointer-events-none rounded-[100%]" />
        <div className="container relative z-10 px-4 md:px-8 space-y-10">
          <SignaturePicks />
        </div>
      </section>
    </div>
  );
}
