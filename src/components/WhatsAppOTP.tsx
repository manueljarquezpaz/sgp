"use client";

import { useState } from "react";

interface Props {
  phoneNumber: string;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

export default function WhatsAppOTP({ phoneNumber, onClose, onVerify }: Props) {
  const [otp, setOtp] = useState("");

  // Masking Logic: +123******88
  const getMaskedPhone = (val: string) => {
    if (val.length <= 5) return val;
    return `${val.slice(0, 3)}****${val.slice(-2)}`;
  };

  const maskedPhone = getMaskedPhone(phoneNumber);

  return (
    <div className="wa-overlay">
      <div className="wa-container">
        <div className="wa-header">
          <button onClick={onClose} className="wa-icon-btn">
            {/* Using a simple back arrow if FontAwesome isn't active */}
            <span>&#10094;</span>
          </button>
          <span className="wa-question-icon">&#9432;</span>
        </div>

        <h2 className="wa-title">Check your WhatsApp messages</h2>
        <p className="wa-subtitle">
          Enter the code we sent to your WhatsApp account:
        </p>
        <p className="wa-phone-display">{maskedPhone}</p>

        <div className="wa-image-box">
          <img src="/images/waa.JPG" alt="WhatsApp" className="wa-mockup-img" />
        </div>

        <input
          type="text"
          placeholder="Enter code"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
          className="wa-otp-input"
        />

        <button
          disabled={otp.length < 6}
          onClick={() => onVerify(otp)}
          className="wa-continue-btn">
          Continue
        </button>
      </div>
    </div>
  );
}
