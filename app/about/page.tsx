import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            OUR GENESIS
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-zinc-950 leading-tight">
            Architectural Weight. Uncompromising Comfort.
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
            Founded in 2024, Aether was born out of frustration with flimsy fast fashion. We set out to engineer garments with substance—starting with custom 500 GSM loopback cottons, pure European flax linen, and Japanese shuttle-loom denim.
          </p>
        </div>

        {/* Visual Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[480px] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
              alt="Artisanal textile weaving"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800">
              CRAFT & PROVENANCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950">
              Direct Partnerships with Historic Spinning Mills
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              We bypass traditional wholesale middlemen to work directly with certified organic cotton growers in Gujarat and long-staple flax cultivators in Normandy and Belgium.
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Every garment undergoes extensive pre-shrinking and enzyme bio-polishing so the fit you try on on day one is the exact fit that endures for years to come.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="text-2xl font-black text-zinc-950 font-serif">500 GSM</span>
                <p className="text-xs text-zinc-500 mt-0.5">Heavyweight Loopback Knit</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="text-2xl font-black text-zinc-950 font-serif">100%</span>
                <p className="text-xs text-zinc-500 mt-0.5">GOTS Certified Organic Fibers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 text-amber-400 flex items-center justify-center">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Substantive Weight</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Zero see-through fabrics. We prioritize high density knits that maintain natural structure and fall effortlessly over the body.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Ethical Compensation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All our manufacturing partners pay living wages exceeding regional fair-trade guidelines, maintaining immaculate clean-air studio facilities.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 text-amber-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Lifetime Integrity</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Reinforced twin-needle seams, lycra-core collars, and Trocas shell buttons designed to outlast fast-fashion alternatives by decades.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
