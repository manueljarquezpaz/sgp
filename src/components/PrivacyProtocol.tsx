"use client";

import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export default function PrivacyProtocol() {
  return (
    <section className="py-32 px-6 bg-charcoal min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-20 border-l-2 border-chili pl-8">
          <h1 className="text-6xl font-serif lowercase tracking-fiesta mb-4 text-white">
            privacy <span className="text-chili italic">protocol</span>
          </h1>
          <p className="text-zinc-500 lowercase text-sm tracking-[0.2em] font-bold">
            version 2.026 • encrypted & optimized
          </p>
        </div>

        <div className="space-y-16">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="flex items-center gap-4 text-chili font-bold lowercase tracking-widest text-[10px]">
              <Lock className="w-4 h-4" /> 01. data minimization
            </div>
            <p className="text-zinc-400 font-light leading-relaxed lowercase">
              to prevent system overhead and ensure peak performance, we utilize{" "}
              <strong>trimmed jwt architecture</strong>. we only store the
              absolute essentials: your unique identifier and voting
              credentials. we do not harvest or store bloated metadata.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="flex items-center gap-4 text-chili font-bold lowercase tracking-widest text-[10px]">
              <ShieldCheck className="w-4 h-4" /> 02. culinary integrity
            </div>
            <p className="text-zinc-400 font-light leading-relaxed lowercase">
              your voting patterns are anonymized. we analyze "taste trends"
              across singapore to provide real-time leaderboard data, but your
              individual identity remains shielded within our secure vault.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="flex items-center gap-4 text-chili font-bold lowercase tracking-widest text-[10px]">
              <EyeOff className="w-4 h-4" /> 03. cookie optimization
            </div>
            <p className="text-zinc-400 font-light leading-relaxed lowercase">
              we strictly limit cookie sizes to under 4kb to prevent{" "}
              <strong>431 request header errors</strong>. our sessions are
              designed to be light, fast, and cinematic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
