"use client";

import { Scale, Info, AlertTriangle } from "lucide-react";

export default function JuryTerms() {
  return (
    <section className="py-32 px-6 bg-black min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-20 text-right border-r-2 border-chili pr-8">
          <h1 className="text-6xl font-serif lowercase tracking-fiesta mb-4 text-white">
            jury <span className="text-chili italic">terms</span>
          </h1>
          <p className="text-zinc-500 lowercase text-sm tracking-[0.2em] font-bold">
            the code of the lion city
          </p>
        </div>

        <div className="space-y-20">
          <section className="space-y-6">
            <h3 className="text-white font-bold lowercase flex items-center gap-3">
              <Scale className="w-4 h-4 text-chili" /> 01. the final verdict
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed lowercase font-light">
              the sgcookfiesta jury—comprising julien royer, violet oon, and
              willin low—holds the ultimate authority. while public votes
              influence the leaderboard, the jury's decision on technical
              mastery is final and binding.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-white font-bold lowercase flex items-center gap-3">
              <Info className="w-4 h-4 text-chili" /> 02. eligibility of taste
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed lowercase font-light">
              only dishes verified as "singapore-born or inspired" are eligible
              for the shortlist. entries found to be utilizing non-authentic
              substitutes for heritage ingredients may be disqualified at the
              jury's discretion.
            </p>
          </section>

          <div className="p-8 glass rounded-3xl border-chili/20 border flex gap-6 items-start">
            <AlertTriangle className="w-6 h-6 text-chili shrink-0" />
            <div>
              <h4 className="text-white font-bold lowercase mb-2 text-xs">
                anti-manipulation clause
              </h4>
              <p className="text-zinc-500 text-[11px] lowercase leading-relaxed font-light">
                any attempt to "bot" or manipulate the voting counter will
                result in a permanent ip ban from the sgcookfiesta platform. we
                preserve the sanctity of the street food soul.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
