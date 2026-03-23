"use client";

import { useState } from "react"; // Fixed: Added missing import
import { MapPin, Navigation } from "lucide-react";
import InteractiveMap from "./InteractiveMap"; // Fixed: Added missing import

const hotspots = [
  { name: "maxwell food centre", x: "42%", y: "58%", hot: true },
  { name: "newton food centre", x: "52%", y: "40%", hot: false },
  { name: "old airport road", x: "68%", y: "52%", hot: true },
];

export default function DiscoverMaps() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section
      id="maps"
      className="py-24 px-6 bg-charcoal relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chili/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="relative z-10">
            <h2 className="text-4xl font-serif lowercase tracking-fiesta mb-4 text-white">
              food maps
            </h2>
            <p className="text-zinc-500 text-sm lowercase font-light">
              tracking the highest density of jury activity across the island.
            </p>
          </div>
          <button
            onClick={() => setMapOpen(true)}
            className="flex items-center gap-3 text-chili text-[10px] font-bold tracking-[0.3em] uppercase group relative z-10 hover:text-white transition-colors">
            view interactive map
            <Navigation className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Map Container - Now clickable as a whole */}
        <div
          onClick={() => setMapOpen(true)}
          className="relative aspect-video w-full glass rounded-[2.5rem] overflow-hidden border-white/5 group cursor-pointer">
          {/* Simulated Map SVG Background */}
          <div className="absolute inset-0 opacity-10 grayscale group-hover:opacity-30 transition-opacity duration-1000">
            <img
              src="/images/map/sg.svg"
              alt="singapore map"
              className="w-full h-full object-cover p-20 scale-110"
            />
          </div>

          {/* Interactive Hotspots */}
          {hotspots.map((spot, i) => (
            <div
              key={i}
              className="absolute group/pin"
              style={{ left: spot.x, top: spot.y }}>
              <div className="relative flex items-center justify-center">
                {spot.hot && (
                  <div className="absolute inset-0 bg-chili/40 rounded-full animate-ping" />
                )}
                <div className="relative z-10 p-2 bg-charcoal border border-chili/50 rounded-full shadow-[0_0_15px_rgba(227,28,37,0.3)] group-hover/pin:bg-chili transition-colors">
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full mb-4 opacity-0 group-hover/pin:opacity-100 transition-all translate-y-2 group-hover/pin:translate-y-0 pointer-events-none">
                  <div className="glass px-4 py-2 rounded-xl whitespace-nowrap bg-black/80 backdrop-blur-md">
                    <p className="text-[10px] font-bold text-white lowercase tracking-wider">
                      {spot.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Center Call to Action (Visible on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full scale-90 group-hover:scale-100 transition-transform">
              expand exploration
            </div>
          </div>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-transparent to-charcoal/80" />
        </div>
      </div>

      {/* The Overlay Component */}
      <InteractiveMap isOpen={mapOpen} onClose={() => setMapOpen(false)} />
    </section>
  );
}
