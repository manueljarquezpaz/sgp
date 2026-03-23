"use client";

import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["discover", "jury", "maps", "vote"];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isScrolled || isOpen
            ? "py-4 bg-charcoal/90 backdrop-blur-xl border-b border-white/5"
            : "py-8 bg-transparent"
        }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo - Full Lowercase */}
          <div className="flex items-center gap-2 z-[110]">
            <UtensilsCrossed className="w-5 h-5 text-chili" />
            <span className="text-2xl font-black tracking-fiesta lowercase">
              sgcook<span className="text-chili">fiesta</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="text-xs tracking-[0.2em] font-bold text-zinc-500 hover:text-white transition-colors lowercase">
                {link}
              </a>
            ))}
          </div>

          {/* Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-[110] p-3 bg-white/5 rounded-full border border-white/10">
            {isOpen ? (
              <X className="w-5 h-5 text-chili" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[90] bg-charcoal flex flex-col justify-center px-12 transition-transform duration-700 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}>
        <div className="space-y-6">
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setIsOpen(false)}
              className="block text-6xl font-serif lowercase text-white hover:text-chili transition-all">
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
