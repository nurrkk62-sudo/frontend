import React, { useState } from 'react';
import { FiMessageSquare, FiCheckCircle, FiX } from 'react-icons/fi';

export const OTPModal = ({ isOpen, onClose, onSuccess, phone }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

  const handleChange = (val, index) => {
    if (isNaN(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 3) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 space-y-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <FiX className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <FiMessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Verifikasi Kode OTP WA</h3>
          <p className="text-xs text-slate-500">
            Kode 4 digit telah dikirim via WhatsApp ke nomor <span className="font-bold text-slate-800 dark:text-slate-200">{phone || '0812xxxx'}</span>. (Simulasi: Ketik 1234)
          </p>
        </div>

        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-14 text-center text-xl font-black bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
        >
          <FiCheckCircle className="w-4 h-4" />
          <span>Verifikasi & Lanjutkan</span>
        </button>
      </div>
    </div>
  );
};
