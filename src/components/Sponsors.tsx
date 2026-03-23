"use client";

const brands = [
  "tiger beer",
  "yeo's",
  "old chang kee",
  "khong guan",
  "yakult sg",
  "bengawan solo",
  "irvins salted egg",
  "prima taste",
];

export default function Sponsors() {
  return (
    <section className="py-24 bg-charcoal/50 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.5em] text-chili font-bold">
            our local partners
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      </div>

      {/* Infinite Scroll Ticker Effect */}
      <div className="flex overflow-hidden group">
        <div className="flex gap-20 animate-loop-scroll group-hover:paused">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-2xl md:text-4xl font-serif lowercase tracking-tighter text-zinc-600 hover:text-white transition-colors cursor-default whitespace-nowrap">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
