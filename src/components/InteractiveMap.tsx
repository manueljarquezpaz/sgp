"use client";

import { X, MapPin, Navigation, Info } from "lucide-react";

const activeDistricts = [
  {
    id: 1,
    name: "maxwell & chinatown",
    top: "60%",
    left: "45%",
    activity: "high",
  },
  {
    id: 2,
    name: "joo chiat heritage",
    top: "55%",
    left: "75%",
    activity: "medium",
  },
  {
    id: 3,
    name: "newton food circuit",
    top: "40%",
    left: "50%",
    activity: "high",
  },
  {
    id: 4,
    name: "tiong bahru market",
    top: "58%",
    left: "38%",
    activity: "low",
  },
];

export default function InteractiveMap({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] bg-charcoal animate-in slide-in-from-right duration-700 ease-out flex">
      {/* Sidebar Info */}
      <div className="w-full md:w-[400px] h-full bg-black/50 backdrop-blur-2xl p-12 flex flex-col border-r border-white/5 z-10">
        <button
          onClick={onClose}
          className="mb-12 flex items-center gap-2 text-zinc-500 hover:text-chili transition-colors group lowercase">
          <X className="w-5 h-5" /> close exploration
        </button>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-serif lowercase tracking-fiesta mb-4">
              jury <span className="text-chili">heatmap</span>
            </h2>
            <p className="text-zinc-500 text-xs lowercase leading-relaxed">
              real-time tracking of active voting zones across the lion city.
            </p>
          </div>

          <div className="space-y-4">
            {activeDistricts.map((d) => (
              <div
                key={d.id}
                className="p-6 glass rounded-2xl border-white/5 hover:border-chili/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white text-sm font-bold lowercase">
                    {d.name}
                  </h4>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      d.activity === "high"
                        ? "bg-chili animate-pulse"
                        : "bg-zinc-700"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-chili transition-colors">
                  <Navigation className="w-3 h-3" /> view activity
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6 bg-chili/5 border border-chili/10 rounded-2xl flex gap-4">
          <Info className="w-5 h-5 text-chili shrink-0" />
          <p className="text-[10px] text-zinc-500 lowercase leading-tight">
            location data is anonymized and delayed by 15 minutes to preserve
            jury anonymity.
          </p>
        </div>
      </div>

      {/* The Visual Map Area */}
      <div className="flex-1 relative bg-black overflow-hidden hidden md:block">
        {/* Replace with your actual SVG or Map Image */}
        <div className="absolute inset-0 opacity-20 grayscale scale-125">
          <img
            src="/images/map/sg.svg"
            alt="Singapore Map"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hotspots */}
        {activeDistricts.map((d) => (
          <div
            key={d.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/pin"
            style={{ top: d.top, left: d.left }}>
            <div className="relative flex items-center justify-center">
              {d.activity === "high" && (
                <div className="absolute inset-0 w-12 h-12 bg-chili/20 rounded-full animate-ping" />
              )}
              <div className="p-3 bg-charcoal border border-chili/50 rounded-full shadow-2xl group-hover/pin:bg-chili transition-all duration-500">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
