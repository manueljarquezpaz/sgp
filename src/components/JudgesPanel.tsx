"use client";

import { Award, Zap } from "lucide-react";

const judges = [
  {
    name: "julien royer",
    role: "michelin lead",
    img: "/images/judges/julien.jpg", // Chef of 3-star Odette
    bio: "championing 'terroir' and artisanal precision at the highest global level.",
  },
  {
    name: "violet oon",
    role: "heritage guardian",
    img: "/images/judges/violet.jpg", // The Queen of Nyonya cuisine
    bio: "the definitive voice on peranakan culture and singapore's culinary soul.",
  },
  {
    name: "willin low",
    role: "mod-sin pioneer",
    img: "/images/judges/willin.jpg", // Creator of Modern Singaporean cuisine
    bio: "reimagining hawker staples into contemporary masterpieces.",
  },
];

export default function JudgesPanel() {
  return (
    <section id="jury" className="py-32 px-6 bg-charcoal">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-8">
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-chili/10 border border-chili/20 px-3 py-1 rounded-full mb-4">
              <Zap className="w-3 h-3 text-chili fill-current" />
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-chili">
                the authority
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif lowercase tracking-fiesta leading-none">
              the jury <br />
              <span className="text-chili italic font-light">panel</span>
            </h2>
          </div>
          <p className="text-zinc-500 lowercase max-w-[280px] text-sm leading-relaxed border-l border-white/10 pl-6 italic">
            three pillars of the industry. one definitive verdict on the flavor
            of the year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-x-12">
          {judges.map((j, i) => (
            <div
              key={i}
              className={`md:col-span-4 group relative ${
                i === 1 ? "md:mt-24" : i === 2 ? "md:mt-48" : ""
              }`}>
              {/* Background Rank Number */}
              <span className="absolute -top-10 -left-6 text-9xl font-serif text-white/[0.03] select-none lowercase group-hover:text-chili/5 transition-colors duration-700">
                0{i + 1}
              </span>

              <div className="relative">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass border-white/5 shadow-2xl">
                  <img
                    src={j.img}
                    alt={j.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] ease-in-out opacity-50 group-hover:opacity-100"
                  />

                  {/* Subtle Cinematic Overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />
                </div>

                {/* Floating Content Block */}
                <div className="absolute -bottom-10 left-6 right-6 p-8 glass rounded-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-chili text-[10px] font-bold tracking-[0.4em] uppercase">
                      {j.role}
                    </p>
                    <Award className="w-4 h-4 text-white/20 group-hover:text-chili transition-colors" />
                  </div>

                  <h4 className="text-3xl font-serif lowercase text-white mb-3">
                    {j.name}
                  </h4>

                  <p className="text-zinc-400 text-[11px] lowercase leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {j.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
