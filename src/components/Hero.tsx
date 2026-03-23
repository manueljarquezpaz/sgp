"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import VotingModal from "./AuthModal"; // We'll refine this next

export default function Hero() {
  const [isVotingOpen, setIsVotingOpen] = useState(false);

  const scrollToJury = () => {
    const element = document.getElementById("jury");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105">
          <source src="/videos/bg_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center space-y-8">
        <h1 className="text-7xl md:text-[10rem] font-serif leading-none lowercase tracking-fiesta text-white">
          sgcook<span className="text-chili italic">fiesta</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <button
            onClick={() => setIsVotingOpen(true)}
            className="w-full sm:w-auto px-12 py-5 bg-chili text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-chili/40 lowercase tracking-widest flex items-center justify-center gap-3">
            vote now
            <Play className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={scrollToJury}
            className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all lowercase tracking-widest">
            meet the jury
          </button>
        </div>
      </div>

      {/* Voting Modal Integration */}
      <VotingModal
        isOpen={isVotingOpen}
        onClose={() => setIsVotingOpen(false)}
      />
    </section>
  );
}
