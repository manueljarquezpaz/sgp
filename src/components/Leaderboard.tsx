"use client";

import { TrendingUp, Flame, Trophy } from "lucide-react";

const rankings = [
  {
    rank: "01",
    name: "truffle laksa fusion",
    category: "modern hawker",
    votes: "12,402",
    trend: "+12%",
  },
  {
    rank: "02",
    name: "dry chili crab pasta",
    category: "fusion",
    votes: "10,150",
    trend: "+8%",
  },
  {
    rank: "03",
    name: "kaya butter mille-feuille",
    category: "dessert",
    votes: "9,820",
    trend: "+15%",
  },
  {
    rank: "04",
    name: "salted egg yolk calamari",
    category: "seafood",
    votes: "8,400",
    trend: "+2%",
  },
];

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="py-24 px-6 bg-black/50">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <Trophy className="w-6 h-6 text-chili" />
          <h2 className="text-4xl font-serif lowercase tracking-fiesta">
            live standings
          </h2>
          <div className="h-px flex-1 bg-white/10 ml-8" />
        </div>

        <div className="space-y-4">
          {rankings.map((item, i) => (
            <div
              key={i}
              className="group glass p-6 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all cursor-default">
              <div className="flex items-center gap-8">
                <span className="text-2xl font-black text-white/20 group-hover:text-chili transition-colors duration-500 font-serif">
                  {item.rank}
                </span>
                <div>
                  <h4 className="text-xl font-bold text-white lowercase tracking-tight mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                    {item.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12 text-right">
                <div className="hidden sm:block">
                  <p className="text-xs text-zinc-500 lowercase mb-1">
                    total votes
                  </p>
                  <p className="text-lg font-mono font-bold text-white">
                    {item.votes}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 text-pandan font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    {item.trend}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Flame className="w-3 h-3 text-chili fill-current animate-pulse" />
                    <span className="text-[8px] uppercase text-chili font-bold tracking-widest">
                      hot
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-xs lowercase italic">
            * rankings update every 60 seconds based on live jury and public
            input.
          </p>
        </div>
      </div>
    </section>
  );
}
