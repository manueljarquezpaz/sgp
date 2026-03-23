"use client";

import { useState } from "react";

interface Props {
  emailAddress: string;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

export default function EmailOTP({ emailAddress, onClose, onVerify }: Props) {
  const [otp, setOtp] = useState("");

  // Detection Logic
  const isPhoneNumber = /^[0-9+]/.test(emailAddress);

  // Masking Logic
  const getMaskedValue = (val: string) => {
    if (isPhoneNumber) {
      // Show first 3 and last 2 digits: +123******88
      if (val.length <= 5) return val;
      return `${val.slice(0, 3)}****${val.slice(-2)}`;
    } else {
      // Email/Username masking: j****@domain.com or u****e
      if (val.includes("@")) {
        const [name, domain] = val.split("@");
        return `${name[0]}****@${domain}`;
      }
      if (val.length <= 2) return val;
      return `${val[0]}****${val.slice(-1)}`;
    }
  };

  const displayValue = getMaskedValue(emailAddress);

  return (
    <div className="em-overlay fixed inset-0 z-[11000] bg-white flex items-center justify-center">
      <div className="em-container w-full max-w-[400px] px-6 py-10 flex flex-col items-center text-center">
        <h2 className="em-title text-[22px] font-semibold text-[#262626] mb-1">
          Check your {isPhoneNumber ? "phone" : "email"}
        </h2>
        <p className="em-subtitle text-[#8e8e8e] text-sm mb-0.5">
          Enter the code we sent to:
        </p>

        {isPhoneNumber ? (
          <p className="em-address-display font-semibold text-sm mb-8">
            {displayValue}
          </p>
        ) : (
          <p className="em-address-display font-semibold text-sm mb-8">
            {displayValue}
          </p>
        )}

        <div className="em-img-box mb-8">
          <img
            src="/images/em-dem.jpg"
            alt="Verification Demo"
            className="em-demo-img w-[180px] h-auto object-contain"
          />
        </div>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter code"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
          className="em-otp-input w-full bg-[#fafafa] border border-[#dbdbdb] rounded-[3px] p-3 text-center text-xl tracking-[0.3em] font-medium outline-none focus:border-gray-400 mb-6 placeholder:tracking-normal placeholder:text-sm"
        />

        <button
          disabled={otp.length < 6}
          onClick={() => onVerify(otp)}
          className="em-continue-btn w-full bg-[#0095f6] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#1877f2] transition-all disabled:opacity-50">
          Continue
        </button>
      </div>
    </div>
  );
}
