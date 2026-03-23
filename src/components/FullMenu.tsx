"use client";

import { X, Flame, ChevronRight } from "lucide-react";

const fullSelection = [
  {
    name: "chili crab",
    origin: "east coast",
    note: "the undisputed king of spice and shell.",
  },
  {
    name: "katong laksa",
    origin: "joo chiat",
    note: "short noodles, thick broth, zero compromises.",
  },
  {
    name: "hainanese chicken rice",
    origin: "maxwell",
    note: "the silk road of poached perfection.",
  },
  {
    name: "bak kut teh",
    origin: "balestier",
    note: "peppery soul food for the early hours.",
  },
  {
    name: "nasi lemak",
    origin: "punggol",
    note: "coconut-infused heritage in a leaf.",
  },
  {
    name: "roti prata",
    origin: "sin ming",
    note: "flaky, buttery, and infinitely foldable.",
  },
];

export default function FullMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-charcoal flex flex-col overflow-y-auto animate-in fade-in duration-700">
      {/* Header */}
      <div className="sticky top-0 z-50 flex justify-between items-center p-8 bg-charcoal/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.5em] text-chili font-bold">
            official shortlist
          </span>
          <h2 className="text-2xl font-serif lowercase tracking-fiesta">
            the complete menu
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-4 bg-white/5 rounded-full border border-white/10 hover:bg-chili transition-all group">
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Grid List */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {fullSelection.map((item, i) => (
            <div
              key={i}
              className="group bg-charcoal p-12 hover:bg-white/[0.02] transition-colors border border-white/5">
              <div className="flex justify-between items-start mb-12">
                <span className="text-chili font-mono text-xs font-bold tracking-widest uppercase">
                  entry // 0{i + 1}
                </span>
                <Flame className="w-4 h-4 text-zinc-800 group-hover:text-chili transition-colors" />
              </div>

              <h3 className="text-5xl font-serif lowercase text-white mb-4 group-hover:italic transition-all">
                {item.name}
              </h3>

              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-8 bg-zinc-800" />
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold">
                  origin: {item.origin}
                </p>
              </div>

              <p className="text-zinc-600 text-sm lowercase leading-relaxed font-light max-w-xs mb-8">
                {item.note}
              </p>

              <button className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                explore dish <ChevronRight className="w-3 h-3 text-chili" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="py-20 text-center opacity-10 grayscale pointer-events-none">
        <h4 className="text-[12rem] font-serif lowercase">sgcookfiesta</h4>
      </div>
    </div>
  );
}
