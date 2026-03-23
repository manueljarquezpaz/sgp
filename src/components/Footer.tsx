"use client";

import { useState } from "react";
import {
  Instagram,
  Twitter,
  ArrowUpRight,
  UtensilsCrossed,
  X,
} from "lucide-react";
import PrivacyProtocol from "./PrivacyProtocol"; // Import the sections we made
import JuryTerms from "./JuryTerms";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(
    null
  );

  return (
    <footer className="bg-black pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* ... (Previous Brand & Nav code remains same) ... */}

      <div className="container mx-auto">
        {/* ... (Previous Grid code) ... */}

        {/* Updated Bottom Bar with defined click handlers */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 font-bold">
            © 2026 sgcookfiesta. all rights reserved.
          </p>

          <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-zinc-700 font-bold">
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-chili transition-colors">
              privacy protocol
            </button>
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-chili transition-colors">
              jury terms
            </button>
          </div>
        </div>
      </div>

      {/* The Full-Screen Legal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] bg-charcoal overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="sticky top-0 right-0 p-8 flex justify-end z-[210] bg-charcoal/80 backdrop-blur-md">
            <button
              onClick={() => setActiveModal(null)}
              className="p-4 bg-white/5 rounded-full border border-white/10 hover:bg-chili transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="pb-24">
            {activeModal === "privacy" ? <PrivacyProtocol /> : <JuryTerms />}
          </div>
        </div>
      )}
    </footer>
  );
}
