"use client";

import { useState } from "react"; // Fixed: Added missing import
import { Flame, ArrowRight } from "lucide-react";
import FullMenu from "./FullMenu"; // Fixed: Added missing import
import VotingModal from "./AuthModal";

const dishes = [
  {
    name: "singapore chili crab",
    tag: "the heavyweight",
    img: "/images/dishes/chili-crab.jpg",
    heat: 3,
    color: "from-chili/40",
  },
  {
    name: "katong laksa fusion",
    tag: "aromatic soul",
    img: "/images/dishes/laksa.jpg",
    heat: 2,
    color: "from-amber/40",
  },
  {
    name: "truffle chicken rice",
    tag: "modern heritage",
    img: "/images/dishes/chicken-rice.jpg",
    heat: 1,
    color: "from-pandan/40",
  },
];

export default function FeaturedDishes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVotingOpen, setIsVotingOpen] = useState(false);

  return (
    <section id="discover" className="py-32 px-6 bg-charcoal">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20">
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-serif lowercase tracking-fiesta mb-4 text-white">
              the <span className="text-chili">shortlist</span>
            </h2>
            <p className="text-zinc-500 lowercase tracking-widest text-xs font-bold">
              curated by the jury • 2026 selection
            </p>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="mt-8 md:mt-0 group flex items-center gap-4 text-white text-[10px] font-bold tracking-[0.4em] uppercase hover:text-chili transition-colors">
            view full menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <div
              key={i}
              className="group relative h-[600px] w-full rounded-[3rem] overflow-hidden glass border-white/5 transition-all duration-700 hover:shadow-2xl hover:shadow-chili/10">
              <img
                src={dish.img}
                alt={dish.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out opacity-60 group-hover:opacity-100"
              />

              <div
                className={`absolute inset-0 bg-linear-to-t ${dish.color} via-charcoal/40 to-transparent opacity-80`}
              />

              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2">
                    {[...Array(3)].map((_, index) => (
                      <Flame
                        key={index}
                        className={`w-3 h-3 ${
                          index < dish.heat
                            ? "text-chili fill-current"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/60 ml-2">
                      {dish.tag}
                    </span>
                  </div>

                  <h3 className="text-4xl font-serif lowercase leading-none text-white">
                    {dish.name}
                  </h3>

                  <button
                    onClick={() => setIsVotingOpen(true)}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-8 py-4 rounded-2xl hover:bg-chili hover:border-chili transition-all uppercase tracking-widest opacity-0 group-hover:opacity-100 delay-100">
                    cast vote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Menu Overlay */}
      <FullMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <VotingModal
        isOpen={isVotingOpen}
        onClose={() => setIsVotingOpen(false)}
      />
    </section>
  );
}
